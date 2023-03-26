// FUNCIONES


// RENDERIZAR
const renderizarPeliculas = (json) => {
    
    moviesBody.innerHTML = '';

    for (const pelicula of json) {

        const div = document.createElement('div');
        div.className = 'movie__card ';
        div.addEventListener('click', ()=>{
            window.location.href = `./pages/seats.html?movie=${pelicula.movie}`;
        });

        const imagen = document.createElement('img');
        imagen.src = pelicula.image;
        imagen.className = 'img-fluid';
        
        div.append(imagen);
        moviesBody.append(div);

    }

};

// LLAMAR JSON
const obtenerPeliculasDelJSON = () => {
    fetch('./js/cine.json').then((response)=>{
    
        return response.json();
    
    }).then((json)=>{
        
        const peliculas = json;
        renderizarPeliculas(peliculas);
        
        const buscador = document.querySelector('#searcher');
        buscador.addEventListener('input', ()=> {

            const peliculaABuscar = buscador.value;
            const peliculasFiltradas = peliculas.filter((peli)=> {
                return peli.movie.toUpperCase().includes(peliculaABuscar.toUpperCase());
            });

            renderizarPeliculas(peliculasFiltradas);

        });

    });
};

// INICIO DEL PROGRAMA

const moviesBody = document.querySelector('#movies');
const submitBTN = document.querySelector('#search');
submitBTN.addEventListener("submit", (event)=> {
    event.preventDefault();
});

obtenerPeliculasDelJSON();