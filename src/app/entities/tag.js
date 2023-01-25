export class Tag {

    constructor(menu, text, x, y, size, color, align, clickable, effect, counter) {
        this.menu = menu;
        this.size = size;
        this.text = text;
        this.width = 0;
        this.height = size;
        this.x = x;
        this.y = y;
        this.color = color;
        this.align = align;
        this.clickable = clickable == true ? clickable : false;
        this.effect = effect;
        this.counter = counter;
        this.alpha = 0;
    }

    draw() {
        this.menu.ctx.textAlign = this.align;
        if (this.effect === 'fadein') {
            this.alpha = this.counter / 100;
            if (!this.counter || this.counter < 0 ) {
                this.alpha = 0;
            }
            if (this.counter > 255) {
                this.alpha = 1;
            }
            this.menu.ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            this.counter = this.counter + 1;
        } else {
            this.menu.ctx.fillStyle = this.color;
        }
        this.menu.ctx.font = `italic ${this.size}px Arial`;
        this.width = Number.parseInt(this.menu.ctx.measureText(this.text).width);

        this.menu.ctx.shadowColor = '#111';
        this.menu.ctx.shadowBlur = 10;
        this.menu.ctx.shadowOffsetX = 2;
        this.menu.ctx.shadowOffsetY = 4;
        this.menu.ctx.fillText(this.text, this.x, this.y);
        this.menu.ctx.shadowBlur = 0;
        this.menu.ctx.shadowOffsetX = 0;
        this.menu.ctx.shadowOffsetY = 0;
    }

}

// this.game.ctx.textAlign = 'right';
// this.game.ctx.fillStyle = this.color;
// this.game.ctx.font = `italic ${this.size}px Arial`;
// this.game.ctx.shadowColor = '#111';
// this.game.ctx.shadowBlur = 10;
// this.game.ctx.shadowOffsetX = 2;
// this.game.ctx.shadowOffsetY = 4;
// this.game.ctx.fillText(this.score, this.x, this.y);
// this.game.ctx.textAlign = 'left';
// this.game.ctx.fillText('Score:', 10, this.y);
// this.game.ctx.shadowBlur = 0;
// this.game.ctx.shadowOffsetX = 0;
// this.game.ctx.shadowOffsetY = 0;