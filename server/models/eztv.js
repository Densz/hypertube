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
		type: String,
		required: true	
	},
	imdb_rating:{
		type: String,
		required: true
	},
	cover_url: {
		type: String,
		required: true
	},
	last_updated: {
		type: Date,
		required: false
	},
	genre: {
		type: Array,
		required: true
	}
})

module.exports = mongoose.model('Eztv', eztvSchema);