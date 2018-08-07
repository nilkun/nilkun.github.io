const Ghibli = {

    title: "Ghibli API",
    
    loadFilms() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "https://ghibliapi.herokuapp.com/films", true);
        xhr.onload = function() {
            if(this.status===200) {
                films = JSON.parse(this.responseText);
            }
        }
        xhr.send();
    },

    loadRandomFilm() {
        const noOfFilms = films.length;
        const filmIndex = Math.floor(Math.random() * noOfFilms);
        console.log(filmIndex);
        const film = films[filmIndex];

        const output = `
            <h5> ${film.title} (${film.release_date})</h5>
            <p> Directed by ${film.director}, Produced by ${film.producer}
                <br>
                Rotten Tomatoes score: ${film.rt_score}
            <p>
            <p> ${film.description}</p>
            `;
        document.getElementById('filminfo').innerHTML = output;
    },

    load(windowName) {
        this.loadFilms();
        document.getElementById(windowName).innerHTML = `
            <div>
                <p>
                    <strong>Click the button to get information on a random Studio Ghibli Film.</strong>
                    <br>
                    <button id="getfilm">Get film</button>
                </p>
                <div id="filminfo">
                </div>
            
            </p>
            </div>
        `
        document.getElementById("getfilm").addEventListener('click', this.loadRandomFilm);
    }

}




const Ghibli2 = () => {
        let films;

        loadFilms();

        film = {
            title: "Rambo",
            release_date: "never",
            director: "",
            producer: "",
            rt_score: "",
            description: "",
        }
  
    

    function loadFilms() {
        const xhr = new XMLHttpRequest();
        console.log("loading films");
        xhr.open('GET', "https://ghibliapi.herokuapp.com/films", true);
        xhr.onload = function() {
            if(this.status===200) {
                films = JSON.parse(this.responseText);
            }
        }
        xhr.send();
    }

    function loadRandomFilm() {
        const noOfFilms = films.length;
        const filmIndex = Math.floor(Math.random() * noOfFilms);
        console.log(filmIndex);
        const film = films[filmIndex];

        const output = `
            <h1> ${film.title} (${film.release_date})</h1>
            <h5> Directed by ${film.director}, Produced by ${film.producer}</h5>
            <h2> Rotten Tomatoes score: ${film.rt_score}</h2>
            <p> ${film.description}
            `;
        document.getElementById('film').innerHTML = output;
    }
    function setUp(where) {
        where = "here"
    }


    return `
        <div class="flex-container">
            <p>
                <strong>Ghibli Films info.</strong>
            </p>
            <button onClick="loadRandomFilm()">Get film</button>
            <div class="filminfo">
            </div>
            <br>
            <br>
        
        </p>
        </div>
    `
    // return `
    //         <h1> ${film.title} (${film.release_date})</h1>
    //         <h5> Directed by ${film.director}, Produced by ${film.producer}</h5>
    //         <h2> Rotten Tomatoes score: ${film.rt_score}</h2>
    //         <p> ${film.description}
    //         `;

    // document.getElementById('button').addEventListener('click', loadRandomFilm);
    // let films;


    
}