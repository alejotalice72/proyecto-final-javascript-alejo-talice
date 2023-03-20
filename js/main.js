// FUNCIONES



// RENDERIZAR

const renderizarPeliculas = (json) => {
    
    for (const pelicula of json) {

        const div = document.createElement('div');
        div.className = 'movie__card';
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
    
        renderizarPeliculas(json);
    
    });
};

// INICIO DEL PROGRAMA

const moviesBody = document.querySelector('#movies');

obtenerPeliculasDelJSON();