const dots = []; // Array to store dot positions
const numDots = 2; // Number of dots, start with 2

// Function to create a random dot
function createDot() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
    };
}

// Set the size of the canvas
function setCanvasSize(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Draw Voronoi diagram
function drawVoronoi(canvas, context, dots) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (dots.length < 2) {
        console.log('Not enough dots to form a Voronoi diagram.');
        return;
    }

    const points = dots.map(dot => [dot.x, dot.y]);
    console.log('Points for Voronoi:', points);

    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

    context.beginPath();
    voronoi.render(context);
    context.strokeStyle = 'black';
    context.lineWidth = 2; // Ensure the line width is enough to be visible
    context.stroke();

    // Additional debugging: draw the dots to ensure they're being placed
    dots.forEach(dot => {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
        context.fill();
    });
}

// Initialize
function init() {
    const canvas = document.getElementById('voronoi-canvas');
    const context = canvas.getContext('2d');
    setCanvasSize(canvas);

    // Create initial dots
    for (let i = 0; i < numDots; i++) {
        dots.push(createDot());
    }

    console.log('Initializing Voronoi diagram with dots:', dots);
    drawVoronoi(canvas, context, dots);
}

window.onload = init;
window.onresize = () => {
    const canvas = document.getElementById('voronoi-canvas');
    setCanvasSize(canvas);
    drawVoronoi(canvas, canvas.getContext('2d'), dots);
};
