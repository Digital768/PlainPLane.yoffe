export default class Bomb {
    constructor(bombImage, x, y, bombDamage) {
        this.radius = 11;
        this.x = x;
        this.y = y;
        this.distance;
        this.health = 5;

        this.bombImg = new Image()
        this.bombImg.src = bombImage;
    }

    draw(ctx) {
        ctx.drawImage(this.bombImg, this.x - this.bombImg.width / 2, this.y - this.bombImg.height / 2)
    }

    takeDamage(damage) {
        this.health -= damage;
    }
}
