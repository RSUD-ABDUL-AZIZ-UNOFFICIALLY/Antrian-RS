const socket = io();
socket.on("connect", () => {
    console.log(socket.connected); // true
    console.log(socket.id); // "G5p5..."
    socket.emit("UpdateLoket", "");
});
socket.on('loket', (msg, nomor_antri) => {
    document.getElementById(msg).innerHTML = nomor_antri;
});
socket.on('nomor_antri', (msg) => {

    document.getElementById("total").innerHTML = msg;
});
socket.on('sisa', (msg) => {
    console.log('sisa: ' + msg);
    document.getElementById("sisa").innerHTML = msg;
});
let btnNext = document.getElementById('next');
let btnUlang = document.getElementById('ulang');

function next(id) {

    btnUlang.disabled = true;
    btnNext.disabled = true;
    socket.emit("next_antrian", id);
}
function ulangPangilan(id) {
    console.log("pangilan");
    btnUlang.disabled = true;
    btnNext.disabled = true;
    console.log(id);
    socket.emit("suara", id);
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

// Prioritas
socket.on('loket_prioritas', (msg, nomor_antri) => {
    document.getElementById(msg).innerHTML = `<span style='color: red;'>${nomor_antri} P</span> `;
});
socket.on('nomor_antri_prioritas', (msg) => {
    console.log("Nomor antri yang tercetak : " + msg);
    document.getElementById("totalPrioritas").innerHTML = msg;
});
socket.on('sisa_prioritas', (msg) => {
    console.log('sisa prioritas: ' + msg);
    document.getElementById("sisaPrioritas").innerHTML = msg;
});
let btnNextPrioritas = document.getElementById('nextPrioritas');
let btnUlangPrioritas = document.getElementById('ulangPrioritas');

function nextPrioritas(id) {
    console.log('next Prioritas Loket ' + id);
    btnUlangPrioritas.disabled = true;
    btnNextPrioritas.disabled = true;
    socket.emit("next_antrian_prioritas", id);
    // let nomor = document.getElementById(id).innerHTML;
    // let suara = [Math.floor(nomor) + 1, id];
    // console.log(suara);
    // socket.emit("suara", suara);
}
function ulangPangilanPrioritas(id) {
    btnUlangPrioritas.disabled = true;
    btnNextPrioritas.disabled = true;
    socket.emit("suara_prioritas", id);
}
function resetLoket() {
    socket.emit("reset_loket");
}
// socket.on('pangil', (no, loket) => {
//     if (loket == level) {
//         btnUlang.disabled = false;
//         btnNext.disabled = false;
//     }
// });
