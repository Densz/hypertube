const Eztv = require('../../models/eztv');
const db = require('../../config/database');
const request = require('request');

const updateEztvDatabase = (json) => {
	json.map((x) => {
		let newShow = new Eztv();
		newShow.imdb_id = x.imdb_id;
		Eztv.findOne({imdb_id: x.imdb_id}, function(err, result){
			if (result === null) {
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
						console.log("error");
						return false;
					}
				})
			}
		})
	})
}

request('https://eztvapi.ml/shows', function(error, response, body) {
	let listOfPages = JSON.parse(body);
	listOfPages.map((x) => {
		let url = 'https://eztvapi.ml/' + x;
		// console.log(url);
		request(url, function (err, res, body) {
			try {
				let json = JSON.parse(body);
				updateEztvDatabase(json);
			} catch (e) {
				console.log("is not an object " + url);
			}
		})
	})
	console.log("Normalement c'est terminé");
})