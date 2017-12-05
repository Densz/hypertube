const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const moment = require('moment');
const fs = require('fs');

const pictureExists = (result) => {
	return new Promise((res) => {
		let test = result[0];
		result.forEach((elem, index) => {
			if (!fs.existsSync("../client/public/" + elem.picturePoster)) {
				elem['defaultPicture'] = true;
			} else {
				elem['defaultPicture'] = false;
			}
		});
		res(result);
	})
}

router.get('/getComments', (req, res) => {
	Comment.find({idMovie: req.query.idMovie}, async (err, result) => {
		if (err) res.json({ success: false, msg: 'Database error ' + err });
		else {
			result = await pictureExists(result);
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
	if (!fs.existsSync("../client/public/" + req.user.picturePoster)) {
		newComment.defaultPicture = true;
	}
	newComment.save((err) => {
		if (err) res.json({ success: false, msg: 'Database error ' + err });
		else {
			res.json({ success: true, msg: 'Comment added properly', comment: newComment });
		}
	})
});

module.exports = router;