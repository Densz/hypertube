const express = require('express');
const router = express.Router();
// const Transmission = require('../node_modules/transmission/lib/transmission');
const request = require('request');

// var transmission = new Transmission();

// transmission.host = '127.0.0.1';
// transmission.port = 9091;
// transmission.username = 'admin';
// transmission.password = 'admin';

// console.log(transmission.status);

// var magnetUrl = 'magnet:?xt=urn:btih:7b900bc82725f316937ca69cc605372e99676ac3&dn=Homeland.S06E12.PROPER.HDTV.x264-SVA&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
// transmission.addUrl(magnetUrl, function(err, arg) {
//     if (err)
//         console.error(err);
//     console.log(arg);
// });

// transmission.add

// transmission.active(function(err, arg){
//     let torrents = arg.torrents;
//     // console.log(torrents);
//     torrents.forEach(function(torrent) {
//         console.log(torrent.wanted);
//     });
// });


var login = {
    username: 'admin',
    password: 'adminadmin'
}

var host = 'http://127.0.0.1:30010/'

request.post(host + 'login', { jar: true, form: login }, function (err) {
    if (err) console.log('Login error' + err);
    request.get(host + 'query/getPieceStates/7b900bc82725f316937ca69cc605372e99676ac3', { jar: true }, function (err, res, body) {
        console.log(body);
    });
});
/* 
request.post(host + 'login', {jar: true, form: login}, function(err, res, body) {
    if (err)
        console.error(err);

    var torrentOptions = {
        'sequentialDownload': 'true',
        'paused': 'true',
        'urls': 'magnet:?xt=urn:btih:7b900bc82725f316937ca69cc605372e99676ac3&dn=Homeland.S06E12.PROPER.HDTV.x264-SVA&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'
    };

    request.get('http://127.0.0.1:30010/version/api', { jar: true }, function (err, res, body) {
        console.log(body);
    });

    request.post(host + 'command/download', { jar: true, header: {'Content-Type': 'multipart/form-data' }, form: torrentOptions }, function (err, res, body) {
        if (err) console.log(err);
        else {
            request.get(host + 'query/torrents', {jar: true}, function(err, res, body) {
                if (err) console.log(err);    
                    console.log(body);
                request.post(host + 'command/toggleSequentialDownload', { jar: true, form: { hashes: '7b900bc82725f316937ca69cc605372e99676ac3' } }, function (err, res, body) {
                    if (err) console.log('Error toggling sequential download: '+ err);
                    console.log(body);
                    request.post(host + 'command/resume', { jar: true, form: { hash: '7b900bc82725f316937ca69cc605372e99676ac3' } }, function (err, res, body) {
                        if (err) console.log('Error resuming download: ' + err);                        
                        console.log(body);
                        request.get(host + 'query/getPieceStates/7b900bc82725f316937ca69cc605372e99676ac3', {jar: true}, function(err, res, body) {
                            console.log(body);
                        });
                       /*  request.get(host + 'query/getPieceHashes/7b900bc82725f316937ca69cc605372e99676ac3', { jar: true }, function (err, res, body) {
                            console.log(body);
                        });
                    });
                });
            });            
        }
    });
}); 
*/
