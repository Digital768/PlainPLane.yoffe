import Bomb from './bombs.js';

export default class BombController {
    bombs = []

    constructor(canvas, bombs=[]) {
        this.canvas = canvas;
        this.bombs = bombs;
    }

    // draw(ctx) {
    //     this.bullets.forEach((bullet) => {
    //         if (this.isBulletOffScreen(bullet)) {
    //             const index = this.bullets.indexOf(bullet);
    //             this.bullets.splice(index, 1);
    //         }
    //         bullet.draw(ctx);
    //     });
    // }
    bombCollision(planeX, planeY, planeR, bombX, bombY, bombR) {
        //affirm collision 
        // delete plane and bomb
        // clear interval
    }
}