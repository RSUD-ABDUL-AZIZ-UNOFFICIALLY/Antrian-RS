const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: 'printer:80 Printer',                    // Printer interface
  characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
  removeSpecialCharacters: false,                           // Removes special characters - default: false
  lineCharacter: "=",                                       // Set character for lines - default: "-"
  options:{                                                 // Additional options
    timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
  }
});

printer.print("Hello World");                               // Append text
printer.println("Hello World");                             // Append text with new line
printer.openCashDrawer();                                   // Kick the cash drawer
printer.cut();                                              // Cuts the paper (if printer only supports one mode use this)
printer.partialCut();                                       // Cuts the paper leaving a small bridge in middle (if printer supports multiple cut modes)
// printer.beep();                                             // Sound internal beeper/buzzer (if available)
printer.upsideDown(true);                                   // Content is printed upside down (rotated 180 degrees)
printer.setCharacterSet("SLOVENIA");