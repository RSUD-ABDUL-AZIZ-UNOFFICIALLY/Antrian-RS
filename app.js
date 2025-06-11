require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cookieParser())
const ejs = require('ejs');
app.set('view engine', 'ejs');
const path = require('path');


const { Antrian_loket, Display, Antrian_loket_prioritas, Antrian_loket_a } = require('./models');
const { Op } = require('sequelize');
const { cetakAntrian } = require('./usb.js');

app.use("/asset/js/", express.static(path.join(__dirname + '/Public/js/')));
app.use("/asset/img/", express.static(path.join(__dirname + '/Public/img/')));
app.use("/asset/css/", express.static(path.join(__dirname + '/Public/css/')));
app.use("/asset/content/", express.static(path.join(__dirname + '/Public/cache/')));
app.use("/asset/audio/", express.static(path.join(__dirname + '/Public/audio/')));
app.use("/asset/fonts/", express.static(path.join(__dirname + '/Public/fonts/')));
// app.use(express.static('public'))

const routes = require('./routes');
const { ms } = require('date-fns/locale');
app.use('/', routes);



io.on('connection', async (socket) => {
    console.log('a user connected');
    // Terima pesan dari client A
    socket.on('send_message', (msg) => {
        console.log(`Message from client A: ${msg}`);
        io.emit('receive_message', msg);
    });

    totalSisa();
    let display = await Display.findAll();
    for (let element of display) {
        if (element.status == 'prioritas') {
            io.emit('loket_prioritas', element.loket, element.nomor);
            console.log("prioritas");
        } else {
            io.emit('loket', element.loket, element.nomor);
        }
    }

    socket.on('next_antrian', async (msg) => {
        let dateNow = new Date().toISOString().slice(0, 10);
        let last = await Antrian_loket.findOne({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                },
                updatedAt: null
            },
            order: [
                ['nomor_antri', 'asc']
            ],
            attributes: ['id', 'nomor_antri']
        });
        let nomor_antri = last == null ? 1 : last.nomor_antri;
        try {
            await Antrian_loket.update({ loket: msg, updatedAt: new Date() }, {
                where: {
                    id: last.id
            }
            });
            await Display.update({ nomor: nomor_antri, status: null }, {
                where: {
                    loket: msg
                }
            });
            totalSisa();
            io.emit('loket', msg, nomor_antri);
            buffer.push([nomor_antri, msg, "loket"]);
        } catch (error) {
            console.log("error");
            io.emit('antiranHabis', 'Antrian Habis', msg);
        }   

    });
    socket.on('next_antrian_prioritas', async (msg) => {
        let dateNow = new Date().toISOString().slice(0, 10);
        let last = await Antrian_loket_prioritas.findOne({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                },
                updatedAt: null
            },
            order: [
                ['nomor_antri', 'asc']
            ],
            attributes: ['id', 'nomor_antri']
        });
        let nomor_antri = last == null ? 1 : last.nomor_antri;
        try {
            await Antrian_loket_prioritas.update({ loket: msg, updatedAt: new Date() }, {
                where: {
                    id: last.id
            }
            });
            await Display.update({ nomor: nomor_antri, status: "prioritas" }, {
                where: {
                    loket: msg
                }
            });
            totalSisa();
            io.emit('loket_prioritas', msg, nomor_antri);
            buffer.push([nomor_antri, msg, "prioritas"]);
        } catch (error) {
            console.log("error");
            io.emit('antiranHabis', 'Antrian Prioritas Habis', msg);
        }

    });
    socket.on('next_antrian_atas', async (msg) => {
        let dateNow = new Date().toISOString().slice(0, 10);
        let last = await Antrian_loket_a.findOne({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                },
                updatedAt: null
            },
            order: [
                ['nomor_antri', 'asc']
            ],
            attributes: ['id', 'nomor_antri']
        });
        let nomor_antri = last == null ? 1 : last.nomor_antri;
        try {
            await Antrian_loket_a.update({ loket: msg, updatedAt: new Date() }, {
                where: {
                    id: last.id
                }
            });
            await Display.update({ nomor: nomor_antri, status: null }, {
                where: {
                    loket: msg
                }
            });
            totalSisa();
            io.emit('loket', msg, nomor_antri);
            buffer2.push([nomor_antri, msg, "loket"]);
        } catch (error) {
            console.log("error");
            io.emit('antiranHabis', 'Antrian Prioritas Habis', msg);
        }

    });
    socket.on('cetak_antri', async (msg) => {
        let dateNow = new Date().toISOString().slice(0, 10);
        let last = await Antrian_loket.findOne({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                }
            },
            order: [
                ['nomor_antri', 'DESC']
            ],
            attributes: ['nomor_antri']
        });
        let nomor_antri = last == null ? 1 : last.nomor_antri + 1;
        await Antrian_loket.create({
            nomor_antri: nomor_antri,
            createdAt: new Date(),
            updatedAt: null
        });
        io.emit('nomor_antri', nomor_antri);
        let sisaAntrian = await Antrian_loket.count({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                },
                updatedAt: null
            }
        });
        await cetakAntrian(nomor_antri);
        totalSisa();
        io.emit('sisa', sisaAntrian);
        io.emit('btnCetak', false);
    });
    socket.on('cetak_antri_prioritas', async (msg) => {
        let dateNow = new Date().toISOString().slice(0, 10);
        let last = await Antrian_loket_prioritas.findOne({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                }
            },
            order: [
                ['nomor_antri', 'DESC']
            ],
            attributes: ['nomor_antri']
        });
        let nomor_antri = last == null ? 1 : last.nomor_antri + 1;
        await Antrian_loket_prioritas.create({
            nomor_antri: nomor_antri,
            createdAt: new Date(),
            updatedAt: null
        });
        io.emit('nomor_antri_prioritas', nomor_antri);
        let sisaAntrian = await Antrian_loket_prioritas.count({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                },
                updatedAt: null
            }
        });
        await cetakAntrian(nomor_antri + " P");
        totalSisa();
        io.emit('sisa_prioritas', sisaAntrian);
        io.emit('btnCetak', false);

    });
    socket.on('cetak_antri_atas', async (msg) => {
        let dateNow = new Date().toISOString().slice(0, 10);
        let last = await Antrian_loket_a.findOne({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                }
            },
            order: [
                ['nomor_antri', 'DESC']
            ],
            attributes: ['nomor_antri']
        });
        let nomor_antri = last == null ? 1 : last.nomor_antri + 1;
        await Antrian_loket_a.create({
            nomor_antri: nomor_antri,
            createdAt: new Date(),
            updatedAt: null
        });
        io.emit('nomor_antri_atas', nomor_antri);
        let sisaAntrian = await Antrian_loket_a.count({
            where: {
                createdAt: {
                    [Op.startsWith]: dateNow
                },
                updatedAt: null
            }
        });
        await cetakAntrian(nomor_antri + " A");
        totalSisa();
        io.emit('sisa_atas', sisaAntrian);
        io.emit('btnCetak', false);

    });
    socket.on('suara_atas', async (msg) => {
        let queueNow = await Display.findOne({
            where: {
                loket: msg,
                status: null
            },
            attributes: ['nomor']
        });
        if (queueNow != null) {

            console.log(queueNow);
            let nomor_antri = queueNow.nomor;
            buffer2.push([nomor_antri, msg, "loket"]);
        } else {
            io.emit('antiranHabis', 'Maaf Sekarang Antiran Prioritas', msg);
        }

    });
    socket.on('suara', async (msg) => {
        let queueNow = await Display.findOne({
            where: {
                loket: msg,
                status: null
            },
            attributes: ['nomor']
        });
        if (queueNow != null) {

            console.log(queueNow);
            let nomor_antri = queueNow.nomor;
        buffer.push([nomor_antri, msg, "loket"]);
        } else {
            io.emit('antiranHabis', 'Maaf Sekarang Antiran Prioritas', msg);
        }

    });
    socket.on('suara_prioritas', async (msg) => {
        let dateNow = new Date().toISOString().slice(0, 10);
        let queueNow = await Display.findOne({
            where: {
                loket: msg,
                status: "prioritas"
            },
            attributes: ['nomor']
        });
        if (queueNow != null) {

            console.log(queueNow);
            let nomor_antri = queueNow.nomor;
            buffer.push([nomor_antri, msg, "prioritas"]);
        } else {
            io.emit('antiranHabis', 'Maaf Sekarang Antiran Biasa Aja', msg);
        }
    });
    socket.on('reset_loket', async (msg) => {
        let findAllDisplay = await Display.findAll();
        for (let x of findAllDisplay) {
            io.emit('loket', x.loket, 0);
            await Display.update({ nomor: 0, status: null }, {
                where: {
                    id: x.id
                }
            });
        }
    });
});
let buffer = [];
let delay = 1000;
function displayHello() {
    if (buffer.length > 0) {
        console.log(buffer);
        let msg = buffer.shift();
        try {
            if (msg[2] == "prioritas") {
                console.log("prioritas");
                io.emit("panggil_prioritas", msg[0], msg[1]);
                delay = 9500;
                setTimeout(displayHello, delay);
                return;
            }
        } catch (error) {
            setTimeout(displayHello, delay);
            return;
        }
        let no = msg[0];
        let loket = msg[1];
        console.log("ada");
        io.emit("pangil", no, loket);
        delay = 7500;
        setTimeout(displayHello, delay);
    } else {
        delay = 1000;
        setTimeout(displayHello, delay);
    }
}


displayHello();

let buffer2 = [];
let delay2 = 1000;
function displayHello2() {
    if (buffer2.length > 0) {
        console.log(buffer2);
        let msg = buffer2.shift();
        let no = msg[0];
        let loket = msg[1];
        console.log("ada");
        io.emit("pangil2", no, loket);
        delay2 = 7500;
        setTimeout(displayHello2, delay2);
    } else {
        delay2 = 1000;
        setTimeout(displayHello2, delay2);
    }
}

displayHello2();


async function totalSisa() {
    let dateNow = new Date().toISOString().slice(0, 10);
    let sisaAntrian = await Antrian_loket.count({
        where: {
            createdAt: {
                [Op.startsWith]: dateNow
            },
            updatedAt: null
        }
    });
    io.emit('sisa', sisaAntrian);
    let sisaAntrianprioritas = await Antrian_loket_prioritas.count({
        where: {
            createdAt: {
                [Op.startsWith]: dateNow
            },
            updatedAt: null
        }
    });
    let sisaAntrianAtas = await Antrian_loket_a.count({
        where: {
            createdAt: {
                [Op.startsWith]: dateNow
            },
            updatedAt: null
        }
    });
    let antrian = await Antrian_loket.count({
        where: {
            createdAt: {
                [Op.startsWith]: dateNow
            }
        }
    });
    let antrian_prioritas = await Antrian_loket_prioritas.count({
        where: {
            createdAt: {
                [Op.startsWith]: dateNow
            }
        }
    });
    let antrian_atas = await Antrian_loket_a.count({
        where: {
            createdAt: {
                [Op.startsWith]: dateNow
            }
        }
    });
    io.emit('nomor_antri', antrian);
    io.emit('nomor_antri_prioritas', antrian_prioritas);
    io.emit('nomor_antri_atas', antrian_atas);
    io.emit('sisa_prioritas', sisaAntrianprioritas);
    io.emit('sisa_atas', sisaAntrianAtas);
    let totalsisa = sisaAntrian + sisaAntrianprioritas;
    io.emit('totalsisa', totalsisa);
}
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
