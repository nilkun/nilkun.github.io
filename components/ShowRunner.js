// LOAD HEADER AND FOOTER
document.querySelector('footer').innerHTML = Footer;
document.getElementById('navigation').innerHTML = Navbar;

loadHeaders();
document.getElementById('contents').innerHTML = About();

function changeTitle(title) {
    document.querySelector('.pageTitle').innerHTML = `<h5>(  ${title}  )</h5>`;
}

function loadHeaders() {
    let listeners = [];

    // ADD ALL THE HEADERS HERE AND YOU'RE GOOD TO GO
    addHeader('NILKUN', 'nilkun', About, 'navbar-brand');
    // addHeader('About', 'about', About);
    addHeader('Portfolio', 'portfolio', Portfolio);
    addHeader('Drawings', 'drawings', Drawings);

    // addHeader('Current Projects', 'current-projects');
    // addHeader('Report', 'report');
    // addHeader('Stats', 'stats');

    addListeners(listeners);

    function addHeader(title, id, listener, className) { // default class is nav-link
        if(className === undefined) className = "nav-link";
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