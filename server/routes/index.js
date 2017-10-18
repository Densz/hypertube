var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ title: 'Express ta soeur' });
});

router.post('/', (req, res, next) => {
	console.log(req.body);
	res.json({ post: 'index en post' });
});

module.exports = router;
