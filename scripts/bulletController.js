import Bullet from './Bullets.js';

export default class BulletController {
    bullets = [];
    timerUntillNextBullet = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }

    shoot(x, y, velocityX, velocityY, bulletAngle, damage, delay) {
        if (this.timerUntillNextBullet <= 0) {
            this.bullets.push(new Bullet(x, y, velocityX, velocityY, bulletAngle, damage));
            this.timerUntillNextBullet = delay;
        }
        this.timerUntillNextBullet--;
    }

    draw(ctx) {
        this.bullets.forEach((bullet) => {
            if (this.isBulletOffScreen(bullet)) {
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
            bullet.draw(ctx);
        });
    }

    isBulletOffScreen(bullet) {
        return bullet.y <= -bullet.height;           // needs testing & fixing
    }

    collideWith(sprite) {
        return this.bullets.some((bullet) => {
            if (bullet.collideWith(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
                return true;
            }
            return false;
        });
    }
}