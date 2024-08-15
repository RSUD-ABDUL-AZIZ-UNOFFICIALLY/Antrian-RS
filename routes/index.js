const express = require('express');
const router = express.Router();
const auth = require('../middleware');
const controller = require('../controllers');

router.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index', { title: "ANTREAN LOKET" })
})
router.get('/cetak', auth.cekLogin, controller.cetakAntriann);

router.get('/logout', (req, res) => {
    res.cookie('token', "logout", { expires: new Date(Date.now() + (1000 * 3600 * 24)) });
    res.redirect('/login');
})
router.get('/admin', auth.cekLogin, controller.adminLoket);

router.get('/login', (req, res) => {
    res.cookie('token', "kosong", { expires: new Date(Date.now() + (1000 * 3600 * 24)) });
    res.render('login', { title: "LOGIN ANTREAN LOKET" })
})
router.post('/auth', auth.masuk);

module.exports = router;