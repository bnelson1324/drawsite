const express = require('express');
const path = require('path');
const getImages = require('../data/dao.js').getImages;

const router = express.Router();

router.route('/').get(async (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/view.html'));
});

router.route('/imagesData').get(async (req, res) => {
	res.json(await getImages(req.query.startId || 0, req.query.imageCount || 20));
});

module.exports = router;