export class GamePanel {

    constructor(game) {
        this.game = game;
        this.image = document.getElementById('gamePanel');
        this.x = 0
        this.y = 0
        
    }

    draw() {
        this.game.ctx.shadowColor = '#116';
        this.game.ctx.shadowBlur = 10;
        this.game.ctx.shadowOffsetX = 5;
        this.game.ctx.shadowOffsetY = 5;
        this.game.ctx.drawImage(this.image, this.x, this.y);
        this.game.ctx.shadowBlur = 0;
        this.game.ctx.shadowOffsetX = 0;
        this.game.ctx.shadowOffsetY = 0;
    }

}