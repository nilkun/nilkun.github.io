
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
        this.speed = 15;
        this.deceleration = this.speed / 100;
        this.target.set(0, 0);
        this.maxForce =  .05;
    }

    update(isSeeking, variable = this.target) {
        let force;
        if(isSeeking) force = this.arrive(variable);
        else force = this.flee(variable);
        this.applyForce(force);

        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.reset();
    }

    flee(enemy) {
        let desired = new Vector();
        desired.add(this.position);
        desired.sub(enemy);

        let d = desired.getMag();
        let speed = this.speed;
        if(d>100) speed = d * this.deceleration;
        if(d>150) speed = 0;

        desired.setMag(speed);
        const steering = new Vector();
        steering.add(desired);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);

        return steering;
    }

    arrive() {
        let desired = new Vector();
        desired.add(this.target);
        desired.sub(this.position);

        let d = desired.getMag();
        let speed = this.speed;
        if(d<100) speed = d * this.deceleration;
        if(d<1) speed = 0;

        desired.setMag(speed);
        const steering = new Vector();
        steering.add(desired);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);

        return steering;
    }

    applyForce(force) {
        this.acceleration.add(force);
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
        context.stroke();
    }
}

class MyName {
    constructor() {
        this.dots = new Array();
        this.position = { x: 0, y: 0 };
        this.xOffset = 80;
        this.yOffset = 80;
        this.isSeeking = true;
        this.enemy = new Vector();
    }
    
    add(x, y) {
        let newDot = new Vehicle;
        newDot.init();
        newDot.target.set(x+this.xOffset, y+this.yOffset);
        this.dots.push(newDot);
    }

    init() {
        this.dots.forEach(dot => {
            dot.init();
        })
    }

    flee(x, y) {
        this.enemy.set(x, y);
        this.isSeeking = false;
    }

    render(v) {
        const context = v.context;
        this.dots.forEach(dot => {
            if(this.isSeeking) dot.update(this.isSeeking);
            else dot.update(this.isSeeking, this.enemy);

            console.log(this.enemy);

            dot.render(v);
        })

    }
}   


class FleeDemo {
    constructor() {

    }

const viewport = new Viewport;
const update = () => {
    viewport.clear();
    name.render(viewport);
}
// Initialization

const name = new MyName;
let size = 23;
name.add(0,0);
name.add(0, size * 1);
name.add(0, size * 2);
name.add(0, size * 3);
name.add(0, size * 4);

name.add(size * .75, size * 1);
name.add(size * 1.5, size * 2);
name.add(size * 2.25, size * 3);

name.add(size * 3, size * 0);
name.add(size * 3, size * 1);
name.add(size * 3, size * 2);
name.add(size * 3, size * 3);
name.add(size * 3, size * 4);

name.add(size * 4.5, size * 0);
name.add(size * 4.5, size * 1);
name.add(size * 4.5, size * 2);
name.add(size * 4.5, size * 3);
name.add(size * 4.5, size * 4);

name.add(size * 6, size * 0);
name.add(size * 6, size * 1);
name.add(size * 6, size * 2);
name.add(size * 6, size * 3);
name.add(size * 6, size * 4);

name.add(size * 6.75, size * 4);
name.add(size * 7.5, size * 4);
name.add(size * 8.25, size * 4);

name.add(size * 9.75, size * 0);
name.add(size * 9.75, size * 1);
name.add(size * 9.75, size * 2);
name.add(size * 9.75, size * 3);
name.add(size * 9.75, size * 4);

name.add(size * 10.5, size * 2);
name.add(size * 11.25, size * 2);
name.add(size * 12, size * 3);
name.add(size * 12, size * 1);
name.add(size * 12.75, size * 0);
name.add(size * 12.75, size * 4);

name.add(size * 14.25, size * 0);
name.add(size * 14.25, size * 1);
name.add(size * 14.25, size * 2);
name.add(size * 14.25, size * 3);

name.add(size * 17.25, size * 0);
name.add(size * 17.25, size * 1);
name.add(size * 17.25, size * 2);
name.add(size * 17.25, size * 3);

name.add(size * 15.75, size * 4);
name.add(size * 16.5, size * 4);
name.add(size * 15, size * 4);
name.add(size * 9.75, size * 3);
name.add(size * 9.75, size * 4);

name.add(size * 18.75, size * 0);
name.add(size * 18.75, size * 1);
name.add(size * 18.75, size * 2);
name.add(size * 18.75, size * 3);
name.add(size * 18.75, size * 4);

name.add(size * 19.5, size * 1);
name.add(size * 20.25, size * 2);
name.add(size * 21, size * 3);

name.add(size * 21.75, size * 0);
name.add(size * 21.75, size * 1);
name.add(size * 21.75, size * 2);
name.add(size * 21.75, size * 3);
name.add(size * 21.75, size * 4);


viewport.init();
// name.init();
name.render(viewport);
const updateInterval = setInterval(update, 1000/ 60);
window.addEventListener('mousedown', (e) => name.flee(e.x, e.y));
window.addEventListener('mouseup', () => name.isSeeking=true);
window.addEventListener('mousemove', (e) => { 
        if (!name.isSeeking) name.flee(e.x, e.y);
});
}