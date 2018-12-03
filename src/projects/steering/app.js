import Viewport from '../shared/engine/Viewport.js'
import VehicleManager from './VehicleManager.js';

export default class Steering {
    constructor() {
        this.viewport;
        this.image;
        this.name;
        this.updateInterval;
        this.size;
    }

    init() {
        this.viewport = new Viewport(340, 295);
        this.name = new VehicleManager;
        this.size = 5;

        this.image = new Image();

        this.image.src = "./src/images/projects/panda.png";
        this.image.onload = () => this.createArrayFromImage(this.image);

        // this.image.src = "./src/images/projects/Mario.png";
        // this.image.onload = () => this.createColorArrayFromImage(this.image);

        this.viewport.init();
        this.updateInterval = setInterval(() => this.update(), 1000/ 60);

        window.addEventListener('mousedown', (e) => this.name.flee(e.x, e.y));
        window.addEventListener('mouseup', () => this.name.isSeeking=true);
        window.addEventListener('mousemove', (e) => { 
                if (!this.name.isSeeking) this.name.flee(e.x, e.y);
        });
    }
    
    update() {
        this.viewport.clear();
        this.name.render(this.viewport.context);
    }
    createColorArrayFromImage(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        for(let x = 0; x < img.naturalWidth; x++) {
            for(let y = 0; y < img.naturalHeight; y++) {
                const pixel = context.getImageData(x, y, 1, 1).data;
                this.name.add({ x: x, y: y, r: pixel[0], g: pixel[1], b: pixel[2]});
            }
        }        
    }
    createArrayFromImage(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        for(let x = 0; x < img.naturalWidth; x++) {
            for(let y = 0; y < img.naturalHeight; y++) {
                const pixel = context.getImageData(x, y, 1, 1).data;
                if(pixel[0]===0) this.name.add(this.size * x, this.size * y);
            }
        }
        // console.log(this.name);
    }
}