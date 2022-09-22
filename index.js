const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config.json');
const apiView = require('./api/apiView.js');
const apiDraw = require('./api/apiDraw.js');

const app = express();
app.use(bodyParser.raw({
	type: 'image/png',
	limit: '10mb',
}));
app.use('/', apiView);
app.use('/draw', apiDraw);
app.use(express.static('public'));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});