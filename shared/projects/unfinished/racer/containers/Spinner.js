class Spinner {
    constructor(width = 800, height = 600) {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.image = new Image();
        this.image.src = "../resources/spinner.png"
        this.updater = null;
        this.canvas.style.background = "#FFFFFF";
        this.context.fillStyle = "#FFFFFF";        
        this.context.fill();
        this.context.save();
    };
    update() {
        
        spinner.context.translate(350, 350);
        
        spinner.context.rotate(90);
        spinner.context.drawImage(spinner.image, 0, 0);
        spinner.context.restore();
    }
    start() {
        this.updater = setInterval(this.update, 200);
    }
}

const spinner = new Spinner;
spinner.start();