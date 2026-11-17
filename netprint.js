require('dotenv').config();
const path = require('path');
const escpos = require('escpos');
escpos.Network = require('escpos-network');
const { createCanvas, registerFont } = require('canvas');

registerFont(path.join(__dirname, 'fonts', 'Roboto-Regular.ttf'), { family: 'Roboto', weight: 'normal' });
registerFont(path.join(__dirname, 'fonts', 'Roboto-Bold.ttf'), { family: 'Roboto', weight: 'bold' });

function buatGambarStrukPadat(nomor_antri, date_now, time) {
    const width = 576;  // Lebar area cetak TM-T82X (80mm)
    const height = 350; // Lebih pendek ~37% dari versi sebelumnya

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Latar belakang putih bersih
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#000000';
    const centerX = width / 2;
    const marginX = 16;

    // 1. HEADER PADAT (RSUD + Kota)
    ctx.textAlign = 'center';
    ctx.font = 'bold 24px "Roboto"';
    ctx.fillText('RSUD dr. Abdul Aziz - Kota Singkawang', centerX, 32);

    // Garis pemisah tipis
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginX, 46);
    ctx.lineTo(width - marginX, 46);
    ctx.stroke();

    // 2. LABEL & NOMOR ANTRIAN (Fokus Utama)
    ctx.font = 'bold 20px "Roboto"';
    ctx.fillText('NOMOR ANTRIAN', centerX, 76);

    ctx.font = 'bold 88px "Roboto"';
    ctx.fillText(nomor_antri, centerX, 162);

    // Garis pemisah putus-putus
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(marginX, 185);
    ctx.lineTo(width - marginX, 185);
    ctx.stroke();
    ctx.setLineDash([]); // Reset garis solid

    // 3. INFO LAYANAN & WAKTU (Sejajar Kiri - Kanan dalam 1 Baris)
    ctx.font = 'bold 20px "Roboto"';
    ctx.textAlign = 'left';
    ctx.fillText('Pasien Rawat Jalan', marginX, 218);

    ctx.font = 'normal 19px "Roboto"';
    ctx.textAlign = 'right';
    ctx.fillText(`${date_now} | ${time}`, width - marginX, 218);

    // Garis pemisah bawah
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(marginX, 234);
    ctx.lineTo(width - marginX, 234);
    ctx.stroke();

    // 4. FOOTER RINGKAS
    ctx.textAlign = 'center';
    ctx.font = 'normal 17px "Roboto"';
    ctx.fillText('*Ambil kembali antrian jika terlewat*', centerX, 264);

    ctx.font = 'bold 18px "Roboto"';
    ctx.fillText('Semoga Sehat Selalu', centerX, 290);

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

        const dataUrl = buatGambarStrukPadat(nomor_antri, date_now, time);

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
                    .raster(image)
                    .feed(1) // Cukup 1 feed karena bagian bawah kanvas sudah punya sisa ruang aman untuk pisau cutter
                    .cut();

                setTimeout(() => {
                    printer.close();
                    resolve(true);
                }, 350);
            });
        });
    });
};

// Contoh pemanggilan
(async () => {
    try {
        await cetakAntrian('A-001');
        console.log('Struk hemat kertas berhasil dicetak');
    } catch (err) {
        console.error('Gagal cetak:', err.message);
    }
})();