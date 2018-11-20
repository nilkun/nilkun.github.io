'use strict';
import { Router, Route } from './router.js';

{
    const spa = document.createElement('script');
    spa.setAttribute("type","application/javascript");
    spa.innerHTML = "let router; let program = new Array(0);let loadedHTMLid=-1;";
    document.head.appendChild(spa);
}

const init = () => {
    const view = "./src/views/"

    // route name, path to file, filename, is starting page
    // routes and target
    router = new Router([
            new Route('about', view, 'about.html', true),
            new Route('train', '/Train-Simulator/', 'index.html'),
            new Route('maze', '/maze-generator/', 'index.html'),
            new Route('codepen', view, 'codepen.html'),
            // new Route('coding', view, 'coding.html'),
            new Route('repo', view, 'repo.html')
    ], '.app');
}

init();