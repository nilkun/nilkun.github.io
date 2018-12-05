export default class Tetromino {
    constructor(type=this.getRandomTetro()) {
        this.x = 0;
        this.y = 0;
        this.type = type;
        this.block = [];
        this.color = "";
        this.rotation = 0;
        this.create();
    }

    copyFrom(tetro) {
        this.x = tetro.x;
        this.y = tetro.y;
        this.type = tetro.type;
        this.color = tetro.color;
        this.rotation = tetro.rotation;
        this.block = [];
        this.create();
    }

    create() {
        // Creates a tetromino of type this.type
        switch(this.type) {
            case "I":
            {   this.block.push([
                    { x: 0, y: -2 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 0, y: 1 }
                ]),
                this.block.push([
                    { x: -2, y: -1 },
                    { x: -1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 1, y: -1 }
                ]),
                this.block.push([
                    { x: -1, y: -2 },
                    { x: -1, y: -1 },
                    { x: -1, y: 0 },
                    { x: -1, y: 1 }
                ]),
                this.block.push([
                    { x: -2, y: 0 },
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 }
            ]),
                this.color = "red";
                this.type = "I";
                break;
            }

            case "L":            
            {   this.block.push([
                // Straight down - start
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ]),
            this.block.push([
                { x: -1, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ]),
            this.block.push([
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ]),
            this.block.push([
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: -1 }
            ]),
                this.color = "pink";
                this.type = "L";
                break;
            }
            case "J":                       
            {   this.block.push([
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 1 }
            ]),
            this.block.push([
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ]),
            this.block.push([
                { x: 1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ]),
            this.block.push([
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ]),
                this.color = "orange";
                this.type = "J";
                break;
            } 
            case "O":
            {   this.block.push([
                    { x: 1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 }
                ]),
                this.color = "yellow";
                this.type = "O";
                break;
            }
            case "S":            
            {   this.block.push([
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 }
            ]),
            this.block.push([
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ]),
            this.block.push([
                { x: -1, y: 1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ]),
            this.block.push([
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ]),
                this.color = "blue";
                this.type = "S";
                break;
            }
            case "Z":                     
            {   this.block.push([
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ]),
            this.block.push([
                { x: 1, y: -1 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ]),
            this.block.push([
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ]),
            this.block.push([
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: -1, y: 0 },
                { x: -1, y: 1 }
            ]),
                this.color = "purple";
                this.type = "Z";
                break;
            }
            case "T":            
            {   this.block.push([
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ]),
            this.block.push([
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 }
            ]),   
            this.block.push([
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 }
            ]),
            this.block.push([
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ]),
                this.color= "green";
                this.type = "T";
                break;
            }
        }
        this.renderingBlock = this.block;
    }
    getTestPositions(rotation) {
        const positions = [
            { 
                x: this.block[rotation][0].x + this.x,
                y: this.block[rotation][0].y + this.y, 
            },
            { 
                x: this.block[rotation][1].x + this.x,
                y: this.block[rotation][1].y + this.y, 
            },
            { 
                x: this.block[rotation][2].x + this.x,
                y: this.block[rotation][2].y + this.y, 
            },
            { 
                x: this.block[rotation][3].x + this.x,
                y: this.block[rotation][3].y + this.y, 
            },
        ]
        return positions;
    }
    getPositions() {
        const positions = [
            { 
                x: this.block[this.rotation][0].x + this.x,
                y: this.block[this.rotation][0].y + this.y, 
            },
            { 
                x: this.block[this.rotation][1].x + this.x,
                y: this.block[this.rotation][1].y + this.y, 
            },
            { 
                x: this.block[this.rotation][2].x + this.x,
                y: this.block[this.rotation][2].y + this.y, 
            },
            { 
                x: this.block[this.rotation][3].x + this.x,
                y: this.block[this.rotation][3].y + this.y, 
            },
        ]
        return positions;
    }
    
    getRandomTetro() {
        const next = Math.floor(Math.random()*7);
        const randomShape = [ "I", "J", "L", "O", "S", "Z", "T"];
        return randomShape[next];                
    }

    render(context, size) {
        context.beginPath();
        this.block[this.rotation].forEach(square => {
            context.rect(
                size * (this.x + square.x),
                size * (this.y + square.y), 
                size, 
                size);          
        })
        context.fillStyle = this.color;
        context.fill(); 
        context.stroke(); 
        context.closePath();
      
    }

    rotate() {
        // const positions = this.getPositions();
        // let tryRotation = this.rotation + 1;
        // if(tryRotation >= this.block.length) tryRotation = 0;

        this.rotation++;
        if(this.rotation >= this.block.length) this.rotation = 0;
    }
}
