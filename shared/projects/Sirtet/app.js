import Viewport from '../shared/engine/Viewport.js'
import Sirtet from './Sirtet.js'
import ClickToContinue from '../shared/engine/clickToContinue.js';

export default class Start {
    constructor() {
        this.scoreboard;
        this.viewport;
        this.game;        
        this.settings = {};
    }

    init(props = this.settings) {

        // this.settings.screenHeight = 200;
        
        this.settings.screenHeight = props.screenHeight > props.screenWidth * 2 ?  props.screenWidth * 2 : props.screenHeight;
        this.settings.screenWidth = this.settings.screenHeight / 2;

        this.scoreboard = document.getElementById('scoreboard');
        this.viewport = new Viewport(this.settings.screenWidth, this.settings.screenHeight, "sirtet-canvas");
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
        
        this.viewport.context.font = this.viewport.canvas.width * .1 +"px Roboto";
        this.viewport.context.fillText(intro, (this.viewport.canvas.width - this.viewport.context.measureText(intro).width) / 2, this.viewport.canvas.height * .2);
        
        this.viewport.context.font = this.viewport.canvas.width * .06 + "px Roboto";
        this.viewport.context.fillText(i1,(this.viewport.canvas.width - this.viewport.context.measureText(i1).width) / 2,this.viewport.canvas.height *.3);
        this.viewport.context.fillText(i2,(this.viewport.canvas.width - this.viewport.context.measureText(i2).width) / 2,this.viewport.canvas.height *.4);
        this.viewport.context.fillText(i3,(this.viewport.canvas.width - this.viewport.context.measureText(i3).width) / 2,this.viewport.canvas.height *.5);
        this.viewport.context.fillText(i4,(this.viewport.canvas.width - this.viewport.context.measureText(i4).width) / 2,this.viewport.canvas.height *.6);
        this.viewport.context.fillText(i5,(this.viewport.canvas.width - this.viewport.context.measureText(i5).width) / 2,this.viewport.canvas.height *.7);
    }
}




