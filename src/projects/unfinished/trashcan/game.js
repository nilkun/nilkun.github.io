// The blocks
class Tetromino {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.direction = 0;
        this.type = "";
        this.block = {};
        this.renderingBlock = {};
        this.color = "";
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.direction = 0;
        this.type = "";
        this.block = {};
        this.renderingBlock = {};
        this.color = "";
    }

    create() {
        // Creates a tetromino of type this.type
        switch(this.type) {
            case "I2":
            {   this.block[0] = [
                    // Straight down - start
                    { x: 0, y: -2 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 0, y: 1 }
                ],
                this.block[1] = [
                    { x: 0, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: -1 }
                ],
                this.block[2] = [
                    { x: -1, y: -2 },
                    { x: -1, y: -1 },
                    { x: -1, y: 0 },
                    { x: -1, y: 1 }
                ],
                this.block[3] = [
                    { x: -2, y: 0 },
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 }
            ],
                this.color = "red";
                this.type = "I";
                break;
            }
            case "I":
            {   this.block = [
                    { x: 0, y: -2 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 0, y: 1 }
                ],
                this.color = "red";
                this.type = "I";
                break;
            }

            case "L":
            {   this.block = [
                    { x: 0, y: 1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 1, y: 1 }
                ],
                this.color = "pink";
                this.type = "L";
                break;
            }
            case "J":
            {   this.block = [
                    { x: 0, y: 1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: -1, y: 1 }
                ],
                this.color = "orange";
                this.type = "J";
                break;
            } 
            case "O":
            {   this.block = [
                    { x: -1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: -1, y: 0 }
                ],
                this.color = "yellow";
                this.type = "O";
                break;
            }
            case "S":
            {   this.block = [
                    { x: 1, y: 0 },
                    { x: 0, y: 0 },
                    { x: -1, y: 1 },
                    { x: 0, y: 1 }
                ],
                this.color = "blue";
                this.type = "S";
                break;
            }
            case "Z":
            {   this.block = [
                    { x: -1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 }
                ],
                this.color = "purple";
                this.type = "Z";
                break;
            }
            case "T":
            {   this.block = [
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 0 }
                ],
                this.color= "green";
                this.type = "T";
                break;
            }
        }
        this.renderingBlock = this.block;
    }

    createRandom() {
        // Calls create at the end
        const next = Math.floor(Math.random()*7);

        switch(next) {
            case 0:
                this.type = "I";
                break;                
            case 1:
                this.type = "J";
                break;
            case 2:
                this.type = "L";
                break;                
            case 3:
                this.type = "O";
                break;

            case 4:
                this.type = "S";
                break;                
            case 5:
                this.type = "Z";
                break;
            case 6:
                this.type = "T";
                break; 
        }

        this.create();                
    }

    rotate() {
        if(this.type==="O") return;

        else if(this.type==="I" ||
         this.type==="S" ||
         this.type==="Z") {
            if(this.direction < 1)
                this.direction++;
            else
                this.direction = 0;
        }
        else if(this.direction < 3)
            this.direction++;
        else
            this.direction = 0;            
        
        this.changeDirection();
    }

    changeDirection() {
        switch(this.direction){

            case 0:
                for(let i=0; i<4; i++) {

                    this.renderingBlock[i] = {
                        x: this.block[i].x,
                        y: this.block[i].y,
                    }
                }
                break;

            case 1:
                for(let i=0; i<4; i++) {
                    this.renderingBlock[i] = {
                        x: this.block[i].y,
                        y: -this.block[i].x,
                    }
                } 
                break;

            case 2:
                for(let i=0; i<4; i++) {

                    this.renderingBlock[i] = {
                        x: -this.block[i].x,
                        y: -this.block[i].y, 
                    }
                }
                break;
            
            case 3:
                for(let i=0; i<4; i++) {
                    this.renderingBlock[i] = {
                        x: -this.block[i].y,
                        y: this.block[i].x,
                    }
                }
                break;            
        }
    }
}

// The game and viewport
class PlayViewport {
    constructor() {

        // Initializing game variables
        this.blockSize = 10;
        this.viewportWidth = 200;
        this.viewportHeight = 400;
        this.speed = 200;
        this.width = this.viewportWidth / this.blockSize;
        this.height = this.viewportHeight / this.blockSize;
        this.hurry = false;
        this.intervals = setInterval(this.nextInterval.bind(this), this.speed);
        this.gameOver = false;

        // Setting up the viewport canvas
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();

        // Create empty render buffer
        this.renderBuffer = new Array(this.height);
        for(let row = 0; row < this.renderBuffer.length; ++row) {
            this.renderBuffer[row] = new Array(this.width);
            for(let col = 0; col < this.width; ++col) {
                this.renderBuffer[row][col] = 0;
            }
        }

        // Creating current and next tetro
        this.currentTetro = new Tetromino();
        this.nextTetro = new Tetromino();
    }

    reset() {
        // Initializing game variables
        this.blockSize = 10;
        this.viewportWidth = 200;
        this.viewportHeight = 400;
        this.speed = 200;
        this.width = this.viewportWidth / this.blockSize;
        this.height = this.viewportHeight / this.blockSize;
        this.hurry = false;
        this.intervals = setInterval(this.nextInterval.bind(this), this.speed);
        this.gameOver = false;

        // Setting up the viewport canvas
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();

        // Create empty render buffer
        this.renderBuffer = new Array(this.height);
        for(let row = 0; row < this.renderBuffer.length; ++row) {
            this.renderBuffer[row] = new Array(this.width);
            for(let col = 0; col < this.width; ++col) {
                this.renderBuffer[row][col] = 0;
            }
        }
    }

    speedUp() {
        if(this.hurry) return;
        this.changeInterval(this.speed / 10);
        this.hurry = true;

    }

    checkCollision() {
        
        for(let i=0; i<4; i++){
            const col = this.currentTetro.x + this.currentTetro.block[i].x;
            const row = this.currentTetro.y + this.currentTetro.block[i].y;
            if(row >= this.height) {
                this.addToBuffer();
                return true;
            } else if(this.renderBuffer[row][col] !== 0) {
                this.addToBuffer();
                for(let j=0; j<4; j++)
                {
                    if(this.currentTetro.y <= 2) 
                        this.gameOver=true;
                }
                return true;
            }
        }
        return false;
    }
    renderTetro() {

        const { x, y, color, renderingBlock } = this.currentTetro;
        const context = this.context;
        context.beginPath();
        
        for(let i=0; i<4; i++) {
            // console.log(renderingBlock);
            context.rect(
                this.blockSize * (x+(renderingBlock[i].x)),
                this.blockSize * (y+(renderingBlock[i].y)), 
                this.blockSize, 
                this.blockSize);
        }

        context.rect(this.blockSize * x, this.blockSize * y, this.blockSize, this.blockSize);
        context.fillStyle = color;
        context.fill(); 
        context.stroke();       
    }

    moveToNextTetro() {
        // this.currentTetro = Object.assign({}, this.nextTetro);
        this.currentTetro.reset();
        this.currentTetro.block = this.nextTetro.block;
        this.currentTetro.type = this.nextTetro.type;
        this.currentTetro.renderingBlock = this.nextTetro.renderingBlock;
        this.currentTetro.color = this.nextTetro.color;
        
        this.nextTetro.createRandom();
        this.currentTetro.x = this.width / 2;
        
        if(this.hurry) {
            this.changeInterval(this.speed);
            this.hurry = false;
        }
    }

    update() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if(this.checkCollision()) this.moveToNextTetro();
        this.displayBuffer();        

        this.renderTetro();     

        if(this.gameOver===true) {
         this.loser();
        }
    }

    nextInterval() {
        this.currentTetro.y++;
        this.update();
    }

    init() {        
        this.currentTetro.createRandom();
        this.nextTetro.createRandom();
        this.currentTetro.x = this.width / 2;
    }
    changeInterval(ms) {
            clearInterval(this.intervals);
            this.intervals = setInterval(this.nextInterval.bind(this), ms);
    }

    displayBuffer() {
        for(let col = 0; col < this.width; ++col)
            for(let row = 0; row < this.height; ++row) {
                if(this.renderBuffer[row][col] === 0){
                    // console.log(this.renderBuffer[x][y]);
                }
                else {
                    const x = this.blockSize * col;
                    const y = this.blockSize * row;
                    this.context.beginPath();
                    this.context.fillStyle = this.renderBuffer[row][col];
                    this.context.rect(this.blockSize * col, this.blockSize * row, this.blockSize, this.blockSize);
                    this.context.fill(); 
                    this.context.stroke();
                }
            }
        

    }
    loser() {
        alert("GAME OVER!!!");
        this.reset();
    }

    checkRow(row) {
        let isComplete = true;
        for(let col = 0; col < this.width; ++col) {
            if(this.renderBuffer[row][col]===0) {
                isComplete = false;
                break;
            }
        }
        if(isComplete === true) this.removeRow(row);
    }
    removeRow(row) {
        for(let i = row; i > 0; i--) {
            for(let j = 0; j < this.width; j++) {
                this.renderBuffer[i][j] = this.renderBuffer[i-1][j];
            }            
        }
        // clean top row
        for(let i = 0; i < this.width; i++) this.renderBuffer[0][i] = 0;
    }

    addToBuffer() {
        for(let i = 0; i < 4; ++i) {
            const block = this.currentTetro.renderingBlock[i];
            const loc = this.currentTetro;
            const tester = loc.y + block.y -1;
            this.renderBuffer[loc.y + block.y -1][loc.x + block.x] =
                loc.color;
            
            this.checkRow(tester);
            // console.log(this.renderBuffer[loc.x + block.x][loc.y + block.y]);
        }
    }


    moveTetro(steps) {
        let isLegal = true;
        const newX = this.currentTetro.x + steps;
        for(let i=0; i<4; i++) {
            let x = newX + this.currentTetro.renderingBlock[i].x;
            let y = this.currentTetro.y + this.currentTetro.renderingBlock[i].y;
            if(x < 0 || x >= this.width) {
                isLegal = false;
                break;
            }
            else if(this.renderBuffer[y][x] !== 0) {
                isLegal = false;
                break;
            }
        }
        if(isLegal) this.currentTetro.x += steps;
    }
}

// Event handler
const handleInput = (e) => {
    switch(e.key) {
        case "ArrowLeft": 
            game.moveTetro(-1); 
            game.update(); 
            break;
        case "ArrowRight": 
            game.moveTetro(1); 
            game.update(); 
            break;
        case "ArrowUp": game.rotate(); game.update(); break;
        case "ArrowDown": game.speedUp(); break;
        case " ": game.speedUp(); break;
    }
}


// This is where the action starts

const game = new PlayViewport;
game.init();

window.addEventListener('keydown', handleInput);
