const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const md5 = require('md5');

module.exports = {
	loadDB: loadData, addImage, getImages, getTableData,
};

const USER_IMAGES_FOLDER = path.join(__dirname, '../public/userImages');

let db;

async function loadData() {
	// create user images folder if it doesn't already exist
	if (!fs.existsSync(USER_IMAGES_FOLDER)) {
		await fs.promises.mkdir(USER_IMAGES_FOLDER);
	}

	// load DB
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
	const filePath = path.join(USER_IMAGES_FOLDER, `${fileName}`);

	// write image file. throw error if file already exists
	await fs.promises.writeFile(filePath, pngBlob, { encoding: 'base64', flag: 'wx' });

	await db.run(`
		INSERT INTO images (filename, timestamp)
		VALUES (?, UNIXEPOCH());
	`, (fileName));
}

async function getImages(startId, imageCount) {
	return await db.all(`
			SELECT id, filename, timestamp
			FROM images
			WHERE id <= ?
			ORDER BY id DESC
			LIMIT ?;
		`, startId, imageCount);
}

async function getTableData() {
	return await db.get('SELECT COUNT(id) as totalImages FROM images;');
}