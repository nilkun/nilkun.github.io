import L_System from './L-System.js';
import Viewport from '../engine/Viewport.js';

export default class AlgoMenu {
    constructor() {
        this.viewport;
        this.running;

        // event handling
        this.bindPlay;
        
        // INITIALIZE
        // this.viewport.init();
        // this.running.renderer = this.viewport.context;

        this.button;
        this.settings = {};
    }

    init(props = this.settings) {

        this.settings.screenHeight = props.screenHeight * .75 > props.screenWidth ?  props.screenWidth / .75 : props.screenHeight;
        this.settings.screenWidth = this.settings.screenHeight * .75;

        this.running = new L_System();

        // event handling
        this.bindPlay = this.running.create.bind(this.running);

        // CONSTANTS TO HANDLE INPUT AND OUTPUT
        this.button = document.querySelector(".infobox__button");
        this.button.addEventListener('click', this.bindPlay);

        this.viewport = new Viewport(this.settings.screenWidth, this.settings.screenHeight);
        
        // INITIALIZE
        this.viewport.init();
        this.running.renderer = this.viewport.context;
        
        this.running.init(this.settings.screenWidth, this.settings.screenHeight);

    }

    unload() {
        this.button.removeEventListener('click', this.bindPlay);
    }
}

