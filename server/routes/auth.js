import { read } from 'fs';
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../config/database');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

/**
 * multer configuration
 */
const imageFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png)$/) || file.size > 3145728) {
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
		errors.passwd = 'Password must have at least 6 characters';
		errors.passwdConfirm = 'Password must have at least 6 characters'
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
		res.json({
			success: false,
			errors: validationResult.errors
		})
	} else {
		next();
	}
})

router.post('/signUp/submit', (req, res, next) => {
	let newUser = new User();
	
	newUser.firstName = req.body.firstName.capitalize();
	newUser.lastName = req.body.lastName.capitalize();
	newUser.email = req.body.email;
	newUser.login = req.body.login.toLowerCase();
	newUser.password = newUser.generateHash(req.body.password);
	User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }]}, (err, user) => {
		if (err) {
			res.json({ success: false, msg: 'Data base issue' })
		}
		if (user) {
			const msg = 'Failed to add user email or login already taken';
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

router.get('/guestSignUp/getInfo', (req, res) => {
	User.find({email: req.user.email}, (err, user) => {
		if (err) res.json({ success: false, msg: 'Database error ' + err })
		res.json({ success: true, value: { firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email }});
	})
});

router.post('/guestSignUp/submit/', (req, res, next) => {
	const validationResult = validateSignUpForm(req.body);
	if (!validationResult.success) {
		res.json({
			success: false,
			errors: validationResult.errors
		})
	} else {
		next();
	}
})

router.post('/guestSignUp/submit', (req, res) => {
	const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
	User.findOne({ login: req.body.login.toLowerCase() }, (err, result) => {
		if (err) res.json({ success: false, msg: 'Database fail ' + err });
		if (result) {
			const msg = 'Failed to add user login already taken';
			res.json({ success: false, errors: { 'login': msg } });
		} else {
			User.update({email: req.body.email}, { $set: {
					firstName: req.body.firstName.capitalize(),
					lastName: req.body.lastName.capitalize(),
					login: req.body.login.toLowerCase(),
					email: req.body.email,
					password: password
				}}, {multi: false}, (err, result) => {
					if (err) res.json({ success: false, msg: 'Failed to add user' });
					res.json({ success: true, msg: 'User account updated not a guest anymore' });
				}
			);
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
				} else if (user) {
					if (user !== undefined && user.picturePath !== undefined) {
						user.removeFile('../client/public/' + user.picturePath);
					}
				}
			});
			const namePic = '/uploads/' + req.file.filename;
			User.update({ login: req.body.login.toLowerCase() }, { $set: { picturePath: namePic }}, (err) => {
				if (err) {
					res.json({success: false, msg: 'Fail database ' + err});
				} else {
					res.json({success: true, msg: 'Image uploaded', namePic: namePic });
				}
			})
		}
	});
});

router.post('/sendEmail', (req, res, next) => {
	const email = req.body.email;
	User.findOne({email: email}, (err, result) => {
		if (err) res.json({success: false, msg: 'Database fail' + err});
		if (result) {
			if (result.facebookId !== undefined || result.fortytwoId !== undefined || result.githubId !== undefined) {
				res.json({success: false, guest: true, msg: 'Please log you in with your social network account.'});
			}
			else {
				let transporter = nodemailer.createTransport(smtpTransport({
					service: 'gmail',
					auth: {
						user: '42hypertube2017@gmail.com',
						pass: 'qwerty2017'
					},
					tls: { rejectUnauthorized: false }
				}));

				// setup email data with unicode symbols
				let mailOptions = {
					from: '"Hypertube" <42hypertube2017@gmail.com>', // sender address
					to: email, // list of receivers
					subject: 'Hello - Reset Password - Hypertube', // Subject line
					html: '<p>Hello</p><br><p>To reset your password, click the link below<p><a href="http://localhost:3000/resetPassword/' + result['_id'] + '">Reset password</a><br><br><br>Kind regards,<br>Team Hypertube'
				};

				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return;//console.log(error);
					}
					console.log('Message %s sent: %s', info.messageId, info.response);
				});
				res.json({success: true, msg: 'Email sent'});
			}
		} else {
			res.json({success: false, guest: false, msg: 'No user registered with this email address.'});
		}
	});
});

router.post('/rstPwd', (req, res, next) => {
	const passwd = req.body.passwd;
	const passwdConfirm = req.body.passwdConfirm;
	const id = req.body.id;
	let isFormValid = true;
	const errors = {};

	if (typeof passwd !== 'string' || passwd.trim().length < 6) {
		isFormValid = false;
		errors.passwd = 'Password must have at least 6 characters';
		errors.passwdConfirm = 'Password must have at least 6 characters'
	}
	if (passwdConfirm !== passwd) {
		isFormValid = false;
		errors.passwd = 'Password must match Password confirmation ';
		errors.passwdConfirm = 'Password confirmation must match Password';
	}
	if (isFormValid) {
		const value = bcrypt.hashSync(passwd, bcrypt.genSaltSync(8), null);
		User.update({ _id: id }, { $set: { password: value } }, (err) => {
			if (err) res.json({ success: false, msg: 'Database fail' + err})
			else res.json({ success: true, msg: 'Password updated' });
		});
	} else {
		res.json({ success: false, errors: errors });
	}
});

module.exports = router;