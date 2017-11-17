const express = require('express');
const router = express.Router();
const request = require('request');

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

request.post(host + 'login', {jar: true, form: login}, function(err, res, body) {
    if (err)
        console.error(err);

    var torrentOptions = {
        'sequentialDownload': 'true',
        'paused': 'true',
        'urls': '62AA7295177FB56FE95311E45C588821DF670F64'
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
                request.post(host + 'command/toggleSequentialDownload', { jar: true, form: { hashes: '62AA7295177FB56FE95311E45C588821DF670F64' } }, function (err, res, body) {
                    if (err) console.log('Error toggling sequential download: '+ err);
                    console.log(body);
                    request.post(host + 'command/resume', { jar: true, form: { hash: '62AA7295177FB56FE95311E45C588821DF670F64' } }, function (err, res, body) {
                        if (err) console.log('Error resuming download: ' + err);                        
                        console.log(body);
                        request.get(host + 'query/getPieceStates/62AA7295177FB56FE95311E45C588821DF670F64', {jar: true}, function(err, res, body) {
                            console.log(body);
                        });
                        request.get(host + 'query/getPieceHashes/62AA7295177FB56FE95311E45C588821DF670F64', { jar: true }, function (err, res, body) {
                            console.log(body);
                        });
                    });
                });
            });            
        }
    });
}); 

