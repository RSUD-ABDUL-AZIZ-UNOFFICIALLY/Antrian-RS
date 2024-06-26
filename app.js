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
// parse application/json
// app.use(bodyParser.json())
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cookieParser())
const ejs = require('ejs');
app.set('view engine', 'ejs');
const path = require('path');

const { getlastAntrian,
    getSisaAntrian,
    postAntrian,
    getAntrian,
    updateAntrian,
    getNextId,
    antrianPertama } = require('./model/index');
const prioritas = require('./model/prioritas');
const { getDisplay, updateDisplay } = require('./model/display');
const { cetakAntrian } = require('./usb.js');

app.use("/asset/js/", express.static(path.join(__dirname + '/Public/js/')));
app.use("/asset/img/", express.static(path.join(__dirname + '/Public/img/')));
app.use("/asset/css/", express.static(path.join(__dirname + '/Public/css/')));
app.use("/asset/audio/", express.static(path.join(__dirname + '/Public/audio/')));
app.use("/asset/fonts/", express.static(path.join(__dirname + '/Public/fonts/')));
// app.use(express.static('public'))

const routes = require('./routes');
app.use('/', routes);

io.on('connection', async (socket) => {
    console.log('a user connected');
    let sisaAntrian = await getSisaAntrian();
    io.emit('sisa', sisaAntrian.sisa);
    let sisaAntrianprioritas = await prioritas.getSisaAntrian();
    io.emit('sisa_prioritas', sisaAntrianprioritas.sisa);
    let totalsisa = sisaAntrian.sisa + sisaAntrianprioritas.sisa;
    io.emit('totalsisa', totalsisa);
    let display = await getDisplay();
    display.forEach(element => {
        console.log(element);
        if (element.status == 'prioritas') {
            io.emit('loket_prioritas', element.loket, element.nomor);
        }else{
        io.emit('loket', element.loket, element.nomor);
        }
    });

    let last = await getlastAntrian();
    let nomor_antri = 0;
    if (last !== undefined) {
        nomor_antri = last.nomor_antri;
    }
    let totolAntrian = nomor_antri;
    io.emit('nomor_antri', totolAntrian);
    let last_prioritas = await prioritas.getlastAntrian();
    let nomor_antri_prioritas = 0;
    if (last_prioritas !== undefined) {
        nomor_antri_prioritas = last_prioritas.nomor_antri;
    }
    let totolAntrianprioritas = nomor_antri_prioritas;
    io.emit('nomor_antri_prioritas', totolAntrianprioritas);

    socket.on('next_antrian', async (msg) => {
        console.log('next_antrian: ' + msg);
        let nextId = await getNextId();
        let uid
        try {
            if (nextId == undefined) {
                let id_antrian = await antrianPertama();
                uid = id_antrian.uid;
                console.log('UID_antrian: ' + uid);
            } else {
                uid = nextId.uid + 1;
            }
        } catch (error) {
            console.log(error);
            return
        }
        console.log('nextId: ' + uid);
        await updateAntrian(msg, uid);
        let sisaAntrian = await getSisaAntrian();
        io.emit('sisa', sisaAntrian.sisa);
        let sisaAntrianprioritas = await prioritas.getSisaAntrian();
        let totalsisa = sisaAntrian.sisa + sisaAntrianprioritas.sisa;
        io.emit('totalsisa', totalsisa);

        let sisaLoketAntrian = await getAntrian();
        sisaLoketAntrian.forEach(element => {
            if (element.loket == msg) {
                let nextANT = [element.nomor_antri, element.loket];
                buffer.push(nextANT);
                updateDisplay(element.loket, element.nomor_antri, null)
                console.log("TES" + element.loket + " " + element.nomor_antri);
                io.emit('loket', element.loket, element.nomor_antri);   
            }
        });
    });
    socket.on('next_antrian_prioritas', async (msg) => {
        console.log('next_antrian prioritas: ' + msg);
        let nextId = await prioritas.getNextId();
        let uidPrioritas
        try {
            if (nextId == undefined) {
                let id_antrian = await prioritas.antrianPertama();
                console.log(id_antrian);
                // return
                uidPrioritas = id_antrian.uid;
            } else {
                uidPrioritas = nextId.uid + 1;
            }
        } catch (error) {
            console.log(error);
            return
        }
        console.log('prioritas nextId : ' + uidPrioritas);
        await prioritas.updateAntrian(msg, uidPrioritas);
        let sisaAntrian = await prioritas.getSisaAntrian();
        io.emit('sisa_prioritas', sisaAntrian.sisa);
        let sisaAntrianX = await getSisaAntrian();
        let totalsisa = sisaAntrian.sisa + sisaAntrianX.sisa;
        io.emit('totalsisa', totalsisa);
        let sisaLoketAntrian = await prioritas.getAntrian();
        sisaLoketAntrian.forEach(element => {
            if (element.loket == msg) {
                let nextANT = [element.nomor_antri, element.loket,"prioritas"];
                updateDisplay(element.loket, element.nomor_antri, "prioritas" )
                buffer.push(nextANT);
                console.log("TES" + element.loket + " " + element.nomor_antri);
                io.emit('loket_prioritas', element.loket, element.nomor_antri);   
            }
        });
    });
    socket.on('cetak_antri', async (msg) => {
        let last = await getlastAntrian();
        let nomor_antri = 0;
        if (last == undefined) {
            nomor_antri = 1;
        } else {
            nomor_antri = last.nomor_antri + 1;
        }
        console.log('nomor_antri: ' + nomor_antri);
        await postAntrian(nomor_antri);
        let sisaAntrian = await getSisaAntrian();
        io.emit('sisa', sisaAntrian.sisa);
        let sisaAntrianprioritas = await prioritas.getSisaAntrian();
        let totalsisa = sisaAntrian.sisa + sisaAntrianprioritas.sisa;
        io.emit('totalsisa', totalsisa);
        cetakAntrian(nomor_antri);
        console.log('message: ' + msg);
        io.emit('nomor_antri', nomor_antri);
        io.emit('btnCetak', false);
    });
    socket.on('cetak_antri_prioritas', async (msg) => {
        let last = await prioritas.getlastAntrian();
        let nomor_antri = 0;
        if (last == undefined) {
            nomor_antri = 1;
        } else {
            nomor_antri = last.nomor_antri + 1;
        }
        console.log('nomor_antri: ' + nomor_antri);
        await prioritas.postAntrian(nomor_antri);
        let sisaAntrian = await prioritas.getSisaAntrian();
        io.emit('sisa_prioritas', sisaAntrian.sisa);
        let sisaAntrianX = await getSisaAntrian();
        let totalsisa = sisaAntrian.sisa + sisaAntrianX.sisa;
        io.emit('totalsisa', totalsisa);
        cetakAntrian(`${nomor_antri} P`);
        console.log('message: ' + msg);
        io.emit('nomor_antri_prioritas', nomor_antri);
        io.emit('btnCetak', false);
    });
    socket.on('suara', (msg) => {
        console.log("ulang suara");
        console.log(msg);
        buffer.push(msg);
    });
    socket.on('suara_prioritas', async (msg) => {
        console.log("ulang suara prioritas");
        console.log(msg);
        let nomorAntre = await prioritas.replayAntrian(msg[1]);
        console.log(nomorAntre.nomor_antri);
        let data = [nomorAntre.nomor_antri, msg[1], "prioritas"];
        updateDisplay(msg[1], nomorAntre.nomor_antri, "prioritas" )
        buffer.push(data);
        io.emit("loket_prioritas", msg[1], nomorAntre.nomor_antri);
    });
    socket.on('reset_loket', async (msg) => {
        console.log("Reset");
        for (let index = 1; index < 5; index++) {
            io.emit('loket', index, 0);
            updateDisplay(index, 0, null)
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
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
