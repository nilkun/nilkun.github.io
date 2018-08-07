const DrawInit = () => {
    Drawing.context = document.getElementById('sketchBoard').getContext("2d");
    Drawing.canvas = document.getElementById('sketchBoard');

    Drawing.red = document.getElementById('redSlider');
    Drawing.green = document.getElementById('greenSlider');
    Drawing.blue = document.getElementById('blueSlider');
    Drawing.offset = 16;
    Drawing.isPressed = false;
    Drawing.color = 'rgb(' + Drawing.red.value + ', ' + Drawing.green.value + ', ' + Drawing.blue.value + ')';
}

const Drawing = {
    title: "Simple drawing",
    drawX: [],
    drawY: [],
    isBeginning: [],
    colors: [],

    contents: `
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center">
                    <canvas id="sketchBoard" width=320, height=200 style="border:3px solid #000000;">
                </div>
                <div class="flex-container">
                    <div>
                        <canvas id="palette" height=64 width=64 style="border:10px solid orange"></canvas>
                    </div>
                    <div class="sliders">
                        <input type="range" min="0" max="255" value="128" class="slider" id="redSlider">
                        <br>
                        <input type="range" min="0" max="255" value="128" class="slider" id="greenSlider">
                        <br>
                        <input type="range" min="0" max="255" value="128" class="slider" id="blueSlider">
                    </div>
                    <div>
                        <input id="filename" placeholder="Enter filename..."/>
                        <div id="buttons"></div>
                    </div>  
                </div>
                <a href="#" class="button" id="btn-download" style="display:none">Download</a>
            </div>
        </div>`,

    load(windowName) {

        document.getElementById(windowName).innerHTML = this.contents;

        DrawInit();
        this.updatePalette();
        this.addEventListeners();
        this.createButtons();
    },

    errorTest() {
        console.log("ok");
    },

    addEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => { 
            this.isPressed = true; 
            this.drawX.push(e.clientX-16); 
            this.drawY.push(e.clientY-16); 
            this.isBeginning.push(true); 
            this.colors.push(this.color);
            this.errorTest();
            });
        this.canvas.addEventListener('mouseup', () => { this.isPressed = false; });
        this.canvas.addEventListener('mousemove', this.paint );
        this.red.addEventListener('input', this.updatePalette);
        this.green.addEventListener('input', this.updatePalette);
        this.blue.addEventListener('input', this.updatePalette);
    },

    paint(e) {
        if(this.isPressed) {

            this.drawX.push(e.clientX-offset);
            this.drawY.push(e.clientY-offset);
            this.isBeginning.push(false);

            this.context.lineJoin = "round";
            this.context.lineWidth = 5;

            for(let i=0; i < drawX.length; i++) {		
                this.context.beginPath();
                if(this.colors[i]) { this.context.strokeStyle = this.colors[i];}
                if(!this.isBeginning[i] && i){
                    this.context.moveTo(this.drawX[i-1], this.drawY[i-1]);
                } else {
                    this.context.moveTo(this.drawX[i]-1, this.drawY[i]);
                }

                this.context.lineTo(this.drawX[i], this.drawY[i]);
                this.context.closePath();
            }
            this.context.stroke();
        }
    },

    createButtons() {
        const buttons = document.getElementById('buttons');
        buttons.innerHTML = `<input type="button" class="button" id="clear" value="clear">`;
        
        buttons.innerHTML += `<input type="button" class="button" id="save" value="create download link">`;
        const clear = document.getElementById('clear');
        const save = document.getElementById('save');
        clear.addEventListener('click', this.clearCanvas);
        save.addEventListener('click', this.savePng);
    },

    savePng() {
        let filename = document.getElementById('filename').value;
        if(filename==="") filename = "drawing";
        const dataURL = this.canvas.toDataURL('image/png');
        const dl = document.getElementById('btn-download');
        dl.href = dataURL;
        dl.download=filename + ".png"
        dl.style="display:block";
    },

    updatePalette() {
        this.color = 'rgb(' + this.red.value + ', ' + this.green.value + ', ' + this.blue.value + ')';
        const _canvas=document.getElementById('palette');
        let _context = _canvas.getContext('2d');
        _context.fillStyle = this.color;
        _context.fillRect(0, 0, _canvas.width, _canvas.height);
    },

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
    }
}