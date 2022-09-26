const { con, conn } = require('../connection/mysql');
let date = new Date();
let date_now = "%" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getDate() + "%";
const getlastAntrian = async function () {

    var sql = `SELECT antrian_loket .nomor_antri, antrian_loket .created_at, antrian_loket .uid FROM antrian_loket WHERE antrian_loket .created_at LIKE ? ORDER BY  antrian_loket .nomor_antri DESC LIMIT 1`
    const result = await con.query(sql, [date_now]);
    // console.log(result[0]);
    return result[0];
}
const getSisaAntrian = async function () {

    var sql = `SELECT COUNT('sisa') AS sisa FROM  antrian_loket  WHERE  antrian_loket .created_at LIKE ? AND  antrian_loket .updated_at IS NULL`
    const result = await con.query(sql, [date_now]);
    // console.log(result);
    return result[0];
}
const getAntrian = async function () {

    var sql = `SELECT
	antrian_loket.*
    FROM
	antrian_loket
    WHERE
	antrian_loket.created_at LIKE ? AND
	antrian_loket.loket IS NOT NULL AND
	antrian_loket.nomor_antri IN ((SELECT MAX(antrian_loket.nomor_antri) FROM antrian_loket GROUP BY antrian_loket.loket))
    ORDER BY
	antrian_loket.loket ASC`
    const result = await con.query(sql, [date_now]);
    // console.log(result);
    return result;
}
const postAntrian = async function (nomor_antri) {

    var sql = `INSERT INTO antrian_loket (nomor_antri, created_at) VALUES (?, ?)`
    const result = await con.query(sql, [nomor_antri, date]);
    // console.log(result);
    return result[0];
}
const updateAntrian = async function (loket, uid) {

    var sql = `UPDATE antrian_loket SET updated_at = ?, loket = ? WHERE uid = ?`
    const result = await con.query(sql, [date, loket, uid]);
    // console.log(result);
    return result[0];
}
const getNextId = async function () {

    var sql = `SELECT
    antrian_loket.*
FROM
	antrian_loket
WHERE
	antrian_loket.created_at LIKE ? AND
	antrian_loket.loket IS NOT NULL
ORDER BY
	antrian_loket.nomor_antri DESC
LIMIT 1`
    const result = await con.query(sql, [date_now]);
    // console.log(result);
    return result[0];
}
const antrianPertama = async function () {

    var sql = `SELECT
    antrian_loket.*
FROM
    antrian_loket
WHERE
    antrian_loket.created_at LIKE ? AND
    antrian_loket.nomor_antri = 1
ORDER BY
    antrian_loket.nomor_antri ASC
LIMIT 1`
    const result = await con.query(sql, [date_now]);
    // console.log(result);
    return result[0];
}

module.exports = {
    getlastAntrian,
    getSisaAntrian,
    getAntrian,
    postAntrian,
    updateAntrian,
    getNextId,
    antrianPertama
}