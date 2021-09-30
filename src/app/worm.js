import { Enemy } from './enemy.js';

export class Worm extends Enemy {

    constructor(game) {
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = game.ctx.canvas.width;
        this.y = Math.random() * game.ctx.canvas.height;
        this.image = document.getElementById('worm');
        this.speedX = -0.05;
        this.frameCounter = 0;
        this.frameSize = 6;
        this.currentFrame = 0;

    }

    spriteAnimation(deltaTime, frameRate) {
        this.frameCounter += deltaTime;
        if (this.frameCounter > frameRate) {
            this.frameCounter = 0;
            this.currentFrame++;
            if (this.currentFrame >= this.frameSize) {
                this.currentFrame = 0;
            }
        }
    }

    update(deltaTime) {
        if (this.x < -this.width) {
            this.markedForDeletion = true;
        }
        this.x += this.speedX * deltaTime;
        this.spriteAnimation(deltaTime, 100);
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.currentFrame * this.spriteWidth , 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }


}