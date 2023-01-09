import Player from "./player.js";
import Bomb from "./bombs.js";
import BulletController from "./bulletController.js";
import Enemy from "./enemy.js";
// import BombController from "./bombController.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

//pause functionality
let interval = setInterval(gameLoop, 1000 / 60);
let paused = false;
ctx.font = '50px Georgia';

const playerBulletController = new BulletController(canvas);
const player = new Player(
    "../pictures/player.plane.png",
    canvas.width / 2,
    canvas.height / 2,
    playerBulletController
);

let enemies = []

const bombImage = "../pictures/bombSpriteYahels.png";

const bombs = [new Bomb(bombImage, ...getRandomXY()), new Bomb(bombImage, ...getRandomXY()), new Bomb(bombImage, ...getRandomXY()),
new Bomb(bombImage, ...getRandomXY()), new Bomb(bombImage, ...getRandomXY()), new Bomb(bombImage, ...getRandomXY())];

function getRandomXY() {
    return [(1920 - 12) * Math.random() + 12, (920 - 12) * Math.random() + 12]
}

function addBombs(bombs, counter) {
    if (bombs.length < 13 + Math.floor(counter / 600) && bombs.length < 31) {
        bombs.push(new Bomb(bombImage, ...getRandomXY()))
    }
}


function addEnemy(enemies, counter) {
    if (enemies.length < 1 + Math.floor(counter / 600) && enemies.length < 2) {
        enemies.push(new Enemy("../pictures/Enemy.plane.png", ...getRandomXY(), new BulletController(canvas)))
    }
}


let count = 0;

function drawScore(score) {
    ctx.save()
    ctx.font = "40px Arial";
    ctx.strokeStyle = "red";
    ctx.strokeText(`Score: ${score}`, 30, 50);
    ctx.restore();
}

//enemy
let bombExplosion = new Audio('../sounds/8bit_bomb_explosion.wav');

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    enemies.forEach(enemy => {
        enemy.draw(ctx)
        enemy.bulletController.draw(ctx)
    })

    enemies.forEach((enemy) => {
        if (playerBulletController.collideWith(enemy)) {
            if (enemy.health <= 0) {
                const index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
                score += 10;
            }
        } else {
            enemy.draw(ctx);
        }
    });

    addBombs(bombs, count);
    addEnemy(enemies, count)
    playerBulletController.draw(ctx);

    bombs.forEach((bomb) => {
        if (playerBulletController.collideWith(bomb)) {
            if (bomb.health <= 0) {
                const index = bombs.indexOf(bomb);
                bombs.splice(index, 1);
                bombExplosion.play();
                score++;
            }
        } else {
            bomb.draw(ctx);
        }
    });
    drawScore(score)
    count++;
}

// pause functionality 
let pauseSound = new Audio('../sounds/Continue.wav');
let continueSound = new Audio('../sounds/Pause.wav');

const keydown = (e) => {
    if (e.key === "p") {
        paused = !paused;
        if (paused) {
            pauseSound.play();
            let pauseImage = new Image()
            pauseImage.src = '../pictures/game-paused.png';

            let scale = 400
            clearInterval(interval)
            ctx.drawImage(pauseImage, (window.innerWidth - scale) / 2, (window.innerHeight - scale - 60) / 2, scale, scale)
        } else {
            continueSound.play();
            interval = setInterval(gameLoop, 1000 / 60);
        }
    }
}
canvas.addEventListener('keydown', keydown);