const express = require('express');
const router = express.Router();
import request from 'request';
import Transmission from 'transmission';
import Client from 'node-torrent';
import parseTorrent from 'parse-torrent';

router.post('/', (req, res) => {
	res.json({msg: 'ok'});
})

module.exports = router;