import { VerySimple } from './very-simple.js';

export class Game {
    
    constructor(ctx) {
        this.ctx = ctx;
        this.enemies = [];
        this.#createNewEnemy();
        this.enemyInterval = 1000;
        this.enemyTimer = 0;
    }

    update(deltaTime) {
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if (this.enemyTimer > this.enemyInterval) {
            this.#createNewEnemy();
            this.enemyTimer =  0;
        }
        this.enemyTimer += deltaTime;
        this.enemies.forEach(enemy => enemy.update(deltaTime));
    }

    draw() {
        this.enemies.forEach(enemy => enemy.draw());
    }
    
    #createNewEnemy() {
        this.enemies.push(new VerySimple(this));
    }

}