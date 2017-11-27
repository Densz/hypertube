const mongoose = require('mongoose');

const eztvDbSchema = mongoose.Schema({
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
	}
})

module.exports = mongoose.model('EztvDb', eztvDbSchema);