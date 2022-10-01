const { Console } = require("escpos");

module.exports = {
    adminLoket: (req, res) => {
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        const data = {
            title: "ADMIN",
            pesan: "Selamat Datang Admin",
            user: verified.username
        }
        console.log(data);
        res.render('admin', data)
        res.status(200).json({
            status: true,
            message: 'welcome to testing app!'
        });
    }
};