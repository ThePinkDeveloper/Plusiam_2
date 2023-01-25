import { Constants } from '../constants.js';
import { GeneralPanel } from '../entities/general-panel.js';
import { Tag } from '../entities/tag.js';
import { TutorialBlock } from '../entities/tutorial-block.js';
import lang from '../lang/lang.js';

export class Tutorial {

    // Initialize game
    constructor(canvas, stage) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stage = stage;
        this.nextSceneKey = Constants.TUTORIAL;
        this.mainMenuPanel = this.createMainMenuPanel();
        this.tags = this.fillTags();
        this.currentTutorialStep = 1;
        this.blocks = [];
        this.blocks.push(new TutorialBlock(this, 2, 7, 3), new TutorialBlock(this, 3, 7, 4), new TutorialBlock(this, 4, 7, 7));
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
                if (tagClicked.text === lang.tutorial.back) {
                    this.nextSceneKey = Constants.MAINMENU;
                }
            }
            if (this.currentTutorialStep === 1) {

            }

        }

        if (this.currentTutorialStep === 1) {
            this.tutorialStep1MessagesUpdate();
        }
        
    }

    draw() {
        this.mainMenuPanel.draw();
        this.tags.forEach( tag => tag.draw() );
        this.blocks.forEach( block => block.draw() );
    }

    createMainMenuPanel() {
        return new GeneralPanel(this.canvas);
    }

    getNextSceneKey() {
        return this.nextSceneKey;
    }

    createBackTag() {
        return new Tag(this, lang.tutorial.back, 340, 740, 30, 'white', 'center');
    }

    createMessage1Tag() {
        return new Tag(this, "", 206, 160, 18, 'white', 'center', false, 'fadein', -20);
    }

    createMessage2Tag() {
        return new Tag(this, "", 206, 220, 18, 'white', 'center', false, 'fadein', -220);
    }

    createMessage3Tag() {
        return new Tag(this, "", 206, 240, 18, 'white', 'center', false, 'fadein', -320);
    }

    createMessage4Tag() {
        return new Tag(this, "", 206, 300, 18, 'white', 'center', false, 'fadein', -520);
    }

    createMessage5Tag() {
        return new Tag(this, "", 206, 320, 18, 'white', 'center', false, 'fadein', -620);
    }

    createMessage6Tag() {
        return new Tag(this, "", 206, 380, 18, 'white', 'center', false, 'fadein', -820);
    }

    fillTags() {
        const tags = [];
        tags.push(this.createBackTag());
        tags.push(this.createMessage1Tag());
        tags.push(this.createMessage2Tag());
        tags.push(this.createMessage3Tag());
        tags.push(this.createMessage4Tag());
        tags.push(this.createMessage5Tag());
        tags.push(this.createMessage6Tag());
        return tags;
    }

    tutorialStep1MessagesUpdate() {
        this.tags[1].text = lang.tutorial.messages.step1.message1;
        this.tags[2].text = lang.tutorial.messages.step1.message2;
        this.tags[3].text = lang.tutorial.messages.step1.message3;
        this.tags[4].text = lang.tutorial.messages.step1.message4;
        this.tags[5].text = lang.tutorial.messages.step1.message5;
        this.tags[6].text = lang.tutorial.messages.step1.message6;

    }
}
