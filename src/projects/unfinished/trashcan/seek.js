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

        this.target = new Vector;

        this.speed;
        this.deceleration;        
    }

    init() {
        this.position.set(0, 0);
        this.velocity.set(0,0);
        this.acceleration.set(0, 0);

        this.target.set(0, 0);

        this.speed = 10;
        this.deceleration = this.speed / 100;
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

        let speed = this.speed;
        let d = desired.getMag();

        if(d<100) {
            speed = d * this.deceleration;
            if(d<5) speed = 0;    
        }
        
        desired.setMag(speed);

        const steering = new Vector();
        steering.add(desired);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);

        return steering;
    }

    applyForce() {
        this.acceleration.add(this.arrive());
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

export { Vector, Vehicle };