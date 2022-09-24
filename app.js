require('dotenv').config();
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());
const path = require('path');

const { getlastAntrian, getSisaAntrian, postAntrian, getAntrian, updateAntrian,
    getNextId } = require('./model/index');
const { cetakAntrian } = require('./usb.js');

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.sendFile(path.join(__dirname, '/Public/index.html'));
})
app.get('/tampil', (req, res) => {
    // res.send('Hello World!')
    res.sendFile(path.join(__dirname, '/Public/antrian.html'));
})
app.get('/admin', (req, res) => {
    // res.send('Hello World!')
    res.sendFile(path.join(__dirname, '/Public/next.html'));
})
app.use("/asset/js", express.static('public/js/'));
app.use("/asset/img", express.static('public/img/'));
app.use("/asset/css", express.static('public/css/'));

io.on('connection', async (socket) => {
    console.log('a user connected');

    let sisaAntrian = await getSisaAntrian();
    io.emit('sisa', sisaAntrian.sisa);
    // io.emit('UpdateLoket', "");
    console.log(sisaAntrian.sisa);
    socket.on('cetak_antri', async (msg) => {
        let last = await getlastAntrian();
        let nomor_antri = last.nomor_antri + 1;
        await postAntrian(nomor_antri);
        let sisaAntrian = await getSisaAntrian();
        io.emit('sisa', sisaAntrian.sisa);
        cetakAntrian(nomor_antri);
        console.log(last.nomor_antri);
        console.log('message: ' + msg);
    });
    socket.on('UpdateLoket', async (msg) => {
        try {
            let sisaAntrian = await getAntrian();
            data = {
                L1: sisaAntrian[0].nomor_antri,
                L2: sisaAntrian[1].nomor_antri,
                L3: sisaAntrian[2].nomor_antri,
                L4: sisaAntrian[3].nomor_antri
            }
            console.log(data);
            console.log(sisaAntrian);
            io.emit('loket', data);
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('next_antrian', async (msg) => {
        console.log('next_antrian: ' + msg);
        let nextId = await getNextId();
        console.log(nextId);
        let uid = nextId.uid + 1
        await updateAntrian(msg, uid);
        let sisaAntrian = await getSisaAntrian();
        io.emit('sisa', sisaAntrian.sisa);
        try {
            let sisaAntrian = await getAntrian();
            data = {
                L1: sisaAntrian[0].nomor_antri,
                L2: sisaAntrian[1].nomor_antri,
                L3: sisaAntrian[2].nomor_antri,
                L4: sisaAntrian[3].nomor_antri
            }
            console.log(data);
            console.log(sisaAntrian);
            if (sisaAntrian == 0) {
                io.emit('loket', data);
                console.log('sisaAntrian == 0');
                return;
            }
            // io.emit('loket', data);
        } catch (error) {
            console.log(error);
        }

    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
