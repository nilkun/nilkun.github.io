import L_System from './codepen/L-System.js';
import Viewport from './engine/Viewport.js';

class AlgoMenu {
    constructor() {
        this.viewport = new Viewport;
        this.running = new L_System;
        
        // INITIALIZE
        this.viewport.init();
        this.running.renderer = this.viewport.context;
    }
    runDefault() {

    }
}


const menu = new AlgoMenu;
// CONSTANTS TO HANDLE INPUT AND OUTPUT
const text = document.getElementById("text");
const button = document.getElementById("btn");
button.addEventListener('click', menu.running.create);

const buttonClick = () => {

}

menu.running.init();