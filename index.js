const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { port } = require('./config.json');
const loadDB = require('./data/dao.js').loadDB;
const apiView = require('./api/apiView.js');
const apiDraw = require('./api/apiDraw.js');

loadDB();

const app = express();
app.use(bodyParser.raw({
	type: 'image/png',
	limit: '10mb',
}));
app.use('/', apiView);
app.use('/draw', apiDraw);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});