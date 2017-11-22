const express = require('express');
const router = express.Router();
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

router.post('/update', async (req, res, next) => {
	const key = req.body.key;
	const value = req.body.value;
	const set = {[key]: value};
	if ( key === 'email') {
		await checkNewEmail(value)
		.then((response) => {
			if (!response.success) {
				res.json({success: false, msg: 'Email already exists', oldValue: { name: 'email', value: req.user.email } });
			} else {
				User.update({ _id: req.user._id }, {$set: set }, (err, result) => {
					if (err) { 
						res.json({ success: false, msg: 'Database fail' + err });
					}
					else {
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
	}
})

module.exports = router;