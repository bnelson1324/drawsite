const path = require('path');
const fs = require('fs');
const md5 = require('md5');

module.exports = {
	addImage,
};

// save image and store information in database
async function addImage(pngBlob) {
	// hash file to determine filename
	const fileName = md5(pngBlob);
	const filePath = path.join(__dirname, 'images', `${fileName}.png`);
	await fs.promises.writeFile(filePath, pngBlob, 'base64');
}