//obtener los/el query params
const queryParams = window.location.search;
// Pasar los/el query params a una variable
const urlParams = new URLSearchParams(queryParams);
const movie = urlParams.get('movie');

// Funciones 
const subirLS = () => {
    
    const cartLS = JSON.stringify(cart);
    localStorage.setItem('cart', cartLS);

};
const addToCart = (seat) => {

    cart.push(seat);
    subirLS();

};
const removeFromCart = (seat) => {

    const seatIndex = cart.findIndex((asiento)=>{
        return seat.number === asiento.number;
    });
    cart.splice(seatIndex, 1);
    subirLS();

};
const verificarEstado = (state) => {
    
    if (!state) {
        return 'asiento--libre.png';
    } else {
        return 'asiento--ocupado.png';
    }

};

// Renderizar
const renderizarCarritoMini = (cantidadDeAsientos) => {

    miniCarrito.innerHTML = '';
    const cartIcon = document.createElement('span');
    cartIcon.className = 'material-symbols-outlined';
    cartIcon.innerText = 'shopping_cart';

    if (cantidadDeAsientos <= 0) {
        miniCarrito.className = 'hidden';
    } else {
        miniCarrito.className = 'show';
        miniCarrito.append(cartIcon, cantidadDeAsientos);
    }

}

const renderizarAsientos = (movieInfo) => {

    const seats = movieInfo.seats;

    const pantallaContainer = document.createElement('div');
    pantallaContainer.className = 'd-flex align-items-center justify-content-center';

    const pantalla = document.createElement('img')
    pantalla.src = '../img/logo/pantalla.png'
    
    pantallaContainer.append(pantalla);

    const row = document.createElement('div');
    row.className = 'row row-cols-4 gy-5';

    for (const seat of seats) {
        
        const state = verificarEstado(seat.state);

        const col = document.createElement('div');
        col.className = 'col';

        const asiento = document.createElement('div');
        asiento.className = 'asiento ';
        asiento.innerText = seat.number;

        const asientoImg = document.createElement('img');
        asientoImg.src = '../img/logo/' + state; 

        asiento.addEventListener('click', ()=>{

                if (seat.state === false) {

                    asientoImg.src = '../img/logo/asiento--espera.png';
                    
                    Toastify({
                        text: "Agregado",
                        duration: 5000,
                        gravity: "top",
                        close: true,
                        className: "info",
                    }).showToast();

                    seat.state = 'espera';
                    addToCart(seat);
                    renderizarCarritoMini(cart.length);

                } else if (seat.state === true) {

                    Toastify({
                        text: "Ocupado",
                        duration: 5000,
                        gravity: "top",
                        close: true,
                        className: "warning",
                    }).showToast();

                } else {
                    
                    Swal.fire({
                        text: 'Desea deshacer la seleccion',
                        icon: 'warning',
                        iconColor: 'yellow',
                        confirmButtonText: 'Ok ✓',
                        cancelButtonText: 'No ✕',
                        confirmButtonColor: '#ABED7D',
                        cancelButtonColor: '#DF1919',
                        showCancelButton: true,
                        focusConfirm: true,
                      }).then((result)=>{
                        if (result.isConfirmed) {

                            removeFromCart(seat);
                            renderizarCarritoMini(cart.length);
                            asientoImg.src = '../img/logo/asiento--libre.png';
                            seat.state = false;

                        }
                      });

                }
                  

            });

        asiento.append(asientoImg);
        col.append(asiento)
        row.append(col);
        seatsBody.append(pantallaContainer, row);

    }

}

const renderizarInfo = (movieInfo) => {

    infoBody.innerHTML = '';

    const calculateStars = () => {

        let grade = '';
        for (let i = 0; i < parseInt(movieInfo.stars); ++i) {
            grade += 'grade ';
        }    
        return grade;

    }; 

    const row = document.createElement('div');
    row.className = 'row align-items-end';

    const colUno = document.createElement('div');
    colUno.className = 'col-12 col-md-6 info__center';

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
        renderizarAsientos(movieInfo);
        miniCarrito.addEventListener('click', ()=>{
            window.location.href = `./cart.html?movie=${movieInfo.movie}`;
        });
     
    });

};

// INICIAR PROGRAMA
const cart = [];

const infoBody = document.querySelector('#info');
const seatsBody = document.querySelector('#seats');
const miniCarrito = document.querySelector('#bubble')

llamarJSON(movie);