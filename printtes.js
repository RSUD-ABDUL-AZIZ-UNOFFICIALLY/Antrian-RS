const escpos = require('escpos');
escpos.USB = require('escpos-usb');
    const devices = escpos.USB.findPrinter();
        console.log(devices)
        const options = { encoding: "GB18030" /* default */ }
        const device = new escpos.USB();
        const printer = new escpos.Printer(device, options);
