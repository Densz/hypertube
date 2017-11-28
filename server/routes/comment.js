const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get('/getComments', (req, res) => {
	Comment.find({idMovie: req.query.idMovie}, (err, result) => {
		if (err) res.json({ success: false, msg: 'Database error ' + err });
		else {
			res.json({ success: true, msg: 'Comment list in value field', value: result });
		}
	});
});

router.post('/postComment', (req, res) => {
	const login = req.user.login;
	let newComment = new Comment();

	newComment.idMovie = req.body.idMovie;
	newComment.login = login;
	newComment.value = req.body.value;
	newComment.save((err) => {
		if (err) res.json({ success: false, msg: 'Database error ' + err });
		else {
			res.json({ success: true, msg: 'Comment added properly' });
		}
	})
});

module.exports = router;