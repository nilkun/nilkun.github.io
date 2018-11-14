'use strict';

let router;

const init = () => {
    router = new Router([
            new Route('about', 'about.html', true),
            new Route('coding', 'coding.html'),
            new Route('drawings', 'drawings.html'),
            new Route('repo', 'repo.html')
    ]);
}

init();