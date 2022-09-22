// set up atrament sketchpad
const canvas = document.querySelector('#sketchpad');
const atrament = new Atrament(canvas);

// create step stack for undo/redo functionality
class StepStack {
	constructor() {
		this.stack = {
			head: {
				prev: null
			}
		};

		this.prevStep = this.stack.head;
	}

	insertStepAfter(prevStep, newStep) {
		prevStep.next = newStep;
		newStep.prev = prevStep;
	}
}

// record strokes
const stepStack = new StepStack();
atrament.recordStrokes = true;
let reconstructMode = false;
atrament.addEventListener('strokerecorded', ({ stroke }) => {
	if (!reconstructMode) {
		const newStep = { stroke: stroke }
		stepStack.insertStepAfter(stepStack.prevStep, newStep);
		stepStack.prevStep = newStep;
	}
});

/* drawing controls */

// undo and redo
function undo() {
	if(stepStack.prevStep && stepStack.prevStep.prev) {
		stepStack.prevStep = stepStack.prevStep.prev;
	}
	reconstructDrawing();
}

function redo() {
	if(stepStack.prevStep && stepStack.prevStep.next) {
		stepStack.prevStep = stepStack.prevStep.next;
	}
	reconstructDrawing();
}

// reconstruct drawing from stepStack up to and including currentStep
function reconstructDrawing() {
	if(!stepStack.stack.head.next) {
		return;
	}

	atrament.clear();
	reconstructMode = true;

	// store drawing current settings
	const currMode = atrament.mode;
	const currColor = atrament.color;

	// reconstruct drawing
	for (let renderStep = stepStack.stack.head.next; renderStep != null && renderStep.prev != stepStack.prevStep; renderStep = renderStep.next) {
		addStroke(renderStep.stroke)
	}

	// restore drawing settings back to before reconstruct
	atrament.mode = currMode;
	atrament.color = currColor;
	
	reconstructMode = false;
}

function addStroke(stroke) {
	// set drawing settings for stroke
	atrament.mode = stroke.mode;
	atrament.color = stroke.color;

	// draw stroke
	const points = stroke.points.slice();
	const firstPoint = points.shift().point;
	atrament.beginStroke(firstPoint.x, firstPoint.y);
	let prevPoint = firstPoint;
	while (points.length > 0) {
		const point = points.shift().point;
		const { x, y } = atrament.draw(point.x, point.y, prevPoint.x, prevPoint.y);
		prevPoint = { x, y };
	}
	atrament.endStroke(prevPoint.x, prevPoint.y);
}

// draw mode buttons
function highlightButton(button) {
	document.getElementById('highlighted').id = null;
	button.id = "highlighted";
}

function setDrawMode(newMode) {
	atrament.mode = newMode;
}

// change color
function updateColor() {
	const newColor = `#${document.getElementById('colorSelector').value}`;
	atrament.color = newColor;
	document.getElementById('colorDisplay').style.backgroundColor = newColor;
}

// clear
function clear() {

}

// submit
function submit() {

}