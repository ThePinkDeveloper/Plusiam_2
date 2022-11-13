import { Constants } from '../constants.js' 

export class GeneralPanel {

    constructor(mainMenuCanvas) {
        this.canvas = mainMenuCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.gradient = this.createGradient();
    }
    
    draw() {
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
    }

    createGradient() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, Constants.GAME_HEIGHT);
        gradient.addColorStop(0, '#6e77ff');
        gradient.addColorStop(1, '#74bf5f');
        return gradient;
    }

}