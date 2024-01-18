document.getElementById('color-change-button').addEventListener('click', function() {
    const body = document.body;
    body.style.backgroundColor = body.style.backgroundColor === 'white' ? 'blue' : 'white';
});

const dots = []; // Array to store all dot objects

// Set the size of the canvas
function setCanvasSize() {
    const canvas = document.getElementById('line-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call this function on window load and resize
window.onload = setCanvasSize;
window.onresize = setCanvasSize;

// function createDot() {
//     const dot = document.createElement('div');
//     dot.classList.add('dot');
//     document.body.appendChild(dot);

//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     const dx = (Math.random() - 0.5) * 4; // Speed and direction
//     const dy = (Math.random() - 0.5) * 4; // Speed and direction

//     const newDot = { dot, x, y, dx, dy };
//     dots.push(newDot); // Add the new dot to the array
//     moveDot(newDot);
// }

function createDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    document.body.appendChild(dot);

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const dx = (Math.random() - 0.5) * 4; // Speed and direction
    const dy = (Math.random() - 0.5) * 4; // Speed and direction

    const newDot = { dot, x, y, dx, dy };
    dots.push(newDot); // Add the new dot to the array
    // Do not call moveDot here; it will be called in the animation loop
}

// function drawLines() {
//     const canvas = document.getElementById('line-canvas');
//     const context = canvas.getContext('2d');
//     const halfSize = 10; // Half the size of the dot

//     context.clearRect(0, 0, canvas.width, canvas.height);

//     for (let i = 0; i < dots.length; i++) {
//         for (let j = i + 1; j < dots.length; j++) {
//             context.beginPath();
//             context.moveTo(dots[i].x + halfSize, dots[i].y + halfSize);
//             context.lineTo(dots[j].x + halfSize, dots[j].y + halfSize);
//             context.stroke();
//         }
//     }
// }

function drawLines() {
    const canvas = document.getElementById('line-canvas');
    const context = canvas.getContext('2d');
    const halfSize = 10; // Half the size of the dot

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines and perpendiculars for each pair of dots
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            // Draw line between dots
            // context.beginPath();
            // context.moveTo(dots[i].x + halfSize, dots[i].y + halfSize);
            // context.lineTo(dots[j].x + halfSize, dots[j].y + halfSize);
            // context.stroke();

            // Draw perpendicular line
            drawPerpendicularLine(dots[i], dots[j]);
        }
    }
}


function handleCollision(dot1, dot2) {
    // Calculate the angle of collision
    const angle = Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x);
    
    // Calculate the initial velocities along the collision angle
    const v1i = dot1.dx * Math.cos(angle) + dot1.dy * Math.sin(angle);
    const v2i = dot2.dx * Math.cos(angle) + dot2.dy * Math.sin(angle);
    
    // Calculate the final velocities using 1D elastic collision equations
    const m1 = 1; // Mass of dot1 (can be adjusted)
    const m2 = 1; // Mass of dot2 (can be adjusted)
    const v1f = (v1i * (m1 - m2) + 2 * m2 * v2i) / (m1 + m2);
    const v2f = (v2i * (m2 - m1) + 2 * m1 * v1i) / (m1 + m2);
    
    // Update velocities along the collision angle
    dot1.dx = v1f * Math.cos(angle);
    dot1.dy = v1f * Math.sin(angle);
    dot2.dx = v2f * Math.cos(angle);
    dot2.dy = v2f * Math.sin(angle);
}

// function moveDot(dotObj) {
//     // Update the position
//     dotObj.x += dotObj.dx;
//     dotObj.y += dotObj.dy;

//     // Check for collision with walls and reverse direction
//     if (dotObj.x <= 0 || dotObj.x >= window.innerWidth - 20) {
//         dotObj.dx = -dotObj.dx;
//     }
//     if (dotObj.y <= 0 || dotObj.y >= window.innerHeight - 20) {
//         dotObj.dy = -dotObj.dy;
//     }

//     // Check for collision with other dots
//     for (let otherDot of dots) {
//         if (otherDot !== dotObj && isColliding(dotObj, otherDot)) {
//             handleCollision(dotObj, otherDot);
//             break; // Only handle one collision per frame for simplicity
//         }
//     }

//     const halfSize = 10; // Half the size of the dot
//     // Update the dot's position on the screen
//     dotObj.dot.style.left = dotObj.x + 'px';
//     dotObj.dot.style.top = dotObj.y + 'px';

//     // Redraw lines to reflect updated positions
//     drawLines();
//     // drawPerpendicularLine();

//     // Continue the animation
//     requestAnimationFrame(() => moveDot(dotObj));
// }

function moveDot(dotObj) {
    // Update the position
    dotObj.x += dotObj.dx;
    dotObj.y += dotObj.dy;

    // Check for collision with walls and reverse direction
    if (dotObj.x <= 0 || dotObj.x >= window.innerWidth - 20) {
        dotObj.dx = -dotObj.dx;
    }
    if (dotObj.y <= 0 || dotObj.y >= window.innerHeight - 20) {
        dotObj.dy = -dotObj.dy;
    }

    // Check for collision with other dots
    for (let otherDot of dots) {
        if (otherDot !== dotObj && isColliding(dotObj, otherDot)) {
            handleCollision(dotObj, otherDot);
            break; // Only handle one collision per frame for simplicity
        }
    }

    // Update the dot's position on the screen
    dotObj.dot.style.left = dotObj.x + 'px';
    dotObj.dot.style.top = dotObj.y + 'px';

    // animate()
}

function animate() {
    // Clear the canvas for fresh drawing
    const canvas = document.getElementById('line-canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Move and draw each dot
    dots.forEach(dot => {
        moveDot(dot);
    });

    // Draw lines and Voronoi diagram
    drawLines();
    drawVoronoi();

    // Continue the animation
    requestAnimationFrame(animate);
}


// This new animate function replaces the requestAnimationFrame call in moveDot
// function animate() {
//     dots.forEach(moveDot); // Move each dot
//     drawLines(); // Draw lines between dots
//     drawVoronoi(); // Draw the Voronoi diagram
//     requestAnimationFrame(animate); // Schedule the next frame
// }

// // Start the animation loop
// animate();


function isColliding(dot1, dot2) {
    const dx = dot1.x - dot2.x;
    const dy = dot1.y - dot2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 20; // Assuming each dot has a 20px diameter
}

function drawVoronoi() {
    const voronoiDiagram = d3.Delaunay.from(dots.map(dot => [dot.x + 10, dot.y + 10])).voronoi([0, 0, window.innerWidth, window.innerHeight]);

    const canvas = document.getElementById('voronoi-canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Voronoi cells
    context.beginPath();
    voronoiDiagram.render(context);
    context.strokeStyle = 'rgba(0,0,0,0.2)'; // Cell stroke style
    context.stroke();

    // Draw cell vertices
    context.beginPath();
    voronoiDiagram.renderBounds(context);
    context.strokeStyle = 'black'; // Bounds stroke style
    context.stroke();
}

function drawPerpendicularLine(dot1, dot2) {
    const canvas = document.getElementById('line-canvas');
    const context = canvas.getContext('2d');
    const halfSize = 10; // Half the size of the dot

    // Calculate midpoint
    const midX = (dot1.x + dot2.x) / 2 + halfSize;
    const midY = (dot1.y + dot2.y) / 2 + halfSize;

    // Calculate slope of the line connecting the two dots
    const slope = (dot2.y - dot1.y) / (dot2.x - dot1.x);

    // Determine the slope of the perpendicular line
    const perpSlope = -1 / slope;

    // Calculate points for the perpendicular line
    const lineLength = 300; // Length of the perpendicular line from the midpoint
    const dx = lineLength / Math.sqrt(1 + perpSlope * perpSlope);
    const dy = perpSlope * dx;

    // Draw the perpendicular line
    context.beginPath();
    context.moveTo(midX - dx, midY - dy);
    context.lineTo(midX + dx, midY + dy);
    context.strokeStyle = 'red'; // Color of the perpendicular line
    context.stroke();
}

function drawVoronoi() {
    // Compute the Voronoi diagram
    const points = dots.map(dot => [dot.x + halfSize, dot.y + halfSize]);
    const voronoiDiagram = d3.Delaunay.from(points).voronoi([0, 0, window.innerWidth, window.innerHeight]);

    const canvas = document.getElementById('voronoi-canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Voronoi cells
    context.beginPath();
    voronoiDiagram.render(context);
    context.strokeStyle = 'rgba(0,0,0,0.2)'; // Cell stroke style
    context.stroke();

    // Draw Voronoi edges
    voronoiDiagram.edges.forEach(edge => {
        if (edge) {
            const start = voronoiDiagram.delaunay.points[edge[0]];
            const end = voronoiDiagram.delaunay.points[edge[1]];

            context.beginPath();
            context.moveTo(start[0], start[1]);
            context.lineTo(end[0], end[1]);
            context.strokeStyle = 'black'; // Edge stroke style
            context.stroke();
        }
    });

    // Draw cell vertices
    context.beginPath();
    voronoiDiagram.renderBounds(context);
    context.strokeStyle = 'black'; // Bounds stroke style
    context.stroke();
}


// Create multiple dots
for (let i = 0; i < 3; i++) {
    createDot();
}

// Set canvas size after creating dots
setCanvasSize();

// Then draw the initial lines
drawLines();
