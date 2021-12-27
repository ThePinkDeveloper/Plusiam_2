import { GeneralPanel } from '../entities/general-panel.js';
import { Tag } from '../entities/tag.js';

export class MainMenu {

    GAMEON = 'GameOn';
    MAINMENU = 'MainMenu';

    // Initialize game
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mainMenuPanel = this.#createMainMenuPanel();
        this.title = this.#createTitle();
        this.newGame = this.#createTagNewGame();
        //this.tutorial = this.#createTagTutorial();
        this.exit = this.#createTagExit();
        // Nothing has been clicked
        this.clickedX = -1
        this.clickedY = -1
        // Get the canvas context from parameter
        this.tags = []
        this.#fillTagArray();
        
    }

    update(deltaTime) {
        this.clickedX = this.canvas.clickedX;
        this.clickedY = this.canvas.clickedY;
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
}