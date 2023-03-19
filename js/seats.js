//obtener los/el query params
const queryParams = window.location.search;
console.log(queryParams);
// Pasar los/el query params a una variable
const urlParams = new URLSearchParams(queryParams);
const movie = urlParams.get('movie');

// LLamar json
const llamarJSON = (movie) => {

    fetch('../js/cine.json').then((response)=>{
    
        return response.json();
    
    }).then((json)=>{
        
        const movieIndex = json.findIndex((movies)=>{
            return movies.movie === movie;
        });

        movieInfo = json[movieIndex];
        
        console.log(movieInfo)
    
    });

};

// INICIAR PROGRAMA

llamarJSON(movie);