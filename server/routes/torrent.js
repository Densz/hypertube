const express = require('express');
const router = express.Router();
import request from 'request';
const rp = require('request-promise-native');
import { createReadStream } from 'fs';
const torrentOptions = require('../config/torrent');

async function getInfo(id) {
	let response = {};
	try {
		response = await rp('https://yts.ag/api/v2/movie_details.json?movie_id=' + id + '&with_images=true&with_cast=true');
	} catch (e) {
		console.error('Error retrieving API data from YTS: ' + e);
	}
	return (JSON.parse(response));
}

router.post('/', async (req, res, next) => {
	info = await getInfo(req.body.id);
	res.json(info);
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
		torrents = [],
		data = {};
	// get data from the yify API, put torrent info in array called torrents
	data = await getInfo(req.params.id);

	console.log(data.data.movie.torrents);
	torrents = data.data.movie.torrents;

	if (torrents.length < 1)
		next();
	// sort torrents by number of seeds, in descending order, then get hash of torrent with most seeds
	torrents.sort(compareSeeds);
	hash = torrents[0].hash;
	console.log(hash);

	// register torrent with torrent-stream
	let torrent = ts(hash, options);

	// when torrent is ready to stream
	torrent.on('ready', function () {
		let files = torrent.files;

		if (files.length < 1) {next();}
		// sort files by size in descending order, assuming largest file is the video
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