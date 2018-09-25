// LOAD HEADER AND FOOTER
document.querySelector('footer').innerHTML = Footer;
document.getElementById('navigation').innerHTML = Navbar;

loadHeaders();
SetApps();
AddOneListener();

document.getElementById('contents').innerHTML = About();

function changeTitle(title) {
    document.querySelector('.pageTitle').innerHTML = `<h5>(  ${title}  )</h5>`;
}

function loadHeaders() {
    let listeners = [];

    // ADD ALL THE HEADERS HERE AND YOU'RE GOOD TO GO
    addHeader('NILKUN', 'nilkun', About, 'navbar-brand');
    addHeader('JavaScript', 'mini-apps', MiniApps);
//     addHeader('C++', 'cpp', Cpp);
    addHeader('Drawings', 'drawings', Drawings);
    // addHeader('Other Projects', 'portfolio', Portfolio);
    

    AddApps('A* pathfinder', "astar", Astar, 'astar');
    AddApps("Ghibli API", "ghibli", Ghibli, 'ghibli');
    AddApps("Simple Drawing", "drawing", Drawing, "drawing");
//     AddApps('Trash day', 'trash', Trash);

    addListeners(listeners);

    function addHeader(title, id, listener, className) { // default class is nav-link
        if (className === undefined) className = "nav-link";
        document.getElementById('navigation-bar').innerHTML +=
            `<a class="${className}" id="${id}" href="#">${title}</a>`;
        listeners.push([id, listener]);
    }

    function addListeners(listeners) {
        listeners.forEach((listener) => {
            document.getElementById(listener[0]).addEventListener('click', () => {
                document.getElementById('contents').innerHTML = listener[1]();
            });
        });
    }
}
