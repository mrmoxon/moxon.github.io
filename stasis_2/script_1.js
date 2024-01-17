console.log("Script started"); // This will output to the browser console

const canvas = document.getElementById('pongCanvas');
if (canvas) {
    console.log("Canvas found");
} else {
    console.error("Canvas not found");
}

const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas resized: ${canvas.width}x${canvas.height}`);
}

// Call resizeCanvas on load and on window resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game variables
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 2,
    speedY: 2
};

// Update game state
function updateGame() {
    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Collision with top/bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
        console.log("Collision with top/bottom");
    }

    // Reset ball when it goes out of bounds
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = ball.speedX;
        ball.speedY = ball.speedY;
        console.log("Ball reset");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    requestAnimationFrame(updateGame);
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Start game
updateGame();
