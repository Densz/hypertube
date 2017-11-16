const express = require('express');
const router = express.Router();
const Transmission = require('../node_modules/transmission/lib/transmission');

var transmission = new Transmission();

transmission.host = '127.0.0.1';
transmission.port = 9091;
transmission.username = 'admin';
transmission.password = 'admin';
transmission.ssl = true;

console.log(transmission.status);

transmission.addUrl('magnet:?xt=urn:btih:7b900bc82725f316937ca69cc605372e99676ac3&dn=Homeland.S06E12.PROPER.HDTV.x264-SVA&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969', function(err, arg) {
    if (err)
        console.error(err);
    console.log(arg);
});

// transmission.get(function(err, arg){
//     console.log(arg);
// });