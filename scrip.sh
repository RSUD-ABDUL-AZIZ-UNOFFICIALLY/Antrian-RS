npx sequelize-cli model:generate --name Level_tb --attributes kode:string,level:string
npx sequelize-cli model:generate --name Admin_tb --attributes user:string,password:string,privilege:string
npx sequelize-cli model:generate --name Antrian_loket --attributes nomor_antri:string,loket:string
npx sequelize-cli model:generate --name Antrian_loket_prioritas --attributes nomor_antri:string,loket:string
npx sequelize-cli model:generate --name Display --attributes loket:string,nomor:string,status:string