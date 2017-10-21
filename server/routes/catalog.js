const express = require('express');
const router = express.Router();
import request from 'request';


/* GET users listing. */
router.get('/', (req, res, next) => {
	console.log("tu rentres dans catalog ?")
	request('https://yts.ag/api/v2/list_movies.jsonp?limit=3&page=3&sort_by=like_count', function(error, response, body){
		let infos = JSON.parse(body);
		res.json(infos);
	})
});

module.exports = router;