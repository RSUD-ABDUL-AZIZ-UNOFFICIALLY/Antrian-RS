console.log('Hello World!');
// var socket = io();
const socket = io();
let counter = 1;
socket.on("connect", () => {
    console.log(socket.connected); // true
    console.log(socket.id); // "G5p5..."
    socket.emit("UpdateLoket", "");
});
socket.on('sisa', (msg) => {
    console.log('sisa: ' + msg);
    document.getElementById("sisa").innerHTML = msg;
});
socket.on('nomor_antri', (msg) => {
    console.log('nomor antri: ' + msg);
    document.getElementById("antrian").innerHTML = msg;
});

function cetak() {
    console.log('cetak');
    socket.emit("cetak_antri", "cetak tiket");
}

