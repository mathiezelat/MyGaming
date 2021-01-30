/* Selectores */
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito');
const listaProductos = document.querySelector('#lista-productos');

/* Array */
let articulosCarrito = [];

/* Listeners */
listaProductos.addEventListener('click', agregarProducto);

/* Carga el storage */
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cantidadProductos();

})

/* Funciones */
function agregarProducto(e){
    e.preventDefault();
    
    console.log(e.target.classList.contains('agregar-producto')); 
    if(e.target.classList.contains('agregar-producto')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        obtenerDatos(productoSeleccionado);
        cantidadProductos();
    }

}
function obtenerDatos(producto){
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.nombre-producto').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(producto.querySelector('a').getAttribute('data-id'));
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