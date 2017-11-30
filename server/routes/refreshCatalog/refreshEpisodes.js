const db = require('../../config/database');
const Eztv = require('../../models/eztv');
const request = require('request');

//https://eztvapi.ml/show/

Eztv.find({}, function(err, result) {
	result.forEach((x) => {
		request("https://eztvapi.ml/show/" + x.imdb_id, (error, response, body) => {
			try {
				if (response.statusCode === 200) {
					let json = JSON.parse(body);
					Eztv.update({imdb_id: x.imdb_id}, { $set: { episodes: json.episodes }}, (error, result) => {
						if (error) { console.log(error) }
						console.log("Tv show updated => " + x.imdb_id);
					});
				} else {
					console.log("Wrong Status Code");
				}
			} catch (e) {
				console.log(e);
			}
		})
	})
})

// request("https://eztvapi.ml/show/tt3952222", function(error, respons, body) {
// 	let json = JSON.parse(body);
// 	console.log(json.episodes);
// })