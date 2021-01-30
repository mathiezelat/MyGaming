/* Carga el storage */
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cantidadProductos();

})
/* Cantidad de productos */
function cantidadProductos(){
    const cantidadDeProductos = document.querySelector("#cantidad-de-productos");
    const agregarCantidad = document.querySelector('.cantidad');
    agregarCantidad.innerHTML = '';
    agregarCantidad.innerHTML = `${articulosCarrito.length}`;
    cantidadDeProductos.appendChild(agregarCantidad);

}