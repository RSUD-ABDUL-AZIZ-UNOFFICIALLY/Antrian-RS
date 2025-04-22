require('dotenv').config();
const escpos = require('escpos');
const e = require('express');
escpos.USB = require('escpos-usb');
escpos.Network = require('escpos-network');


const cetakAntrian = function (nomor_antri) {
    let date = new Date();
    let date_now = date.getDate() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
    let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    try {
        const devices = escpos.USB.findPrinter();
        console.log(devices)
        let device = [];
        if (devices.length === 0) {
            console.log('Printer tidak ditemukan');
            console.log(process.env.PRINTER_IP);
            device = new escpos.Network(process.env.PRINTER_IP);

        } else {
            console.log('Printer ditemukan');
            device = new escpos.USB();
        }
        // const options = { encoding: "GB18030" /* default */ }
        const options = { encoding: "EUC-KR" /* default */ }
        // const device = new escpos.USB();   
        // console.log(device)
        const printer = new escpos.Printer(device, options);
        device.open(function () {
            printer
                .size(1, 1)
                .font('a')
                .align('ct')
                .style('B')
                .text('RSUD dr.Abdul Aziz')
                .text('Kota Singkawang')
                .text('------------------')
                .style('NORMAL')
                .text('Nomor Antrian')
                .size(5, 4)
                .text('')
                .text(nomor_antri)
                .text('')
                .size(1, 1)
                .text('------------------')
                .font('b')
                .size(0.5, 0.5)
                .style('BU2')
                .text('Pasien rawat jalan')
                .text('')
                .text('Tanggal Antrian : ')
                .text(date_now)
                .text(time)
                .text('')
                .size(0.01, 0.01)
                .text('*Mengambil kembali Antrian, Jika Terlewat*')
                .text('')
                .text('*Semoga Sehat Selalu*')
                .text(' ')
                .newLine()
                .cut()
                .close()
        });

    } catch (error) {
        console.log(error);
        return false;
    }
    return true;

}
cetakAntrian('A001');
module.exports = {
    cetakAntrian
}