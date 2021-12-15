export class Block {

    TOTAL_ROWS = 12;
    MAX_VALUE = 9;

    constructor(game, column, row) {
        this.game = game;
        this.spriteWidth = 65;
        this.spriteHeight = 65;
        this.markedForDeletion = false;
        this.image = document.getElementById('numbers');
        this.gravity = 0.01;
        this.isStopped = false;
        this.column = column;
        this.row = row;

        this.width = 65;
        this.height = 65;
        this.x = 10 + this.column * this.width;
        this.y = - this.height - this.height * ( this.TOTAL_ROWS - this.row);
        this.speedY = 0;

        this.value = Math.floor(Math.random() * this.MAX_VALUE + 1);
        this.selected = false;
        this.available = true;
    }

    update(deltaTime) {
        if (this.y > this.game.ctx.canvas.height - this.height * ( this.TOTAL_ROWS - this.row - 2) - 11) {
            this.y = this.game.ctx.canvas.height - this.height * ( this.TOTAL_ROWS - this.row - 2) - 11;
            this.speedY = 0;
            this.isStopped = true;
        }
        if (!this.isStopped) {
            this.speedY = this.speedY + this.gravity;
            this.y += this.speedY * deltaTime;
        }
    }

    draw() {
        this.game.ctx.drawImage(this.image, (this.value - 1) * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        if (this.selected) {
            this.game.ctx.drawImage(this.image, 9 * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

}