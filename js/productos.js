/* Selectores */
buscadorFormulario = document.querySelector('#formulario');
buscadorBotones = document.querySelector('#categorias-filtrar');
/* Listeners */
buscadorFormulario.addEventListener('submit', filtrarProductos);
document.addEventListener('DOMContentLoaded', filtrarProductosBoton);

/* Funciones */
function filtrarProductos(e){
    e.preventDefault();
    $.ajax({
        url:'js/productos.json',
        data: 'json',
        dataType: 'json',
        success: mostrarProductos
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    $.ajax({
        url: 'js/productos.json',
        success: function(data){
            cargarListaProductos(data);
        }
    });
});
function filtrarProductosBoton(e){
    e.preventDefault();
    $.ajax({
        url:'js/productos.json',
        data: 'json',
        dataType: 'json',
        success: mostrarProductosBoton
    });
}
function mostrarProductos(result) {
    const busqueda = $('#buscador').val();
    const resultado = result.filter(producto => {
        const productosNombre = producto.nombre.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase());
        const productosMarca =  producto.marca.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
        const productos = productosNombre + productosMarca;
        return productos;
    })
    limpiarProductos()
    cargarListaProductos(resultado);
}
function mostrarProductosBoton(result) {   
    buscadorBotones.addEventListener('click', botonCategoria);
    function botonCategoria(e){
        e.preventDefault();
        const boton = e.path[0].id;
        const id = e.path[0].id;
        console.log(id)
        const resultado = result.filter(producto => {
            const productosCategoria = producto.categoria.toLocaleLowerCase().includes(boton.toLocaleLowerCase());
            const productosTodo = producto.catall.toLocaleLowerCase().includes(boton.toLocaleLowerCase());
            const productos = productosCategoria + productosTodo;
            return productos;
        })
        limpiarProductos()
        cargarListaProductos(resultado);
    }

}
function cargarListaProductos(productos) {
    $('#lista-productos').hide();
	productos.forEach((producto, index) => {
        const listaProductos = document.querySelector('#lista-productos');
		const { categoria, marca, nombre, precio, img, id } = producto;
		const divProducto = document.createElement('div');
		divProducto.classList.add('col-lg-2', 'col-md-3', 'col-sm-5','col-xs-4', 'd-flex', 'justify-content-center','aling-item-center', 'section-producto');
		divProducto.innerHTML = `
        <div class="container-fluid justify-content-center" id="producto-tienda">
            <div class="d-flex justify-content-center col-12">
                    <img src="${img}" alt="" class="imagen-producto">
                </div>
                <div class="d-flex justify-content-center col-12">
                    <p class="categoria ${categoria}">${categoria}</p>
                </div>
                <div class="d-flex justify-content-center col-12">
                    <p class="nombre-producto">${marca} ${nombre}</p>
                </div>
                <div class="d-flex justify-content-center col-12">
                    <p>$<span class="precio">${precio}<span></p>
                    </div>
                    <div class="d-flex justify-content-center col-12">
                    <a class="btn agregar-producto" href="#" role="button" data-id="${id}">Añadir al carrito</a>
                    
                </div>
            </div>
        `
        listaProductos.appendChild(divProducto);
    })
    $('#lista-productos').fadeIn(500);
}
function limpiarProductos(){
    while (listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
}