const express = require('express');
const path = require('path');
const dao = require('../data/dao.js');

const router = express.Router();

router.route('/').get(async (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/view.html'));
});

router.route('/imagesData').get(async (req, res) => {
	res.json(await dao.getImages(req.query.startId || 0, req.query.imageCount || 20));
});

router.route('/tableData').get(async (req, res) => {
	res.json(await dao.getTableData());
});

module.exports = router;