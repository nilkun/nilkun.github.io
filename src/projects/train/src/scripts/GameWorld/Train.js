import Vector from '../engine/Vector.js'
import { PATH } from '../constants.js';

export default class Train {
    constructor() {
        this.position = new Vector;
        this.velocity = new Vector;
        this.acceleration = new Vector;

        this.speed;
        this.deceleration;
        
        this.target = new Vector;
        this.maxForce;
        this.cd = true;
        this.destination = [];
        this.direction = new Vector;
        this.sprite = new Image();
        this.sprite.src = PATH + '/src/textures/train.png';
        // this.sprite.style.width = "10%";
    }

    init() {
        this.position.set(0, 0);
        this.velocity.set(0,0);
        this.acceleration.set(0, 0);
        this.speed = .5;
        this.deceleration = this.speed / 100;
        this.target.set(200, 200);
        this.maxForce = .005;
        this.angle = 0;
    }

    update(variable = this.target) {
        let force;
        force = this.arrive(variable);
        this.applyForce(force);

        this.position.add(this.acceleration);

        this.velocity.set(0, 0);
        this.velocity.add(this.acceleration);
        this.acceleration.reset();
        if(this.cd) {
            this.cd = false;
            return true;
        }
        return false;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    setPos(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    setTarget(x, y) {
        let angle = 0;
        let compX = this.position.x;
        let compY = this.position.y;          

        this.target.set(Math.floor(x), Math.floor(y));

        compX -= this.target.x;
        compY -= this.target.y;
        if(compX >= 1) angle += Math.PI;
        if(compY <= -1) angle += Math.PI/2;
        else if(compY >= 1) angle -= Math.PI/2
        this.angle = angle;
    }

    render(context, size) {
        context.save();
        context.translate(this.position.x + size/2, this.position.y + size/2);
        context.rotate(this.angle);
        context.drawImage(this.sprite, 0, 0, 16, 16, -size/2, -size/2, size, size);
        context.restore();
    }

    arrive() {
        let desired = new Vector();
        desired.add(this.target);
        desired.sub(this.position);

        let speed = this.speed;
        let d = desired.getMag();

        if(d<1) {
            this.cd = true;
        }
        
        desired.setMag(speed);

        const steering = new Vector();
        steering.add(desired);

        return steering;
    }

}
