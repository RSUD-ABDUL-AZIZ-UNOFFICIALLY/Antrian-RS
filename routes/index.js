const express = require('express');
const router = express.Router();
const auth = require('../middleware');
const controller = require('../controllers');
const AjaxController = require('../controllers/ajax');
const { image, video } = require('../middleware/upload');
router.get('/', (req, res) => {
    // res.send('Hello World!')
    res.render('index2', { title: "ANTREAN LOKET" })
})
router.get('/2', (req, res) => {
// res.send('Hello World!')
    res.render('index', { title: "ANTREAN LOKET" })
})
router.get('/a', (req, res) => {
    // res.send('Hello World!')
    res.render('indexA', { title: "ANTREAN LOKET" })
})
router.get('/cetak', auth.cekLogin, controller.cetakAntriann);
router.get('/edit', controller.ediDisplay);

router.get('/edit/message', AjaxController.getRunningText);
router.put('/edit/message', AjaxController.updateRunningText);
router.post('/edit/image', image.array('image', 5), AjaxController.addImage);
router.get('/edit/image', AjaxController.getImage);
router.delete('/edit/image', AjaxController.delImage);
router.post('/edit/video', video.array('video', 2), AjaxController.addVideo);
router.get('/edit/video', AjaxController.getVideo);
router.delete('/edit/video', AjaxController.delVideo);

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