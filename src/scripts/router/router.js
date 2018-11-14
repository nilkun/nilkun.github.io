'use strict';

const loadScripts = (scripts) => {
    for(let i = 0; i < scripts.length; i++) {
        const js = document.createElement('script');
        js.setAttribute("type","text/javascript")
        js.setAttribute("src", scripts[i])
        js.setAttribute("id", "minispa" + i);
        if (typeof js!="undefined") document.getElementsByTagName("head")[0].appendChild(js);   
    }
}

const unloadScripts = (scripts) => {
    for(let i = 0; i < scripts.length; i++) {
        const target = "minispa" + i;
        const attr = "src";

        const remove = document.getElementById(target);
        remove.parentElement.removeChild(remove);

        }
}

let running = "";

class Route {
    constructor(name, html, defaultRoute, script = null) {
        this.name = name;
        this.html = html;
        this.default = defaultRoute;
    }
    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}

class Router {
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.querySelector('.app');
        this.scripts = [];
        this.init();
    }

    init() {
        window.addEventListener('hashchange', (e) => {
            this.hasChanged();
        });

        this.hasChanged();
    }

    hasChanged() {
        const r = this.routes;

        
        if(window.location.hash.length > 0) {
            for( let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    this.goToRoute(route.html);
                }
            }
        } else {
            for(let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.default) {
                    this.goToRoute(route.html);
                }
            }
        }
    }

    goToRoute(html) {
        const url = './src/views/' + html;
        const http = new XMLHttpRequest();
        try {

            http.onreadystatechange = () => {
                if(http.readyState === 4 && http.status === 200) {


                    let index = 0;
                    let waitingToLoad = false;

                    // // unload previous scripts
                    unloadScripts(this.scripts);

                    // // Check if route has init tags and then extract filename
                    if("<init>" === http.response.slice(0, 6)) {
                        const regex = /<\/init>/;
                        index = http.response.match(regex).index;
                        const scriptString = http.response.slice(6, index);
                        this.scripts = scriptString.split(/\s+/).filter(x => x);
                        this.scripts.push(http.response.slice(6, index));
                        index = http.response.match(regex).index + 7;
                        waitingToLoad = true;
                    } else this.scripts = [];

                    this.rootElem.innerHTML = http.responseText.slice(index);
                    if(waitingToLoad) {
                        loadScripts(this.scripts);
                    }
                }
            };
            http.open('GET', url, true);
            http.send();
        } catch(e) { 
            console.log("Caught this little bugger: ", e);
        }

    }
}
