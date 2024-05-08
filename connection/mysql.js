require('dotenv').config();


const mariadb = require('mariadb');
const con = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    bigIntAsNumber: true,
    decimalAsNumber: true,
});

const conn = async function () {
    return await pool.getConnection();
}

module.exports = {
    con,
    conn
}