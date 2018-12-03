
class Menu {
    constructor() {
        this.list = new Array();
        this.contents = "";
    }
    add(name) {
        this.list.push(name);
    }
    render(hook) {
        this.text = '<ul>';
        this.list.forEach(entry => {
            this.text += `<li>${entry}</li>`
        }) 

        this.text += '</ul>';
        hook.innerHTML = this.text;
    }
}

const menu = new Menu;
menu.add("Tetris clone");
menu.add("Pong clone");
menu.add("Steering algorithm");

const hook = document.querySelector(".menu");
menu.render(hook);