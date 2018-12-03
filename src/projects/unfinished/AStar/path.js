class AStar {
    constructor() {
        this.untestedNodes = [];
        this.node = [];
    }
    
    // sorts the array    
    sortDistance(a, b) { 
        return (this.node[a].distanceGoal + this.node[a].distanceStart)
            - (this.node[b].distanceGoal + this.node[b].distanceStart);
    }

    // calculate the distance between firstNode and secondNode
    heuristic(firstNode, secondNode) {
        return Math.sqrt(
            (firstNode.x - secondNode.x) 
            * (firstNode.x - secondNode.x)
            + (firstNode.y - secondNode.y) 
            * (firstNode.y - secondNode.y)
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

        // reset nodes, and empties untestedNodes!
        this.reset();
        this.untestedNodes = [];

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
                    this.untestedNodes.push(this.node[currentIndex].neighbours[neighbour]);
                }
            }
        }
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