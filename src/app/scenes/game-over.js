import { GeneralPanel } from '../entities/general-panel.js';
import { MainMenu } from '../scenes/main-menu.js';
import { Tag } from '../entities/tag.js';
import { Constants } from '../constants.js';
import lang from '../lang/lang.js';

export class GameOver {

    // Initialize game
    constructor(canvas, stage) {
        this.canvas = canvas;
        this.stage = stage;
        this.gameOverPanel = this.createGameOverPanel();
        this.gameOver = this.createTagGameOver();
        this.mainMenu = this.createTagGoToMainMenu();
        this.yourScore = this.createTagYourScore();
        this.score = this.createTagFinalScore(canvas.finalScore)
        // Nothing has been clicked
        this.clickedX = -1
        this.clickedY = -1;
        // Get the canvas context from parameter
        this.ctx = canvas.getContext('2d');
        this.tags = []
        this.fillTagArray();
        this.nextSceneKey = Constants.GAMEOVER
    }

    update(deltaTime) {
        this.score.text = this.canvas.finalScore;
        this.clickedX = this.ctx.canvas.clickedX;
        this.clickedY = this.ctx.canvas.clickedY;
        if (this.clickedX != -1) {
            // It controls if you clicked inside a tag and get it
            const tagClicked = this.tags.find ( tag => 
                   this.clickedX > tag.x - tag.width
                && this.clickedX < tag.x
                && this.clickedY > tag.y - tag.height 
                && this.clickedY < tag.y);
            
            if (!!tagClicked && tagClicked.text === lang.game_over.main_menu) {
                const mainMenu = this.stage.get(Constants.MAINMENU);
                const newMainMenu = new MainMenu(this.canvas, this.stage);
                newMainMenu.soundEnabled = mainMenu.soundEnabled;
                this.stage.set(Constants.MAINMENU, newMainMenu);
                this.nextSceneKey = Constants.MAINMENU;
                Constants.playSound('select');
            }
        } else {
            this.nextSceneKey = Constants.GAMEOVER;
        }
    }

    draw() {
        this.gameOverPanel.draw();
        this.gameOver.draw();
        this.yourScore.draw();
        this.score.draw();
        this.mainMenu.draw();
    }

    createGameOverPanel() {
        return new GeneralPanel(this.canvas);
    }

    createTagGameOver() {
        return new Tag(this, 'Game Over', 206, 300, 50, 'white', 'center');
    }

    createTagYourScore() {
        return new Tag(this, lang.game_over.your_score, 206, 400, 30, 'white', 'center');
    }

    createTagFinalScore(score) {
        return new Tag(this, `${score}`, 206, 460, 50, 'white', 'center');
    }

    createTagGoToMainMenu() {
        return new Tag(this, lang.game_over.main_menu, 390, 750, 30, 'white', 'right');
    }

    fillTagArray() {
        this.tags.push(this.gameOver, this.mainMenu);
    }

    getNextSceneKey() {
        return this.nextSceneKey;
    }
}