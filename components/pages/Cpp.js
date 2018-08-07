const Cpp = () => {
    document.getElementById("js-menu").style.display = "none";
    changeTitle("c++ projects");

    const lasers = "img/lasersfromspace.png";
    const altlasers = 'lasers from space';

    const gameEngine = 'img/fantasticlogo.png';
    const altGameEngine = 'the Game Engine with a Fantastic Name';

    return `
        <div class="flex-container">
            <p>
                <strong>Not much to show at the moment. But I love C++ and the torture it provides me.
                </strong>
            </p>
                <hr>
            <p>
                <img class="image rounded" src=${gameEngine} alt=${altGameEngine} width='80px' /> <strong>The Game Engine With a Fantastic Name</strong> <img class="rounded" src="img/cpp.png" alt="C++" height='16px' /> / <img class="rounded" src="img/sdl2.png" />
                <br/>A game engine with a fantastic name but limited functionality.
            </p>

            <p>
                <img class="image rounded" src=${lasers} alt=${altlasers} width='80px' /> <strong>Mini-Games</strong> <img class="rounded" src="img/cpp.png" alt="C++" height='16px' />
                <br/>Whenever I have some spare time, I play around with my game engine.
            </p>
        </div>
    `
};