const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const md5 = require('md5');

module.exports = {
	loadDB, addImage,
};

let db;

async function loadDB() {
	db = await open({
		filename: path.join(__dirname, '../db.sqlite'),
		driver: sqlite3.Database,
	});
	const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
	await db.exec(schema);
	console.log('Database loaded');
}

// save image and store information in database
async function addImage(pngBlob) {
	const fileName = `${md5(pngBlob)}.png`;
	const filePath = path.join(__dirname, '../public/userImages', `${fileName}`);

	// write image file. throw error if file already exists
	await fs.promises.writeFile(filePath, pngBlob, { encoding: 'base64', flag: 'wx' });

	await db.run(`
		INSERT INTO images (path, timestamp)
		VALUES (?, UNIXEPOCH());
	`, (fileName));

	// return id of image just submitted
	const imageId = (await db.get('SELECT LAST_INSERT_ROWID() AS lastId FROM images')).lastId;
	return imageId;
}