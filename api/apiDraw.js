const express = require('express');
const path = require('path');
const addImage = require('../data/dao.js').addImage;

const router = express.Router();

router.route('/')
	.get((req, res) => res.sendFile(path.join(__dirname, '../pages/draw.html')))
	.post(async (req, res) => {
		try {
			await addImage(req.body);
			res.status(200).send('Image added');
		} catch (e) {
			if (e.code === 'EEXIST') {
				res.status(400).send('This image has already been submitted');
			} else {
				console.error(e);
				res.status(500).send('Server error. Image not submitted');
			}
		}
	});

module.exports = router;