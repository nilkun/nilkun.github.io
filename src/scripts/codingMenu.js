import { Route, Router } from "./router/router.js";

export default class CodingMenu {
    constructor() {

        this.menuItems = new Router([
            new Route('train', '/Train-Simulator/', 'index.html'),
            new Route('maze', '/maze-generator/', 'index.html', true)
        ], '.coding-screen');
        console.log("Constructing coding menu...");
    }

    init() {
        console.log("Coding menu loaded...");
    }
}

