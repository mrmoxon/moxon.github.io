// Function to calculate distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// Function to draw a circle
function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Function to draw a line between two points
function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

// Generate random centroids
const numCentroids = 10;
const centroids = [];
for (let i = 0; i < numCentroids; i++) {
    centroids.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
    });
}

// Set the desired radius for circular contour lines
const radius = 30;

// Get canvas element and context
const canvas = document.getElementById('voronoiCanvas');
const ctx = canvas.getContext('2d');

// Calculate Voronoi diagram and draw circular contour lines
for (let i = 0; i < centroids.length; i++) {
    const { x, y } = centroids[i];
    drawCircle(ctx, x, y, radius);

    for (let j = 0; j < centroids.length; j++) {
        if (i !== j) {
            const { x: x1, y: y1 } = centroids[i];
            const { x: x2, y: y2 } = centroids[j];

            const distance = calculateDistance(x1, y1, x2, y2);

            if (distance < radius) {
                // Calculate intersection points between circle and line connecting centroids
                const angle = Math.atan2(y2 - y1, x2 - x1);
                const offsetX = Math.cos(angle) * radius;
                const offsetY = Math.sin(angle) * radius;

                const intersectionX1 = x1 + offsetX;
                const intersectionY1 = y1 + offsetY;
                const intersectionX2 = x2 - offsetX;
                const intersectionY2 = y2 - offsetY;

                drawLine(ctx, intersectionX1, intersectionY1, intersectionX2, intersectionY2);
            }
        }
    }
}
