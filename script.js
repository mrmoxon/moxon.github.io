const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    }

    // Reset ball when it goes out of bounds
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = 2;
        ball.speedY = 2;
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
