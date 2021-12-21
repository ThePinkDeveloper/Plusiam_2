import { GeneralPanel } from '../entities/general-panel.js';
import { Tag } from '../entities/tag.js';

export class GameOver {

    GAMEOVER = 'GameOver';
    MAINMENU = 'MainMenu';

    // Initialize game
    constructor(ctx) {
        this.gameOverPanel = this.#createGameOverPanel();
        this.gameOver = this.#createTagGameOver();
        this.mainMenu = this.#createTagGoToMainMenu();
        // Nothing has been clicked
        this.clickedX = -1;
        this.clickedY = -1;
        // Get the canvas context from parameter
        this.ctx = ctx;
        // Add a 'click' event listener to canvas that controls if any block has been clicked
        // When the player clicks inside the canvas you get x and y coords relative to the canvas context
        this.ctx.canvas.addEventListener('click', $event => {
            // This is the bounding rectangle of the canvas
            const rect = this.ctx.canvas.getBoundingClientRect();
            // As click event takes the x and y coord relative to the screen, we need to know where is the canvas
            // relative to the screen.

            this.clickedX = $event.x - Math.floor(rect.left);
            //                         ^__ Amount of pixels the canvas is xTranslated from the left side of the screen
            //              ^_ xCoord where you have clicked relative to the left side of the screen
            this.clickedY = $event.y - Math.floor(rect.top);
            //                         ^__ Amount of pixels the canvas is yTranslated from the top side of the screen
            //              ^_ yCoord where you have clicked relative to the top side of the screen
        });

        this.tags = []
        this.#fillTagArray();
        
    }

    update(deltaTime) {
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
        this.#resetClick();
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

    #resetClick() {
        this.clickedX = -1;
        this.clickedY = -1;
    }
}