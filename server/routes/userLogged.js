const express = require('express');
const router = express.Router();
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

module.exports = router;