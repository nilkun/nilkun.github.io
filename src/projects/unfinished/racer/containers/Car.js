
class Car {
    constructor(x = 200, y = 200) {
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.xOffset = 0;
        this.yOffset = 0;
        this.directionInDegrees = 180;
        this.directionInRadians = 0;
        this.image = new Image;
        this.image.src = '../resources/car.png';
        this.xAxis = 32;
        this.yAxis = 20;
        this.xCorr = 0;
        this.yCorr = 0;
    }
    moveUp() {
        this.speed++;        
    }
    moveDown() {
        this.speed--;
    }
    changeDirectionD(degrees) {
        this.directionInDegrees += degrees;
        
        // prevent oob
        if(this.directionInDegrees > 360) this.directionInDegrees = 360%this.directionInDegrees;
        
        xOffset = Math.sin(this.directionInRadians);
        yOffset = Math.cos(this.directionInRadians);
    }

    changeDirection(radians) {

        this.directionInRadians += radians;
        
        // prevent oob
        if(this.directionInRadians >= Math.PI * 2) 
            this.directionInRadians -= Math.PI * 2;
                // Math.PI * 2 % this.directionInRadians;
        if(this.directionInRadians <= 0) this.directionInRadians+= Math.PI * 2;
        this.calc();
        this.xOffset = Math.sin(this.directionInRadians);
        this.yOffset = Math.cos(this.directionInRadians);
    }

    update() {
        this.x+=this.xOffset * -this.speed;
        // console.log(this.yCorr);
        
        this.y+=this.yOffset * -this.speed;
        if (this.x < 0) this.x = 0;
        if(this.x > 800) this.x = 800;
        if(this.y <0) this.y = 0;
        if(this.y > 600) this.y = 600;
    }

    calc() {
        // directionInRadians!
        const hypoteneuse = 16/2;
        const opposite = Math.sin(this.directionInRadians) * hypoteneuse;
        const adjacent = Math.cos(this.directionInRadians) * hypoteneuse;
        console.log("test: " + adjacent);
        // if((this.directionInRadians >= Math.PI/2 && this.directionInRadians <= Math.PI)
        //     || this.directionInRadians >= Math.PI * 2 - Math.PI / 2
        // ) this.xCorr = -adjacent;
        // else 
        this.xCorr = -Math.abs(adjacent);
        this.yCorr = Math.abs(opposite);

    //     if((opposite >= Math.PI/2 && adjacent <= Math.PI)
    //     || adjacent >= Math.PI * 2 - Math.PI / 2
    // )this.xCorr = -adjacent;
    // else this.xCorr = adjacent;
    //     this.yCorr = opposite;
    }
}



export default Car;

