import L_System from './L-System.js';
import Viewport from '../engine/Viewport.js';

export default class AlgoMenu {
    constructor() {
        this.viewport = new Viewport(300, 380);
        this.running = new L_System;

        // event handling
        this.bindPlay = this.running.create.bind(this.running);
        
        // INITIALIZE
        this.viewport.init();
        this.running.renderer = this.viewport.context;

        this.button;
    }
    init() {
        // CONSTANTS TO HANDLE INPUT AND OUTPUT
        this.button = document.getElementById("btn");
        this.button.addEventListener('click', this.bindPlay);
        this.viewport.refetch();
        this.viewport.init();

        this.running.renderer = this.viewport.context;
        
        this.running.init();

    }

    unload() {
        this.button.removeEventListener('click', this.bindPlay);
    }
}

