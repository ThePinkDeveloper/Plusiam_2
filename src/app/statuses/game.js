import { Block } from '../entities/block.js';
import { GamePanel } from '../entities/game-panel.js';
import { Score } from '../entities/score.js';
import { TimeBar } from '../entities/time-bar.js';

export class Game {
    
    TOTAL_ROWS = 10;
    TOTAL_COLUMNS = 6;

    MEDIUM_MATCHES = 23;

    MAX_BLOCK_SELECTED = 3;

    FIRST = 0;
    SECOND = 1;
    THIRD = 2;

    // Initialize game
    constructor(canvas) {
        this.canvas = canvas;
        // Creates the panel where the game fits
        this.gamePanel = this.createGamePanel();
        // 
        this.score = this.createScore();
        // 
        this.timeBar = this.createTimeBar();
        //
        this.clickedX = -1;
        this.clickedY = -1;
        // Get the canvas context from parameter
        this.ctx = canvas.getContext('2d');
        // Fill the game with blocks
        this.blocks = this.fillGame(this.TOTAL_COLUMNS, this.TOTAL_ROWS );
        this.availableMatches = this.getAvailableMatches();
        // Clicked blocks array is empty
        this.selected = [];
    }

    // Update the game with every frame
    update(deltaTime) {
        this.clickedX = this.canvas.clickedX;
        this.clickedY = this.canvas.clickedY;
        // Call the update method for each block
        this.blocks.forEach( block => block.update(deltaTime));
        
        // If player clicked somewhere inside the canvas, clickedX will be different of -1
        if (this.clickedX != -1) {
            // It controls if you clicked inside a block and get it
            const blockClicked = this.blocks.find ( block => 
                    this.clickedX > block.x
                && this.clickedX < block.x + block.width
                && this.clickedY > block.y
                && this.clickedY < block.y + block.height);
            // If player clicked inside a block
            if (!!blockClicked) {
                if (!blockClicked.selected && blockClicked.available) {
                    blockClicked.selected = true;
                    this.blocks.forEach( block => block.available = false );

                    // It paints for availability all available blocks to be clicked
                    const availableBlock1 = this.blocks.find( block => block.column === blockClicked.column - 1 && block.row === blockClicked.row && !block.selected );
                    if (!!availableBlock1) {
                        availableBlock1.available = true;
                    }
                    const availableBlock2 = this.blocks.find( block => block.column === blockClicked.column + 1 && block.row === blockClicked.row && !block.selected );
                    if (!!availableBlock2) {
                        availableBlock2.available = true;
                    }
                    const availableBlock3 = this.blocks.find( block => block.column === blockClicked.column && block.row === blockClicked.row - 1 && !block.selected );
                    if (!!availableBlock3) {
                        availableBlock3.available = true;
                    }
                    const availableBlock4 = this.blocks.find( block => block.column === blockClicked.column && block.row === blockClicked.row + 1 && !block.selected );
                    if (!!availableBlock4) {
                        availableBlock4.available = true;
                    }

                    // Add the block to the selected blocks array
                    this.selected.push(blockClicked);
                
                // If it is unselected
                } else if (blockClicked.selected === true) {
                    // Remove the unselected block from the selected blocks array
                    const unselectedBlock = this.selected.find( block => blockClicked.column === block.column &&
                        blockClicked.row === block.row );
                    unselectedBlock.selected = false;
                    unselectedBlock.available = true;
                    const index = this.selected.indexOf(unselectedBlock);
                    this.selected.splice(index, 1);
                    // and if it was the last block in the selected blocks array do all blocks in the game available
                    if (this.selected.length === 0) {
                        this.blocks.forEach (block => block.available = true);
                    }
                }
            }
            
            // If you have selected three blocks
            if (this.selected.length === this.MAX_BLOCK_SELECTED) {

                this.blocks.forEach( block => block.available = true);

                // If the first and second blocks sum the third one
                if (this.selected[this.FIRST].value + this.selected[this.SECOND].value === this.selected[this.THIRD].value
                        || this.selected[this.SECOND].value + this.selected[this.FIRST].value === this.selected[this.THIRD].value) {

                    this.score.score += Number.parseInt(this.selected[this.THIRD].value * this.MEDIUM_MATCHES / this.availableMatches);
                    this.timeBar.time = this.timeBar.INITIAL_TIME;

                    // It removes all three selected blocks from the total blocks array
                    this.selected.forEach( block => {
                        const row = block.row;
                        const column = block.column;
                        const selectedBlock = this.blocks.find(block => block.row == row && block.column == column);
                        const index = this.blocks.indexOf(selectedBlock);
                        this.blocks.splice(index, 1);
                    });

                    // It stores the columns of the blocks removed on the last step
                    const columns = [];
                    this.selected.forEach( block => columns.push(block.column));

                    // It stores the columns stored in the last step but removing the columns repeated.
                    // The idea behind this step is to know how many columns have been affected by blocks removed.
                    const uniqueColumns = [...new Set(columns)];

                    // get the blocks above the upper block 
                    // With this instruction, ...
                    uniqueColumns.sort( (a, b) => a - b )
                                 // we get every column on the last step ...
                                 .forEach (column => {
                                    // and get the number of blocks that remain in that column ...
                                    const blocksInColumn = this.blocks.filter(block => block.column === column).length;
                                    // this way we can calculate how many blocks we have to create in that column.
                                    const numberOfBlocksToCreate = this.TOTAL_ROWS - blocksInColumn;
                                    // Then, we calculate in the removed blocks array what blocks belong to this column
                                    const lowestRow = this.selected.filter( block => block.column === column )
                                                                    // get the row of these blocks
                                                                    .map( block => block.row )
                                                                    // and get the lowest one.
                                                                    // This way, we can get the uppest removed block in
                                                                    // every column.
                                                                    .sort( (b1, b2 ) => b1 - b2)[0];
                                    // All the blocks above the uppest removed block in the column must fall to fill 
                                    // the gusp left by them
                                    this.blocks.filter ( block => block.column == column && block.row < lowestRow )
                                               .forEach ( block => {
                                                   block.isStopped = false;
                                                   block.row += numberOfBlocksToCreate ;
                                                });
                                    // Finally, depending on the number of blocks removed from a column, we add that number
                                    // of blocks to the same column to fill it again.
                                    const newBlocks = new Array(numberOfBlocksToCreate);
                                    newBlocks.fill(0);
                                    newBlocks.forEach( (value, index) => this.blocks.push(this.createBlock(column, index)));

                    });
                    

                }

                if (!this.isAnyMatchLeft()) {
                    this.blocks = this.fillGame(this.TOTAL_COLUMNS, this.TOTAL_ROWS);
                    this.score += 1000;
                }

                // After choosing three blocks the array of selected blocks is emptied
                this.selected.forEach( block => block.selected = false );
                this.selected = [];
            }
        }
        return this.timeBar.update(deltaTime);
    }

    draw() {
        this.blocks.forEach( block => block.draw());
        this.gamePanel.draw();
        this.score.draw();
        this.timeBar.draw();
    }

    fillGame(totalColumns, totalRows) {

        const result = [];

        for (let i = 0; i < totalColumns; i++) {
            for (let j = 0; j < totalRows; j++) {
                result.push(this.createBlock(i, j));
            }
        }

        return result;
    }
    
    createBlock(column, row) {
        return new Block(this, column, row);
    }
    
    getAvailableMatches() {

        let availableMatches = 0;

        this.blocks.forEach (block => {

            let first = block.value;
            let second = 0;
            let result = 0;

            //   |
            //   |
            //   o
            if (block.row > 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row - 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column && resultBlock.row === block.row - 2).value;
                availableMatches += this.checkSum(first, second, result);
            }
            
            //  _  
            //   |
            //   o
            //
            // |
            //  -o
            if (block.row > 0 && block.column > 0) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row - 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column - 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
            }

            // 
            //  --o
            //
            if (block.column > 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column - 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 2 && resultBlock.row === block.row).value;
                availableMatches += this.checkSum(first, second, result);
            }

            //
            //   -o
            //  |
            //  
            //    o
            //   _|
            if (block.column > 0 && block.row < this.TOTAL_ROWS - 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column - 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row + 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column - 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
            }

            //    o 
            //    |
            //    |
            if (block.row < this.TOTAL_ROWS - 2) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row + 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column && resultBlock.row === block.row + 2).value;
                availableMatches += this.checkSum(first, second, result);
            }

            // 
            //    o
            //    |_
            // 
            //    o-
            //      |
            if (block.column < this.TOTAL_COLUMNS - 1 && block.row < this.TOTAL_ROWS - 1) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row + 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column + 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row + 1).value;
                availableMatches += this.checkSum(first, second, result);
            }

            // 
            //    o--
            //
            if (block.column < this.TOTAL_COLUMNS - 2) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column + 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 2 && resultBlock.row === block.row).value;
                availableMatches += this.checkSum(first, second, result);
            }

            //      |
            //    o-
            // 
            //     _
            //    |
            //    o
            if (block.column < this.TOTAL_COLUMNS - 1 && block.row > 0) {
                second = this.blocks.find( secondBlock => secondBlock.column === block.column + 1 && secondBlock.row === block.row).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
                second = this.blocks.find( secondBlock => secondBlock.column === block.column && secondBlock.row === block.row - 1).value;
                result = this.blocks.find( resultBlock => resultBlock.column === block.column + 1 && resultBlock.row === block.row - 1).value;
                availableMatches += this.checkSum(first, second, result);
            }
        });

        return availableMatches;

    }

    isAnyMatchLeft() {
        this.availableMatches = this.getAvailableMatches();
        return this.availableMatches > 0;
    }

    checkSum(first, second, result) {
        if (first + second === result) {
            return 1;
        }
        return 0;
    }

    createGamePanel() {
        return new GamePanel(this);
    }

    createScore() {
        return new Score(this);
    }

    createTimeBar() {
        return new TimeBar(this);
    }

}