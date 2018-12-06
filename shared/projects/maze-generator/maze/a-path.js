
import Vector from '../engine/Vector.js';

export default class AStar {
    constructor() {
        this.untestedNodes = [];
        this.node = [];
        this.startindex;
        this.goalIndex;
        this.columns;
        this.renderer;
        this.diagonal;
    }

    start(node, startNode, endNode, columns, renderer, diagonal) {
        this.diagonal = diagonal;
        this.node = node;
        this.untestedNodes = [];
        this.renderer = renderer;
        // this.node.push(startNode);
        this.goalIndex = endNode.xPos + endNode.yPos * columns;
        this.startIndex = startNode.xPos + startNode.yPos * columns;
        this.columns = columns;
        this.untestedNodes.push(startNode);


        // Every node needs:
        // astar_visited;
        //

        // reset nodes, and empties untestedNodes!
        this.reset();


        // console.log(this.startIndex);
        // Sets up the start node and adds it to queue.

        this.node[this.startIndex].distanceStart = 0;
        this.node[this.startIndex].distanceGoal = this.heuristic(this.node[this.startIndex], this.node[this.goalIndex]);
        this.untestedNodes.push(this.node[this.startIndex]);
    
        this.calculate();
    }

    setup() {
        this.node.forEach((nodette) => {
            nodette.isVisited = false;
            nodette.distanceGoal = Infinity;
            nodette.distanceStart = Infinity;
            nodette.parentNode = -1;
        });
    }    
    // sorts the array    
    sortDistance(a, b) { 
        return (a.distanceGoal + a.distanceStart)
            - (b.distanceGoal + b.distanceStart);
    }

    // calculate the distance between firstNode and secondNode
    heuristic(firstNode, secondNode) {
        return Math.sqrt(
            (firstNode.xPos - secondNode.xPos) 
            * (firstNode.xPos - secondNode.xPos)
            + (firstNode.yPos - secondNode.yPos) 
            * (firstNode.yPos - secondNode.yPos)
        );
    }



    // Gets the index for insertion
    binarySearch(idx) {           
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

            middle = Math.floor((max + min) / 2);
        }
        return min;
    }

    // gets the path
    calculate() {

        // Start of loop, while there are unexplored nodes.
        while(this.untestedNodes.length!==0) { 
            // sort nodes according to distance
            this.untestedNodes.sort(this.sortDistance);
            // While there are untested nodes and the first one is visited, then pop it!
            while(this.untestedNodes.length!==0 && this.untestedNodes[0].isVisited) {
                this.untestedNodes.shift();
            }

            // Break if there are no more nodes to test!
            if(this.untestedNodes.length === 0) { 
                break; 
            }

            // Set up node to test
            const currentIndex = this.untestedNodes[0].yPos + this.untestedNodes[0].xPos * this.columns;
            this.node[currentIndex].isVisited = true;

            // If we reached the goal, then JACKPOT!
            if(currentIndex===this.goalIndex) { 
                console.log("solved...");
                break;
            }

            // Visit all neighbours
            
            for(let index = 0; index < this.node[currentIndex].neighbour.length; index++) {
                const compareNum = this.node[currentIndex].distanceStart + 1;

                const position = this.node[currentIndex].neighbour[index];
                if(!position) continue;
                const neighbour = this.node[position.y + position.x * 20];

                if(compareNum < neighbour.distanceStart) {
                        neighbour.parentNode = currentIndex;
                        neighbour.distanceStart = compareNum;
                    }
    




                    // if there is no obstacle, and it is not visited, then add to queue    
                    if(!neighbour.isVisited) {
                        neighbour.distanceGoal = this.heuristic(this.node[currentIndex].neighbour[index], this.node[this.goalIndex]);
                        this.untestedNodes.push(neighbour);
                    }
            }
        }
            this.renderer.fillStyle="#000000";
            const diagonal = this.diagonal;
            const offset = new Vector(0, diagonal);
            const twoSquared = 1.41421356237;
            const horizontal = diagonal * twoSquared;
            const spaceBetween = (2 * horizontal + 2 * diagonal)/2;
            const scale = spaceBetween;
                this.renderer.beginPath();
                let parentNode = this.node[this.goalIndex];
            
                while(parentNode.parentNode !== -1){
                    this.renderer.beginPath();
                    parentNode.renderLine(offset, scale, diagonal, this.renderer, horizontal, this.node[parentNode.parentNode]);
                    this.renderer.strokeStyle = "blue";
                    this.renderer.stroke();
                    this.renderer.closePath();

                    parentNode = this.node[parentNode.parentNode];
                }

                this.renderer.beginPath();
                parentNode.renderLine(offset, scale, diagonal, this.renderer, horizontal, parentNode.xPos, parentNode.yPos);
                parentNode = this.node[parentNode.parentNode];
                this.renderer.stroke();
                this.renderer.closePath();
            }

    reset() {
        this.node.forEach((nodette) => {
            nodette.isVisited = false;
            nodette.distanceGoal = Infinity;
            nodette.distanceStart = Infinity;
            nodette.parentNode = -1;
        });
    }
}