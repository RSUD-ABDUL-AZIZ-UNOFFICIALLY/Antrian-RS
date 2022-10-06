require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
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
    // io.emit('UpdateLoket', "");
    console.log("sisaAntrian.sisa: " + sisaAntrian.sisa);
    // console.log(sisaAntrian);
    let sisaLoketAntrian = await getAntrian();
    sisaLoketAntrian.forEach(element => {
        console.log(element);
        io.emit('loket', element.loket, element.nomor_antri);
    });
    socket.on('next_antrian', async (msg) => {
        console.log('next_antrian: ' + msg);
        let nextId = await getNextId();
        // console.log(nextId);
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
            // console.log(error);
            return
        }
        console.log('nextId: ' + uid);
        await updateAntrian(msg, uid);
        let sisaAntrian = await getSisaAntrian();
        io.emit('sisa', sisaAntrian.sisa);
        let sisaLoketAntrian = await getAntrian();
        sisaLoketAntrian.forEach(element => {
            console.log(element);
            if (element.loket == msg) {
                io.emit('loket', element.loket, element.nomor_antri);
                io.emit('panggil', element.loket, element.nomor_antri);
                // io.emit('loket',(msg, element.nomor_antri));
            }
        });
        return;

    });
    socket.on('cetak_antri', async (msg) => {
        let last = await getlastAntrian();
        console.log('cetak_antri: ');
        console.log(typeof last);
        let nomor_antri = 0;
        if (last == undefined) {
            nomor_antri = 1;
        } else {
            nomor_antri = last.nomor_antri + 1;
        }
        console.log('nomor_antri: ' + nomor_antri);
        // let nomor_antri = last.nomor_antri + 1;
        await postAntrian(nomor_antri);
        let sisaAntrian = await getSisaAntrian();
        io.emit('sisa', sisaAntrian.sisa);
        cetakAntrian("nomor_antri");
        cetakAntrian(sisaAntrian.sisa);
        console.log('message: ' + msg);
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
