'use strict';
import { Router, Route } from './router.js';

{
    const spa = document.createElement('script');
    spa.setAttribute("type","application/javascript");
    spa.innerHTML = "let router; let program =[];";
    document.head.appendChild(spa);
}

const init = () => {
    const view = "./src/views/"

    // route name, path to file, filename, is starting page
    // routes and target
    router = new Router([
            new Route('about', view, 'about.html', true),
            new Route('coding', view, 'coding.html'),
            new Route('repo', view, 'repo.html'),
            new Route('test', '/maze-generator/', 'index.html')
    ], '.app');
}

init();