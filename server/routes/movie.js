const express = require('express');
const router = express.Router();
const moviedb = require('moviedb')('531e95f829b079916094fa5c7f0a60ce');
import request from 'request';

router.post('/', (req, res) => {
    moviedb.movieInfo({ id: req.body.imdb_code }, (error, response) => {
        res.json(response);
    })
})

module.exports = router;