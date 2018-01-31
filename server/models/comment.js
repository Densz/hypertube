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
	posted: {
		type: String,
		required: true
	},
	picturePoster: {
		type: String,
		require: true
	},
	defaultPicture: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Comment', commentSchema);