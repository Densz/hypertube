const express = require('express');
const router = express.Router();
import request from 'request';

router.post('/', (req, res, next) => {
    console.log(req.body.id);
	request('https://yts.ag/api/v2/movie_details.json?movie_id=' + req.body.id + '&with_images=true&with_cast=true', function(error, response, body){
		let infos = JSON.parse(body);
		res.json(infos);
	})
});

module.exports = router;