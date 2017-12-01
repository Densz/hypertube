const express = require('express');
const router = express.Router();
const Yify = require('../models/yify');
const Eztv = require('../models/eztv');
const User = require('../models/user');
import request from 'request';
const Torrent = require('../controllers/torrent')

function filterTorrents(torrents, quality) {
	let correct = [];
	torrents.forEach(function(torrent) {
		if (quality === torrent.quality)
			correct.push(torrent);
	});
	if (correct.length > 0)
		return correct;
	else
		return torrents;
}

function compareSeeds(a, b) {
	if (a.seeds > b.seeds)
		return (-1);
	else if (a.seeds < b.seeds)
		return (1);
	return (0);
}

function markDownloaded(id) {
	console.log("Torrent " + id + " successfully downloaded.");
}

router.get('/film/:id/:quality', async (req, res) => {
	let id = req.params.id,
		quality = req.params.quality || "",
		torrents = [],
		torrent,
		file,
		stream;

	console.log("IMDB ID: " + id + ", Quality: " + quality);
	
	if (id) {
		Yify.findOne({ imdb_id: id }, async function(err, doc) {
			if (err) {
				res.status(204);
				res.send('Unable to find selected film.');
			}
			else {
				torrents = filterTorrents(doc.torrents, quality);
				console.log(torrents);
				torrents.sort(compareSeeds);
				console.log(torrents);				
				if (torrents[0].hash) {
					torrent = new Torrent(torrents[0].hash);
					torrent.onFinished(markDownloaded);
					try {
						file = await torrent.get();
						console.log(file.name);
						console.log(file);
						const header = {
							'Content-Length': file.length,
							'Content-Type': 'video/mp4'
						};
						stream = file.createReadStream();
						res.writeHead(200, header);
						stream.pipe(res);
					} catch (err) {
						console.log(err);
						res.status(204);
						res.send(err);
					}
				} else {
					res.status(204);
					res.send('Unable to find selected film.');
				}
			}
		});
	} else {
		res.status(400);
		res.send('Film not specified');
	}
});

// router.get('/series/:id/:season/:episode', (req, res) => {

// });

module.exports = router;