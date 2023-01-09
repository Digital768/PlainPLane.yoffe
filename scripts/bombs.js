export default class Bomb {
    constructor(bombImage, x, y, bombDamage) {
        this.radius = 11;
        this.x = x;
        this.y = y;
        this.color = 'purple';
        this.distance;
        this.health = 5;
        // this.hitBox = { x: this.x, y: this.y, radius: this.radius };
        
        this.bombImg = new Image()
        this.bombImg.src = bombImage;

        bombDamage = 100;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.drawImage(this.bombImg, this.x - this.bombImg.width / 2, this.y - this.bombImg.height / 2)

    }

    takeDamage(damage) {
        this.health -= damage;
    }

    
    bombCollision(planeX, planeY, planeR, bombX, bombY, bombR) {
        let a = planeR + bombR;
        let x = planeX - bombX;
        let y = planeY - bombY;

        if (a > Math.sqrt((x * x) + (y * y))) {
            // return true;
            console.log('boom!');
            player.takeDamage(bombDamage)
        } else {
            return false;
        }

    }
}
