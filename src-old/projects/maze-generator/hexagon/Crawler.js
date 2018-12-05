import Vector from '../engine/Vector.js';
export default class Crawler{
    constructor(clone, indices, columns, context, offset, scale, diagonal, horizontal) {

        this.stack = [];
        this.grid = clone.slice(0);
        this.next = new Vector();

        this.column = 9;
        this.row = 9;
        this.limit = 0;

        this.hexRows = indices;
        this.hexColumns = columns;

        this.context = context;
        this.offset = offset;
        this.scale = scale;
        this.diagonal = diagonal;
        this.horizontal = horizontal;
        this.completed = false;
    }

    getNeighbours() {
        //TO FIND PATH
        let availableNeighbours = [];

        const above = this.row - 1;
        const below = this.row + 1;
        const sameColumn = this.column;
        const leftColumn = this.column - 1;
        const rightColumn = this.column + 1;
        const lastColumn = this.hexColumns;
        const modifier = this.hexColumns;

        if(below < this.hexRows && !this.grid[below + sameColumn * modifier].isVisited) 
                availableNeighbours.push(new Vector(this.column, below));
        
        if(this.row > 0 && !this.grid[above + sameColumn * modifier].isVisited) 
                availableNeighbours.push(new Vector(this.column, above));

        if(this.column%2 === 0) {
            if(this.column > 0) {
                if(above > 0 && !this.grid[above + leftColumn * modifier].isVisited) 
                    availableNeighbours.push(new Vector(leftColumn, this.row));
                if(below < this.hexRows && !this.grid[below + leftColumn * modifier].isVisited) 
                    availableNeighbours.push(new Vector(leftColumn, below));
            }
            if(rightColumn < lastColumn) {
                if(!this.grid[this.row + rightColumn * modifier].isVisited) 
                    availableNeighbours.push(new Vector(rightColumn, this.row));
                if(below < this.hexRows && !this.grid[below + rightColumn * modifier].isVisited)
                    availableNeighbours.push(new Vector(rightColumn, below));
            }                
        } 
        // COLUMN IS ODD NUMBERED
        else {
            if(this.column > 0) {
                if(this.row > 0 && !this.grid[above + leftColumn * modifier].isVisited) 
                    availableNeighbours.push(new Vector(leftColumn, above));
                if(!this.grid[this.row + leftColumn * modifier].isVisited) 
                    availableNeighbours.push(new Vector(leftColumn, this.row));
            }
            if(rightColumn < lastColumn) {         
                if(this.row > 0 && !this.grid[above + rightColumn * modifier].isVisited) 
                    availableNeighbours.push(new Vector(rightColumn, above));
                if(!this.grid[this.row + rightColumn * modifier].isVisited) 
                    availableNeighbours.push(new Vector(rightColumn, this.row));
            }  
        } 
        return availableNeighbours;
    }


    openWalls() {

        const above = this.row - 1;
        const below = this.row + 1;
        const sameColumn = this.column * this.hexColumns;
        const leftColumn = (this.column - 1) * this.hexColumns;
        const rightColumn = (this.column + 1) * this.hexColumns;
        const lastColumn = this.hexColumns * this.hexColumns;
        const direction = this.row - this.next.y;
        const leftOrRight = this.column - this.next.x;
        const currentHex = this.row + sameColumn;

        switch(leftOrRight) {
            // NEIGHBOUR IS TO THE RIGHT
            case -1: {
                switch(direction) {
                    // NEGATIVE IS BELOW
                    case -1: {
                        this.grid[below + rightColumn].neighbour[5]= { x: this.column, y: this.row };
                        this.grid[currentHex].neighbour[2]={ x: this.next.x, y: this.next.y };                            
                        break;
                    }
                    case 0: {
                        if(this.column%2 === 0) {
                            this.grid[this.row + rightColumn].neighbour[0]={ x: this.column, y: this.row };;
                            this.grid[currentHex].neighbour[3]={ x: this.next.x, y: this.next.y };
                        } else {
                            this.grid[this.row + rightColumn].neighbour[5]={ x: this.column, y: this.row };;
                            this.grid[currentHex].neighbour[2]={ x: this.next.x, y: this.next.y };
                        }        
                        break;
                    }        

                    // COLUMN IS ODD
                    case 1: {
                        this.grid[above + rightColumn].neighbour[0]={ x: this.column, y: this.row };;
                        this.grid[currentHex].neighbour[3]={ x: this.next.x, y: this.next.y };
                        break;
                    }
                }
                break;
            }

            // NEIGHBOUR IS ABOVE OR BELOW
            case 0: {
                switch(direction) {
                    case -1: {
                            this.grid[below + sameColumn].neighbour[4]={ x: this.column, y: this.row };;
                            this.grid[currentHex].neighbour[1]={ x: this.next.x, y: this.next.y };
                        break;
                    }
                    case 1: {
                            this.grid[above+ sameColumn].neighbour[1]={ x: this.column, y: this.row };;
                            this.grid[currentHex].neighbour[4]={ x: this.next.x, y: this.next.y };
                        break;
                    }
                }                    
                break;
            }

            // NEIGHBOUR IS TO THE LEFT
            case 1: {
                switch(direction) {

                    // COLUMN IS EVEN
                    case -1: {
                        this.grid[below + leftColumn].neighbour[3]={ x: this.column, y: this.row };;
                        this.grid[currentHex].neighbour[0]={ x: this.next.x, y: this.next.y };                            
                        break;
                    }

                    // COLUMN COULD BE EITHER, SO CHECK
                    case 0: {
                        // IF COLUMN IS EVEN
                        if(this.column%2 === 0) {
                            this.grid[this.row + leftColumn].neighbour[2]={ x: this.column, y: this.row };;
                            this.grid[currentHex].neighbour[5]={ x: this.next.x, y: this.next.y };
                        } else {
                            this.grid[this.row + leftColumn].neighbour[3]={ x: this.column, y: this.row };;
                            this.grid[currentHex].neighbour[0]={ x: this.next.x, y: this.next.y };
                        }        
                        break;
                    }        

                    // COLUMN IS ODD
                    case 1: {
                        this.grid[above + leftColumn].neighbour[2]={ x: this.column, y: this.row };;
                        this.grid[currentHex].neighbour[5]={ x: this.next.x, y: this.next.y };;
                        break;
                    }
                }
                break;
            }
        }
    }
    draw() {
        this.renderCrawler();
        this.renderHex();
        this.column = this.next.x;
        this.row = this.next.y;
        this.renderHex();
    }

    move() { 
        
        this.grid[this.row + this.column * 20].isVisited = true;
        let potentialMoves = this.getNeighbours();

        // IF THERE ARE ANY POTENTIAL MOVES
        if(potentialMoves.length) { 
            this.next = potentialMoves[Math.floor(Math.random() * potentialMoves.length)];
            // OPEN UP WALLS
            this.openWalls();
            // ADD CURRENT POSITION TO STACK
            this.stack.push(new Vector(this.column, this.row));

            this.draw();
        }
        else if(this.stack.length > 0) {
            
            this.renderCrawler();
            this.renderHex(this.offset, this.scale, this.diagonal, this.context, this.horizontal);
            const popped = this.stack.pop();
            this.column = popped.x;
            this.row = popped.y;
            this.renderHex();
        } 
        else {
            this.completed = true;
        }
    }
    renderHex() {
        this.context.beginPath();
        this.grid[this.row + this.column  * 20].render(this.offset, this.scale, this.diagonal, this.context, this.horizontal);
        this.context.strokeStyle = "black";
        this.context.stroke();
    }

    renderCrawler() {
        this.drawCrawler();
        this.context.fillStyle = "orange";
        this.context.fill();
        this.context.strokeStyle = "orange";
        this.context.stroke();
    }

    drawCrawler() {
        this.context.beginPath();
        
        let position = new Vector(this.offset.x + this.column * this.scale, this.offset.y + this.row * 2 * this.diagonal);

        if(this.column%2===0) {
            position.y += this.diagonal;
        }

        this.context.moveTo(position.x, position.y);
        
        position.x += this.diagonal;
        position.y += this.diagonal;
        this.context.lineTo(position.x, position.y);

        position.x += this.horizontal;
        this.context.lineTo(position.x, position.y);
    
        position.x += this.diagonal;
        position.y -= this.diagonal;
        this.context.lineTo(position.x, position.y);

        position.x -= this.diagonal;
        position.y -= this.diagonal;
        this.context.lineTo(position.x, position.y);

        position.x -= this.horizontal;
        this.context.lineTo(position.x, position.y);    }

}