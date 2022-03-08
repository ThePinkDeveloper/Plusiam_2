export class TimeBar {

    GAMEOVER = 'GameOver';
    GAMEON = 'GameOn';
    INITIAL_WIDTH = 392;
    NORMAL_COLOR= 'white';
    WARNING_COLOR = 'yellow';
    CRITICAL_COLOR = 'red';
    INITIAL_TIME = 10000;

    constructor(game) {
        this.time = this.INITIAL_TIME;
        this.game = game;
        this.canvas = game.canvas;
        this.x = 10;
        this.y = 80;
        this.height = 10; 
        this.color = this.NORMAL_COLOR;
        this.width = this.INITIAL_WIDTH;
    }

    update(deltaTime) {
        if (this.width <= 0) {
            this.time = this.INITIAL_TIME;
            this.width = this.INITIAL_WIDTH;
            this.canvas.finalScore = this.game.score.score;
            this.game.score.score = 0;
            this.color = this.NORMAL_COLOR;
            this.game.blocks = this.game.fillGame(this.game.TOTAL_COLUMNS, this.game.TOTAL_ROWS);
            return this.GAMEOVER;
        }
        const timeReducer = this.game.score.score < 1000 ? this.game.score.score : 1000;
        this.time = this.time - Number.parseInt(deltaTime * timeReducer / 1000);
        this.width = this.time / this.INITIAL_TIME * this.INITIAL_WIDTH;
        if (this.width > this.INITIAL_WIDTH / 2) {
            this.color = this.NORMAL_COLOR;
            return this.GAMEON;
        }
        if (this.width < this.INITIAL_WIDTH / 4) {
            this.color = this.CRITICAL_COLOR;
            return this.GAMEON;
        }
        this.color = this.WARNING_COLOR;

        return this.GAMEON;
    }

    draw() {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.shadowColor = '#111';
        this.game.ctx.shadowBlur = 10;
        this.game.ctx.shadowOffsetX = 2;
        this.game.ctx.shadowOffsetY = 4;
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.shadowBlur = 0;
        this.game.ctx.shadowOffsetX = 0;
        this.game.ctx.shadowOffsetY = 0;
        this.game.ctx.strokeStyle = this.color;
        this.game.ctx.strokeRect(this.x, this.y - 1, this.INITIAL_WIDTH, this.height + 2);
    }

}