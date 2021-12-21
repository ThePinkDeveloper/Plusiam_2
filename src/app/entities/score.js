export class Score {

    constructor(game) {
        this.game = game;
        this.x = 402;
        this.y = 50;
        this.score = 0;
        this.size = 50;
        this.color = 'white';
    }

    draw() {
        this.game.ctx.textAlign = 'right';
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.font = `italic ${this.size}px Arial`;
        this.game.ctx.shadowColor = '#111';
        this.game.ctx.shadowBlur = 10;
        this.game.ctx.shadowOffsetX = 2;
        this.game.ctx.shadowOffsetY = 4;
        this.game.ctx.fillText(this.score, this.x, this.y);
        this.game.ctx.textAlign = 'left';
        this.game.ctx.fillText('Score:', 10, this.y);
        this.game.ctx.shadowBlur = 0;
        this.game.ctx.shadowOffsetX = 0;
        this.game.ctx.shadowOffsetY = 0;
    }

}