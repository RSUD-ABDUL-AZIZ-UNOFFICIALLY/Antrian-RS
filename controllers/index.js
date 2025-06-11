// const { Console } = require("escpos");
const jwt = require('jsonwebtoken');
// const { cetakAntrian } = require('../usb');

module.exports = {
    adminLoket: (req, res) => {
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.privilege == 'ANT') {
            res.redirect('/login');
            console.log('bukan admin');
            return;
        }
        console.log(verified);
        const data = {
            title: "ADMIN",
            pesan: "Selamat Datang Admin",
            user: verified.username,
            loket: verified.level,
            privilege: verified.privilege
        }
        if (verified.privilege.split(" ")[0] == 'A') {

            return res.render('adminA', data);
        }

        return res.render('admin', data);
    },
    cetakAntriann: async (req, res) => {
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.privilege == 'ANT') {
            res.render('cetak2', { title: "ANTREAN LOKET" })
            return;
        }
        console.log('bukan admin cetak');
        return res.redirect('/login');
    },
    ediDisplay: (req, res) => {
        res.render('editDisplay', { title: "Edit Display" })
    }

};