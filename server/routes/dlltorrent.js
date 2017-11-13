const express = require('express');
const router = express.Router();
import request from 'request';
import Transmission from 'transmission';
import Client from 'node-torrent';

router.post('/', (req, res, next) => {
    console.log(req.body.url);
    console.log('testooo');
    // var transmission = new Transmission({
    //         port : 3000,
    //         host : localhost
    //     });

    // transmission.addUrl(req.body.url, {
    //     "download-dir" : "."
    // }, function(err, result) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     var id = result.id;
    //     console.log('Just added a new torrent.');
    //     console.log('Torrent ID: ' + id);
    //     getTorrent(id);
    // });
    // request(req.body.url).pipe(fs.createWriteStream('test.torrent'));
    var client = new Client({logLevel: 'DEBUG'});
    var torrent = client.addTorrent(req.body.url);
 
    // when the torrent completes, move it's files to another area 
    torrent.on('complete', function() {
    console.log('complete!');
    torrent.files.forEach(function(file) {
        var newPath = '.';
        fs.rename(file.path, newPath);
        // while still seeding need to make sure file.path points to the right place 
        file.path = newPath;
    });
});
});

module.exports = router;