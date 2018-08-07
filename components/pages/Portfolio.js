const Portfolio = () => {
    document.getElementById("js-menu").style.display = "none";

    const lasers = "img/lasersfromspace.png";
    const altlasers = 'lasers from space';
    const placeholder = "img/placeholder.png";
    const placeholderText = "This is a placeholder";

    const image = '';
    const imageText = '';
    const title = '';
    const text = '';

    const graphics = 'img/sadface.png';
    const graphicsText = 'Graphics Design';

    const gameEngine = 'img/fantasticlogo.png';
    const altGameEngine = 'the Game Engine with a Fantastic Name';

    changeTitle("ongoing projects");
    return `
        <div class="flex-container">
            <p>
                <strong>These are projects that didn't fit under the other categories. </strong>
            </p>
                <hr>
            <p>
                <img class="image rounded" src=${graphics} alt=${graphicsText} width='80px' /> <strong>Graphics Design</strong>
                <br/>Design is a vast and wonderful subject to study.
                <br/><br/>
            </p>

            <p>
                <img class="image rounded" src="img/python.png" alt=${placeholderText} width='80px' /> <strong>Python</strong> <img class="rounded" src="img/python.png" alt="python" height='16px' />
                <br/>Some machine learning is always fun to do. I know nothing so far, 
                so I dont know why I added this section at all.
                <br/><br/>
            </p>

            <p>
                <img class="image rounded" src="https://gravatar.com/avatar/0351bee1b5ca6d4d6d14ec9e4b8c9255?s=200"  alt="Me me" width='50px' /> <strong>Me 2.0</strong>
                <br/>Still in beta. It has full surround sound capabilities and an automated alert 
                system whenever something is amiss, such as hunger, boredom, or babyness.
                <br/><br/>
            </p>

        </div>
    `};