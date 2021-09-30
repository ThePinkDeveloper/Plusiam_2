import { Enemy } from './enemy.js';

export class VerySimple extends Enemy {

    constructor(game) {
        super(game);
        this.spriteWidth = 16;
        this.spriteHeight = 16;
        this.width = this.spriteWidth * 5 ;
        this.height = this.spriteHeight * 5;
        this.x = game.ctx.canvas.width;
        this.y = Math.random() * game.ctx.canvas.height;
        this.image = document.getElementById('verySimple');
        this.speedX = -0.05;
    }

    update(deltaTime) {
        if (this.x < -this.width) {
            this.markedForDeletion = true;
        }
        this.x += this.speedX * deltaTime;
        
    }

    draw() {
        this.game.ctx.drawImage(this.image, 0 , 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }


}