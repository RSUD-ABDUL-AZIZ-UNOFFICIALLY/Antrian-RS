// const { Console } = require("escpos");
const jwt = require('jsonwebtoken');
// const { cetakAntrian } = require('../usb');

module.exports = {
    adminLoket: (req, res) => {
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.privilege > 5) {
            res.redirect('/login');
            console.log('bukan admin');
            return;
        }
        const data = {
            title: "ADMIN",
            pesan: "Selamat Datang Admin",
            user: verified.username,
            loket: verified.level,
            privilege: verified.privilege
        }
        console.log(data);
        res.render('admin', data)
    },
    cetakAntriann: async (req, res) => {
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.privilege == 6) {
            res.render('cetak', { title: "ANTREAN LOKET" })
            return;
        }
        res.redirect('/login');
        console.log('bukan cetak');
        return;
    }
};