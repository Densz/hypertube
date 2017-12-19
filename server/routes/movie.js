const express = require('express');
const router = express.Router();
const Yify = require('../models/yify');
const Eztv = require('../models/eztv');
const User = require('../models/user');
import request from 'request';

router.get('/', (req, res) => {
	const videoSeenTmp = req.user.videoSeen;
	if (videoSeenTmp.indexOf(req.query.idMovie) === -1) {
		videoSeenTmp.push(req.query.idMovie);
		User.update({email: req.user.email}, {videoSeen: videoSeenTmp}, (err) => {
			if (err) res.json({ success: false, msg: 'Database error ' + err });
			else res.json({ success: true, msg: 'This movie is now seen !', userInfo: req.user })
		});
	} else {
		res.json({ success: true, msg: 'Movie already seen', userInfo: req.user });
	}
});

router.post('/getPeople', (req, res) => {
	let url = "https://api.themoviedb.org/3/" + req.body.categorie + "/" + req.body.id + "/credits?api_key=531e95f829b079916094fa5c7f0a60ce";
	request(url, (error, response, body) => {
		let json = JSON.parse(body);
		if (json.status_code === 34) {
			res.json({result: null});
		} else {
			res.json(json);
		}
	})
})

router.post('/getDataFromDatabase', (req, res) => {
	if (req.body.categorie === "movies") {
		Yify.findOne({imdb_id: req.body.imdb}, async (err, result) => {
			try {
				let returnValue = await addTmdbInfo(result.toJSON(), req.body.imdb);
				res.json(returnValue);
			} catch(e) {
				//console.log(e);
			}
		})
	} else {
		Eztv.findOne({imdb_id: req.body.imdb}, async (err, result) => {
			try {
				let returnValue = await addTmdbInfo(result.toJSON(), req.body.imdb);
				res.json(returnValue);
			} catch(e) {
				//console.log(e);
			}
		})
	}
});

const addTmdbInfo = (resultats, imdb) => {
	return new Promise((res, rej) => {
		request("https://api.themoviedb.org/3/find/" + imdb + "?api_key=531e95f829b079916094fa5c7f0a60ce&external_source=imdb_id", (err, response, body, result) => {
			let json = JSON.parse(body);
			let concat = resultats;
			if (json.movie_results.length) {
				concat.overview = json.movie_results[0].overview;
				concat.categorieTmdb = "movie";
				concat.tmdbId = json.movie_results[0].id;
				concat.backdrop_path = json.movie_results[0].backdrop_path;
				res(concat);
			} else {
				concat.overview = json.tv_results[0].overview;
				concat.categorieTmdb = "tv";
				concat.tmdbId = json.tv_results[0].id;
				concat.backdrop_path = json.tv_results[0].backdrop_path;
				res(concat);
			}
		})
	})
}

const getAvailableSeasons = episodes => {
	let seasonAvailable = [];
	
	episodes.forEach(element => {
		if (seasonAvailable.indexOf(element.season) === -1) {
			seasonAvailable.push(element.season);
		}
	});
	return seasonAvailable.sort();
}

const formatJsonForFront = (seasons, episodes) => {
	let json = {};
	seasons.forEach(element => {
		json[element] = []
	})
	episodes.forEach(element => {
		json[element.season].push(element);
	})
	return json;
}

router.post('/getEpisodes', (req, res) => {
	Eztv.findOne({imdb_id: req.body.imdb_id}, (error, result) => {
		if (error) { console.log(e) }
		if (result === null) {
			console.log("No result in Eztv Database fetching episodes");
			res.json({ result: null })
		} else {
			let formattedJsonseasons = getAvailableSeasons(result.episodes);
			let formattedJson = formatJsonForFront(formattedJsonseasons, result.episodes);
			res.json(formattedJson);
		}
	})
});

const getInfoYify = (cover) => {
	return new Promise((res, rej) => {
		let ret = {};
		Yify.findOne({cover_url: cover}, {imdb_id: 1}, (err, result) => {
			if (err) rej({success: false, error: err});
			else if (result) {
				ret.imdb_id = result.imdb_id;
				ret.categorie = 'movies';
				ret.cover_url = cover;
				res({ success: true, ret: ret });
			}
			else {
				res({ success: false, error: 'This cover is\'nt in the db' });
			}
		});
	})
}

const getInfoEztv = (cover) => {
	return new Promise((res, rej) => {
		let ret = {};
		Eztv.findOne({ cover_url: cover }, { imdb_id: 1 }, (err, result) => {
			if (err) rej({ success: false, error: err });
			else if (result) {
				ret.imdb_id = result.imdb_id;
				ret.categorie = 'tv_shows';
				ret.cover_url = cover;
				res({ success: true, ret: ret });
			}
			else {
				res({ success: false, error: 'This cover is\'nt in the db' });
			}
		});
	})
}

const foreachArray = (coverArray, ret) => {
	return new Promise((res, rej) => {
		coverArray.forEach((elem, index) => {
			if (elem.indexOf('yts') !== -1) {
				getInfoYify(elem)
				.then((response) => {
					if (!response.success) rej({ success: false, msg: 'Database fail ' + response.error });
					else {
						ret.push(response.ret);
						if (coverArray.length - 1 === index)
							res({ success: true, data: ret });
					}
				});
			} else {
				getInfoEztv(elem)
				.then((response) => {
					if (!response.success) rej({ success: false, msg: 'Database fail ' + response.error });
					else {
						ret.push(response.ret);
						if (coverArray.length - 1 === index)
							res({ success: true, data: ret });
					}
				})
			}
		});
	})
}

router.post('/getInfoMovie', async (req, res) => {
	const coverArray = req.body.coverArray;
	let ret = [];
	ret = await foreachArray(coverArray, ret);
	if (ret.success) {
		res.json({ success: true, data: ret });
	} else {
		res.json({ success: false, msg: ret.msg });
	}
});

module.exports = router;