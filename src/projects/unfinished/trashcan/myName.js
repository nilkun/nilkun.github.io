import { Vector, Vehicle } from './chasing.js';

export default class MyName {
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
        // newDot.position.set(x+this.xOffset, y+this.yOffset);
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

            dot.render(v);

            // context.beginPath();
            // context.arc(dot.position.x, dot.position.y, 5, 0, 2 * Math.PI, false);
            // context.fillStyle = 'green';
            // context.fill();
        })

    }
}    