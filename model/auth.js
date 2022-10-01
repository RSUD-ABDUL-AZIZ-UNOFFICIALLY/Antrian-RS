const { con, conn } = require('../connection/mysql');

const login = async function (username, password) {

    var sql = `SELECT
	admin_tb.privilege, 
	admin_tb.user, 
	admin_tb.id, 
	level_tb.level
FROM
	level_tb
	INNER JOIN
	admin_tb
	ON 
		level_tb.kode = admin_tb.privilege
WHERE
	admin_tb.user = ? AND
	admin_tb.password = ?`
    const result = await con.query(sql, [username, password]);
    // console.log(result[0]);
    return result[0];
}
module.exports = {
    login
}