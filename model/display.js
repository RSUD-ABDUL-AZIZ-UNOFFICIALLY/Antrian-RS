const { con, conn } = require('../connection/mysql');

const getDisplay = async function () {

	var sql = `SELECT
	display.*
FROM
	display`
	const result = await con.query(sql);
	// return array of objects
	return result;
}
const updateDisplay = async function (loket, nomor_antri, status) {
	var sql = `UPDATE display SET nomor = ? , status = ? WHERE loket = ?`
	const result = await con.query(sql, [nomor_antri, status, loket]);
	return result;
}
module.exports = {
	getDisplay,
	updateDisplay
}