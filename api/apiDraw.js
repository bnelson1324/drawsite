const express = require('express');
const path = require('path');
const dao = require('../data/dao.js');

const router = express.Router();

router.route('/')
	.get((req, res) => res.sendFile(path.join(__dirname, '../pages/draw.html')))
	.post(async (req, res) => {
		await dao.addImage(req.body);
		res.send('Image received');
	});

module.exports = router;