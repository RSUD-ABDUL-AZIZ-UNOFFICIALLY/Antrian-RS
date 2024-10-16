# ANTRIAN LOKET

Aplikasi Antrian Loket untuk mempermudah proses antrian di loket.

## Features

- Hot reload
- Auto print Struk
- Support multiple printer

## Environment Variables

Untuk menjalankan proyek ini, Anda perlu menambahkan variabel lingkungan berikut ke .env file

`PORT`
`DB_HOST`
`DB_USER`
`DB_PASS`
`DB_NAME`
`DB_PORT`

## Authors

- [Fakhry Hizballah](https://github.com/fakhryhizballah/)
- [@hizballah_al](https://www.instagram.com/hizballah_al/)


## NB
- go to node_modules/escpos-usb/index.js
- comment down the following lines
```
  // usb.on('detach', function(device){
  //   if(device == self.device) {
  //     self.emit('detach'    , device);
  //     self.emit('disconnect', device);
  //     self.device = null;
  //   }
  // });
```
