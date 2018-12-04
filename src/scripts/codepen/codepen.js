import L_System from './L-System.js';
import Viewport from '../engine/Viewport.js';

export default class AlgoMenu {
    constructor() {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.height = h * .75;
        this.width = this.height / 3.8 * 3;
        this.viewport = new Viewport(this.width, this.height);
        this.running = new L_System(this.width, this.height);

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

        // this.running = new L_System(this.width, this.height);
        this.running.renderer = this.viewport.context;
        
        this.running.init(this.width, this.height);

    }

    unload() {
        this.button.removeEventListener('click', this.bindPlay);
    }
}

