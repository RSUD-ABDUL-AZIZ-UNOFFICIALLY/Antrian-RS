const { tr } = require('date-fns/locale');
const { Admin_tb } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    masuk: async (req, res) => {
        try {
        const { username, password } = req.body;
            if (!username || !password) {
                res.redirect('/login');
                return;
            }
            const user = await Admin_tb.findOne({
                where: {
                    user: username,
                    password: password
                }
            });

        if (user == undefined) {
            res.redirect('/login');
        } else {
            const data = {
                id: user.id,
                username: user.user,
                privilege: user.privilege,
                level: user.level
            }

            const token = jwt.sign(data, process.env.TOKEN_SECRET);
            res.cookie('token', token, { expires: new Date(Date.now() + (1000 * 3600 * 24 * 30 * 24)) });
            if (user.privilege == 'ANT') {
                res.redirect('/cetak');
                return;
            }
            res.redirect('/admin');
            return;
        }
        } catch (err) {
            console.log(err);
            res.redirect('/login');
        }
    },
    cekLogin: async (req, res, next) => {
        const date = new Date(Date.now());
        console.log(date);
        try {
            const token = req.cookies.token;
            console.log(token);

            if (!token) return res.redirect('/login');
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log(verified);
            req.user = verified;
            next();
        } catch (err) {
            return res.redirect('/login');
        }
    }
}