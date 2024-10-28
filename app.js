//Task 1 is in the html file called index.html
//Task 2: Configure the Javascript for drawing context
// Get references to HTML elements
const canvas = document.getElementById('drawingCanvas'); // Canvas element
const ctx = canvas.getContext('2d'); // 2D drawing context
const colorPicker = document.getElementById('colorPicker'); // Color picker input
const clearButton = document.getElementById('clearCanvas'); // Clear button

// Initialize variables to track drawing state and selected tool
let drawing = false; // Tracks if the user is currently drawing
let startX = 0; // Start X coordinate
let startY = 0; // Start Y coordinate
let selectedTool = 'line'; // Default tool is set to "line"
let shapes = []; // Array to store drawn shapes

// Set up tool selection event listener
document.querySelectorAll('input[name="tool"]').forEach((input) => {
    input.addEventListener('change', (event) => {
        selectedTool = event.target.value; // Update selected tool
    });
});


//Task 3: Implement Shape Drawing Logic
// Start drawing on mousedown
canvas.addEventListener('mousedown', (event) => {
    drawing = true; // Enable drawing
    startX = event.offsetX; // Set start X coordinate
    startY = event.offsetY; // Set start Y coordinate
});

// Draw shapes dynamically on mousemove based on selected tool
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return; // Exit if not currently drawing

    const currentX = event.offsetX; // Current X coordinate
    const currentY = event.offsetY; // Current Y coordinate

    // Clear the canvas and redraw all shapes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllShapes(); // Redraw all previous shapes

    // Start a new path and set the color
    ctx.beginPath();
    ctx.strokeStyle = colorPicker.value; // Set stroke color to chosen color

    // Draw the selected shape
    if (selectedTool === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
    } else if (selectedTool === 'rectangle') {
        ctx.rect(startX, startY, currentX - startX, currentY - startY);
    } else if (selectedTool === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    }

    ctx.stroke(); // Apply stroke to the current path
});

// Finalize shape on mouseup
canvas.addEventListener('mouseup', () => {
    if (drawing) {
        drawing = false; // Disable drawing
        ctx.closePath(); // End the current path

        // Save the shape to the array
        shapes.push({
            tool: selectedTool,
            startX: startX,
            startY: startY,
            endX: event.offsetX,
            endY: event.offsetY,
            color: colorPicker.value,
        });
    }
});

// Function to draw all shapes stored in the shapes array
function drawAllShapes() {
    shapes.forEach(shape => {
        ctx.strokeStyle = shape.color; // Set color
        ctx.beginPath(); // Start a new path

        if (shape.tool === 'line') {
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
        } else if (shape.tool === 'rectangle') {
            ctx.rect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
        } else if (shape.tool === 'circle') {
            const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
            ctx.arc(shape.startX, shape.startY, radius, 0, Math.PI * 2);
        }

        ctx.stroke(); // Apply stroke to the shape
    });
}


// Task 4: Add Color Selection and Canvas Clearing
// Clear the canvas when the Clear button is clicked
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear entire canvas
    shapes = []; // Reset shapes array
});

// Update stroke color dynamically based on color picker input
colorPicker.addEventListener('input', (event) => {
    ctx.strokeStyle = event.target.value; // Set drawing color to chosen color
});
