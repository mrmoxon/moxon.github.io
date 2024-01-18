document.getElementById('color-change-button').addEventListener('click', function() {
    const body = document.body;
    if (body.style.backgroundColor === 'white') {
        body.style.backgroundColor = 'blue'; // Change to your preferred color
    } else {
        body.style.backgroundColor = 'white';
    }
});

const dots = []; // Array to store all dot objects

function createDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    document.body.appendChild(dot);

    // Starting position and velocity
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const dx = (Math.random() - 0.5) * 4; // Speed and direction
    const dy = (Math.random() - 0.5) * 4; // Speed and direction

    const newDot = { dot, x, y, dx, dy };
    dots.push(newDot); // Add the new dot to the array
    moveDot(newDot);
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

function moveDot(dotObj) {
    // Update the position
    dotObj.x += dotObj.dx;
    dotObj.y += dotObj.dy;

    // Check for collision with walls and reverse direction
    if (dotObj.x + dotObj.dx > window.innerWidth - 20 || dotObj.x + dotObj.dx < 0) {
        dotObj.dx = -dotObj.dx;
    }
    if (dotObj.y + dotObj.dy > window.innerHeight - 20 || dotObj.y + dotObj.dy < 0) {
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

    // Continue the animation
    requestAnimationFrame(() => moveDot(dotObj));
}


function isColliding(dot1, dot2) {
    const dx = dot1.x - dot2.x;
    const dy = dot1.y - dot2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 20; // Assuming each dot has a 20px diameter
}

// Create multiple dots
for (let i = 0; i < 10; i++) {
    createDot();
}

// Inside your moveDot function, replace the collision handling with:
for (let otherDot of dots) {
    if (otherDot !== dotObj && isColliding(dotObj, otherDot)) {
        handleCollision(dotObj, otherDot);
        break; // Only handle one collision per frame for simplicity
    }
}
