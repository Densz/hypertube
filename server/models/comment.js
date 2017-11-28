const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	idMovie: {
		type: String,
		required: true
	},
	login: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: false
	}
});

module.exports = mongoose.model('Comment', commentSchema);