/* eslint-disable no-unused-vars */

const IMAGES_PER_PAGE = 6;
const imageDisplay = document.getElementById('imageDisplay');

function loadPage(pageNum) {
	const startId = (pageNum - 1) * IMAGES_PER_PAGE;

	// get data
	const xhr = new XMLHttpRequest();
	const url = `imagesData?startId=${startId}&imageCount=${IMAGES_PER_PAGE}`;
	xhr.open('GET', url, false);
	xhr.send();
	const data = JSON.parse(xhr.responseText);

	// display images on page
	imageDisplay.innerHTML = '';
	for (const imgData of data.imagesData) {
		addImage(imgData);
	}

	// update page count
	const pageCount = Math.ceil(data.tableData.totalImages / IMAGES_PER_PAGE);
	// todo
}

function addImage(imgData) {
	// container
	const newImgSpan = document.createElement('span');
	newImgSpan.className = 'userImageContainer';

	// link
	const link = document.createElement('a');
	link.href = `img/${imgData.id}`;
	newImgSpan.appendChild(link);

	// image
	const img = document.createElement('img');
	img.src = `userImages/${imgData.filename}`;
	img.className = 'userImage';
	img.alt = imgData.filename;
	link.appendChild(img);

	// image text
	const txt = document.createElement('p');
	const date = new Date(imgData.timestamp * 1000).toDateString();
	txt.innerHTML = `#${imgData.id} ${date}`;
	newImgSpan.appendChild(txt);

	imageDisplay.appendChild(newImgSpan);
}