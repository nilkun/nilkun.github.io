const Portfolio = () => {


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

    changeTitle("ongoing projects")
    return `
        <div class="flex-container">
            <p>
                <img class="image rounded" src=${gameEngine} alt=${altGameEngine} width='80px' /> <strong>The Game Engine With a Fantastic Name</strong> <img class="rounded" src="img/cpp.png" alt="C++" height='16px' /> / <img class="rounded" src="img/sdl2.png" />
                <br/>A game engine with a fantastic name but limited functionality.
            </p>

            <p>
                <img class="image rounded" src=${lasers} alt=${altlasers} width='80px' /> <strong>Mini-Games</strong> <img class="rounded" src="img/cpp.png" alt="C++" height='16px' />
                <br/>Games are fun to play around with. I've completed a Missile Command clone-ish game, 
                available on github.
            </p>

            <p>
                <img class="image rounded" src="img/gomi.png" alt=${placeholderText} width='80px' /> <strong>Gomi</strong>
                <br/>A simple app to keep track of trash days.
            </p>

            <p>
                <img class="image rounded" src="img/js.png" alt=${placeholderText} width='80px' /> <strong>JavaScript</strong> <img class="rounded" src="img/js.png" alt="JavaScript" height='16px' />
                <br/>Everybody needs to know JavaScript these days. 
                This website is powered by JavaScript. Although it doesn't use too much power.
                <br/><br/>
            </p>

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

            <p>
                <strong>Finished mini-projects available on Github</strong>
                <ul>
                    <li>Sudoku-solver - solves sudoku puzzles <img class="rounded" src="img/cpp.png" alt="C++" height='16px' /></li>
                    <li>Awesome Textviewer - View textfiles from the Awesome WM <img class="rounded" src="img/lua.png" alt="Lua" height='16px' /></li>
                    <li>RaceTrack - Simple racing game engine. Has map editor and collision detection. <img class="rounded" src="img/cpp.png" alt="C++" height='16px' /> / <img class="rounded" src="img/sdl2.png" alt="SDL2" height='16px' /></li>
                </ul>
            </p>
        </div>
    `};