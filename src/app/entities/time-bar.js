import { Constants } from "../constants.js";
import { GameOver } from "../scenes/game-over.js";

export class TimeBar {

    constructor(game, stage) {
        this.time = Constants.INITIAL_TIME;
        this.game = game;
        this.stage = stage;
        this.canvas = game.canvas;
        this.x = 10;
        this.y = 80;
        this.height = 10; 
        this.color = Constants.BAR_NORMAL_COLOR;
        this.width = Constants.BAR_INITIAL_WIDTH;
        this.isFirstWarningSoundPlayed = false;
        this.isSecondWarningSoundPlayed = false;
    }
    
    update(deltaTime) {
        if (this.time === Constants.INITIAL_TIME) {
            this.isFirstWarningSoundPlayed = false;
            this.isSecondWarningSoundPlayed = false;
        }
        if (this.width <= 0) {
            this.time = Constants.INITIAL_TIME;
            this.width = Constants.BAR_INITIAL_WIDTH;
            this.canvas.finalScore = this.game.score.score;
            this.game.score.score = 0;
            this.color = Constants.BAR_NORMAL_COLOR;
            this.game.blocks = this.game.fillGame(this.game.TOTAL_COLUMNS, this.game.TOTAL_ROWS);
            Constants.playSound('end-game');
            this.stage.set(Constants.GAMEOVER, new GameOver(this.canvas, this.stage));
            return Constants.GAMEOVER;
        }
        const timeReducer = this.game.score.score < 1000 ? this.game.score.score : 1000;
        this.time = this.time - Number.parseInt(deltaTime * timeReducer / 1000);
        this.width = this.time / Constants.INITIAL_TIME * Constants.BAR_INITIAL_WIDTH;
        if (this.width > Constants.BAR_INITIAL_WIDTH / 2) {
            this.color = Constants.BAR_NORMAL_COLOR;
            return Constants.GAMEON;
        }
        if (this.width < Constants.BAR_INITIAL_WIDTH / 4) {
            this.color = Constants.BAR_CRITICAL_COLOR;
            if (!this.isSecondWarningSoundPlayed) {
                Constants.playSound('second-warning');
                this.isSecondWarningSoundPlayed = true;
            }
            return Constants.GAMEON;
        }
        this.color = Constants.BAR_WARNING_COLOR;
        if (!this.isFirstWarningSoundPlayed) {
            Constants.playSound('first-warning');
            this.isFirstWarningSoundPlayed = true;
        }
        return Constants.GAMEON;
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
        this.game.ctx.strokeRect(this.x, this.y - 1, Constants.BAR_INITIAL_WIDTH, this.height + 2);
    }

}