const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/user');

/* GET users listing. */
router.post('/submit', (req, res, next) => {
	res.json({msg: 'ca marche'});
});

module.exports = router;
