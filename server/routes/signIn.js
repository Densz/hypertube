const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/user');
const jwt =require('jsonwebtoken');
const config = require('../config/config');

router.post('/submit', (req, res, next) => {
	const login = req.body.login;
	const password = req.body.password;

	User.findOne({login: login}, (err, user) => {
		if (err) throw err;
		if (!user) {
			return res.json({success: false, msg: 'User not found'});
		}
		if (user.checkPassword(password, user.password)) {
			const token = jwt.sign({
				user
			}, config.secret, {
				expiresIn: 3600
			});
			res.json({
				success: true,
				token: 'JWT ' + token,
				msg: 'Welcome aboard',
				user: {
					id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					login: user.login,
					email: user.email
				}
			});
		} else {			
			return res.json({success: false, msg: 'Wrong password'});
		}
	});
})

module.exports = router;