const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const devices = escpos.USB.findPrinter();
console.log(devices)
const options = { encoding: "GB18030" /* default */ }
const device = new escpos.USB();
const printer = new escpos.Printer(device, options);
let datetime = new Date();
let date = datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getFullYear();
let time = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds();
let dateTime = date + ' ' + time;

// const printer = new escpos.Printer(device, options);
device.open(function () {
    printer
        .size(1, 1)
        .font('a')
        .align('ct')
        .style('B')
        .text('RSUD Abdul Aziz')
        .text('Kota Singkawang')
        .text('-------------------------------------')
        .text('Nomor Antrian')
        .size(5, 5)
        .text('')
        .text('A001')
        .text('')
        .size(1, 1)
        .text('-------------------------------------')
        .text('')
        .font('b')
        .size(0.5, 0.5) 
        .text('Pasien rawat jalan')
        .text('')
        .text('Tanggal Antrian : ')
        .text(dateTime)
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