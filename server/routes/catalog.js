const express = require('express');
const router = express.Router();
import request from 'request';

/* GET users listing. */
router.post('/movies', (req, res, next) => {
	let url = 'https://yts.ag/api/v2/list_movies.json?limit=16&page=' + req.body.pages + '&sort_by=' + req.body.sortBy + '&query_term=' + req.body.searchField + '&genre=' + req.body.genre;
	console.log(url);
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

module.exports = router;