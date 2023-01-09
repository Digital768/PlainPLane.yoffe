export default class Bullet {
    constructor(x, y, velocityX, velocityY, bulletAngle, damage) {
        this.bulletAngle = bulletAngle;
        this.x = x;
        this.y = y;

        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.damage = damage;
        this.width = 5;
        this.height = 20;
        this.color = 'orange';

        this.rightSideX = this.width * Math.cos(this.bulletAngle) + this.x;
        this.rightSideY = this.width * Math.sin(this.bulletAngle) + this.y;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;

        this.y -= this.velocityX;
        this.x += this.velocityY;

        this.rightSideY -= this.velocityX;
        this.rightSideX += this.velocityY;

        ctx.translate(this.x, this.y);
        ctx.rotate(this.bulletAngle);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.color;
        // ctx.roundRect(-2, -30, this.width, this.height, 5);
        ctx.restore();
    }

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