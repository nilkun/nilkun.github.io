import Vector from '../engine/Vector.js';

export default class Hexagon {
    constructor(column, row) {
        this.xPos = column;
        this.yPos = row;

        this.neighbour = new Array(6);
        this.neighbour.fill(false);
        // could somehow extract this.

        // used to crawling and pathfinding
        this.isVisited = false;

        // path finding
        this.distanceGoal = Infinity;
        this.distanceStart = Infinity;
        this.parentNode = -1;
    }

    // render()

    render(offset, scale, diagonal, context, horizontal) {
        // THIS FUNCTION DOES NOT STROKE, SHOULD BE DONE BY PARENT
        let position = new Vector(offset.x + this.xPos * scale, offset.y + this.yPos * 2 * diagonal);

        if(this.xPos%2===0) {
            position.y += diagonal;
        }

        context.moveTo(position.x, position.y); // SET POSITION TO LEFT SIDE

        // MOVE DIAGONALLY DOWN RIGHT AND THEN DRAW LINE IF THIS.NEIGHBOUR IS FALSE
        position.x += diagonal;
        position.y += diagonal;
        if(!this.neighbour[0]) context.lineTo(position.x, position.y);
        else context.moveTo (position.x, position.y);

        // MOVE HORIZONTALLY RIGHT
        position.x += horizontal;
        if(!this.neighbour[1]) context.lineTo(position.x, position.y);
        else context.moveTo (position.x, position.y)
    
        // MOVE DIAGONALLY UP RIGHT
        position.x += diagonal;
        position.y -= diagonal;
        if(!this.neighbour[2]) context.lineTo(position.x, position.y);
        else context.moveTo (position.x, position.y);

        // MOVE DIAGONALLY UP LEFT
        position.x -= diagonal;
        position.y -= diagonal;
        if(!this.neighbour[3]) context.lineTo(position.x, position.y);
        else context.moveTo (position.x, position.y);
        
        // MOVE HORIZONTALLY LEFT
        position.x -= horizontal;
        if(!this.neighbour[4]) context.lineTo(position.x, position.y);
        else context.moveTo (position.x, position.y)
    
        // MOVE DIAGONALLY DOWN LEFT
        position.x -= diagonal;
        position.y += diagonal;
        if(!this.neighbour[5]) context.lineTo(position.x, position.y);
        else context.moveTo (position.x, position.y)        
    }

    renderLine(offset, scale, diagonal, context, horizontal, node) {
        let first = 0;
        let second = 0;
        if(this.xPos%2===0) first = offset.y;
        if(node.xPos%2===0) second = offset.y; 
    
    
        context.moveTo((offset.x + this.xPos * scale) + diagonal + horizontal / 2, offset.y + this.yPos * 2 * diagonal + first);
        context.lineTo((offset.x + node.xPos * scale) + diagonal + horizontal / 2, offset.y + node.yPos * 2 * diagonal + second);
    }
    
    renderAll(offset, scale, diagonal, context, horizontal) {

        // THIS FUNCTION DOES NOT STROKE, SHOULD BE DONE BY PARENT
        // let position = new Vector(offset.x + xPos * scale, offset.y + yPos * 2 * diagonal);

        let position = new Vector(offset.x + this.xPos * scale, offset.y + this.yPos * 2 * diagonal);

        if(this.xPos%2===0) {
            position.y += diagonal;
        }

        context.moveTo(position.x, position.y); // SET POSITION TO LEFT SIDE

        // MOVE DIAGONALLY DOWN RIGHT AND THEN DRAW LINE IF THIS.NEIGHBOUR IS FALSE
        position.x += diagonal;
        position.y += diagonal;
        context.lineTo(position.x, position.y);

        // MOVE HORIZONTALLY RIGHT
        position.x += horizontal;
        context.lineTo(position.x, position.y);
    
        // MOVE DIAGONALLY UP RIGHT
        position.x += diagonal;
        position.y -= diagonal;
        context.lineTo(position.x, position.y);
        

        // MOVE DIAGONALLY UP LEFT
        position.x -= diagonal;
        position.y -= diagonal;
        context.lineTo(position.x, position.y);
        
        // MOVE HORIZONTALLY LEFT
        position.x -= horizontal;
        context.lineTo(position.x, position.y);
    
        // MOVE DIAGONALLY DOWN LEFT
        position.x -= diagonal;
        position.y += diagonal;
        context.lineTo(position.x, position.y);
    }
}