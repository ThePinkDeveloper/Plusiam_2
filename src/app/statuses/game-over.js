import { GeneralPanel } from '../entities/general-panel.js';
import { Tag } from '../entities/tag.js';

export class GameOver {

    GAMEOVER = 'GameOver';
    MAINMENU = 'MainMenu';

    // Initialize game
    constructor(canvas) {
        this.canvas = canvas;
        this.gameOverPanel = this.#createGameOverPanel();
        this.gameOver = this.#createTagGameOver();
        this.mainMenu = this.#createTagGoToMainMenu();
        // Nothing has been clicked
        this.clickedX = -1
        this.clickedY = -1;
        // Get the canvas context from parameter
        this.ctx = canvas.getContext('2d');
        this.tags = []
        this.#fillTagArray();
        
    }

    update(deltaTime) {
        this.clickedX = ctx.canvas.clickedX;
        this.clickedY = ctx.canvas.clickedY;
        if (this.clickedX != -1) {
            // It controls if you clicked inside a block and get it
            const tagClicked = this.tags.find ( tag => 
                    this.clickedX > tag.x - tag.width / 2 
                && this.clickedX < tag.x + tag.width / 2
                && this.clickedY < tag.y 
                && this.clickedY > tag.y - tag.height);
            
            if (!!tagClicked) {
                return this.MAINMENU;
            }
        }
        return this.GAMEOVER;
    }

    draw() {
        this.gameOverPanel.draw();
        this.gameOver.draw();
        this.mainMenu.draw();
    }

    #createGameOverPanel() {
        return new GeneralPanel(this);
    }

    #createTagGameOver() {
        return new Tag(this, 'Game Over', 206, 320, 50, 'white', 'center');
    }

    #createTagGoToMainMenu() {
        return new Tag(this, 'Main Menu', 390, 750, 30, 'white', 'right');
    }

    #fillTagArray() {
        this.tags.push(this.gameOver, this.mainMenu);
    }
}