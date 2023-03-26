// Recibir queryParams
const queryParams = window.location.search;
// Pasar los/el query params a una variable
const urlParams = new URLSearchParams(queryParams);
const movie = urlParams.get('movie');

// Funciones
const subirLS = () => {
    
    const cartLS = JSON.stringify(cart);
    localStorage.setItem('cart', cartLS);

};
const deleteFromCart = (seats) => {

    const cartIndex = cart.findIndex((asiento)=>{
        return seats.number === asiento.number;
    });
    cart.splice(cartIndex, 1);
    subirLS();
    renderizarCarrito();

};

// renderizar
const renderizarTotal = () => {
    
    totalBody.innerHTML = '';

    const total = cart.reduce((a, b)=>{
        return a + b.price;
    }, 0);

    const row = document.createElement('div');
    row.className = 'row cart__total align-items-center';

    const totalText = document.createElement('div');
    totalText.className = 'col-8';
    totalText.innerHTML = `<h2>Total:${total}</h2>`;

    const purchaseButton = document.createElement('div');
    purchaseButton.className = 'col-4';
    purchaseButton.innerHTML = `<button type="button" class="btn btn-success">Comprar</button>`;
    purchaseButton.addEventListener('click', ()=>{

        Swal.fire({
            text: 'Confirmar compra',
            icon: 'info',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            confirmButtonColor: 'green',
            showCancelButton: true,
            focusConfirm: true,
          }).then((result)=>{
            if (result.isConfirmed) {

                Swal.fire({
                    icon: 'success',
                    title: 'Compra realizada con exito',
                    text: 'vuelve al inicio para seguir comprando',
                    confirmButtonColor: 'green',
                  }).then(()=>{
                    localStorage.setItem('cart', '');
                    window.location.href = `../index.html`;
                  })
                
            }
          });

    });

    row.append(totalText, purchaseButton);
    totalBody.append(row);

}
const renderizarCarrito = () => {
    
    renderizarTotal();

    cartBody.innerHTML = '';
    
    for (let seats of cart) {

        const row = document.createElement('div');
        row.className = 'row align-items-center cart__item mt-3';

        const movieName = document.createElement('div')
        movieName.className = 'col-4';
        movieName.innerHTML = `<h3>${movie}</h3>`;

        const number = document.createElement('div');
        number.className = 'col-3';
        number.innerHTML = `<h5>N° <br><span class='cart__text'>${seats.number}</span></h5>`;

        const price = document.createElement('div');
        price.className = 'col-3';
        price.innerHTML = `<h5>Precio: <br><span class='cart__text'>${seats.price}</span></h5>`;

        const deleteContainer = document.createElement('div');
        deleteContainer.className = 'col-2';

        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'col-2 material-symbols-outlined cart__delete__icon';
        deleteIcon.innerText = 'delete';
        deleteIcon.addEventListener('click', ()=>{

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

                    deleteFromCart(seats);
                    
                }
              });
        });
        

        deleteContainer.append(deleteIcon);
        row.append(movieName, number, price, deleteContainer);
        cartBody.append(row);
    }

};


// Iniciar Programa
const cartBody = document.querySelector('#cart');
const totalBody = document.querySelector('#total');

const cart = JSON.parse(localStorage.getItem('cart'));

renderizarCarrito();