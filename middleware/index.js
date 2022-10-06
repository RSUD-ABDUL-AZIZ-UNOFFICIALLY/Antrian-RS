const { login } = require('../model/auth');
const jwt = require('jsonwebtoken');

module.exports = {
    masuk: async (req, res) => {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await login(username, password);
        console.log(user);
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
            res.cookie('token', token, { expires: new Date(Date.now() + (1000 * 3600 * 24)) });
            if (user.privilege <= 5) {
                res.redirect('/admin');
            } else if (user.privilege == 6) {
                res.redirect('/cetak');
            }
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
            // res.status(400).send('Invalid Token');
        }
    }
}