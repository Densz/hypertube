const express = require('express');
const router = express.Router();
const Yify = require('../models/yify');
const Eztv = require('../models/eztv');
import request from 'request';

router.post('/description/:imdb', (req, res) => {
	// when you spam the api IMDB
	// {"status_code":25,"status_message":"Your request count (42) is over the allowed limit of 40."}
	console.log(req.query.imdb);
	res.json({status: ok});
})

router.post('/getDataFromDatabase', (req, res) => {
	Yify.findOne({imdb_id: req.body.imdb}, async (err, result) => {
		try {
			let returnValue = await addTmdbInfo(result.toJSON(), req.body.imdb);
			console.log(returnValue);
			res.json(returnValue);
		} catch(e) {
			console.log(e);
		}
	})
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
				res(concat);
			} else {
				concat.overview = json.tv_results[0].overview;
				concat.categorieTmdb = "tv";
				concat.tmdbId = json.tv_results[0].id;
				res(concat);
			}
		})
	})
}

module.exports = router;