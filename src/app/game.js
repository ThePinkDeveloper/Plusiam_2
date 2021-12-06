import { Block } from './entities/block.js';

export class Game {
    
    TOTAL_ROWS = 10;
    TOTAL_COLUMNS = 6;

    MAX_BLOCK_SELECTED = 3;

    FIRST = 0;
    SECOND = 1;
    THIRD = 2;

    // Initialize game
    constructor(ctx) {
        // Nothing has been clicked
        this.clickedX = -1;
        this.clickedY = -1;
        // Get the canvas context from parameter
        this.ctx = ctx;
        // Fill the game with blocks
        this.blocks = this.#fillGame(this.TOTAL_COLUMNS, this.TOTAL_ROWS );
        // Add a 'click' event listener to canvas that controls if any block has been clicked
        // When the player clicks inside the canvas you get x and y coords relative to the canvas context
        this.ctx.canvas.addEventListener('click', $event => {
            // This is the bounding rectangle of the canvas
            const rect = this.ctx.canvas.getBoundingClientRect();
            // As click event takes the x and y coord relative to the screen, we need to know where is the canvas
            // relative to the screen.

            this.clickedX = $event.x - Math.floor(rect.left);
            //                         ^__ Amount of pixels the canvas is xTranslated from the left side of the screen
            //              ^_ xCoord where you have clicked relative to the left side of the screen
            this.clickedY = $event.y - Math.floor(rect.top);
            //                         ^__ Amount of pixels the canvas is yTranslated from the top side of the screen
            //              ^_ yCoord where you have clicked relative to the top side of the screen
        });
        // Clicked blocks array is empty
        this.selected = [];
    }

    // Update the game with every frame
    update(deltaTime) {
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
                if (blockClicked.selected === false && blockClicked.available) {
                    blockClicked.selected = true;
                    console.log(1);
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
                    console.log(2);
                    // Remove the unselected block from the selected blocks array
                    const unselectedBlock = this.selected.find( block => blockClicked.column === block.column &&
                        blockClicked.row === block.row );
                    unselectedBlock.selected = false;
                    const index = this.selected.indexOf(unselectedBlock);
                    this.selected.splice(index, 1);
                    // and if it was the last block in the selected blocks array are all blocks in the game available
                    if (this.selected.length === 0) {
                        this.blocks.forEach (block => block.available = true);
                    }
                }
            }
            
            // If you have selected three blocks
            if (this.selected.length === this.MAX_BLOCK_SELECTED) {

                this.blocks.forEach( block => block.available = true);
                
                if (!this.#isAnyMatchLeft()) {
                    
                }

                // If the first and second blocks sum the third one
                if (this.selected[this.FIRST].value + this.selected[this.SECOND].value == this.selected[this.THIRD].value) {

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
                                    newBlocks.forEach( (value, index) => this.blocks.push(this.#createBlock(column, index)));

                    });
                    

                }

                // After choosing three blocks the array of selected blocks is emptied
                this.selected.forEach( block => block.selected = false );
                this.selected = [];
            }
            
        }

        this.clickedX = -1;
        this.clickedY = -1;
    }

    draw() {
        this.blocks.forEach( block => block.draw());
    }

    #fillGame(totalColumns, totalRows) {

        const result = [];

        for (let i = 0; i < totalColumns; i++) {
            for (let j = 0; j < totalRows; j++) {
                result.push(this.#createBlock(i, j));
            }
        }

        return result;
    }
    
    #createBlock(column, row) {
        return new Block(this, column, row);
    }

    #isAnyMatchLeft() {
        return true;
    }

}