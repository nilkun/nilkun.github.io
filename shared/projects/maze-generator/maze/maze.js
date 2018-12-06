import Viewport from '../engine/Viewport.js';
import Vector from '../engine/Vector.js';
import Hexagon from '../hexagon/Hexagon.js';
import Crawler from '../hexagon/Crawler.js';
import AStar from './a-path.js';

export default class Maze{
    constructor() {

        // CONSTANTS
        // (diagonal and horizontal lengths)
        this.twoSquared;
        this.diagonal;
        this.horizontal;
        // (space between hexagons in the same row)   
        this.spaceBetween;
        // (number of rows and columns)
        this.hexColumns;
        this.hexRows;
        // this.setConstants();
        
        this.scale;
        
        this.offset;
        this.viewport;
        this.renderer;
        this.hex = [];
        this.crawl;
        this.running;

        // event listeners
        this.sliderInfo;
        this.slider;        

        this.instacomplete;
        this.astarbutton;
        this.button;
        this.settings = {};
    }

    setConstants() {

    }
    insta() {
        clearInterval(this.running);
        while(!this.crawl.completed) this.crawl.move(this);

        this.astarbutton = document.querySelector("#solve");
        this.astarbutton.onclick = () => this.solve();
    }

    updateSpeed() {
        this.sliderInfo.innerHTML = this.slider.value;
        clearInterval(this.running);
        this.running = setInterval( () => {
            if(this.crawl.completed) {
                clearInterval(this.running);
                this.astarbutton = document.querySelector("#solve");
                this.astarbutton.onclick = () => this.solve();
            }
            this.crawl.move();
            }, 1000 - this.slider.value
        );
    }

    createHexagons() {
        for(let col = 0; col < 20; col++) {
            for(let row = 0; row < 20; row++) {
                this.hex.push(new Hexagon(col, row));
            }
        }
    }
    renderHexagons() {
        this.renderer.beginPath();
        for(let i = 0; i < this.hex.length; i++) {
            this.hex[i].render(this.offset, this.scale, this.diagonal, this.renderer, this.horizontal); 
        }        
        this.renderer.strokeStyle = "black";
        this.renderer.stroke();
    }

    init(props = this.settings) {

        this.settings.screenHeight = props.screenHeight * 1.05 > props.screenWidth  
            ? props.screenWidth / 1.05 
            : props.screenHeight;

        this.settings.screenWidth = this.settings.screenHeight * 1.05;

        // (number of rows and columns)
        this.hexColumns = 20;
        this.hexRows = 20;
        this.twoSquared = 1.41421356237;

        this.diagonal =  this.settings.screenHeight / this.hexColumns / (1 + this.twoSquared);
            
        // this.diagonal = 10;
        this.horizontal = this.diagonal * this.twoSquared;
        // (space between hexagons in the same row)   
        this.spaceBetween = this.horizontal + this.diagonal;
        
        this.scale = this.spaceBetween;
        
        this.offset = new Vector(0, this.diagonal);
        
        this.viewport = new Viewport(this.settings.screenWidth, this.settings.screenWidth / 1.20205539628);
        this.renderer = this.viewport.context;

        this.hex = [];

        // event listeners
        this.sliderInfo = document.querySelector(".sliderInfo");
        this.slider = document.getElementById("speedSlider");
        this.slider.oninput = ()  => this.updateSpeed(); 

        this.instacomplete = document.querySelector("#instacomplete");
        this.instacomplete.onclick = () => this.insta();

        this.astarbutton = document.querySelector("#solve");
        this.astarbutton.onclick = () => console.log("HEY!! WAIT FOR THE MAZE TO FINISH!!!");

        this.button = document.getElementById('button');
        this.button.onclick =  () => this.restart();

        this.slider.value = 500;

        this.viewport.clear();
        this.createHexagons();
        this.renderHexagons();        

        this.crawl = new Crawler(this.hex, this.hexRows, this.hexColumns, this.renderer, this.offset, this.scale, this.diagonal, this.horizontal);
        
        this.startInterval();

    }

    startInterval() {
        clearInterval(this.running);
        this.running = setInterval( () => {
                if(this.crawl.completed)  {
                    clearInterval(this.running);
                    this.astarbutton = document.querySelector("#solve");
                    this.astarbutton.onclick = () => this.solve();
                }
                this.crawl.move();
            }, this.slider.value
        );        
    }

    restart() {
        this.init();
        this.slider.value = 500;
        this.updateSpeed();
        this.viewport.refetchCanvas();
        this.crawl.completed = false;
        this.hex = [];
        this.viewport.clear();
        this.createHexagons();
        this.renderer.beginPath();
        this.renderHexagons();

        this.crawl = new Crawler(this.hex, this.hexRows, this.hexColumns, this.renderer, this.offset, this.scale, this.diagonal, this.horizontal);
    }

    solve() {
        const astar = new AStar;
        astar.start(this.hex, this.hex[0], this.hex[399], this.hexColumns, this.renderer, this.diagonal);
    }
}