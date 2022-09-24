console.log('Hello World!');
// var socket = io();
const socket = io();
let counter = 1;
// socket.io.on("reconnect", (attempt) => {
//     // ...
//     counter += 1;
//     console.log('reconnect', counter);
// });
socket.on("connect", () => {
    console.log(socket.connected); // true
    console.log(socket.id); // "G5p5..."
    socket.emit("UpdateLoket", "");

});
socket.on('loket', (msg) => {
    console.log('sisa: ' + msg.L1);
    document.getElementById("L1").innerHTML = msg.L1;
    document.getElementById("L2").innerHTML = msg.L2;
    document.getElementById("L3").innerHTML = msg.L3;
    document.getElementById("L4").innerHTML = msg.L4;
});
socket.on('sisa', (msg) => {
    console.log('sisa: ' + msg);
    document.getElementById("sisa").innerHTML = msg;
});

