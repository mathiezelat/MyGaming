/* Selectores */
const listaProductos = document.querySelector('#lista-productos-inicio');

/* Array */
let articulosCarrito = [];

/* Listeners */
listaProductos.addEventListener('click', agregarProducto);
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cantidadProductos();
})

/* Funciones */
function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-producto-inicio')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        obtenerDatos(productoSeleccionado);
        cantidadProductos();
    }
    
    if (e.target.classList.contains('agregar-producto-svg')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        obtenerDatos(productoSeleccionado);
        cantidadProductos();
    }

}
function obtenerDatos(producto){
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.div-nombre-producto').textContent,
        precio: producto.querySelector('.div-precio-producto').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = articulosCarrito.some( producto => {
        return producto.id == productoAgregado.id;
    });

    if(existe){
        const productos = articulosCarrito.map(producto => {
            if(producto.id === productoAgregado.id){
                producto.cantidad++; 
                return producto;
            } else{
                return producto;
            }
        })
        articulosCarrito = [...productos];
    } else{
        articulosCarrito.push(productoAgregado);
    }

    guardarStorage();

}
function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
function cantidadProductos(){
    const cantidadDeProductos = document.querySelector("#cantidad-de-productos");
    const agregarCantidad = document.querySelector('.cantidad');
    agregarCantidad.innerHTML = '';
    agregarCantidad.innerHTML = `${articulosCarrito.length}`;
    cantidadDeProductos.appendChild(agregarCantidad);
}