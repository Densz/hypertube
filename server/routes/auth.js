const express = require('express');
const router = express.Router();
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../config/database');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

/**
 * multer configuration
 */
const imageFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/) || file.size > 3145728) {
		console.log('File too big!');
		cb(null, false);
	} else {
		cb(null, true);
	}
}

const storageMulter = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../client/public/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
	}
})

const upload = multer({
	storage: storageMulter,
	fileFilter: imageFilter
}).single('file');

function validateSignUpForm(payload) {
	const errors = {};
	let isFormValid = true;

	if (typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
		isFormValid = false;
		errors.email = 'Please provide a correct email address';
	}
	if (typeof payload.password !== 'string' || payload.password.trim().length < 6) {
		isFormValid = false;
		errors.passwd = 'Password must have at least 8 characters';
		errors.passwdConfirm = 'Password must have at least 8 characters'
	}
	if (payload.confirmPassword !== payload.password) {
		isFormValid = false;
		errors.passwd = 'Password must match Password confirmation ';
		errors.passwdConfirm = 'Password confirmation must match Password';
	}
	if (typeof payload.login !== 'string' || payload.login.trim().length < 5){
		isFormValid = false;
		errors.login = 'Login must have at least 5 characters';
	}
	return {
		success: isFormValid,
		errors
	}
}
router.post('/signUp/submit/' ,(req, res, next) => {
	const validationResult = validateSignUpForm(req.body);
	if (!validationResult.success) {
		return res.json({
			success: false,
			errors: validationResult.errors
		})
	} else {
		next();
	}
})

router.post('/signUp/submit', (req, res, next) => {
	let newUser = new User();
	
	newUser.firstName = req.body.firstName;
	newUser.lastName = req.body.lastName;
	newUser.email = req.body.email;
	newUser.login = req.body.login;
	newUser.password = newUser.generateHash(req.body.password);
	User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }]}, (err, user) => {
		if (err) {
			res.json({ success: false, msg: 'Data base issue' })
		}
		if (user) {
			const msg = 'Failed to add user email or username already taken';
			res.json({ success: false, errors: { 'email': msg, 'login': msg } });
		} else {
			newUser.save((err) => {
				if (err)
					res.json({ success: false, msg: 'Failed to add user' });
				res.json({ success: true, msg: 'User account created' });
			})
		}
	});
});

router.get('/signOut', (req, res, next) => {
	req.logout();
	res.json({success: true, msg: 'User disconnected'})
});

router.post('/updatePicture', function (req, res) {
	upload(req, res, (err) => {
		if (err) {
			res.json({ success: false, msg: 'Upload failed' + err });
		} else {
			User.findOne({ login: req.body.login}, (err, user) => {
				if (err) {
					res.json({success: false, msg: 'Fail database' + err });
				} else {
					if (user.picturePath && user.picturePath !== undefined) {
						user.removeFile('../client/public/' + user.picturePath);
					}
				}
			});
			const namePic = '/uploads/' + req.file.filename;
			User.update({ login: req.body.login }, { $set: { picturePath: namePic }}, (err, result) => {
				if (err) {
					res.json({success: false, msg: 'Fail database' + err});
				} else {
					res.json({success: true, msg: 'Image uploaded', namePic: namePic });
				}
			})
		}
	});
});

module.exports = router;