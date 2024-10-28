//Task 1 is in the html file called index.html
//Task 2: Configure the Javascript for drawing context

// Get referenecs for HTML elements
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearCanvas');

//Variables to trach drawing
let drawing = false;
let startX = 0;
let startY = 0;
let selectedTool = 'line';

//Event Listeners for tool selection
document.querySelectorAll ('input [name="tool"]').forEach((input) => {
    input.addEventListener('change', (event) => {
        selectedTool = event.target.value;
    });
});

//Start drawing when the mouse button is pressed down
canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

//End drawing when the mouse button is relaeased or leaves the canvas
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});
canvas.addEventListener('mouseout', () => {
    drawing = false;
});
