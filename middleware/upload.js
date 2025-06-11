const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/cache');
    },

    filename: function (req, file, callback) {
        const namaFile = file.originalname.split(' ').join('');
        callback(null, namaFile);
    }
});
const image = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == 'image/png'
            || file.mimetype == 'image/jpg'
            || file.mimetype == 'image/jpeg'
            || file.mimetype == 'image/svg+xml') {
            callback(null, true);
        } else {
            callback(null, false);
            callback(new Error('only png, jpg, and jped allowed to upload!'));
        }
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    }
});
const video = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == 'video/mp4'
            || file.mimetype == 'video/avi'
            || file.mimetype == 'video/quicktime'
            || file.mimetype == 'video/mov'
            || file.mimetype == 'video/mpeg') {
            callback(null, true);
        } else {
            callback(null, false);
            callback(new Error('only mp4, avi, and mpeg allowed to upload!'));
        }
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    }
})
module.exports = {
    image,
    video
}