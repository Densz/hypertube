const express = require('express');
const router = express.Router();
import request from 'request';


/* GET users listing. */
router.get('/', (req, res, next) => {
	request('https://yts.ag/api/v2/list_movies.jsonp?limit=16&page=1&sort_by=like_count', function(error, response, body){
		let infos = JSON.parse(body);
		res.json(infos);
	})
});

module.exports = router;