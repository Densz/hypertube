const mongoose = require('mongoose');

const eztvSchema = mongoose.Schema({
	imdb_id: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true	
	},
	imdb_rating: {
		type: Number,
		required: true
	},
	cover_url: {
		type: String,
		required: true
	},
	last_updated: {
		type: String,
		required: false
	},
	genre: {
		type: Array,
		required: true
	},
	episodes: {
		type: Array,
		required: false
	}
});

let Eztv = mongoose.model('Eztv', eztvSchema);

Eztv.getEpisode = (id, seasonNum, episodeNum) => {
	return new Promise((resolve, reject) => {		
		Eztv.findOne({
			imdb_id: id
		})
		.catch((err) => {
			reject(err);
		})
		.then((doc) => {
			if (doc) {
				let episodes = doc.episodes;
				episodes.forEach((episode) => {
					if (episode.season == seasonNum && episode.episode == episodeNum)
						resolve(episode);
				});
				reject(new Error('Could not find specified episode.'));
			}
			else
				reject(new Error('Could not find specified series.'));
		});
	});
};

module.exports = Eztv;