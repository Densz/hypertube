const express = require('express');
const router = express.Router();
import request from 'request';
const ts = require('torrent-stream');
const options = require('../config/torrent');

router.post('/', (req, res, next) => {
    console.log(req.body.id);
	request('https://yts.ag/api/v2/movie_details.json?movie_id=' + req.body.id + '&with_images=true&with_cast=true', function(error, response, body){
		let infos = JSON.parse(body);
		res.json(infos);
	})
});

function compareSize(a, b) {
	if (a.length < b.length)
		return (-1);
	else if (a.length > b.length)
		return (1);
	return (0);
};

router.get('/:hash', (req, res, next) => {
	let hash = req.params.hash;

	let torrent = ts(hash, options);
	torrent.on('ready', function () {
		let files = torrent.files;

		if (files.length < 1) {next();}
		files.sort(compareSize);

		let stream = (files[0]).createReadStream();
		
		const header = {
			'Content-Length': files[0].length,
			'Content-Type': 'video/mp4',
		}
		res.writeHead(200, header);
		stream.pipe(res);
	});
});

module.exports = router;