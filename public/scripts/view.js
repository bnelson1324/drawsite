/* eslint-disable no-unused-vars */

const IMAGES_PER_PAGE = 6;
const PAGE_BUTTON_MAX_COUNT = 6;
const imageDisplay = document.getElementById('imageDisplay');
const pageButtons = document.getElementById('pageButtons');

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

	// update page nav buttons
	pageButtons.innerHTML = '';
	const totalPageCount = Math.ceil(totalImages / IMAGES_PER_PAGE);
	// add buttons for first page, last page, and some pages between
	addButton(1);
	for (let i = 2; i <= PAGE_BUTTON_MAX_COUNT - 2; i++) {
		if (i < totalPageCount) {
			addButton(i);
		} else {
			break;
		}
	}
	addButton(totalPageCount);
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

function addButton(pageNum) {
	const btn = document.createElement('button');
	btn.textContent = pageNum;
	btn.addEventListener('click', () => loadPage(pageNum));
	btn.className = 'pageButton';
	pageButtons.appendChild(btn);
}