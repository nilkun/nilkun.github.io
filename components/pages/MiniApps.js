// const MiniApps = () => {

let JSApps = [];

function AppName(title, id, listener, className) {
    this.title = title;
    this.id = id;
    this.listener = listener;
    this.className = className;
}

function AddApps(title, id, listener, className) {
    JSApps.push(new AppName(title, id, listener, className));
}

function SetApps() {
    let html = '';
    JSApps.forEach((app) => { 
        html +=`<a class="${app.className}" id="${app.id}" href="#">${app.title} </a>`;
    });
    document.getElementById('js-menu').innerHTML = html;
}

function MiniApps() {
    document.getElementById("js-menu").style.display = "block";


    changeTitle("javascript")
    return `
        <div id="js-window">
            <p><strong>Please click above.</strong>
            <hr></p>
            This is my JavaScript playground.
        </div>
    `;
}

function AddOneListener() {
    JSApps.forEach(app => {
        document.getElementById(app.id).addEventListener('click', () => JSWindow(app.listener));
    })
}

function JSWindow(contents) {
    changeTitle(contents.title)
    contents.load('js-window');
}
