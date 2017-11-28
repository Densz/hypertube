const db = require('../../config/database');
const Yify = require('../../models/yify');
const request = require('request');

//Rmonnier 
// Get movie Info / ID / Overview
// https://api.themoviedb.org/3/find/tt0071562?api_key=531e95f829b079916094fa5c7f0a60ce&external_source=imdb_id
// Get movie cast / director / 
// https://api.themoviedb.org/3/movie/{ID}/credits?api_key=531e95f829b079916094fa5c7f0a60ce
// https://api.themoviedb.org/3/movie/240/credits?api_key=531e95f829b079916094fa5c7f0a60ce

// get TvShow Info
// https://api.themoviedb.org/3/tv/1396?api_key=531e95f829b079916094fa5c7f0a60ce


// request("https://api.themoviedb.org/3/tv/1396/credits?api_key=531e95f829b079916094fa5c7f0a60ce", (error, response, body) => {
// 	console.log(body);
// 	let json = JSON.parse(body);
// 	console.log(json.crew.job);
// })

// http://www.theimdbapi.org/api/movie?movie_id=tt0071562
// let imdb_id_test = "tt0071562"

Yify.find({}, {imdb_id: 1}, (err, result) => {
	result.forEach(element => {
		try {
			request("https://api.themoviedb.org/3/find/" + element.imdb_id+ "?api_key=531e95f829b079916094fa5c7f0a60ce&external_source=imdb_id", (error, response, body) => {
					if (error) { console.log(error) }
					let json = JSON.parse(body);
					console.log(element.imdb_id);
					console.log(json.movie_results[0].original_title);
					// console.log(json.storyline);
					// console.log(json.cast);
					// console.log(json.director);
					// console.log(json.writers);
					// console.log(json.stars);
					// Yify.update({imdb_id: element.imdb_id}, {$set: {
					// 	storyline: json.storyline,
					// 	cast: json.cast,
					// 	director: json.director,
					// 	writers: json.writers,
					// 	stars: json.stars
					// }}, () => {
					// 	console.log("movie updated");
					// })
				}
			)
		} catch (e) {
			console.log("error occured");
		}
	});
})