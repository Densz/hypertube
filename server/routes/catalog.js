const express = require('express');
const router = express.Router();
import request from 'request';
const config = require('../config/config');
const db = require('../config/database');
const Eztv = require('../models/eztv');
const moviedb = require('moviedb')('531e95f829b079916094fa5c7f0a60ce');

/* GET users listing. */
router.post('/movies', (req, res) => {
	let url = 'https://yts.ag/api/v2/list_movies.json?limit=16&page=' + req.body.pages + '&sort_by=' + req.body.sortBy + '&query_term=' + req.body.searchField + '&genre=' + req.body.genre;
	// console.log(url);
	request(url, function(error, response, body){
			if (error)
				res.json({error: error})
			let infos = JSON.parse(body);
			if (infos.data.movies) {
				let nMoviesBeforeFilter = infos.data.movies ? infos.data.movies.length : undefined;
				infos.data.movies = infos.data.movies.filter((movie) => {
					return movie.year >= req.body.yearInterval[0] && movie.year <= req.body.yearInterval[1];
				})
				infos.data.movies = infos.data.movies.filter((movie) => {
					return movie.rating >= req.body.ratingInterval[0] && movie.rating <= req.body.ratingInterval[1];
				})
				if (nMoviesBeforeFilter && nMoviesBeforeFilter !== 0 && infos.data.movies.length === 0) 
					infos.data.moviesIncoming = true;
			}
			res.json(infos);
	})
});

router.post('/tvshows', (req, res) => {
	Eztv.find({}, [], {
		skip: (req.body.pages - 1) * 16,
		limit: 16,
		sort: { imdb_rating: -1 }
	}, (err, result) => {
		if (err) { console.log(err) }
		res.json(result);
	})
})

const updateEztvDatabase = (json) => {
	json.map((x) => {
		let newShow = new Eztv();
		newShow.imdb_id = x.imdb_id;
		newShow.title = x.title;
		newShow.year = x.year;
		newShow.last_updated = x.last_updated;
		request('http://www.theimdbapi.org/api/movie?movie_id=' + x.imdb_id, function(error, response, body) {
			if (error) console.log(error);
			try {
				let json = JSON.parse(body);
				newShow.imdb_rating = json.rating;
				newShow.cover_url = json.poster.thumb;
				newShow.genre = json.genre;
				newShow.save((err) => {
					if (err) {
						console.log("Error when saving show");
					}
					console.log("tv show saved");
				})
			} catch(e) {
				console.log('Une erreur est survenue');
				return false;
			}
		})
	})
}

router.post('/refreshTvShowsCatalog', (req, res) => {
	request('https://eztvapi.ml/shows', function(error, response, body) {
		let listOfPages = JSON.parse(body);
		listOfPages.map((x) => {
			request('https://eztvapi.ml/' + x, function (err, res, body) {
				try {
					let json = JSON.parse(body);
					updateEztvDatabase(json);
				} catch (e) {
					console.log("is not an object");
				}
			})
		})
	})
})


module.exports = router;