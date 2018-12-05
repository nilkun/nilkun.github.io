'use strict';
import { Router, Route } from './router.js';

{
    const spa = document.createElement('script');
    spa.setAttribute("type","application/javascript");
    spa.innerHTML = "let router; let program = new Array(0);let loadedHTMLid=-1;";
    document.head.appendChild(spa);
}

const init = () => {
    const view = "./src/views/";
    const project = "./src/projects/";

    // route name, path to file, filename, is starting page
    // routes and target
    router = new Router([
            new Route('about', view, 'about.html', true),
            new Route('train', project + 'train/', 'index.html'),
            new Route('maze', project + 'maze-generator/', 'index.html'),
            new Route('codepen', view, 'codepen.html'),
            new Route('sirtet', project, 'Sirtet/index.html'),

            new Route('steering', project, 'steering/index.html'),

            // new Route('coding', view, 'coding.html'),

            // new Route('coding', view, 'coding.html'),

            // new Route('coding', view, 'coding.html'),

            // new Route('coding', view, 'coding.html'),

            // new Route('coding', view, 'coding.html'),

            // new Route('coding', view, 'coding.html'),

            new Route('repo', view, 'repo.html')
    ], '.app');
}

init();