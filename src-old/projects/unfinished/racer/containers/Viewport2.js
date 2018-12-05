// import Car from "./Car";

console.log("VIEWPORT FILE");
export default class Viewport {
    constructor(width = 800, height = 600) {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
    }
    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    init() {
        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();
        this.context.save();
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderImage(image, x, y, car) {

        this.clear();
        this.context.save();
        // this.update(car);

        // const sx = car.x + 8;
        // const sy = car.y + 20

        this.context.translate(x + car.xCorr, y + car.yCorr);

        this.context.rotate(-car.directionInRadians);


        car.update();
        // console.log(car.yCorr + x);
        this.context.drawImage(image, 0, 0);
        this.context.beginPath();
        this.context.arc(0- car.xCorr,0 - car.yCorr,5,0,2*Math.PI);
        this.context.stroke();
        // this.context.drawImage(image, x + car.xCorr, y + car.yCorr);

        this.context.restore();
    }

    update(car) {
    }
}

// export default Viewport;