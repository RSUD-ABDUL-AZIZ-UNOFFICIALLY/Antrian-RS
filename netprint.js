require('dotenv').config();
const path = require('path');
const escpos = require('escpos');
escpos.Network = require('escpos-network');
const { createCanvas, registerFont } = require('canvas');

// Daftarkan font Roboto sebelum membuat canvas
registerFont(path.join(__dirname, 'fonts', 'Roboto-Regular.ttf'), { family: 'Roboto', weight: 'normal' });
registerFont(path.join(__dirname, 'fonts', 'Roboto-Bold.ttf'), { family: 'Roboto', weight: 'bold' });

function buatGambarStruk(nomor_antri, date_now, time) {
    const width = 576;  // Lebar maksimal area cetak Epson TM-T82X (80mm @ 203 DPI)
    const height = 560; // Sesuaikan tinggi kanvas agar tidak ada ruang kosong berlebih

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Latar belakang putih solid
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Pengaturan teks hitam pekat (tanpa abu-abu agar hasil thermal tajam)
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    const centerX = width / 2;

    // Header RSUD
    ctx.font = 'bold 28px "Roboto"';
    ctx.fillText('RSUD dr. Abdul Aziz', centerX, 45);

    ctx.font = 'normal 22px "Roboto"';
    ctx.fillText('Kota Singkawang', centerX, 78);

    // Garis pemisah atas
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 100);
    ctx.lineTo(width - 20, 100);
    ctx.stroke();

    // Label Nomor Antrian
    ctx.font = 'normal 22px "Roboto"';
    ctx.fillText('Nomor Antrian', centerX, 140);

    // Nomor Antrian Besar
    ctx.font = 'bold 96px "Roboto"';
    ctx.fillText(nomor_antri, centerX, 245);

    // Garis pemisah bawah
    ctx.beginPath();
    ctx.moveTo(20, 280);
    ctx.lineTo(width - 20, 280);
    ctx.stroke();

    // Kategori Layanan (dengan garis bawah manual)
    ctx.font = 'bold 24px "Roboto"';
    const teksPoli = 'Pasien Rawat Jalan';
    ctx.fillText(teksPoli, centerX, 325);
    const textWidth = ctx.measureText(teksPoli).width;
    ctx.fillRect(centerX - textWidth / 2, 332, textWidth, 2);

    // Tanggal & Waktu
    ctx.font = 'normal 20px "Roboto"';
    ctx.fillText(`Tanggal Antrian : ${date_now} ${time}`, centerX, 385);

    // Footer Catatan
    ctx.font = 'normal 18px "Roboto"';
    ctx.fillText('*Mengambil kembali Antrian, Jika Terlewat*', centerX, 445);
    ctx.font = 'bold 20px "Roboto"';
    ctx.fillText('*Semoga Sehat Selalu*', centerX, 480);

    return canvas.toDataURL('image/png');
}

const cetakAntrian = function (nomor_antri) {
    return new Promise((resolve, reject) => {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');

        const date_now = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
        const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        const printerIp = process.env.PRINTER_IP;
        if (!printerIp) {
            return reject(new Error('PRINTER_IP belum diatur di file .env'));
        }

        const dataUrl = buatGambarStruk(nomor_antri, date_now, time);

        escpos.Image.load(dataUrl, function (image) {
            const device = new escpos.Network(printerIp, 9100);
            const printer = new escpos.Printer(device);

            device.open(function (error) {
                if (error) {
                    console.error('Gagal terhubung ke Epson TM-T82X:', error);
                    return reject(error);
                }

                printer
                    .align('ct')
                    .raster(image) // Cetak gambar dalam mode raster (lebih cepat & tajam di TM-T82X)
                    .feed(2)
                    .cut();

                setTimeout(() => {
                    printer.close();
                    resolve(true);
                }, 400);
            });
        });
    });
};

// Contoh pemanggilan
(async () => {
    try {
        await cetakAntrian('A-001');
        console.log('Struk Roboto berhasil dicetak');
    } catch (err) {
        console.error('Gagal cetak:', err.message);
    }
})();
