// set up atrament sketchpad
const canvas = document.querySelector('#sketchpad');
const sketchpad = new Atrament(canvas);

/* set up undo/redo functionality */
// create step stack for undo/redo
const stepStack = {
	head: {
		prev: null
	}
}

let prevStep = stepStack.head;

function insertStepAfter(prevStep, newStep) {
	prevStep.next = newStep;
	newStep.prev = prevStep;
}

// record strokes
sketchpad.recordStrokes = true;
sketchpad.addEventListener('strokerecorded', ({ stroke }) => {
	const newStep = { stroke: stroke }
	insertStepAfter(prevStep, newStep);
	prevStep = newStep;
});