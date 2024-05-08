const { con, conn } = require('../connection/mysql');

let date = new Date()
let date_now = "%" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2) + "%";
console.log(date_now);
const getlastAntrian = async function () {
    let date = new Date()
    let date_now = "%" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2) + "%";

    let sql = `SELECT antrian_loket_prioritas.nomor_antri, antrian_loket_prioritas.created_at, antrian_loket_prioritas.uid FROM antrian_loket_prioritas WHERE antrian_loket_prioritas.created_at LIKE ? ORDER BY  antrian_loket_prioritas.nomor_antri DESC LIMIT 1`
    const result = await con.query(sql, [date_now]);
    return result[0];
}
const getSisaAntrian = async function () {
    let date = new Date()
    let date_now = "%" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2) + "%";


    let sql = `SELECT COUNT('sisa') AS sisa FROM  antrian_loket_prioritas  WHERE  antrian_loket_prioritas.created_at LIKE ? AND  antrian_loket_prioritas.updated_at IS NULL`
    const result = await con.query(sql, [date_now]);
    console.log(date_now);
    console.log(result);
    return result[0];
}
const getAntrian = async function () {
    let date = new Date()
    let date_now = "%" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2) + "%";

    let sql = `SELECT
	antrian_loket_prioritas.uid, 	
	MAX(antrian_loket_prioritas.nomor_antri) AS nomor_antri, 
	antrian_loket_prioritas.loket, 
	antrian_loket_prioritas.created_at, 
	antrian_loket_prioritas.updated_at
FROM
	antrian_loket_prioritas
WHERE
	antrian_loket_prioritas.created_at LIKE ? AND
	antrian_loket_prioritas.updated_at IS NOT NULL
GROUP BY
	antrian_loket_prioritas.loket
ORDER BY
	antrian_loket_prioritas.loket ASC`
    const result = await con.query(sql, [date_now]);

    return result;
}

const postAntrian = async function (nomor_antri) {
    let date = new Date();

    let sql = `INSERT INTO antrian_loket_prioritas (nomor_antri, created_at) VALUES (?, ?)`
    const result = await con.query(sql, [nomor_antri, date]);

    return result[0];
}
const updateAntrian = async function (loket, uid) {
    let date = new Date();

    let sql = `UPDATE antrian_loket_prioritas SET updated_at = ?, loket = ? WHERE uid = ?`
    const result = await con.query(sql, [date, loket, uid]);

    return result[0];
}
const getNextId = async function () {
    let date = new Date()
    let date_now = "%" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2) + "%";

    let sql = `SELECT
    antrian_loket_prioritas.*
FROM
	antrian_loket_prioritas
WHERE
	antrian_loket_prioritas.created_at LIKE ? AND
	antrian_loket_prioritas.loket IS NOT NULL
ORDER BY
	antrian_loket_prioritas.nomor_antri DESC
LIMIT 1`
    const result = await con.query(sql, [date_now]);
    return result[0];
}
const antrianPertama = async function () {
    let date = new Date()
    let date_now = "%" + date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2) + "%";

    let sql = `SELECT
    antrian_loket_prioritas.*
FROM
    antrian_loket_prioritas
WHERE
    antrian_loket_prioritas.created_at LIKE ? AND
    antrian_loket_prioritas.nomor_antri = 1
ORDER BY
    antrian_loket_prioritas.nomor_antri ASC
LIMIT 1`
    const result = await con.query(sql, [date_now]);
    return result[0];
}
const replayAntrian = async function (loket) {
    let sql =
        `
    SELECT
	antrian_loket_prioritas.nomor_antri,
	antrian_loket_prioritas.created_at,
	antrian_loket_prioritas.uid 
FROM
	antrian_loket_prioritas 
WHERE
	antrian_loket_prioritas.updated_at LIKE ? 
	AND antrian_loket_prioritas.loket = ?
ORDER BY
	antrian_loket_prioritas.nomor_antri DESC 
	LIMIT 1
    `
    const result = await con.query(sql, [date_now, loket]);
    return result[0];
}


module.exports = {
    getlastAntrian,
    getSisaAntrian,
    getAntrian,
    postAntrian,
    updateAntrian,
    getNextId,
    antrianPertama,
    replayAntrian
}