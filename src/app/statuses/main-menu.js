import { GeneralPanel } from '../entities/general-panel.js';
import { Tag } from '../entities/tag.js';

export class MainMenu {

    GAMEON = 'GameOn';
    MAINMENU = 'MainMenu';

    // Initialize game
    constructor(ctx) {
        this.mainMenuPanel = this.#createMainMenuPanel();
        this.title = this.#createTitle();
        this.newGame = this.#createTagNewGame();
        //this.tutorial = this.#createTagTutorial();
        this.exit = this.#createTagExit();
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
                return this.GAMEON;
            }
        }
        return this.MAINMENU;
    }

    draw() {
        this.#resetClick();
        this.mainMenuPanel.draw();
        this.title.draw();
        this.newGame.draw();
        //this.tutorial.draw();
        this.exit.draw();
    }


    #createMainMenuPanel() {
        return new GeneralPanel(this);
    }

    #createTitle() {
        return new Tag(this, 'PLUSIAM', 206, 100, 70, 'white', 'center');
    }

    #createTagNewGame() {
        return new Tag(this, 'New Game', 206, 320, 50, 'white', 'center');
    }

    #createTagTutorial() {
        return new Tag(this, 'Play tutorial', 206, 500, 50, 'white', 'center');
    }

    #createTagExit() {
        return new Tag(this, 'Exit', 390, 750, 30, 'white', 'right');
    }

    #fillTagArray() {
        this.tags.push(this.newGame, this.exit);
    }

    #resetClick() {
        this.clickedX = -1;
        this.clickedY = -1;
    }
}