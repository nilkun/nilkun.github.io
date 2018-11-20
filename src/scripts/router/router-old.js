'use strict';

// GET RID OF THE SETTIMEOUT CALLS

// ROUTE CLASS
class Route {
    constructor(name, path, html, defaultRoute = false) {
        this.name = name;
        this.html = path + html;
        this.path = path;
        this.default = defaultRoute;
        this.innerHTML = "";
        this.script = "";
        this.isLoaded = false;
        this.id = -1;
        if(this.path==="./src/views/") this.path="./src/";
        
    }
    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}

// ROUTER CLASS AND FUNCTIONS

class Router {
    constructor(routes, context) {
        this.routes = routes;
        this.rootElem = document.querySelector(context);
        this.currentIndex = 0;
        this.context = context;

        this.init();
    }
    
    waitDOM() {
        const fakeCall = () => console.log("This function will be called twice.");
        const intermediary = () => window.requestAnimationFrame(fakeCall);
        window.requestAnimationFrame(intermediary);
    }


    reload() {
        console.log("Reloading.");
        this.rootElem = document.querySelector(this.context);
        this.rootElem.innerHTML = this.routes[this.currentIndex].innerHTML;
        // setTimeout(() => {
        //     program[this.routes[this.currentIndex].id].init();          
        // }, 1000);

        // while(this.currentIndex !== activeProgram) { console.log("not active...")};
        // program[this.routes[this.currentIndex].id].init();
        const timeout = () => {
            if(program[this.routes[this.currentIndex].id] === undefined) {
                setTimeout(timeout, 50);
            }
            else {
                program[this.routes[this.currentIndex].id].init();
                console.log("DEFINED!!!");
            }
        }
        timeout();

        // this.waitDOM();
        // let counter = 0;
        // while(typeof program[this.routes[this.currentIndex].id] === 'undefined') { counter++};
        // console.log("Counter: ", counter);
        // program[this.routes[this.currentIndex].id].init(); 
    }

    getData(html) {
        console.log("Getting data.");
        return new Promise((resolve, reject) => {
            const url = html;
            const http = new XMLHttpRequest();
            try {
                http.onreadystatechange = () => {
                    if(http.readyState === 4 && http.status === 200) {
                        // give id
                        this.routes[this.currentIndex].id = program.length;
                        resolve(http.response);
                        
                    }
                }
            http.open('GET', url, true);
            http.send();

            } catch(e) { 
                console.log("Caught this little bugger: ", e);
            }
        })
    }

    getScriptLink(data) {
        console.log("Getting link to script.");
        return new Promise((resolve, reject) => {

            let returnData = [];

            const openTag = /<script/;
            const srcTag = /src ?=['|"]/; // ?=['"](.+?)['"]/;
            const tag = data.match(openTag);

            if(tag) {
                const srcIndex = data.slice(0, tag.index);
                const closeTag = /<\/script/;
                const closeIndex = closeTag.exec(data.slice(tag.index)).index;                
                const afterScript = data.slice(tag.index + closeIndex + 9);
                const sourceID = data.slice(tag.index, tag.index + closeIndex - 2);
                const sID = sourceID.slice(srcTag.exec(sourceID).index);                
                const final = sID.slice(/"|'/.exec(sID).index + 1);
                returnData = this.routes[this.currentIndex].path + final;
                this.routes[this.currentIndex].script = final;

                // ADDING A CLASS TO HTML find body
                // this.routes[this.currentIndex].innerHTML = "<div class='mini-spa-" + this.routes[this.currentIndex].id + ">" + srcIndex + afterScript + "</div>";
                this.routes[this.currentIndex].innerHTML =  srcIndex;
// "<div>"
                    // + "<img src='./src/images/logos/empty.png' onload='activeProgram=" + this.currentIndex + ";this.parentNode.removeChild(this);' /></div>";
                // + afterScript;
                this.rootElem.innerHTML = this.routes[this.currentIndex].innerHTML;
            } else {
                this.rootElem.innerHTML = data;
                reject("No script to load...");
            }
            resolve(returnData);
        })
    }

    getScript(data) {
        console.log("Getting script.");
        return this.getData(data);
    }

    addPathToImports(data) {
        console.log("Adding path to imports.");
        // REGEX
        const semiColon = /;/;
        const whitespace = /;\s/;
        const quotes = /['"]/;

        let end = data.search(semiColon);
        let index = 0;

        let modules = [];

        return new Promise((resolve, reject) =>  {
            while(data.substr(index, 6)==="import") {

                const start = data.substr(index).match(quotes);
                modules.push(start.index + 1);
                index += data.substr(index + start.index + end.index).search(whitespace);
            }

            let modifiedData = data;
            // loop through backwards
            for(let i = modules.length - 1; i >= 0; i--) {
                modifiedData = modifiedData.slice(0, modules[i]) + this.routes[this.currentIndex].path + modifiedData.slice(modules[i]);
            }   
            resolve(modifiedData);
        });
    }

    setupJS(data) {
        console.log("Pushing JS to variable.");
        return new Promise((resolve, reject) => {
            const regex = /=/;
            const regex2 = /;/;
            const removeConst = data.match(/const/);

            const indexOfConst = data.match(removeConst).index;
            const indexOfEqualSign = data.match(regex).index;
            const indexOfSemiColon = data.slice(indexOfEqualSign).match(regex2).index;

            const returnData = data.slice(0, indexOfConst) + "console.log('pushing program'); program.push(" + data.slice(indexOfEqualSign + 1, indexOfEqualSign + indexOfSemiColon) + ");";

            resolve(returnData);
        })
    }

    runJS(data) {
        console.log("Running JS.");
        return new Promise((resolve, reject) => {
            let js = document.createElement('script');
            js.setAttribute("type","module");
            js.innerHTML = data;
            // js.async = true;
            js.addEventListener('load', function (e) { resolve(data); }, false);
            if (typeof js!="undefined") { 
                let loaded = document.getElementsByTagName("head")[0];
                // loaded.addEventListener('load', function (e) { console.log("hey"); resolve(data); }, false);
                loaded.appendChild(js); 
                loaded.offsetHeight;
            }
            resolve(data);
        })
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
                    this.currentIndex = i;
                    this.goToRoute(route.html);
                }
            }
        } else {
            for(let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.default) {
                    this.currentIndex = i;
                    this.goToRoute(route.html);
                }
            }
        }
    }

    goToRoute(link) {
        if(this.routes[this.currentIndex].isLoaded) {
            console.log("assets already loaded...")            
            this.reload();
        }
        else {            
            this.getData(link)
            .then(html => this.getScriptLink(html))
            .then(jsLink => this.getScript(jsLink))
            .then(js => this.addPathToImports(js)) 
            .then(js => this.setupJS(js))
            .then(js => this.runJS(js))
            .then(() => {
                console.log("Wrapping up...");
                // setTimeout(() => {
                //     this.routes[this.currentIndex].isLoaded = true; 
                //     program[this.routes[this.currentIndex].id].init();          
                // }, 1000);
                // console.log("current and active ", this.currentIndex, activeProgram);
                // this.routes[this.currentIndex].innerHTML += "<img src='./src/images/logos/empty.png' onload='console.log(program[0], router.routes[router.currentIndex].id); this.parentNode.removeChild(this);' />";
                    // + this.routes + "[+ " + this.currentIndex +"].id].init()';this.parentNode.removeChild(this);' /></div>";[router.routes[router.currentIndex].id].init()\"HEY: \", program[" + router.routes[router.currentIndex].id + "]
                    //router.routes[router.currentIndex].id
                this.rootElem.innerHTML = this.routes[this.currentIndex].innerHTML;
                // while(program[0] === undefined) { console.log("party");}
                const timeout = () => {
                    if(program[this.routes[this.currentIndex].id] === undefined) {
                        setTimeout(timeout, 50);
                    }
                    else {
                        program[this.routes[this.currentIndex].id].init();
                        console.log("DEFINED!!!");
                    }
                }
                timeout();
                // program[this.routes[this.currentIndex].id].init();
                // while(this.currentIndex !== activeProgram) { console.log("not active...")};
                // program[this.routes[this.currentIndex].id].init();
                // console.log("failed?");

                // this.waitDOM();
                // let counter = 0;
                // while(typeof program[this.routes[this.currentIndex].id] === 'undefined') { counter++};
                // console.log("Counter: ", counter);
                // program[this.routes[this.currentIndex].id].init(); 
            })
            .catch(error => console.log(error));
        }

    }
}

export { Route, Router };

// if(loadedScriptID === script id) then runJS

{/* <img src="empty.gif" onload="alert('test');this.parentNode.removeChild(this);" /> */}
