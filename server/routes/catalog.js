const express = require('express');
const router = express.Router();
const config = require('../config/config');
const db = require('../config/database');
const EztvDb = require('../models/eztvDb');
const Yify = require('../models/yify');
import request from 'request';

router.post('/callMoreItems', (req, res) => {
	console.log(req.body);
	let query = {};
	query.year = { $gt: parseInt(req.body.yearInterval[0]), $lt: parseInt(req.body.yearInterval[1]) }, 
	query.imdb_rating = { $gt: parseFloat(req.body.ratingInterval[0]), $lt: parseFloat(req.body.ratingInterval[1]) }
	Yify.find(query, [], {
		skip: (req.body.pages - 1) * 16,
		limit: 16,
		sort: { imdb_rating: -1 }
	}, (err, result) => {
		if (err) { console.log(err) }
		res.json(result);
	})
});

module.exports = router;