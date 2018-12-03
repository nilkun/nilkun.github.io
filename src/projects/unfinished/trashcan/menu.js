import Viewport from './containers/Viewport.js'
import { Vector, Vehicle } from './chasing.js';

const selector = document.querySelector('.selector');

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

chaser.render(viewport);
const updateInterval = setInterval(update, 1000/ 60);