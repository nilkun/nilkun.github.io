// MiniSpa compatible JS
// assign an anonymous class to the global variable 'running'

running = new class {
    constructor() {
        this.currentPortfolio = 5;
        this.drawings="";
        for(let i = 0; i < this.currentPortfolio; i++) {
            this.drawings +=`<img class="rounded m-2" src="./src/images/drawings/pic${i}.png" alt="A picture" height="250px">`;
        }
        this.render = document.querySelector('#artgallery');
        this.render.innerHTML = this.drawings;
    }
}