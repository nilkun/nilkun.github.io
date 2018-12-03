class Viewport {
    constructor(width = 800, height = 600) {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
    }
  
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    init() {
        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();
        this.context.save();
    }
    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}
class Vector {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    add(vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
    }
    sub(vector2) {
        this.x -= vector2.x;
        this.y -= vector2.y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    reset() {
        this.x = 0;
        this.y = 0;
    }
    setMag(mag) {
        const currentMagnitude = 
            Math.sqrt(
                this.x * 
                this.x + 
                this.y * 
                this.y
            );
        const scalingFactor = mag / currentMagnitude;
        this.x *= scalingFactor;
        this.y *= scalingFactor;
    }
    getMag() {
        return Math.sqrt(
            this.x * 
            this.x + 
            this.y * 
            this.y
        );
    }
    limit(max) {
        this.setMag(this.getMag()*max);
    }
}

class Vehicle {
    constructor() {
        this.position = new Vector;
        this.velocity = new Vector;
        this.acceleration = new Vector;

        this.speed;
        this.deceleration;
        
        this.target = new Vector;
        this.maxForce;;
    }

    init() {
        this.position.set(0, 0);
        this.velocity.set(0,0);
        this.acceleration.set(0, 0);
        this.speed = 10;
        this.deceleration = this.speed / 100;
        this.target.set(200, 200);
        this.maxForce =  .05;
    }

    update() {
        this.applyForce();

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.reset();
    }

    arrive() {
        let desired = new Vector();
        desired.add(this.target);
        desired.sub(this.position);

        let d = desired.getMag();
        let speed = this.speed;

        if(d<100) {
            if(d<5) speed = 0;
            else speed = d * this.deceleration;
        }

        desired.setMag(speed);

        const steering = new Vector();
        steering.add(desired);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);

        return steering;
    }

    applyForce() {
        let arrive = this.arrive(this.target);
        this.acceleration.add(arrive);
    }
    setPos(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    setTarget(x, y) {
        this.target.set(x, y);
    }

    render(v) {
        const context = v.context;
        context.beginPath();
        context.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
        context.fillStyle = 'orange';
        context.fill();
    }
}

// HERE WE GO!
const viewport = new Viewport;
const chaser = new Vehicle;
const update = () => {
    chaser.update();
    viewport.clear();
    chaser.render(viewport);
}
window.addEventListener('click', (e) => chaser.setTarget(e.x, e.y));

// Initialization
viewport.init();
chaser.init();


chaser.setPos(60, 60);

const updateInterval = setInterval(update, 1000/ 60);

Today's #SinglePlayerHackathon Steering Algorithm, now on #codepen: 
https://bit.ly/2Sp8RM1
Inspired by this video
https://youtu.be/4hA7G3gup-4
 by @shiffman

Please feel free to retweet, recode, reuse, refurbish!
#gamedev #hackathon #javascript