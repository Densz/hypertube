const mongoose = require('mongoose');

const yifySchema = mongoose.Schema({
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
	torrents: {
		type: Array,
		required: true
	},
	downloaded: {
		type: Boolean,
		required: true,
		default: false
	},
	path: {
		type: String,
		required: true,
		default: ''
	}
});

module.exports = mongoose.model('Yify', yifySchema);