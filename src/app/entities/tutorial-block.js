import { Block } from './block.js';

export class TutorialBlock extends Block {

    TOTAL_ROWS = 12;
    MAX_VALUE = 9;

    constructor(game, column, row, value) {
        super();
        this.game = game;
        this.spriteWidth = 65;
        this.spriteHeight = 65;
        this.image = document.getElementById('numbers');
        this.isStopped = true;
        this.column = column;
        this.row = row;

        this.width = 65;
        this.height = 65;
        this.x = this.column * this.width - 16;
        this.y = this.height * this.row;

        this.value = value;
        this.selected = false;
        this.available = true;
    }

    update(deltaTime) {
        
    }

    draw() {
        this.game.ctx.drawImage(this.image, (this.value - 1) * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        if (this.selected) {
            this.game.ctx.drawImage(this.image, 9 * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

}