import { Constants } from '../constants.js';

export class SoundSwitch {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.soundImage = document.getElementById('switch');
        this.soundIconImageSize = 49
    }

    update(mainMenu) {
        if (mainMenu.clickedX >= 64 && mainMenu.clickedX <= 128 && mainMenu.clickedY >= 700 && mainMenu.clickedY <= 764) {
            Constants.SOUND_ENABLED = !Constants.SOUND_ENABLED;
            Constants.playSound('select');
        }
    }

    draw() {
        if (Constants.SOUND_ENABLED) {
            this.ctx.drawImage(this.soundImage, 0, this.soundImage.height / 2, this.soundIconImageSize, this.soundIconImageSize, 30, 700, 64, 64);
            this.ctx.drawImage(this.soundImage, this.soundImage.width / 3, 0, this.soundIconImageSize, this.soundIconImageSize, 84, 700, 64, 64);
            this.ctx.drawImage(this.soundImage, 2 * this.soundImage.width / 3, 0, this.soundIconImageSize, this.soundIconImageSize, 138, 700, 64, 64);
        } else {
            this.ctx.drawImage(this.soundImage, 0, 0, this.soundIconImageSize, this.soundIconImageSize, 30, 700, 64, 64);
            this.ctx.drawImage(this.soundImage, this.soundImage.width / 3, this.soundImage.height / 2, this.soundIconImageSize, this.soundIconImageSize, 84, 700, 64, 64);
            this.ctx.drawImage(this.soundImage, 2 * this.soundImage.width / 3, this.soundImage.height / 2, this.soundIconImageSize, this.soundIconImageSize, 138, 700, 64, 64);
        }
    }

}