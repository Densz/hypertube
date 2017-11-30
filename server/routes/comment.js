const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const moment = require('moment');

router.get('/getComments', (req, res) => {
	Comment.find({idMovie: req.query.idMovie}).sort('-posted').exec((err, result) => {
		if (err) res.json({ success: false, msg: 'Database error ' + err });
		else {
			res.json({ success: true, msg: 'Comment list in value field', value: result});
		}
	});
});

router.post('/postComment', (req, res) => {
	const login = req.user.login;
	let newComment = new Comment();
	let now = new Date;
	let result = moment().format('MMMM Do YYYY, h:mm:ss a');

	newComment.idMovie = req.body.idMovie;
	newComment.login = login;
	newComment.value = req.body.value;
	newComment.posted = result;
	newComment.picturePoster = req.user.picturePath;
	newComment.save((err) => {
		if (err) res.json({ success: false, msg: 'Database error ' + err });
		else {
			res.json({ success: true, msg: 'Comment added properly', comment: newComment });
		}
	})
});

module.exports = router;