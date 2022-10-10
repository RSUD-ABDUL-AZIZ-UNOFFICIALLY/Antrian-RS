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
    document.getElementById("antrian").innerHTML = Math.floor(msg + 1);
});
let btnCetak = document.getElementById("btnCetak");
function cetak() {
    console.log('cetak');
    btnCetak.disabled = true;
    socket.emit("cetak_antri", "cetak tiket");
}
socket.on('btnCetak', (msg) => {
    console.log('nomor antri: ' + msg);
    btnCetak.disabled = false;
});

