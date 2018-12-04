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
        this.scoreboard = document.getElementById('scoreboard');
        this.viewport = new Viewport(150, 300, "sirtet-canvas");
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
        
        this.viewport.context.font = "10px Arial";
        this.viewport.context.fillText(intro, (150 - this.viewport.context.measureText(intro).width) / 2,80);
        
        this.viewport.context.font = "8px Arial";
        this.viewport.context.fillText(i1,(150 - this.viewport.context.measureText(i1).width) / 2,110);
        this.viewport.context.fillText(i2,(150 - this.viewport.context.measureText(i2).width) / 2,120);
        this.viewport.context.fillText(i3,(150 - this.viewport.context.measureText(i3).width) / 2,130);
        this.viewport.context.fillText(i4,(150 - this.viewport.context.measureText(i4).width) / 2,140);
        this.viewport.context.fillText(i5,(150 - this.viewport.context.measureText(i5).width) / 2,200);
    }
}




