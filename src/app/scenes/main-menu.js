import { Constants } from '../constants.js';
import { GeneralPanel } from '../entities/general-panel.js';
import { Game } from './game.js'
import { Tag } from '../entities/tag.js';
import { SoundSwitch } from '../entities/sound-switch.js';
import { Tutorial } from './tutorial.js';
import lang from '../lang/lang.js';

export class MainMenu {

    // Initialize game
    constructor(canvas, stage) {
        this.increment = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mainMenuPanel = this.createMainMenuPanel();
        this.tagPlusiam = this.createTagPlusiam();
        this.newGame = this.createTagNewGame()
        this.tutorial = this.createTagTutorial();
        this.exit = this.createTagExit();
        this.tagSound = this.createTagSound();
        this.tagOn = this.createTagOn();
        this.tagOff = this.createTagOff();
        // Nothing has been clicked
        this.clickedX = -1
        this.clickedY = -1
        this.tags = []
        this.fillTagArray();
        this.selectSound = null;
        this.nextSceneKey = Constants.MAINMENU;
        this.soundSwitch = this.createSoundSwitch(this.canvas);
        this.stage = stage;
    }

    update(deltaTime) {
        this.clickedX = this.canvas.clickedX;
        this.clickedY = this.canvas.clickedY;
        this.nextSceneKey = Constants.MAINMENU;
        if (this.clickedX != -1) {
            // It controls if you clicked inside a tag and get it
            const tagClicked = this.tags.find ( tag => 
                    this.clickedX > tag.x - tag.width / 2 
                && this.clickedX < tag.x + tag.width / 2
                && this.clickedY < tag.y 
                && this.clickedY > tag.y - tag.height);
            
            if (!!tagClicked) {
                Constants.playSound('select');
                if (tagClicked.text === lang.main_menu.new_game) {
                    this.stage.set(Constants.GAMEON, new Game(this.canvas, this.stage));
                    this.nextSceneKey = Constants.GAMEON;
                }
                if (tagClicked.text === lang.main_menu.tutorial) {
                    this.stage.set(Constants.TUTORIAL, new Tutorial(this.canvas, this.stage));
                    this.nextSceneKey = Constants.TUTORIAL;
                }
                if (tagClicked.text === lang.main_menu.exit) {
                    window.location.href = "https://google.es";
                }
            }
            
            // It controls if you clicked inside the sound icon
            this.soundSwitch.update(this);
            
        }
    }

    draw() {
        this.mainMenuPanel.draw();
        this.tagPlusiam.draw();
        this.newGame.draw();
        this.tutorial.draw();
        this.soundSwitch.draw();
        this.tagSound.draw();
        this.tagOn.draw();
        this.tagOff.draw();
        this.exit.draw();
    }

    getNextSceneKey() {
        return this.nextSceneKey;
    }

    createMainMenuPanel() {
        return new GeneralPanel(this.canvas);
    }

    createSoundSwitch() {
        return new SoundSwitch(this.canvas);
    }

    createTagPlusiam() {
        return new Tag(this, 'Plusiam', 206, 170, 70, 'white', 'center');
    }
    

    createTagNewGame() {
        return new Tag(this, lang.main_menu.new_game, 206, 370, 50, 'white', 'center');
    }

    createTagTutorial() {
        return new Tag(this, lang.main_menu.tutorial, 206, 500, 50, 'white', 'center');
    }

    createTagExit() {
        return new Tag(this, lang.main_menu.exit, 360, 740, 30, 'white', 'center');
    }

    createTagSound() {
        return new Tag(this, lang.main_menu.sound.sound, 115, 685, 20, 'white', 'center');
    }

    createTagOn() {
        return new Tag(this, lang.main_menu.sound.on, 40, 740, 20, 'white', 'right');
    }

    createTagOff() {
        return new Tag(this, lang.main_menu.sound.off, 190, 740, 20, 'white', 'left');
    }

    fillTagArray() {
        this.tags.push(this.newGame, this.tutorial, this.exit);
    }
}
