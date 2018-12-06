import Vector from '../engine/Vector.js';

export default class L_System {
    constructor() {
        // FOR THE L-SYSTEM
        this.axiom;
        this.sentence = "";
        this.rule = [];
        this.len;

        // For drawing
        this.line = [];
        this.line[0] = [];
        this.line[0][0];

        this.currentLine;
        this.memoryBank = [];
        this.renderer = "";  

    }

    init(w, h) {
        this.axiom = "F";
        this.sentence = this.axiom;
        this.len = 100/ 380 * h;

        // tree
        this.rule.push(this.createRule("F", "FF+[+F-F-F]-[-F+F+F]"));
        // console.log(this.rule);
        this.line = [];
        this.line[0] = [];
        this.line[0][0] = new Vector(110 / 300 * w, h);

        this.currentLine = new Vector(0, -1);
        this.memoryBank = [];
    
        this.turtle();
    }
    
    createRule(i, o) {
        return { input: i, output: o, };
    }

    generate() {
        this.len *= .5;
        let nextSentence = "";
        for(let i = 0; i < this.sentence.length; i++) {
            let found = false;
            const current = this.sentence.charAt(i);
            for(let j = 0; j < this.rule.length; j++) {
                if (current === this.rule[j].input) {
                    nextSentence += this.rule[j].output;
                    found = true;
                    break;
                }
            }
            if(!found) nextSentence += this.sentence.charAt(i);
        }    
        this.sentence = nextSentence;
        // console.log(this.rule);
    }
    
    renderAll() {
        const context = this.renderer;
        for(let i = 0; i < this.line.length; i++) {
            context.beginPath();
            context.moveTo(this.line[i][0].x, this.line[i][0].y);
            let position = new Vector();
            position.copy(this.line[i][0]);
            for(let j = 1; j < this.line[i].length; j++) {
                let color = i + j;
                color %= 155;
                color += 100;
                
                context.strokeStyle = '#00' + color.toString(16) + "00";
                context.lineTo(this.line[i][j].x + position.x, this.line[i][j].y + position.y);
                context.stroke();
                position.add(this.line[i][j]);
            }
        }
    }
    
    turtle() {
        let currentPos = new Vector(this.line[0][0].x, this.line[0][0].y);
        let branch = this.line.length - 1;
        
        for(let i = 0; i < this.sentence.length; i++) {
            let current = this.sentence.charAt(i);
    
            switch(current) {
                case "F": {
                    this.currentLine.setMag(this.len);
                    currentPos.add(this.currentLine);
                    this.line[branch].push(this.currentLine);
                    const tempV = new Vector();
                    tempV.copy(this.currentLine);
                    this.currentLine = new Vector();
                    this.currentLine.copy(tempV);
                    break;
                };
                case "+": {
                    this.currentLine.rotate(0.436332313);
                    break;
                }
                case "-": {
                    this.currentLine.rotate(-0.436332313);
                    break;
                }
                case "[": {
                    this.memoryBank.push( { pos: new Vector(currentPos.x, currentPos.y), line: new Vector(this.currentLine.x, this.currentLine.y) } );
                    break;
                }
                case "]": {
                    const retrieved = this.memoryBank.pop();
                    currentPos.copy(retrieved.pos);
                    this.currentLine.copy(retrieved.line);
                    // add branch
                    branch++;
                    this.line.push([]);
                    this.line[this.line.length - 1].push(new Vector());
                    this.line[this.line.length - 1][0].copy(currentPos);
                
                    break;
                }
            }
        }
        this.renderAll();
    }

    create(){
        this.generate(this.sentence, this.rule);
        // text.innerHTML += "<br>" + this.sentence;
        this.turtle();
    
    }
}


