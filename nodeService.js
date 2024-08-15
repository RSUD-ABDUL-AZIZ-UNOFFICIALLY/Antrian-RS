var Service = require('node-windows').Service;
require('dotenv').config();
// Create a new service object
var svc = new Service({
    name: 'Antrian',
    description: 'Antrian RSUD web server.',
    script: process.env.PATH_NODE_SERVICE,
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=1024'
    ]
    //, workingDirectory: '...'
    //, allowServiceLogon: true
});
console.log(process.env.PATH_NODE_SERVICE);
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
});

svc.install();