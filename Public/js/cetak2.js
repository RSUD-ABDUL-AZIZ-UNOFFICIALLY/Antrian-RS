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
socket.on('sisa_prioritas', (msg) => {
    console.log('sisa prioritas: ' + msg);
    document.getElementById("sisa_prioritas").innerHTML = msg;
});
socket.on('sisa_atas', (msg) => {
    console.log('sisa prioritas: ' + msg);
    document.getElementById("sisa_anrian_atas").innerHTML = msg;
});
socket.on('nomor_antri', (msg) => {
    console.log('nomor antri: ' + msg);
    document.getElementById("next_antrian").innerHTML = Math.floor(msg + 1);
});
socket.on('nomor_antri_prioritas', (msg) => {
    console.log('nomor antri prioritas: ' + msg);
    document.getElementById("next_antrian_prioritas").innerHTML = Math.floor(msg + 1);
});
socket.on('nomor_antri_atas', (msg) => {
    console.log('nomor antri prioritas: ' + msg);
    document.getElementById("next_antrian_atas").innerHTML = Math.floor(msg + 1);
});
// let btnCetak = document.getElementById("btnCetak");
// function cetak() {
//     console.log('cetak');
//     btnCetak.disabled = true;
//     socket.emit("cetak_antri", "cetak tiket");
// }
// function cetak_prioritas() {
//     console.log('cetak prioritas');
//     btnCetak.disabled = true;
//     socket.emit("cetak_antri_prioritas", "cetak tiket");
// }
// socket.on('btnCetak', (msg) => {
//     console.log('nomor antri: ' + msg);
//     btnCetak.disabled = false;
// });

function cetak(type) {
    let buttons = document.querySelectorAll('.btn-antrian');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    });
    socket.emit(type, "cetak tiket");
}

socket.on('btnCetak', (msg) => {
    let buttons = document.querySelectorAll('.btn-antrian');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    });
});