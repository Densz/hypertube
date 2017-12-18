const express = require('express');
const router = express.Router();
const Yify = require('../models/yify');
const Eztv = require('../models/eztv');
const User = require('../models/user');
const Video = require('../models/video');
import request from 'request';
const Torrent = require('../controllers/torrent');
const torrentOptions = require('../config/torrent');
const fs = require('fs');
const path = require('path');
const parseTorrent = require('parse-torrent');
const ffmpeg = require('fluent-ffmpeg');

function getHash(magnet) {
	let info = parseTorrent(magnet);
	return info.infoHash;
}

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

function initiateStream(stream, extension, res) {
	const converter = ffmpeg()
	.input(stream)
	.outputOption('-movflags frag_keyframe+empty_moov')
	.outputFormat('mp4')
	.output(res)
	.on('error', (err, stdout, stderr) => {	});
	converter.inputFormat(extension.substr(1))
	.audioCodec('aac')
	.videoCodec('libx264')
	.run();
	res.on('close', () => {
		converter.kill();
	});
}

function sendError(err, res) {
	console.error(err);
	res.status(204);
	res.send(err);
}

function getFilm(id, quality) {
	return new Promise((resolve, reject) => {
		Video.getFilm(id, quality, function(err, film) {
			if (film && film.hash)
				resolve (film.hash);
			else
				reject(new Error("Film has not yet been downloaded."));
		});
	});
}

function getEpisode(id, season, episode) {
	return new Promise((resolve, reject) => {
		Video.findOne({ imdb_id: id, season: season, episode: episode }, function (err, episode) {
			if (episode && episode.hash)
				resolve (episode.hash);
			else
				reject(new Error("Episode has not yet been downloaded."));				
		});
	});
}

function findFilm(id, quality) {
	return new Promise((resolve, reject) => {
		Yify.findOne({ imdb_id: id }, function (err, film) {
			if (film && film.torrents) {
				let torrents = filterTorrents(film.torrents, quality);
				torrents.sort(compareSeeds);
				if (torrents[0] && torrents[0].hash)
					resolve(torrents[0].hash);
				else
					reject(new Error("Unable to find a torrent for this film."));
			}
			reject(new Error("Unable to find specified film."));
		});
	});
}

function findEpisode(id, seasonNum, episodeNum) {
	return new Promise((resolve, reject) => {
		Eztv.findOne({ imdb_id: id }, function(err, series) {
			if (series) {
				if (series.episodes) {
					series.episodes.forEach(function(episode) {				
						if (episode.season === seasonNum && episode.episode === episodeNum) {
							console.log("Found!");
							if (episode["torrents"] && episode["torrents"]["0"])
								resolve(getHash(episode["torrents"]["0"]["url"]));
						}
					});
				}
			}
			reject(new Error("Unable to find specified episode."));
		});
	});
}

function getFileExtension(string) {
	let extension = string.match(/.*(\..+?)$/);
	console.log(extension[1]);
	return extension[1].toLowerCase();
}

function streamMkv(stream, res) {
	const converter = ffmpeg()
	.input(stream)
	.outputOption('-movflags frag_keyframe+empty_moov')
	.outputFormat('mp4')
	.output(res)
	.on('error', (err, stdout, stderr) => { });
	converter.addOption('-vcodec')
	.addOption('copy')
	.addOption('-acodec')
	.addOption('copy')
	.run();
	res.on('close', () => {
		console.log('converter killed');
		converter.kill();
	})
}

router.get('/film/:id/:quality?', async (req, res) => {
	let id = req.params.id,
		quality = req.params.quality || "",
		hash = false;

	console.log("IMDB ID: " + id + ", Quality: " + quality);
	if (id) {
		try {
			hash = await getFilm(id, quality);
			console.log("Film already downloaded, hash: " + hash);
		} catch(err) {
			try {
				hash = await findFilm(id, quality);
			} catch (err) {
				sendError(err, res);
				return;
			}
		} finally {
			if (hash) {
				try {
					let torrent = new Torrent(hash);
					try {
						let video = await torrent.getVideo();
						let extension = getFileExtension(video.file.name);
						let stream = video.file.createReadStream();
						console.log("Starting: " + video.file.name);
						torrent.onFinished(function() {
							Video.findOneAndUpdate({
									imdb_id: id,
									quality: quality
								}, {
									imdb_id: id,
									quality: quality,
									series: false,
									hash: hash,
									last_watched: Date.now()								
								}, { upsert: true },
								function (err) {
									if (!err) console.log("Film " + video.file.name + " saved successfully.");
							});
						});
						if (extension === '.mkv') {
							streamMkv(stream, res);
						} else {
							initiateStream(stream, extension, res);
						}
					} catch (err) {
						sendError(err, res);	
						return;
					}
				} catch (err) {
					sendError(err, res);
					return;
				}
			} else {
				sendError(new Error("Unable to find torrent for this film."), res);
				return;
			}				
		}
	} else {
		sendError(new Error("No film specified."), res);
		return;
	}
});

router.get('/series/:id/:season/:episode', async (req, res) => {
	let id = req.params.id,
		season = Number(req.params.season),
		episode = Number(req.params.episode),
		hash = false;

		console.log("ID: " + id + ", Season: " + season + " Episode: " + episode);

	if (id && !isNaN(season) && !isNaN(episode)) {
		try {
			hash = await getEpisode(id, season, episode);
		} catch(err) {
			try {
				hash = await findEpisode(id, season, episode);
			} catch(err) {
				console.log(err);
				sendError(err, res);
				return;
			}
		} finally {
			if (hash) {
				console.log(hash);
				try {
					let torrent = new Torrent(hash);
					try {
						let video = await torrent.getVideo();
						console.log("Downloading: " + video.file.name);
						let extension = getFileExtension(video.file.name);
						let stream = video.file.createReadStream();
						torrent.onFinished(function () {
							Video.findOneAndUpdate({
								imdb_id: id,
								season: season,
								episode: episode
							}, {
								imdb_id: id,
								season: season,
								episode: episode,
								series: true,
								hash: hash,
								last_watched: Date.now()
							}, { upsert: true },
							function (err) {
								if (!err) console.log("Episode " + video.file.name + " saved successfully.");
							});
						});
						if (extension === '.mkv') {
							streamMkv(stream, res);
						} else {
							initiateStream(stream, extension, res);
						}
					} catch (err) {
						sendError(err, res);
						return;
					}
				} catch (err) {
					sendError(err, res);
					return;					
				}
			} else {
				sendError(new Error("Unable to find torrent for this episode."), res);
				return;							
			}
		}
	} else {
		sendError(new Error("No episode specified."), res);
		return;		
	}
});

module.exports = router;