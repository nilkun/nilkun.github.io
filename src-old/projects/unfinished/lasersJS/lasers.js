// show welcome message

// game screen 
// game logic

// play game 
function Missile(x, y, ratio, velocity) {
    this.startX = x;
    this.x = x;
    this.y = y;
    this.x_to_y_ratio = ratio;
    this.velocity = velocity;
}
// when game is over
function createMissile() {
    const x = Math.random()*canvas.width;
    const y = 0;
    const goal = Math.random()*canvas.width;
    const velocity = 7;
    const ratio = (goal-x)/(canvas.height);
    Missiles.push(new Missile(x, y, ratio, velocity));

}

function Bomb(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.size = 1;
}


const CollisionDetection = () => {

}

const GameStats = () => {

}

// Render canvas and background 
// Make bombs
// Make lasers
// implement logic
const Bombs = [];
const Missiles = [];
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const init = () => {
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
}

const UI = () => {
    context.font = "15px Arial";
    context.fillText("Lasers from Space (Alpha)", 10, 20);

}
const fire = (mouse) => {
    const location = canvas.getBoundingClientRect();
    const e = {
        clientX: mouse.clientX - location.left,
        clientY: mouse.clientY - location.top,
    }
    console.log(e);
    Bombs.push(new Bomb(e));
}

const RenderBomb = (Bomb) => {
    context.beginPath();
    context.arc(Bomb.x, Bomb.y, Bomb.size, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.stroke();
}

const RenderMissiles = (Missile) => {
    context.strokeStyle = 'green';
    context.beginPath();
    context.moveTo(Missile.startX,0);
    context.lineTo(Missile.x,Missile.y);
    context.stroke();
    Missile.y += Missile.velocity;
    Missile.x = Missile.startX + Missile.y * Missile.x_to_y_ratio;
}

const RenderBackground = () => {

}
const MAXSIZE = 40;
UI();
canvas.addEventListener('click', fire);

const Render = () => {
    Bombs.forEach((Bomb, index) => {
        if(Bomb.size > MAXSIZE) Bombs.splice(index, 1);;
         //remove
        RenderBomb(Bomb);
        Bomb.size++;
    });

    Missiles.forEach((Missile, index) => {
        RenderMissiles(Missile);
    });
}

let image=new Image();

image.src="./city.png";
let counter = 0;
const Update = () => {
    // context.fillStyle = 'rgb(' + 255 + ', ' + 255 + ', ' + 255 + ')';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    if(counter++ % 100 === 0) createMissile();
    context.drawImage(image,0,0,canvas.width,canvas.height);
    Render();
}

setInterval(Update, 50);

// Collision 
// hit city
// score
// fade out
// lasers remove;
//levels



