//obtener los/el query params
const queryParams = window.location.search;
// Pasar los/el query params a una variable
const urlParams = new URLSearchParams(queryParams);
const movie = urlParams.get('movie');

// Funciones

const renderizarInfo = (movieInfo) => {

    infoBody.innerHTML = '';

    const calculateStars = () => {

        let grade = '';
        for (let i = 0; i < parseInt(movieInfo.stars); ++i) {
            grade += 'grade ';
            console.log(grade)
        }    
        return grade;

    }; 

    const row = document.createElement('div');
    row.className = 'row align-items-end';

    const colUno = document.createElement('div');
    colUno.className = 'col-12 col-md-6';

    const colDos = document.createElement('div');
    colDos.className = 'col-12 col-md-6 info__body';

    const img = document.createElement('img');
    img.className = 'img-fluid';
    img.src = `.${movieInfo.image}`;

    const title = document.createElement('h2');
    title.innerText = movieInfo.movie;

    const stars = document.createElement('span');
    stars.className = 'material-symbols-outlined';
    stars.innerText = calculateStars();
    
    const cast = document.createElement('p');
    cast.innerHTML = `<p> <strong>Elenco:</strong> <br> ${movieInfo.cast} </p>`;

    const description = document.createElement('p');
    description.innerHTML = `<p> <strong>Reseña:</strong> <br> ${movieInfo.description} </p>`;

    colUno.append(img);
    colDos.append(title, stars, cast, description);
    row.append(colUno, colDos);
    infoBody.append(row);

};

// LLamar json
const llamarJSON = (movie) => {

    fetch('../js/cine.json').then((response)=>{
    
        return response.json();
    
    }).then((json)=>{
        
        const movieIndex = json.findIndex((movies)=>{
            return movies.movie === movie;
        });

        movieInfo = json[movieIndex];

        renderizarInfo(movieInfo);
    
    });

};

// INICIAR PROGRAMA

const infoBody = document.querySelector('#info');

llamarJSON(movie);