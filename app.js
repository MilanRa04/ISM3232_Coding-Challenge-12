//Task 1 is in the html file called index.html
//Task 2: Configure the Javascript for drawing context

// Get referenecs for HTML elements
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearCanvas');

//Variables to trach drawing
let drawing = false;
let startX, startY;

//Add event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing)

function startDrawing(event) {
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
}

function draw(event) {
    if (!drawing) return;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.beginPath();
}

function stopDrawing() {
    drawing = false;
}