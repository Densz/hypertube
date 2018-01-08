const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user');

router.get('/', (req, res, next) => {
	if (!req.user){
		res.json({
			isLogged: false,
			infos: {},
			isFetching: true,
		})	
	} else {
		res.json({
			isLogged: true,
			infos: req.user,
			isFetching: true,
		})
	}
})

const checkNewEmail = (newEmail) =>  {
	return new Promise((res, rej) => {
		User.findOne({email: newEmail}, (err, result) => {
			if (err) rej(err);
			if (result) {
				res({ success: false });
			} else {

				res({ success: true })
			}
		})
	});
}

router.get('/getUsers', async (req, res, next) => {
	if (!req.query.value) {
		res.json([]);
	} else {
		User.find({
			$or: [
				{ login: { $regex: ".*" + req.query.value + ".*" } },
				{ lastName: { $regex: ".*" + req.query.value + ".*" } },
				{ firstName: { $regex: ".*" + req.query.value + ".*" } },
				{ login: { $regex: ".*" + req.query.value.charAt(0).toUpperCase() + req.query.value.slice(1) + ".*" } },
				{ lastName: { $regex: ".*" + req.query.value.charAt(0).toUpperCase() + req.query.value.slice(1) + ".*" } },
				{ firstName: { $regex: ".*" + req.query.value.charAt(0).toUpperCase() + req.query.value.slice(1) + ".*" } }
			],
			login: { $exists: true }
		}, {_id: 0, login: 1, firstName: 1, lastName: 1}, (err, result) => {
			res.json(result);
		});
	}
});

router.get('/getInfoUser', (req, res, next) => {
	const login = req.query.login;
	User.findOne({login: login}, {email: 0}, (err, result) => {
		if (err) res.json({success: false, msg: 'database', data: undefined});
		if (result) {
			res.json({success: true, msg: 'User found', data: result});
		} else {
			res.json({success: false, msg: 'User not found', data: undefined});
		}
	});
});

router.get('/userExists',(req, res, next) => {
	const id = req.query.id;
	User.findOne({ _id: id }, (err, result) => {
		if (err) res.json({ success: false, msg: 'database'});
		if (result) {
			res.json({ success: true, msg: 'User found'});
		} else {
			res.json({ success: false, msg: 'User not found'});
		}
	});
});

router.post('/update', async (req, res, next) => {
	let key = req.body.key;
	let value = req.body.value;
	if (key === 'email') {
		await checkNewEmail(value)
		.then((response) => {
			if (!response.success) {
				res.json({success: false, msg: 'form.email.alreadyTaken', oldValue: { name: 'email', value: req.user.email } });
			} else {
				
				const set = {[key]: value};
				User.update({ _id: req.user._id }, {$set: set }, (err, result) => {
					if (err) { 
						res.json({ success: false, msg: 'Database fail' + err });
					} else {
						req.user[key] = value;
						res.json({ success: true, msg: 'User data in db updated' });
					}
				});
			}
		})
		.catch((rejection) => {
			if (rejection) {
				res.json({ success: false, msg: 'Database issue' })
			}
		});
	} else {
		if (key === 'passwd' || key === 'password') {
			key = 'password';
			value = bcrypt.hashSync(value, bcrypt.genSaltSync(8), null);
		} else if (key === 'firstName' || key === 'lastName') {
			value = value.capitalize();
		} else {
			value = value.toLowerCase();
		}
		const set = {[key]: value};
		User.update({ login: req.user.login }, {$set: set}, (err, result) => {
			if (err) {
				res.json({ success: false, msg: 'Database fail' + err });
			} else {
				req.user[key] = value.capitalize();
				res.json({ success: true, msg: 'User data in db updated' });
			}
		});
	}
})

router.post('/updatePassport', (req, res) => {
	const data = req.body;
	for(var key in data) {
		if (key === 'passwd' || key === 'password') {
			key = 'password';
			data[key] = bcrypt.hashSync(data[key], bcrypt.genSaltSync(8), null);
		} else if (key === 'firstName' || key === 'lastName') {
			data[key] = data[key].capitalize();
		} else if (key !== 'email') {
			data[key] = data[key].toLowerCase();
		}
		req.user[key] = data[key]
	}
	res.json({ success: true, msg: 'Done' });
});

router.post('/actionUserVideo', (req, res, next) => {
	if (req.user.login === undefined) {
		res.json({ success: false, msg: 'user.actionUserVideo' });
	}
	if (req.body.dismiss === true) {
		const key = req.body.key;
		const value = req.body.value;
		User.update({login: req.user.login}, {$pull: {[key]: value}}, (err) => {
			if (err) res.json({ success: false, msg: 'Database issue ' + err });
			else {
				const indexVideo = req.user[key].indexOf(value);
				req.user[key].splice(indexVideo, 1);
				res.json({ success: true, msg: 'Action dismissed', userInfo: req.user });
			}
		})
	} else {
		next();
	}
});

router.post('/actionUserVideo', (req, res) => {
	const key = req.body.key;
	const value = req.body.value;
	if (key === 'wishList' || key === 'videoLiked') {
		User.update({login: req.user.login}, {$push: {[key]: value}}, (err, result) => {
			if (err) res.json({ success: false, msg: 'Database issue ' + err });
			else {
				req.user[key].push(value);
				res.json({ success: true, msg: 'Action performed', userInfo: req.user });
			}
		});
	} else {
		res.json({ success: false, msg: 'This action doesn\'t exist' });
	}
});

module.exports = router;