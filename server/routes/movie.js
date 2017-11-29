const express = require('express');
const router = express.Router();
const Yify = require('../models/yify');
const Eztv = require('../models/eztv');
import request from 'request';

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
				console.log(e);
			}
		})
	} else {
		Eztv.findOne({imdb_id: req.body.imdb}, async (err, result) => {
			try {
				let returnValue = await addTmdbInfo(result.toJSON(), req.body.imdb);
				res.json(returnValue);
			} catch(e) {
				console.log(e);
			}
		})
	}
})

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

module.exports = router;