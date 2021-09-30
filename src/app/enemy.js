export class Enemy {

    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }

    update() {

    }

    draw() {
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}