console.log('Hello World!');
// var socket = io();
const socket = io();
let counter = 1;
socket.on('sisa', (msg) => {
    console.log('sisa: ' + msg);
    document.getElementById("sisa").innerHTML = msg;
});

function cetak() {
    console.log('cetak');
    socket.emit("cetak_antri", "cetak tiket");
}