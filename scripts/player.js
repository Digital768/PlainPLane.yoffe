export default class Player {

    constructor(playerImage, x, y, bulletController) {

        this.x = x;
        this.y = y;
        this.bulletController = bulletController;
        this.radius = 40;
        this.angle = 0;

        this.spriteWidth = 1024;
        this.spriteHeight = 1024;

        this.health = 20;

        this.playerImg = new Image()
        this.playerImg.src = playerImage;

        this.mouse = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            click: false
        }

        canvas.addEventListener('keydown', this.keydown);
        canvas.addEventListener('keyup', this.keyup);
        canvas.addEventListener('mousedown', this.mouseDown);
        canvas.addEventListener('mouseup', this.mouseUp);

    }

    mouseDown = (e) => {
        this.mouse.click = true;
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    }

    mouseUp = (e) => {
        this.mouse.click = false;
    }

    draw(ctx) {
        this.move();

        if (this.mouse.click) {
            ctx.lineWidth = 0.25;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.mouse.x, this.mouse.y);
            ctx.stroke();
        }

        // player hitbox
        ctx.save();
        this.drawImage(ctx, this.playerImg, this.x, this.y, 0.1, this.angle);
        ctx.restore()

        this.shoot();
    }

    drawImage(ctx, image, x, y, scale, rotation) {
        ctx.setTransform(scale, 0, 0, scale, x, y);
        ctx.rotate(rotation);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }

    move() {
        const dx = this.x - this.mouse.x;
        const dy = this.y - this.mouse.y;

        let theta = Math.atan2(dy, dx) - 1.6;
        this.angle = theta;

        if (this.mouse.x != this.x) {
            this.x -= dx / 40;
        }
        if (this.mouse.y != this.y) {
            this.y -= dy / 40;
        }
    }

    shoot() {
        if (this.shootPressed) {
            const speed = 30;
            const delay = 8;
            const damage = 1;
            const velocityX = speed * Math.cos(this.angle);
            const velocityY = speed * Math.sin(this.angle);
            const bulletX = this.x; // bullet's start postion
            const bulletY = this.y;
            this.bulletController.shoot(bulletX, bulletY, velocityX, velocityY, this.angle, damage, delay);
        }
    }

    keydown = (e) => {
        if (e.code === "Space") {
            this.shootPressed = true;
        }
    }

    keyup = (e) => {
        if (e.code === "Space") {
            this.shootPressed = false;
        }
    }

    takeDamage(damage) {
        this.health -= damage;
    }
}