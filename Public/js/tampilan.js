console.log('Hello World!');
// var socket = io();
const socket = io();
let counter = 1;

socket.on("connect", () => {
    console.log(socket.connected); // true
    console.log(socket.id); // "G5p5..."
    // socket.emit("UpdateLoket", "");

});
socket.on('loket', (msg, nomor_antri) => {
    console.log(msg);
    console.log(nomor_antri);
    document.getElementById(msg).innerHTML = nomor_antri;
});
socket.on('sisa', (msg) => {
    console.log('sisa: ' + msg);
    document.getElementById("sisa").innerHTML = msg;
});

