// var mysql = require('mysql');
const mariadb = require('mariadb');
require('dotenv').config();
// const con = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("My SQL Connected!");
// });
const con = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    bigIntAsNumber: true,
    decimalAsNumber: true,
    bigIntAsNumber: true
});

const conn = async function () {
    return await pool.getConnection();
}
//     .then(conn => {
//         console.log("MariaDB Connected!");
//         // conn.end(); //release to pool
//     })
//     .catch(err => {
//         console.log("not connected due to error: " + err);
//     });

module.exports = {
    con,
    conn
}