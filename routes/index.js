const express = require('express');
const router = express.Router();
const auth = require('../middleware');
const controller = require('../controllers');

router.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index', { title: "ANTREAN LOKET" })
})
router.get('/antrian', (req, res) => {
    // res.send('Hello ');
    res.render(antrian)
    // res.sendFile(path.join(__dirname, './../Public/antrian.html'));
})
router.get('/admin', auth.cekLogin, controller.adminLoket);
router.get('/login', (req, res) => {
    // res.send('Hello World!')
    res.render('login', { title: "LOGIN ANTREAN LOKET" })
})
router.post('/auth', auth.masuk);

module.exports = router;