'use strict';

const loadScript = (filename) => {
    const js = document.createElement('script');
    js.setAttribute("type","text/javascript")
    js.setAttribute("src", filename)

    if (typeof js!="undefined") document.getElementsByTagName("head")[0].appendChild(js);   
}

const unloadScript = (filename) => {
    const target = "script";
    const attr = "src";
    const allScripts = document.getElementsByTagName(target);
    for(let i = allScripts.length; i>=0; i--) {
        if (allScripts[i] 
            && allScripts[i].getAttribute(attr)!=null 
            && allScripts[i].getAttribute(attr).indexOf(filename)!=-1)
                allScripts[i].parentNode.removeChild(allsScripts[i]) 
    }
}

const program = [];


class Route {
    constructor(name, html, defaultRoute, script = null) {
        this.name = name;
        this.html = html;
        this.default = defaultRoute;
        this.script = script;
        if(script) {
            console.log("loading script...");
            loadScript(script);
        } else console.log("No script to load...");
        
    }
    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}

class Router {
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.querySelector('.app');
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
        const url = 'src/views/' + html;
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if(http.readyState === 4 && http.status === 200) {

                // loadScript(html.script);
                // load scripts
                // load css

                //run script after page is set;
                var paragraph = "<init>src/scripts/renderDrawings.js</init>";
                var regex = /<\/init>/;
                var found = paragraph.match(regex);

                const data = paragraph.slice(6, found.index);

                console.log(data);
                console.log(http);
                this.rootElem.innerHTML = http.responseText;
                loadScript(data);
            }
        };

        http.open('GET', url, true);
        http.send();
    }

    loadScripts() {

    }
}
