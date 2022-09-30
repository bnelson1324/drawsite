/* eslint-disable no-unused-vars */

const IMAGES_PER_PAGE = 6;
const imageDisplay = document.getElementById('imageDisplay');

function loadPage(pageNum) {
	// get table data
	const xhrTableData = new XMLHttpRequest();
	xhrTableData.open('GET', 'tableData', false);
	xhrTableData.send();
	const totalImages = JSON.parse(xhrTableData.responseText).totalImages;

	// get image data
	const startId = totalImages - ((pageNum - 1) * IMAGES_PER_PAGE);
	const xhrImages = new XMLHttpRequest();
	const url = `imagesData?startId=${startId}&imageCount=${IMAGES_PER_PAGE}`;
	xhrImages.open('GET', url, false);
	xhrImages.send();
	const imgData = JSON.parse(xhrImages.responseText);

	// display images on page
	imageDisplay.innerHTML = '';
	for (const data of imgData) {
		addImage(data);
	}

	// update page count
	const pageCount = Math.ceil(totalImages / IMAGES_PER_PAGE);
	// todo
}

function addImage(imgData) {
	const filePath = `userImages/${imgData.filename}`;

	// container
	const newImgSpan = document.createElement('span');
	newImgSpan.className = 'userImageContainer';

	// link
	const link = document.createElement('a');
	link.href = filePath;
	newImgSpan.appendChild(link);

	// image
	const img = document.createElement('img');
	img.src = filePath;
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