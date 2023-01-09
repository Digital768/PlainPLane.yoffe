export default class Enemy {

    constructor(enemyImage, x, y, bulletController, damage) {
        this.x = x;
        this.y = y;
        this.radius = 42;
        this.health = 10;

        this.damage = damage;

        this.bulletController = bulletController;

        this.enemyImage = new Image();
        this.enemyImage.src = enemyImage;

        canvas.addEventListener('mousedown', this.mouseDown);
        canvas.addEventListener('mouseup', this.mouseUp);

        this.mouse = { click: false, x: 0, y: 0 }
    }

    displayHealth(ctx) {
        ctx.save()
        ctx.font = "10px Arial";
        ctx.strokeStyle = "red";
        ctx.strokeText(this.health, this.x - 9  , this.y - this.radius - 3);
        ctx.restore();
    }

    draw(ctx) {
        // enemy hitbox
        this.correct();
        this.displayHealth(ctx);

        ctx.save();
        ctx.restore();
        ctx.save();
        this.drawImage(ctx, this.enemyImage, this.x, this.y, 0.09, this.angle);
        ctx.restore();

        this.shoot();
    }

    drawImage(ctx, image, x, y, scale, rotation) {
        ctx.setTransform(scale, 0, 0, scale, x, y);
        ctx.rotate(rotation);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
    //find angle between 2 planes 
    correct() {
        const dx = this.x - this.mouse.x;
        const dy = this.y - this.mouse.y;

        let theta = Math.atan2(dy, dx) + 1.5;
        this.angle = theta;
    }
    mouseDown = (e) => {
        this.mouse.click = true;
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    }

    mouseUp = (e) => {
        this.mouse.click = false;
    }

    shoot() {
        const speed = 2;
        const delay = 54;
        const damage = 0;
        const velocityX = -speed * Math.cos(this.angle);
        const velocityY = -speed * Math.sin(this.angle);
        const bulletX = this.x; // bullet's start postion
        const bulletY = this.y;
        this.bulletController.shoot(bulletX, bulletY, velocityX, velocityY, this.angle, damage, delay);
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    //bullet collision with enemy plane
    collideWith(sprite) {
        if (
            Math.pow(this.x - sprite.x, 2) + Math.pow(this.y - sprite.y, 2) <= Math.pow(sprite.radius, 2) ||
            Math.pow(this.rightSideX - sprite.x, 2) + Math.pow(this.rightSideY - sprite.y, 2) <= Math.pow(sprite.radius, 2)) {
            sprite.takeDamage(this.damage);
            return true;
        }
        return false;
    }
}