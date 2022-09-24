console.log('Hello World!');
// var socket = io();
const socket = io();
let counter = 1;
// socket.io.on("reconnect", (attempt) => {
//     // ...
//     counter += 1;
//     console.log('reconnect', counter);
// });
// socket.on("connect", () => {
//     console.log(socket.connected); // true
//     console.log(socket.id); // "G5p5..."
// });
socket.on('sisa', (msg) => {
    console.log('sisa: ' + msg);
    document.getElementById("sisa").innerHTML = msg;
});

function cetak() {
    console.log('cetak');
    socket.emit("cetak_antri", "cetak tiket");
}