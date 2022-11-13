import { Constants } from '../constants.js';
import { GeneralPanel } from '../entities/general-panel.js';
import { Tag } from '../entities/tag.js';
import { Lang } from '../lang/lang.js';

export class MainMenu {

    // Initialize game
    constructor(canvas) {
        this.increment = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mainMenuPanel = this.createMainMenuPanel();
        this.titleImage = document.getElementById('titleImage');
        this.soundEnabled = false;
        this.soundIcon = document.getElementById('soundIcons');
        this.newGame = this.createTagNewGame();
        //this.tutorial = this.createTagTutorial();
        this.exit = this.createTagExit();
        // Nothing has been clicked
        this.clickedX = -1
        this.clickedY = -1
        this.tags = []
        this.fillTagArray();
        this.sound = this.loadMusic();
        this.nextSceneKey = Constants.MAINMENU; 
    }

    update(deltaTime) {
        this.clickedX = this.canvas.clickedX;
        this.clickedY = this.canvas.clickedY;
        if (this.clickedX != -1) {
            // It controls if you clicked inside a tag and get it
            const tagClicked = this.tags.find ( tag => 
                    this.clickedX > tag.x - tag.width / 2 
                && this.clickedX < tag.x + tag.width / 2
                && this.clickedY < tag.y 
                && this.clickedY > tag.y - tag.height);
            
            if (!!tagClicked) {
                this.nextSceneKey = Constants.GAMEON;
            }
            
            // It controls if you clicked inside the sound icon
            if (this.clickedX > 20
                    && this.clickedX < 20 + 64
                    && this.clickedY > 700 
                    && this.clickedY < 700 + 64) {
                this.soundEnabled = !this.soundEnabled;
            }
            
        }

        if (this.soundEnabled) {
            this.sound.play();
        } else {
            this.sound.pause();
        }

    }

    draw() {
        this.mainMenuPanel.draw();
        this.drawTitle();
        this.newGame.draw();
        //this.tutorial.draw();
        this.drawSoundIcon();
        this.exit.draw();
    }

    getNextSceneKey() {
        return this.nextSceneKey;
    }


    createMainMenuPanel() {
        return new GeneralPanel(this.canvas);
    }

    drawTitle() {
        this.ctx.drawImage(this.titleImage, 0, 0, this.titleImage.width, this.titleImage.height, 60, 120 + 30 * Math.sin(this.increment += .05), 300, 80);
    }

    drawSoundIcon() {
        if (this.soundEnabled) {
            this.ctx.drawImage(this.soundIcon, this.soundIcon.width / 2, 0, this.soundIcon.width / 2, this.soundIcon.height, 20, 700, 64, 64);
        } else {
            this.ctx.drawImage(this.soundIcon, 0, 0, this.soundIcon.width / 2, this.soundIcon.height, 20, 700, 64, 64);
        }
    }

    createTagNewGame() {
        return new Tag(this, Lang.browserLang.main_menu.new_game, 206, 370, 50, 'white', 'center');
    }

    createTagTutorial() {
        return new Tag(this, 'Play tutorial', 206, 500, 50, 'white', 'center');
    }

    createTagExit() {
        return new Tag(this, Lang.browserLang.main_menu.exit, 390, 750, 30, 'white', 'right');
    }

    fillTagArray() {
        this.tags.push(this.newGame, this.exit);
    }

    loadMusic() {
        const sound = document.createElement("audio");
        sound.src = '../../../assets/ambient-song-intro.menu-plusiam.ogg';
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none"; // <-- oculto
        document.body.appendChild(sound);
        return sound;
    }
}
