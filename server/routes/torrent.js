const express = require('express');
const router = express.Router();
import request from 'request';
const rp = require('request-promise-native');
import { createReadStream } from 'fs';
const ts = require('torrent-stream');
const options = require('../config/torrent');


router.post('/', (req, res, next) => {
    console.log(req.body.id);
	request('https://yts.ag/api/v2/movie_details.json?movie_id=' + req.body.id + '&with_images=true&with_cast=true', function(error, response, body){
		let infos = JSON.parse(body);
		res.json(infos);
	});
});

function compareSize(a, b) {
	if (a.length > b.length)
		return (-1);
	else if (a.length < b.length)
		return (1);
	return (0);
};

function compareSeeds(a, b) {
	if (a.seeds > b.seeds)
		return (-1);
	else if (a.seeds < b.seeds)
		return (1);
	return (0);
};

router.get('/:id', async (req, res, next) => {
	let hash = '',
		torrents = [];
	
	let response = await rp('https://yts.ag/api/v2/movie_details.json?movie_id=' + req.params.id);
	let data = JSON.parse(response);

	torrents = data.data.movie.torrents;

	if (torrents.length < 1)
		next();
	torrents.sort(compareSeeds);
	hash = torrents[0].hash;
	console.log(hash);

	let torrent = ts(hash, options);
	torrent.on('ready', function () {
		let files = torrent.files;

		if (files.length < 1) {next();}
		files.sort(compareSize);

		const header = {
			'Content-Length': files[0].length,
			'Content-Type': 'video/mp4'
		};
		res.writeHead(200, header);
		console.log(files[0].name);
		let stream = (files[0]).createReadStream();
		stream.pipe(res);
	});
});

module.exports = router;