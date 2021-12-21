export class GeneralPanel {

    constructor(menu) {
        this.menu = menu;
        this.image = document.getElementById('generalPanel');
        this.x = 0;
        this.y = 0;
        
    }

    draw() {
        this.menu.ctx.drawImage(this.image, this.x, this.y);
    }

}