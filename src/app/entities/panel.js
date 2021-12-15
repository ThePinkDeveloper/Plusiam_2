export class Panel {

    constructor(game) {
        this.game = game;
        this.image = document.getElementById('panel');
        this.x = 0
        this.y = 0
        
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.x, this.y);
    }

}