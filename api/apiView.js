const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => res.send('View drawings'));

module.exports = router;