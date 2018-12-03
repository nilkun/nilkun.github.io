const blockSize = 10;
const boxWidth = 200;
const boxHeight = 400;
const speed = 200;

const gameWidth = boxWidth / blockSize;
const gameHeight = boxHeight / blockSize;

let renderBuffer = new Array(gameHeight);
for(let i = 0; i < renderBuffer.length; ++i) {
    renderBuffer[i] = new Array(gameWidth);
    for(let j = 0; j < gameWidth; ++j) {
        renderBuffer[i][j] = "";
    }
}


class Sirtet {
    constructor() {
        // Set up canvas and context

        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");

        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();

        this.currentPiece = {};
        this.currentDirection = {};
        this.nextPiece = {};
        this.isSpedUp = false;
    }

    // Move sideways
    move(steps) {
        this.currentPiece.x += steps;
        this.update(); 
    }

    // Rotate pieces and check if valid
    rotate() {
        if(this.currentPiece.type==="O") return;

        else if(this.currentPiece.type==="I" ||
         this.currentPiece.type==="S" ||
         this.currentPiece.type==="Z") {
            if(this.currentPiece.direction < 1)
                this.currentPiece.direction++;
            else
                this.currentPiece.direction = 0;
        }
        else if(this.currentPiece.direction < 3)
            this.currentPiece.direction++;
        else
            this.currentPiece.direction = 0;
        
        this.rotator(this.currentPiece.direction);
        this.update(); 
    }

    rotator(formula) {
        const block = this.currentPiece.block;

        switch(formula){
            case 0:
                for(let i=0; i<4; i++) {
                    this.currentDirection.block[i] = {
                        x: block[i].x,
                        y: block[i].y,
                    } 
                }
                break;
            case 1:
                for(let i=0; i<4; i++) {
                    this.currentDirection.block[i] = {
                        x: block[i].y,
                        y: -block[i].x,
                    }
                }
                break;
            case 2:
                for(let i=0; i<4; i++) {
                    this.currentDirection.block[i] = {
                        x: -block[i].x,
                        y: -block[i].y,
                    }
                }
                break;
            
            case 3:
                for(let i=0; i<4; i++) {
                    this.currentDirection.block[i] = {
                        x: -block[i].y,
                        y: block[i].x
                    }
                }
                break;            
        }
    }


    speedUp() {
        if(this.isSpedUp) return;
        changeInterval(speed / 10);
        this.isSpedUp = true;

    }

    fixTetris() {
        for(let i=0; i<4; i++){
            const col = this.currentPiece.x + this.currentPiece.block[i].x;
            const row = this.currentPiece.y + this.currentPiece.block[i].y
            if(
                renderBuffer[row][col] === "") console.log("ok");
            else {
                console.log("not ok!!!");
            }
        }

    }
    renderTetro(tetro) {

        const { block } = tetro;
        const { x, y, color } = this.currentPiece;
        const context = this.context;
        context.beginPath();
        
        for(let i=0; i<4; i++) {
                        context.rect(
                            blockSize * (x+(block[i].x)),
                            blockSize * (y+(block[i].y)), 
                            blockSize, 
                            blockSize);
                    }

        // switch(direction){
        //     case 0:
        //         for(let i=0; i<4; i++) {
        //             context.rect(
        //                 blockSize * (x+(block[i].x)),
        //                 blockSize * (y+(block[i].y)), 
        //                 blockSize, 
        //                 blockSize);
        //         }
        //         break;
        //     case 1:
        //         for(let i=0; i<4; i++) {
        //             context.rect(
        //                 blockSize * (x+(block[i].y)),
        //                 blockSize * (y-(block[i].x)), 
        //                 blockSize, 
        //                 blockSize);
        //         }
        //         break;
        //     case 2:
        //         for(let i=0; i<4; i++) {
        //             context.rect(
        //                 blockSize * (x-(block[i].x)),
        //                 blockSize * (y-(block[i].y)), 
        //                 blockSize, 
        //                 blockSize);
        //         }
        //         break;
            
        //     case 3:
        //         for(let i=0; i<4; i++) {
        //             context.rect(
        //                 blockSize * (x-(block[i].y)),
        //                 blockSize * (y+(block[i].x)), 
        //                 blockSize, 
        //                 blockSize);
        //         }
        //         break;            
        // }

        context.rect(blockSize * x, blockSize * y, blockSize, blockSize);
        context.fillStyle = color;
        context.fill(); 
        context.stroke();       
    }

    checkCollision() {
        if(this.currentPiece.y >= gameHeight) return true;
        return false;
    }
    getTetro(tetroType) {

        let tetro = { 
            x: 0,
            y: 0,
            direction: 0,
            type: ""
        };

        switch(tetroType) {
            case "I":
            { tetro.block = [
                    { x: 0, y: -2 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 0, y: 1 }
                ],
                tetro.color = "red";
                tetro.type = "I";

                break;
            }
            case "L":
            { tetro.block = [
                    { x: 0, y: 1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 1, y: 1 }
                ],
                tetro.color= "pink";
                tetro.type = "L";

                break;
            }
            case "J":
            { tetro.block = [
                    { x: 0, y: 1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: -1, y: 1 }
                ],
                tetro.color= "orange";
                tetro.type = "J";

                break;
            } 
            case "O":
            { tetro.block= [
                    { x: -1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: -1, y: 0 }
                ],
                tetro.color= "yellow";
                tetro.type = "O";

                break;
            }
            case "S":
            { tetro.block= [
                    { x: 1, y: 0 },
                    { x: 0, y: 0 },
                    { x: -1, y: 1 },
                    { x: 0, y: 1 }
                ],
                tetro.color= "blue";
                tetro.type = "S";

                break;
            }
            case "Z":
            { tetro.block= [
                    { x: -1, y: -1 },
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 }
                ],
                tetro.color= "purple";
                tetro.type = "Z";

                break;
            }
            case "T":
            { tetro.block= [
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 0 }
                ],
                tetro.color= "green";
                tetro.type = "T";

                break;
            }
        }
        return tetro;
    }
    getNextPiece() {
        return this.nextPiece;
    }
    setNextPiece() {
        const next = Math.floor(Math.random()*7);
        let shape = "";

        switch(next) {
            case 0:
                shape = "I";
                break;                
            case 1:
                shape = "J";
                break;
            case 2:
                shape = "L";
                break;                
            case 3:
                shape = "O";
                break;

            case 4:
                shape = "S";
            break;                
            case 5:
                shape = "Z";
                break;
            case 6:
                shape = "T";
                break; 
        }
        console.log("NEXT: " + shape);
        return this.getTetro(shape);
                
    }
    finishPiece() {
        this.currentPiece = this.getNextPiece();
        this.currentDirection = this.getNextPiece();
        this.nextPiece = this.setNextPiece();
        
        this.currentPiece.x = gameWidth / 2;
        this.currentPiece.y = 0;

        this.nextPiece.x = gameWidth / 2;
        this.nextPiece.y = 0;

        this.isSpedUp = false;
        changeInterval(speed);

    }

    update() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderTetro(this.currentDirection);
        this.fixTetris();
        if(this.checkCollision()) this.finishPiece();        
    }

    intervalUpdate() {
        this.currentPiece.y++;
        this.update();
    }
    init() {
        
        this.currentPiece = this.getTetro("I");
        this.currentDirection.block = [
            { x: 0, y: -2 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 0, y: 1 }
        ]
        // this.rotator(0);
        this.nextPiece = this.setNextPiece();
        // this.nextPiece = this.getTetro("I");
        // console.log(this);
        this.currentPiece.x = gameWidth / 2;
        this.currentPiece.y = 0;

        this.nextPiece.x = gameWidth / 2;
        this.nextPiece.y = 0;
    }
}

const handleInput = (e) => {
    switch(e.key) {
        case "ArrowLeft": sirtet.move(-1); break;
        case "ArrowRight": sirtet.move(1); break;
        case " ": sirtet.speedUp(); break;
        case "ArrowDown": sirtet.speedUp(); break;
        case "ArrowUp": sirtet.rotate(); break;

    }
}
// const sirtet = new Sirtet;
// sirtet.init();
// // console.log(sirtet.nextPiece);
// // sirtet.renderBox( 10, 10, "#FFAA00");
// sirtet.renderTetro(sirtet.currentPiece);
// window.addEventListener('keydown', handleInput);

// let runGame = setInterval(sirtet.intervalUpdate.bind(sirtet), speed);
// const changeInterval = (ms) => {
//     clearInterval(runGame);
//     runGame = setInterval(sirtet.intervalUpdate.bind(sirtet), ms);
// }

class Tetromino {
    constructor() {

    }
}

class PlayViewport {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");

        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();
    }
}

const game = new PlayViewport;
