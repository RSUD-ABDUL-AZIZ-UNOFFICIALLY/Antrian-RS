const socket = io();
socket.on("connect", () => {
    console.log(socket.connected); // true
    console.log(socket.id); // "G5p5..."
    socket.emit("UpdateLoket", "");
});
socket.on('loket', (msg, nomor_antri) => {
    document.getElementById(msg).innerHTML = nomor_antri + " A";
});
socket.on('nomor_antri_atas', (msg) => {

    document.getElementById("total").innerHTML = msg;
});
socket.on('sisa_atas', (msg) => {
    console.log('sisa: ' + msg);
    document.getElementById("sisa").innerHTML = msg;
});
let btnNext = document.getElementById('next');
let btnUlang = document.getElementById('ulang');

function next(id) {

    btnUlang.disabled = true;
    btnNext.disabled = true;
    socket.emit("next_antrian_atas", id);
}
function ulangPangilan(id) {
    console.log("pangilan");
    btnUlang.disabled = true;
    btnNext.disabled = true;
    console.log(id);
    socket.emit("suara_atas", id);
}
socket.on('pangil', (no, loket) => {
    if (loket == level) {
        btnUlang.disabled = false;
        btnNext.disabled = false;
    }
});
socket.on('panggil_prioritas', (no, loket) => {
    if (loket == level) {
        btnUlangPrioritas.disabled = false;
        btnNextPrioritas.disabled = false;
    }
});

socket.on('antiranHabis', (msg, loket) => {
    if (loket == level) {
        alert(msg);
        btnUlangPrioritas.disabled = false;
        btnNextPrioritas.disabled = false;
        btnUlang.disabled = false;
        btnNext.disabled = false;
    }
});


function resetLoket() {
    socket.emit("reset_loket");
}
socket.on('pangil2', (no, loket) => {
    if (loket == level) {
        btnUlang.disabled = false;
        btnNext.disabled = false;
    }
});
