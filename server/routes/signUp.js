const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/user');

/* GET users listing. */
router.post('/submit', (req, res, next) => {
	let newUser = new User();
	
	newUser.firstName = req.body.firstName;
	newUser.lastName = req.body.lastName;
	newUser.email = req.body.email;
	newUser.login = req.body.login;
	newUser.password = newUser.generateHash(req.body.password);
	User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }]}, (err, user) => {
		if (user) {
			res.json({ success: false, msg: 'Failed to add user email or username already taken' });
		} else {
			newUser.save((err) => {
				if (err)
					res.json({ success: false, msg: 'Failed to add user' });
				res.json({ success: true, msg: 'User account created' });
			})
		}
	});
});

module.exports = router;
