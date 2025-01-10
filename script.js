const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const carWidth = 40;
const carHeight = 70;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 10;
let obstacles = [];
let score = 0;
let gameOver = false;

// Contrôle de la voiture
document.addEventListener('keydown', moveCar);

function moveCar(event) {
    if (event.key === 'ArrowLeft' && carX > 0) {
        carX -= 20;
    } else if (event.key === 'ArrowRight' && carX < canvas.width - carWidth) {
        carX += 20;
    }
}

// Générer des obstacles
function generateObstacle() {
    const obstacleX = Math.floor(Math.random() * (canvas.width - carWidth));
    obstacles.push({ x: obstacleX, y: 0 });
}

// Mettre à jour le jeu
function update() {
    if (gameOver) return;

    if (Math.random() < 0.02) { // Générer un nouvel obstacle
        generateObstacle();
    }

    obstacles.forEach(obstacle => {
        obstacle.y += 5; // Vitesse de l'obstacle
    });

    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height); // Garder les obstacles à l'écran

    // Vérifier les collisions
    obstacles.forEach(obstacle => {
        if (obstacle.y + carHeight >= carY && obstacle.y <= carY + carHeight &&
            obstacle.x < carX + carWidth && obstacle.x + carWidth > carX) {
            gameOver = true;
            alert('Game Over! Score: ' + score);
            document.location.reload();
        }
    });

    score++;
}

// Dessiner le jeu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner la voiture
    ctx.fillStyle = 'blue';
    ctx.fillRect(carX, carY, carWidth, carHeight);

    // Dessiner les obstacles
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, carWidth, carHeight);
    });

    // Afficher le score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
