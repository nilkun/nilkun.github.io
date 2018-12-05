// The blocks

class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        this.width = 600;
        this.height = 500;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.canvas.style.background = "#FFFFFF";
        // this.context.fillStyle = "#FFFFFF";        
        // this.context.fill();
    }
}

class Paddle {
    constructor(canvas) {
        this.width = canvas.width / 10;
        this.height = this.width / 4;
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height - (canvas.height / 10);
        this.color = "orange"; 
        this.returnValue;
    }

    setup() {
        let angles = this.width;
        // Math.ceil(180 / this.width /2);
        let anglesDiff = 180 / this.width;
        this.returnValue = new Array(angles);
        const convertToRadians = Math.PI / 180;
        for(let i = 0; i < angles; i++)
            this.returnValue[i] = {
                x: Math.cos(i*anglesDiff*convertToRadians),
                y: Math.sin(i*anglesDiff*convertToRadians),
            }
    }


    render(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width,  this.height);
        context.fillStyle = this.color;
        context.fill(); 
        context.stroke();  
    }

    move(direction, width) {
        let newLocation = this.x + direction;
        if(newLocation < 0 ) newLocation = 0;
        else if (newLocation + this.width >= width) newLocation = width - this.width;
        this.x = newLocation;
    }
}

class Score {
    constructor(canvas) {
        this.points = 0;
        this.x = canvas.width / 20;
        this.y = canvas.height / 10;
    }
    render(context) {
        context.font = "30px Arial";
        context.fillText(this.points ,this.x, this.y);
    }
}

class Ball {
    constructor(canvas) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = canvas.width / 40;
        this.speed = 3;
        this.yVelocity = 1;
        this.xVelocity = 0.2;
    }
    update() {
        this.y += this.yVelocity;
        this.x += this.xVelocity;
    }

    render(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.size,  this.size);
        context.fillStyle = this.color;
        context.fill(); 
        context.stroke();
    }
    collisionCheck(gameField, paddle) {

        // LEFT OR RIGHT WALL
        if(this.x <= 0 || this.x + this.size >= gameField.width) {
            this.xVelocity = -this.xVelocity;
            return false;
        }


        const yDistance = this.y - paddle.y;

        // TOP OF SCREEN
        if(this.y <= 0) {
            this.yVelocity = -this.yVelocity;
            return true;
        }

        // BOTTOM OF SCREEN
        else if(this.y + this.size >= gameField.canvas.height) {
            menu.gameOver(menu.game.score.points);
            return false;
        } 

        else if(
            // The top is further down than the bottom of the paddle
            // and the bottom is higher up than the to of the paddle

            // check if paddle y is within ball boundaries
            // or paddle top is within boundaries
            (   (this.y <= paddle.y && this.y + this.size >= paddle.y) ||
                (this.y <= paddle.y + paddle.height && 
                    this.y + this.size >= paddle.y + paddle.height)
            ) &&
            (   (this.x + this.size >= paddle.x && 
                this.x <= paddle.x + paddle.width)
            )
        ) {
            const middleOfPaddle = paddle.width / 2;
            const hitSpot = Math.floor(this.x - paddle.x);
            let index;
            if (hitSpot >= middleOfPaddle) index = hitSpot;
            else index = hitSpot + this.size;
            const results = paddle.returnValue[index];
            this.yVelocity = -(results.y * this.speed);
            this.xVelocity = -(results.x * this.speed);
            this.y = paddle.y - paddle.height;
            return false;
        }
    }
}

class Game {
    constructor() {
        this.canvas = new Canvas;
        this.canvas.init();
        this.paddle = new Paddle(this.canvas);
        this.paddle.setup();
        this.paddle.render(this.canvas.context);
        window.addEventListener('keydown', (e) => {
            this.handleInput(e);
        });
        this.score = new Score(this.canvas);
        this.ball = new Ball(this.canvas);
        this.speed = 1;
        this.updateFrequency = 10;
        this.updateInterval = setInterval(this.update.bind(this), this.updateFrequency)
    }
    changeSpeed(speed) {
        this.speed = speed;
        updateInterval();
    }
    changeInterval() {
        this.updateFrequency = 10 / this.speed;
        clearInterval(this.updateInterval);
    }
    update() {
        if(this.ball.collisionCheck(this.canvas, this.paddle)) this.score.points++;

        this.ball.update();
        this.draw();
    }
    over() {
        clearInterval(this.updateInterval);
        alert("Game Over!");
    }
    draw() {
        this.canvas.clear();
        this.paddle.render(this.canvas.context);
        this.ball.render(this.canvas.context);
        this.score.render(this.canvas.context);
    }

    handleInput(e) {
        switch(e.key) {
            case "ArrowLeft": 
                this.paddle.move(-20, 600);
                break;
            case "ArrowRight": 
                this.paddle.move(20, 600);
                break;
            case "ArrowUp": break;
            case "ArrowDown": break;
            case " ": break;
        }
    }
}

class Menu {
    constructor() {
        this.canvas = new Canvas();
        this.game = null;
        this.blinking = null;
    }

    start() {
        const gameName = "Single Player Pong!"
        const gameInstructions = "Use the arrow keys to control the paddle.";
        const canvas = this.canvas;
        canvas.init();
        const centerer = gameName.length * 30;
        const isShown = true;

        const centerW = (canvas.canvas.width)/2;
        canvas.context.font = "50px Arial";
        canvas.context.textAlign = "center";
        canvas.context.fillStyle = "black";
        canvas.context.fillText(gameName, (canvas.canvas.width)/2, canvas.canvas.height/2);

        canvas.context.font = "25px Arial";
        canvas.context.fillText(gameInstructions, centerW, canvas.canvas.height*2.9/5);
        this.blinking = setInterval(this.blinkingText.bind(this), 300);
        window.addEventListener('keydown', this.startGame);
    }

    gameOver(finalScore) {
        const canvas = menu.canvas;
        clearInterval(menu.game.updateInterval);
        // console.log(finalScore);
        const gameOverText = "GAME OVER!!!"
        const gameOverText2 = "YOUR SCORE: " + finalScore;
        canvas.context.font = "30px Arial";
        canvas.context.textAlign = "center";
        canvas.context.fillStyle = "black";
        canvas.context.fillText(gameOverText, (canvas.canvas.width)/2, canvas.canvas.height/2);
        canvas.context.fillText(gameOverText2, (canvas.canvas.width)/2, canvas.canvas.height*3/4);
        
        // window.removeEventListener('keydown', (e) => {
            // menu.game.handleInput(e)});
        // alert("THANK YOU FOR PLAYING!");
    };

    startGame() {
        window.removeEventListener('keydown', menu.startGame);
        clearInterval(menu.blinking);
        menu.game = new Game();
    }

    blinkingText() {
        if(this.isShown) {
            this.canvas.context.fillStyle = "red";
            this.isShown = false;        
        }
        else {
            this.canvas.context.fillStyle = "orange";
            this.isShown = true;        
        }
        this.canvas.context.font = "18px Arial";
        this.canvas.context.fillText("Press any key to start...", (this.canvas.canvas.width)/2, this.canvas.canvas.height*3.3/5);
    }
    
}
// const game = new Game;
const menu = new Menu;
menu.start();


