const Yify = require('../../models/yify');
const db = require('../../config/database');
const request = require('request');

request('https://yts.ag/api/v2/list_movies.json', (error, response, body) => {
	let result = JSON.parse(body).data.movie_count;
	let nPages = result / 50;
	let i = 1;
	while (i <= nPages) {
		try {
			request("https://yts.ag/api/v2/list_movies.json?sort_by=rating&limit=50&page=" + i, (error, response, body) => {
				let json = JSON.parse(body);
				json.data.movies.forEach(element => {
					Yify.findOne({imdb_id: element.imdb_code}, (err, result) => {
						if (result === null) {
							let newMovie = new Yify();
							newMovie.imdb_id = element.imdb_code;
							newMovie.title = element.title;
							newMovie.year = element.year;
							newMovie.imdb_rating = element.rating;
							newMovie.cover_url = element.medium_cover_image;
							newMovie.last_updated = element.date_uploaded;
							newMovie.genre = element.genres;
							newMovie.torrents = element.torrents;
							newMovie.save((err) => {
								if (err) {
									console.log(err);
								} else {
									console.log("Movie " + newMovie.title + " saved !");
								}
							})
						} else {
							console.log("Already got => " + element.title + " in the database");
						}
					})
					
				});
			})
		} catch (err) {
			console.log(err);
		}
		i++;
	}
})