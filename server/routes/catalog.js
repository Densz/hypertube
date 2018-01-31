const express = require('express');
const router = express.Router();
const config = require('../config/config');
const db = require('../config/database');
const Eztv = require('../models/eztv');
const Yify = require('../models/yify');
const Users = require('../models/user');
import request from 'request';

router.post('/callMoreItems', (req, res) => {
	Users.findOne({email: req.user.email}, (error, resultUserVideo) => {
		let query = {};
		query.title = { $regex: ".*" + req.body.searchField + ".*" };
		query.title = { $regex: ".*" + req.body.searchField.charAt(0).toUpperCase() + req.body.searchField.slice(1) + ".*" };
		query.year = { $gt: parseInt(req.body.yearInterval[0]), $lt: parseInt(req.body.yearInterval[1]) };
		query.imdb_rating = { $gt: parseFloat(req.body.ratingInterval[0]), $lt: parseFloat(req.body.ratingInterval[1]) };
		req.body.genre !== "all" ? query.genre = { $all: [req.body.genre] } : undefined;
		let sort = {};
		sort.skip = (req.body.pages - 1) * 16;
		sort.limit = 16;
		req.body.sortBy === "rating" ? sort.sort = { imdb_rating: -1 } : req.body.sortBy === "title" ? sort.sort = { title: 1} : sort.sort = { year: -1 };
		if (req.body.categorie === "movies") {
			Yify.find(query, [], sort, (err, result) => {
				if (err) { console.log(err) }
				result.forEach((element, index) => {
					if (resultUserVideo.videoSeen.indexOf(element.imdb_id) !== -1)
						result[index].videoSeen = true;
					else
						result[index].videoSeen = false;
				})
				res.json(result);
			}).lean()
		} else {
			query.episodes = {
				$exists: true,
				$not: { $size: 0 }
			};
			Eztv.find(query, [], sort, (err, result) => {
				if (err) { console.log(err) }
				result.forEach((element, index) => {
					if (resultUserVideo.videoSeen.indexOf(element.imdb_id) !== -1)
						result[index].videoSeen = true;
					else
						result[index].videoSeen = false;
				})
				res.json(result);
			}).lean()
		}
	})
});

module.exports = router;