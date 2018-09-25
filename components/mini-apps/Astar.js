
const Astar = {
  title: "a*",

  load(windowName) { 
     document.getElementById(windowName).innerHTML =  `<canvas id="grid" width=600 height=600 style="border:1px solid #FFAA00"></canvas>
     <div>Green: START, red: GOAL, blue: VISITED, grey: OBSTACLE<br>Click to create obstacle</div>`;
      grid.init();
      grid.render();
    }
}   

const grid = {
  
    // RENDERING INFO
    c: 0,
    ctx: 0,

    spacing: 2,
    squaresPerRow: 10,
    squareSize: 10,

    width: 10,
    height: 10,

    // NODE INFO 
    node: [],  
    untestedNodes: [],  
    startIndex: 2,
    goalIndex: 97,

    // FUNCTIONS

    // Calculates the path (pathfinding function)
    calculate: function() {

        // reset nodes, and empties untestedNodes!
        this.reset();
        this.untestedNodes = [];

        const sortDistance = (a, b) => {    
            return (this.node[a].distanceGoal + this.node[a].distanceStart)
                - (this.node[b].distanceGoal + this.node[b].distanceStart);
        }

        // Gets the index for insertion
        const binarySearch = (idx) => {    
            
            // Initialize values
            let min = 0;
            let max = this.untestedNodes.length - 1;
            let middle = Math.floor((min + max) / 2);
            
            // current length for current node
            const currentLength = this.node[idx].distanceGoal + this.node[idx].distanceStart;
            
            while (min < max && currentLength 
                !== (this.node[this.untestedNodes[middle]].distanceGoal
                    + this.node[this.untestedNodes[middle]].distanceStart)
                ) {
                
                const compareLength = this.node[this.untestedNodes[middle]].distanceGoal 
                    + this.node[this.untestedNodes[middle]].distanceStart;
                if (currentLength < compareLength) {
                    max = middle - 1;
                } else {
                    min = middle + 1;
                }
                    // if (currentLength < compareLength) {
                    // max = middle - 1;
                // } else {
                //     min = middle + 1;
                // } 

                middle = Math.floor((max + min) / 2);
            }
            return min;
        }

        function heuristic(firstNode, secondNode) {
            return Math.sqrt(
                (firstNode.x - secondNode.x) 
                * (firstNode.x - secondNode.x)
                + (firstNode.y - secondNode.y) 
                * (firstNode.y - secondNode.y)
            );
        }
        
        // Sets up the start node and adds it to queue.
        this.node[this.startIndex].distanceStart = 0;
        this.node[this.startIndex].distanceGoal = heuristic(this.node[this.startIndex], this.node[this.goalIndex]);
        this.untestedNodes.push(this.startIndex);
        
        // Start of loop, while there are unexplored nodes.
        while(this.untestedNodes.length!==0) { 
            
            // sort nodes according to distance
            this.untestedNodes.sort(sortDistance);


            // While there are untested nodes and the first on is visited, then pop it!
            while(this.untestedNodes.length!==0 && this.node[this.untestedNodes[0]].isVisited) {
                this.untestedNodes.shift();
            }

            // Break if there are no more nodes to test!
            if(this.untestedNodes.length === 0) { 
                break; 
            }

            // Set up node to test
            const currentIndex = this.untestedNodes[0];
            this.node[currentIndex].isVisited = true;

            // If we reached the goal, then JACKPOT!
            if(currentIndex===this.goalIndex) { 
                break;
            }

            // Visit all neighbours
            
            for(let neighbour = 0; neighbour < this.node[currentIndex].neighbours.length; neighbour++) {
                
                const neighbourIndex = this.node[currentIndex].neighbours[neighbour];
                const compareNum = this.node[currentIndex].distanceStart + 1;

                // if this path is shorter than current path to neighbour (without obstacle), then update neighbour
                if(compareNum < this.node[neighbourIndex].distanceStart 
                && !this.node[neighbourIndex].hasObstacle){
                    this.node[neighbourIndex].parentNode = currentIndex;
                    this.node[neighbourIndex].distanceStart = compareNum;}

                // if there is no obstacle, and it is not visited, then add to queue    
                if(!this.node[neighbourIndex].isVisited && !this.node[neighbourIndex].hasObstacle){
                    this.node[neighbourIndex].distanceGoal = heuristic(this.node[neighbourIndex], this.node[this.goalIndex]);
                    // const idx = binarySearch(neighbourIndex);
                    this.untestedNodes.push(this.node[currentIndex].neighbours[neighbour]); //splice(idx, 0, this.node[currentIndex].neighbours[neighbour]);
                }
            }
        }
    },

    // Adds connections between neighbours
    createNeighbourhood: function() {
        for(let x = 0; x < this.width; ++x){
            for(let y = 0; y < this.height; ++y){
                let index = (x) + (y*this.width);

                // Row above
                if(y > 0) {
                    let above = (x) + ((y-1)*this.width);
                    if(x>0) this.node[index].neighbours.push(above - 1);
                    this.node[index].neighbours.push(above);
                    if(x<this.width-1) this.node[index].neighbours.push(above + 1);
                }

                // Same row
                if(x>0) this.node[index].neighbours.push(index - 1);
                if(x<this.width - 1) this.node[index].neighbours.push(index + 1);

                // Row below
                if(y < this.height - 1) {
                    let below = (x) + ((y+1)*this.width);
                    if(x>0) this.node[index].neighbours.push(below - 1);
                    this.node[index].neighbours.push(below);
                    if(x<this.width-1) this.node[index].neighbours.push(below + 1);
                }
            }
        }
    },

    // Initialize all
    init: function() {
        this.c = document.getElementById("grid");
        // get the drawing context and set the square size
        this.ctx =  this.c.getContext("2d");
        this.squareSize = (this.c.width / this.squaresPerRow) - this.spacing;

        console.log(this);
        console.log(this.c);
        // create nodes
        for(let index = 0; index < this.squaresPerRow * this.squaresPerRow; index++) {
            this.node.push(new Node());
            this.node[index].x = index % this.squaresPerRow;
            this.node[index].y = Math.floor(index / this.squaresPerRow); 
        }

        // Event listener
        this.c.addEventListener('click', this.mouseClick);

        // Initial rendering
        this.render();
        this.createNeighbourhood();
        this.calculate();
    },

    // MOUSE FUNCTIONS
    mouseClick: function(e) {

        const offset = grid.c.getBoundingClientRect();
        const x = Math.floor((e.clientX - offset.left) /(grid.squareSize+grid.spacing));
        const y = Math.floor((e.clientY - offset.top) /(grid.squareSize+grid.spacing));

        grid.toggleObstacle(x, y);
        grid.calculate();
        grid.render();
    },
    render: function() {
        for(let x = 0; x < this.width; ++x){
            for(let y = 0; y < this.height; ++y){

                // Calculates index of current node
                let index = (x) + (y*this.width); 

                // Color of start square
                if(this.startIndex===index) this.ctx.fillStyle="#00FF00";
                // Color goal
                else if(this.goalIndex===index) this.ctx.fillStyle="#FF0000";
                // Color obstacle
                else if(this.node[index].hasObstacle) this.ctx.fillStyle="#888888";
                // Color visited square
                else if(this.node[index].isVisited) this.ctx.fillStyle="#0000ff";
                // default baby blue
                else this.ctx.fillStyle="#ABCDEF";
    
                this.ctx.fillRect(
                    x * (this.squareSize + this.spacing), 
                    y * (this.squareSize + this.spacing), 
                    this.squareSize, this.squareSize
                );

                // Color path from goal to start
                this.ctx.fillStyle="#000000";
                let currentNode = this.node[this.goalIndex].parentNode;
                while(currentNode !== -1 && currentNode !== this.startIndex){
                  this.ctx.fillRect(
                        this.node[currentNode].x * (this.squareSize + this.spacing), 
                        this.node[currentNode].y * (this.squareSize + this.spacing), 
                        this.squareSize, this.squareSize
                    );
                    currentNode = this.node[currentNode].parentNode;
                }
            }
        }
    },

    // Resets all nodes
    reset: function() {
        this.node.forEach((nodette) => {
            nodette.isVisited = false;
            nodette.distanceGoal = Infinity;
            nodette.distanceStart = Infinity;
            nodette.parentNode = -1;
        })
    },

    toggleObstacle: function(x, y) {
        const index = (x) + (y*this.width);
        if(this.node[index].hasObstacle) this.node[index].hasObstacle = false;
        else this.node[index].hasObstacle = true;
    },

}

class Node {
    constructor() {
        this.neighbours = [];
        this.hasObstacle = false;
        this.isVisited = false;
        this.distanceGoal = Infinity;
        this.distanceStart = Infinity;
        this.parentNode = -1;
        this.x = -1;
        this.y = -1;
    }    
}



