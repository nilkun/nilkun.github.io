import Viewport from '../engine/Viewport.js';
import TileManager from './TileManager.js';

export default class TrainSimulator {
    constructor() {

        this.viewport;
        this.world;
        this.updateInterval;
        this.play;

        this.bindPlay;
        this.bindDemo;
        this.bindGridSwitch;
        this.settings = {};
    }
    currentScriptPath() {
        // get scripts
        const scripts = document.querySelectorAll( 'script[src]' );
        const currentScript = scripts[ scripts.length - 1 ].src;

        const currentScriptChunks = currentScript.split( '/' );
        const currentScriptFile = currentScriptChunks[ currentScriptChunks.length - 1 ];    
        return currentScript.replace( currentScriptFile, '' );
    }

    init(props = this.settings) {
        this.settings.screenHeight = props.screenHeight > props.screenWidth ?  props.screenWidth : props.screenHeight;
        this.settings.screenWidth = this.settings.screenHeight;

        console.log(this.settings.screenHeight);
        this.viewport = new Viewport;
        this.viewport.init(this.settings.screenHeight, this.settings.screenHeight);

        // Use 30 tiles
        this.world = new TileManager;  
        this.world.init(this.viewport, this.settings.screenHeight / 30);
        this.world.render();

        this.bindPlay = this.startGame.bind(this);
        this.bindDemo = this.demoMode.bind(this);
        this.bindGridSwitch = this.world.switchGrid.bind(this.world);

        this.runDemo();
    }

    runDemo() {  

        // document.getElementById('train-btn5').addEventListener('click', this.bindGridSwitch);
        const btn = document.getElementById('train-btn5');
        btn.onclick = this.bindGridSwitch;
        
        this.viewport.canvas.addEventListener('mousedown', this.bindPlay);        
        this.world.layTracks(3, 3);
        this.world.layTracks(26, 3);
        this.world.layTracks(26, 26);
        this.world.layTracks(3, 26);
        this.world.layTracks(3, 3);
        this.updateInterval = setInterval(this.bindDemo, 1000/ 60);
        // () => this.demoMode() but this is not the issue
    }
    
    startGame() {
        clearInterval(this.updateInterval);
        this.viewport.canvas.removeEventListener('mousedown', this.bindPlay);

        this.world.init(this.viewport, this.settings.screenHeight / 30);
        this.world.setRenderContext(this.viewport.context);
        this.world.render();
        this.updateInterval = setInterval(() => this.update(), 1000/ 60);
        this.viewport.canvas.addEventListener('mousedown', (e) => {
            const mousePos = this.viewport.getMouse(e);
            this.world.update();
            this.world.click(mousePos.x, mousePos.y);
        })
    }

    demoMode() {
        this.world.update();
        this.viewport.context.fillStyle = "white";
        this.viewport.context.font = this.settings.screenHeight/20 + "px Arial";
        this.viewport.context.fillText("TRAIN SIMULATOR!!!", (this.settings.screenHeight - this.viewport.context.measureText("TRAIN SIMULATOR!!!").width) / 2,
             this.settings.screenHeight / 3); 
        this.viewport.context.font = this.settings.screenHeight/20 + "px Arial";
        this.viewport.context.fillText("click to start...", (this.settings.screenHeight - this.viewport.context.measureText("click to start...").width) / 2, this.settings.screenHeight/2); 
        this.viewport.context.stroke();   
    }

    update() {
        this.world.update();
    }

    unload() {
        clearInterval(this.updateInterval);
    }
}