// The viewport needs a canvas with the id of "canvas"

export default class Viewport {
    constructor(width = 800, height = 600) {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
    }
    
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    init() {
        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();
        this.context.save();
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}