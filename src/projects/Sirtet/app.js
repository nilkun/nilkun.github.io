import Viewport from '../shared/engine/Viewport.js'
import Sirtet from './Sirtet.js'
import ClickToContinue from '../shared/engine/clickToContinue.js';

export default class Start {
    constructor() {
        this.scoreboard;
        this.viewport;
        this.game;
    }

    init() {
        // const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const height = h * .75;

        this.scoreboard = document.getElementById('scoreboard');
        this.viewport = new Viewport(height/2, height, "sirtet-canvas");
        // setupViewport();
        this.viewport.canvas.style.background = "#FFFFFF";

        this.renderWelcomeScreen();
        ClickToContinue(this.start.bind(this));
    }

    start() {
        this.game = new Sirtet();
        this.game.init(this.viewport.context, this.scoreboard);
    }
    
    setupViewport() {

    }
    renderWelcomeScreen() {
        const intro = "Welcome to Sirtet!" 
        const i1 = "Use LEFT and RIGHT to ";
        const i2 = "move the tetromino, ";
        const i3 = "UP to rotate, and ";
        const i4 = "DOWN to speed up! ";
        const i5 = "Press any key or 'S' to start...";
        const center = 0;
        
        this.viewport.context.font = "1em Roboto";
        this.viewport.context.fillText(intro, (this.viewport.canvas.width - this.viewport.context.measureText(intro).width) / 2, 80);
        
        this.viewport.context.font = ".8em Roboto";
        this.viewport.context.fillText(i1,(this.viewport.canvas.width - this.viewport.context.measureText(i1).width) / 2,110);
        this.viewport.context.fillText(i2,(this.viewport.canvas.width - this.viewport.context.measureText(i2).width) / 2,120);
        this.viewport.context.fillText(i3,(this.viewport.canvas.width - this.viewport.context.measureText(i3).width) / 2,130);
        this.viewport.context.fillText(i4,(this.viewport.canvas.width - this.viewport.context.measureText(i4).width) / 2,140);
        this.viewport.context.fillText(i5,(this.viewport.canvas.width - this.viewport.context.measureText(i5).width) / 2,200);
    }
}




