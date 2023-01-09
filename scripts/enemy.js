import player from './player.js';
export default class Enemy {

    constructor(enemyImage, x, y) {
        this.x = x;
        this.y = y;
        this.radius = 42;

        this.enemyImage = new Image();
        this.enemyImage.src = enemyImage;

        canvas.addEventListener('mousedown', this.mouseDown);
        canvas.addEventListener('mouseup', this.mouseUp);

        this.mouse = { click: false, x: 0, y: 0 }
    }

    draw(ctx) {
        // enemy hitbox
        this.correct();

        ctx.save();
        ctx.fillStyle = 'grey';
        ctx.beginPath();
        ctx.arc(this.x - 2, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        ctx.save();
        this.drawImage(ctx, this.enemyImage, this.x, this.y, 0.09, this.angle);
        ctx.restore();
    }

    drawImage(ctx, image, x, y, scale, rotation) {
        ctx.setTransform(scale, 0, 0, scale, x, y);
        ctx.rotate(rotation);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
    //find angle between 2 planes 
    correct() {
        // const dx = this.x - player.x;
        // const dy = this.y - player.y;
        const dx = this.x - this.mouse.x;
        const dy = this.y - this.mouse.y;

        let theta = Math.atan2(dy, dx) + 1.5; 
        this.angle = theta;

    }
    mouseDown = (e) => {
        this.mouse.click = true;
        this.mouse.x = e.x;
        this.mouse.y = e.y;
        console.log(this.mouse.x, this.mouse.y);
    }

    mouseUp = (e) => {
        this.mouse.click = false;
    }

    // change as needed
    // shoot() {
    //     if (this.shootPressed) {
    //         const speed = 30;
    //         const delay = 6;
    //         const damage = 1;
    //         const velocityX = speed * Math.cos(this.angle);
    //         const velocityY = speed * Math.sin(this.angle);
    //         const bulletX = this.x; // bullet's start postion
    //         const bulletY = this.y;
    //         this.bulletController.shoot(bulletX, bulletY, velocityX, velocityY, this.angle, damage, delay);
    //     }
    // }
}