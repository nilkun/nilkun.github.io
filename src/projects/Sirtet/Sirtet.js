import Tetromino from './Tetromino.js';

export default class Sirtet {
    constructor() {

        // set gameview size
        this.rows;
        this.columns;

        // tetrominoes and their size
        this.buffer;
        this.current;
        this.next;
        this.size;

        // renderer
        this.renderer;
        this.scoreBoard;

        // gamestats
        this.speed;
        this.gameOver;        
        this.hurry;
        this.score;

        // running
        this.intervals;
    }

    init(context = this.renderer, scoreboard = this.scoreboard) {

        this.rows = 20;
        this.columns = 10;

        // Create and set up game view buffer
        this.buffer = new Array(this.rows);
        this.setBuffer();

        this.current = new Tetromino();
        this.next = new Tetromino();
        this.size = context.canvas.clientWidth / this.columns;

        this.renderer = context; 

        this.gameOver = false;
        this.speed = 250;
        this.hurry = false;
        this.intervals = setInterval(this.nextInterval.bind(this), this.speed);
        this.score = 0;

        this.current = new Tetromino();
        this.next = new Tetromino();
        this.current.x = this.columns / 2;

        this.scoreboard = scoreboard;
        scoreboard.innerHTML = "0";
        
        window.addEventListener('keydown', (e) => this.handleInput(e));
    }

    reset() {
        // Create and set up game view buffer
        this.buffer = new Array(this.rows);
        this.setBuffer();

        this.current = new Tetromino();
        this.next = new Tetromino();

        this.gameOver = false;
        this.speed = 200;
        this.hurry = false;
        this.intervals = setInterval(this.nextInterval.bind(this), this.speed);
        this.score = 0;

        this.current = new Tetromino();
        this.next = new Tetromino();
        this.current.x = this.columns / 2;

        scoreboard.innerHTML = "0";
    }

    handleInput(e) {
        if(!this.gameOver){
            switch(e.key) {
                case "ArrowLeft": 
                    this.moveTetro(-1); 
                    this.update(); 
                    break;
                case "ArrowRight": 
                    this.moveTetro(1); 
                    this.update(); 
                    break;
                case "ArrowUp": this.rotate(); this.update(); break;
                case "ArrowDown": this.speedUp(); break;
                case " ": { this.speedUp(); break;
                }   
            }         
        }
        else {
            switch(e.key) {
                case " ":
                    this.reset();
            }
        }
    }
    setBuffer() {
        for(let row = 0; row < this.buffer.length; ++row) {
            this.buffer[row] = new Array(this.rows);
            for(let col = 0; col < this.columns; ++col) {
                this.buffer[row][col] = 0;
            }
        }
    }

    speedUp() {
        if(this.hurry) return;
        this.changeInterval(this.speed / 10);
        this.hurry = true;
    }

    isColliding() {

        const positions = this.current.getPositions();
        let isTrue = false;

        for(let i = 0; i < 4; i++) {
            const col = positions[i].x;
            const row = positions[i].y;
            if(row >= 0) {
                if(row >= this.rows) {
                    this.addCurrentToBuffer(positions);
                    isTrue = true;
                    break;
                } else if(this.buffer[row][col] !== 0) {
                    this.addCurrentToBuffer(positions);
                    if(positions[i].y <= 0 ) this.gameOver = true;
                    isTrue = true;
                    break;
                }
            }
        }
        return isTrue;
    }

    switchToNext() {
        this.current.copyFrom(this.next);
        this.next = new Tetromino();
        this.current.x = this.columns / 2;
        
        if(this.hurry) {
            this.changeInterval(this.speed);
            this.hurry = false;
        }
    }

    render() {
        this.renderBuffer();    
        this.current.render(this.renderer, this.size);
    }

    update() {
        this.renderer.clearRect(0, 0, this.renderer.canvas.clientWidth, this.renderer.canvas.clientHeight);
        if(this.isColliding()) this.switchToNext();

        this.render();     

        if(this.gameOver) {
            this.playAgain();
        }
    }

    playAgain() {

        clearInterval(this.intervals);
        this.renderer.font = "15px Arial";
        this.renderer.fillStyle = "grey";
        const gameover1 = "GAME OVER!!!";
        const gameover2 = "PRESS THE SPACE BAR";
        const gameover3 = "TO PLAY AGAIN...";
        this.renderer.fillText(gameover1,(this.renderer.canvas.clientWidth - this.renderer.measureText(gameover1).width) / 2,this.renderer.canvas.clientHeight / 10 * 4);

        this.renderer.font = "10px Arial";
        this.renderer.fillText(gameover2,(this.renderer.canvas.clientWidth - this.renderer.measureText(gameover2).width) / 2, this.renderer.canvas.clientHeight / 10 * 5);
        this.renderer.fillText(gameover3,(this.renderer.canvas.clientWidth - this.renderer.measureText(gameover3).width) / 2, this.renderer.canvas.clientHeight / 10 * 5.5);
    }

    nextInterval() {
        this.current.y++;
        this.update();
    }

    changeInterval(ms) {
            clearInterval(this.intervals);
            this.intervals = setInterval(this.nextInterval.bind(this), ms);
    }

    rotate() {
        if(this.canRotate())this.current.rotate();
    }

    canRotate() {
        let rotation = this.current.rotation + 1;
        if(rotation >= this.current.block.length) rotation = 0;
        const positions = this.current.getTestPositions(rotation);

        let canRotate = true;

        for(let i = 0; i < 4; i++) {
            const col = positions[i].x;
            const row = positions[i].y;
            if(row >= 0) {
                if(row >= this.rows) {
                    canRotate = false;
                    break;
                } else if(this.buffer[row][col] !== 0) {
                    canRotate = false;
                    break;
                }
            }
        }
        return canRotate;
    }

    renderBuffer() {
        for(let col = 0; col < this.columns; ++col)
            for(let row = 0; row < this.rows; ++row) {
                if(this.buffer[row][col] === 0){
                }
                else {
                    this.renderer.beginPath();
                    this.renderer.fillStyle = this.buffer[row][col];
                    this.renderer.rect(this.size * col, this.size * row, this.size, this.size);
                    this.renderer.fill(); 
                    this.renderer.stroke();
                }
            }    
    }
    loser() {
        clearInterval(this.intervals);
    }

    checkRow(set) {
        let points = 0;
        const array = Array.from(set).sort();
        for(let row of array) {
            let isComplete = true;
            for(let col = 0; col < this.columns; ++col) {
                if(this.buffer[row][col]===0) {
                    isComplete = false;
                    break;
                }
            }
            if(isComplete === true) { 
                this.removeRow(row);
                points++;
            }
        }
        this.score += points * points * 1000;
        this.scoreboard.innerHTML = this.score;
    }

    removeRow(row) {
        for(let i = row; i > 0; i--) {
            for(let j = 0; j < this.columns; j++) {
                this.buffer[i][j] = this.buffer[i-1][j];
            }            
        }
        // clean top row
        for(let i = 0; i < this.rows; i++) this.buffer[0][i] = 0;
    }

    addCurrentToBuffer(positions) {
        let set = new Set();
        positions.forEach(position => {
            if(position.y > 0) {
                if(position.y <= this.rows) {
                this.buffer[position.y-1][position.x] = this.current.color;
                set.add(position.y-1);                
            } 
        }

        })
        this.checkRow(set);
    }

    moveTetro(steps) {

        let isLegal = true;
        
        const positions = this.current.getPositions();
        positions.forEach(position => {
            const x = steps + position.x;
            const y = position.y;
            if(position.y >= 0) {
                if(x < 0 || x >= this.columns) {
                    isLegal = false;
                    return;
                }
                else if(this.buffer[y][x] !== 0) {
                    isLegal = false;
                    return;
                }
            }
        });
        if(isLegal) this.current.x += steps;
    }
}
