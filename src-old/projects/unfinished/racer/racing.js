// The blocks

import Car from './containers/Car.js';
import Viewport from './containers/Viewport.js';

const viewport = new Viewport;
const car = new Car;
car.changeDirection(0)
let updateScreen;
car.image.addEventListener('load', () => {
    // console.log(updateScreen);
    viewport.init();
    updateScreen = setInterval(() => viewport.renderImage(car.image, car.x, car.y, car), 40);
})
// let updateScreen = setInterval(viewport.renderImage(car.image, car.x, car.y), 100);
// console.log(updateScreen + "updating...")
// setInterval(() => { console.log("WHY"), 100})
const handleInput = (e) =>  {
    switch(e.key) {
        case "ArrowLeft": 
            car.changeDirection(.3);
            break;
        case "ArrowRight": 
            car.changeDirection(-.3);
            break;
        case "ArrowUp": 
            car.moveUp();
            break;
        case "ArrowDown": 
            car.moveDown();
            break;
        case " ": break;
    }
}

window.addEventListener('keydown', handleInput);
