const { con, conn } = require('./connection/mysql');
const differenceInSeconds = require('date-fns/differenceInSeconds')
var differenceInMinutes = require('date-fns/differenceInMinutes')
const fs = require('fs')
async function antrian_loket(date, loket) {
    var sql = `
    SELECT * 
    FROM antrian_loket 
    WHERE antrian_loket.created_at LIKE ?
    and antrian_loket.loket = ?
ORDER BY
    antrian_loket.created_at ASC`
    const result = await con.query(sql, [`%${date}%`, loket]);
    // console.log(result);
    // close connection
    // con.end();
    return result;
}
async function hitung(date, loket) {
    let data = await antrian_loket(date, loket);
    // console.log(data);
    console.log(data.length);
    let hasil = {
        "date": date,
        "loket": loket,
        "time": []
    }
    for (let i = 0; i < data.length; i++) {
        try {
            let x = data[i].updated_at;
            let y = data[i + 1].updated_at;
            // console.log(data[i].updated_at, data[i + 1].updated_at);
            let resultD = differenceInSeconds(y, x)
            let menit = parseInt(resultD / 60);
            let detik = resultD % 60;
            let time = {
                "total waktu tunggu": resultD,
                "waktu tunggu": {
                    menit: menit,
                    detik: detik
                }
            }
            hasil.time.push(time)
        } catch (error) {

        }


        // console.log(hasil)
    }
    // console.log(hasil)
    return hasil;
}

async function simpan(month) {
    let data = [];
    try {
        for (let y = 1; y <= 4; y++) {
            for (let i = 0; i <= 30; i++) {
                console.log(i)
                let x = await hitung(`2023-${month}-${i + 1}`, y)
                console.log(x)
                data.push(x)
            }

        }
        let contenData = JSON.stringify(data)
        await fs.writeFileSync("resume.json", contenData, 'utf-8')
    } catch (error) {
        console.log(error);

    }


}
simpan('07')
