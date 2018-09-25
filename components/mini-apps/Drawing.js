const DrawInit = () => {
    Drawing.canvas = document.getElementById('sketchBoard');
    Drawing.context = Drawing.canvas.getContext("2d");

    Drawing.red = document.getElementById('redSlider');
    Drawing.green = document.getElementById('greenSlider');
    Drawing.blue = document.getElementById('blueSlider');
    // Drawing.offset = 16;
    Drawing.isPressed = false;
    Drawing.color = 'rgb(' + Drawing.red.value + ', ' + Drawing.green.value + ', ' + Drawing.blue.value + ')';
}

const Drawing = {
    title: 'simple drawing',
    drawX: [],
    drawY: [],
    isBeginning: [],
    colors: [],

    contents: `
        <div class="container">
            <div class="row" width="800px";>
                <div class="col-md-6 mx-auto text-center">
                    <canvas id="sketchBoard" width=600, height=600 style="border:3px solid #000000;">
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
                        <a href="#" class="button" id="btn-download" style="display:none">Download</a>
                    </div>  
                </div>

            </div>
        </div>`,

    load(windowName) {

        document.getElementById(windowName).innerHTML = Drawing.contents;

        DrawInit();
        Drawing.addEventListeners();
        Drawing.updatePalette();
        Drawing.createButtons();
        this.whiteCanvas();
        this.context.strokeStyle = this.color;
    },

    addEventListeners() {
        Drawing.canvas.addEventListener('mousedown', (e) => { 
            Drawing.isPressed = true; 
            Drawing.drawX.push(e.clientX-Drawing.offset); 
            Drawing.drawY.push(e.clientY-Drawing.offset); 
            Drawing.isBeginning.push(true); 
            Drawing.colors.push(Drawing.color);
        });
        Drawing.canvas.addEventListener('mouseup', () => { Drawing.isPressed = false; });
        Drawing.canvas.addEventListener('mousemove', Drawing.paint);
        Drawing.red.addEventListener('input', Drawing.updatePalette);
        Drawing.green.addEventListener('input', Drawing.updatePalette);
        Drawing.blue.addEventListener('input', Drawing.updatePalette);
    },

    paint(mouse) {
        if(Drawing.isPressed) {
            const location = Drawing.canvas.getBoundingClientRect();
            const e = {
                clientX: mouse.clientX - location.left,
                clientY: mouse.clientY - location.top,
            }
            // Drawing.color = 'rgb(' + 255 + ', ' + 255 + ', ' + 255 + ')';
            // Drawing.context.fillStyle = Drawing.color;
            // Drawing.context.fillRect(0, 0, Drawing.canvas.width, Drawing.canvas.height);
            Drawing.drawX.push(e.clientX);
            Drawing.drawY.push(e.clientY);
            Drawing.isBeginning.push(false);

            Drawing.context.lineJoin = "round";
            Drawing.context.lineWidth = 5;

            for(let i=0; i < Drawing.drawX.length; i++) {
                Drawing.context.beginPath();

            // Drawing.context.strokeStyle ='rgb(' + 55 + ', ' + 55 + ', ' + 55 + ')';
                if(Drawing.colors[i]) { Drawing.context.strokeStyle = Drawing.colors[i];}
                if(!Drawing.isBeginning[i] && i){
                    Drawing.context.moveTo(Drawing.drawX[i-1], Drawing.drawY[i-1]);
                } else {
                    Drawing.context.moveTo(Drawing.drawX[i]-1, Drawing.drawY[i]);
                }

                Drawing.context.lineTo(Drawing.drawX[i], Drawing.drawY[i]);
                Drawing.context.closePath();
            }
            Drawing.context.stroke();
        }
    },

    createButtons() {
        const buttons = document.getElementById('buttons');
        buttons.innerHTML = `<input type="button" class="button" id="clear" value="clear">`;
        
        buttons.innerHTML += `<input type="button" class="button" id="save" value="create download link">`;
        const clear = document.getElementById('clear');
        const save = document.getElementById('save');
        clear.addEventListener('click', Drawing.clearCanvas);
        save.addEventListener('click', Drawing.savePng);
    },

    savePng() {
        let filename = document.getElementById('filename').value;
        if(filename==="") filename = "drawing";
        const dataURL = Drawing.canvas.toDataURL('image/png');
        const dl = document.getElementById('btn-download');
        dl.href = dataURL;
        dl.download=filename + ".png"
        dl.style="display:block";
    },

    updatePalette() {
        Drawing.color = 'rgb(' + Drawing.red.value + ', ' + Drawing.green.value + ', ' + Drawing.blue.value + ')';
        const _canvas=document.getElementById('palette');
        let _context = _canvas.getContext('2d');
        _context.fillStyle = Drawing.color;
        _context.fillRect(0, 0, _canvas.width, _canvas.height);
    },

    clearCanvas() {
        Drawing.context.clearRect(0, 0, Drawing.canvas.width, Drawing.canvas.height); // Clears the canvas
        Drawing.whiteCanvas();
    },

    whiteCanvas() {
        this.context.fillStyle = 'rgb(' + 255 + ', ' + 255 + ', ' + 255 + ')';
        this.context.fillRect(0, 0, Drawing.canvas.width, Drawing.canvas.height);
    }
}