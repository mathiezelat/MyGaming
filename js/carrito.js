/* Selectores */
const contenedorCarrito = document.querySelector('#lista-carrito');
const contenedorVaciarCarrito = document.querySelector('#vaciar-boton-carrito');
const contenedorComprarCarrito = document.querySelector('#comprar-boton-carrito');
const contenedorPagoCarrito = document.querySelector('#pago-carrito');

/* Listeners */
contenedorCarrito.addEventListener('click', sumarProducto);
contenedorCarrito.addEventListener('click', restarProducto);
contenedorVaciarCarrito.addEventListener('click', vaciarCarrito);
contenedorCarrito.addEventListener('click', quitarProducto);
contenedorComprarCarrito.addEventListener('click', insertarEnvioHTML);
contenedorPagoCarrito.addEventListener('click', insertarPagoHTML);
contenedorPagoCarrito.addEventListener('click', insertarPagoFinalizadoHTML);

/* Carga el contenido en el carrito */
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if(articulosCarrito == 0){
        limpiarCarrito();
        cantidadProductos();
        insertarCarritoVacioHTML();
        limpiarVaciarCarrito();
        limpiarComprarCarrito();
    } else{
        $('#lista-carrito').hide()
        limpiarComprarCarrito();
        limpiarVaciarCarrito();
        insertarComprarHTML();
        insertarVaciarHTML();
        insertarCarritoHTML();
        cantidadProductos();
        $('#lista-carrito').fadeIn('1000')
    }
});

/* Funciones */
function vaciarCarrito(e){
    if (e.target.classList.contains('boton-vaciar-carrito')) {
        $('#lista-carrito').hide()
        e.preventDefault();
        limpiarCarrito();
        articulosCarrito = [];
        cantidadProductos();
        insertarCarritoVacioHTML();
        guardarStorage();
        limpiarComprarCarrito();
        limpiarVaciarCarrito();
        $('#lista-carrito').fadeIn('1000')

    }
}
function quitarProducto(e){
    if(e.target.classList.contains('borrar-producto')){
        e.preventDefault();
        const productoide = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( producto => producto.id != productoide);
        insertarCarritoHTML();
        cantidadProductos();
        guardarStorage();
        
        if(articulosCarrito == 0){
            $('#lista-carrito').hide()
            insertarCarritoVacioHTML();
            limpiarComprarCarrito();
            limpiarVaciarCarrito();
            guardarStorage();
            $('#lista-carrito').fadeIn('1000')

        }

    }
}
function sumarProducto(e){
    if (e.target.classList.contains('sumar-producto')) {
        const id = e.target.getAttribute('data-id');
        const producto = e.target.parentElement;
        const productosCantidad = producto.querySelectorAll('.cantidad-productos');
        let cantidad = productosCantidad.length;
        console.log(articulosCarrito.map(producto => producto.id == id))
        console.log(cantidad)
        articulosCarrito.map(producto => {
            if (producto.id == id && producto.cantidad < 25){
                producto.cantidad++;
            }})
            guardarStorage()
            insertarCarritoHTML()
    }
}
function restarProducto(e){
    if (e.target.classList.contains('restar-producto')) {
        const id = e.target.getAttribute('data-id');
        const producto = e.target.parentElement;
        const productosCantidad = producto.querySelectorAll('.cantidad-productos');
        let cantidad = productosCantidad.length;
        console.log(articulosCarrito.map(producto => producto.id == id))
        console.log(cantidad)
        articulosCarrito.map(producto => {
            if (producto.id == id && producto.cantidad > 1){
                producto.cantidad--;
            }})
            guardarStorage()
            insertarCarritoHTML()
    }
}
function insertarCarritoHTML(){
    limpiarCarrito();
    const total = document.querySelector('.precio-total');
    total.innerHTML = " "
    let sumaPrecios = 0;
    articulosCarrito.forEach(producto => {
        const {imagen, nombre, precio, cantidad, id} = producto;
        sumaPrecios += Number(precio*cantidad);
        const row = document.createElement('div');
        row.classList.add('col-lg-7', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center', 'section-producto-carrito', 'row')
        row.innerHTML = `
        <div class="container-fluid row justify-content-center">
        <div class="row d-flex align-items-center">
        <div class="d-flex justify-content-center col-2">
                    <img src="${imagen}" alt="" class="imagen-producto-carrito">
                    </div>
                    <div class="d-flex justify-content-center col-3 producto-carrito-nombre">
                    <p>${nombre}</p>
                    </div>
                    <div class="d-flex justify-content-center col-2 producto-carrito-nombre" id="suma-resta-productos">
                    <p><span class="restar-producto" data-id="${id}">-</span>  <span class="cantidad-productos">${cantidad}</span>  <span class="sumar-producto" data-id="${id}">+</span></p>
                </div>
                <div class="d-flex justify-content-center col-3 producto-carrito-nombre">
                <p>$${precio*cantidad}</p>
                </div>
                <div class="d-flex justify-content-center col-1">
                <button type="button" class="btn-close borrar-producto" aria-label="Close" data-id="${id}"></button>
                </div>
                </div>
                </div>
                
                
                `
                contenedorCarrito.appendChild(row);
            })
            total.innerHTML = `$${sumaPrecios}`
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
function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
function insertarCarritoVacioHTML(){
        const row = document.createElement('div');
        row.classList.add('col-lg-7', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center', 'section-producto-carrito-vacio', 'row')
        row.innerHTML = `
        <div class="container-fluid row justify-content-center">
            <div class="row d-flex align-items-center justify-content-center">
                <div class="d-flex justify-content-center col-12 producto-carrito-vacio-texto">
                    <p class="d-flex justify-content-end carrito-vacio-texto">No tienes artículos en tu Carrito</p>
                </div>
                <div class="d-flex justify-content-center col-12 producto-carrito-vacio-boton">
                    <a class="btn boton-carrito-vacio" href="productos.html" role="button">Volver a productos</a>
                </div>
            </div>
        </div>
        `
        contenedorCarrito.appendChild(row);
}
function insertarComprarHTML(){
    const row = document.createElement('div');
    row.classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center', 'section-producto-carrito-comprar-carrito');
    row.innerHTML = `
    <div class="container justify-content-center">
    <div class="d-flex align-items-center justify-content-center">
        <div class="d-flex row justify-content-center col-12">
            <div class="justify-content-center text-aling-center d-flex precio-total-div">
                <p>Total:</p>
                <p class="precio-total">$0</p>
            </div>
            <a class="btn boton-comprar-carrito envio-carrito" href="#" role="button" id="comprar-carrito">Comprar</a>
        </div>
    </div>
</div>
    `
    contenedorComprarCarrito.appendChild(row);
}
function limpiarComprarCarrito(){
    while(contenedorComprarCarrito.firstChild){
        contenedorComprarCarrito.removeChild(contenedorComprarCarrito.firstChild);
    }
}
function insertarVaciarHTML(){
    const row = document.createElement('div');
    row.classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center', 'section-producto-carrito-vaciar-carrito');
    row.innerHTML = `
    <div class="container justify-content-center">
    <div class="d-flex align-items-center justify-content-center">
        <div class="d-flex row justify-content-center col-12">
            <a class="btn boton-vaciar-carrito" href="#" role="button">Vaciar carrito</a>
        </div>
    </div>
</div>
    `
    contenedorVaciarCarrito.appendChild(row);
}
function limpiarVaciarCarrito(){
    while(contenedorVaciarCarrito.firstChild){
        contenedorVaciarCarrito.removeChild(contenedorVaciarCarrito.firstChild);
    }
}

function insertarEnvioHTML(e){
    if(e.target.classList.contains('envio-carrito')){
        limpiarCarrito()
        limpiarVaciarCarrito()
        limpiarComprarCarrito()
        const row = document.createElement('div');
        row.classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center', 'section-producto-carrito-comprar-carrito');
        row.innerHTML = `
        <div class="row justify-content-center d-flex">
        <div class="fondo-pago">
        <section class="col-lg-12 col-md-12 col-sm-12 justify-content-center">
            <p class="titulo-pagina">Datos de envio</p>
            <div class="justify-content-center d-flex align-items-center">
            </div>
            <div class="row justify-content-center d-flex">
                <div class="container-fluid row d-flex">
                    <div class="mb-1 col-lg-5 col-md-5 col-sm-5 formulario  envio-form">
                        <label for="nombre" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="Nombre" minlength="0" maxlength="10">
                    </div>
                    <div class="mb-1 col-lg-5 col-md-5 col-sm-5 formulario  envio-form">
                        <label for="apellido" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="Apellido" minlength="0" maxlength="10">
                    </div>
                    <div class="mb-1 col-lg-5 col-md-5 col-sm-5 formulario  envio-form">
                        <label for="direccion" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="Direccion" minlength="0" maxlength="18">
                    </div>
                    <div class="mb-1 col-lg-1 col-md-1 col-sm-1 formulario  envio-form">
                        <label for="depto" class="form-label"></label>
                        <input type="number" class="form-control number-arrow" min="0" max="99" minlength="0" maxlength="2" placeholder="Depto">
                    </div>
                    <div class="mb-1 col-lg-4 col-md-4 col-sm-4 formulario  envio-form">
                        <label for="codigopostal" class="form-label"></label>
                        <input type="number" class="form-control number-arro" min="0" max="9999" minlength="0" maxlength="4" placeholder="Codigo Postal">
                    </div>
                    <div class="mb-1 col-lg-4 col-md-4 col-sm-4 formulario  envio-form">
                        <label for="phone" class="form-label"></label>
                        <input type="tel" class="form-control" placeholder="Telefono"  pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}" minlength="0" maxlength="10">
                    </div>
                    <div class="mb-1 col-lg-4 col-md-4 col-sm-4 formulario  envio-form">
                        <label for="email" class="form-label"></label>
                        <input type="email" class="form-control" placeholder="Correo" minlength="0" maxlength="28">
                    </div>
                    <div class="mb-1 col-lg-4 col-md-4 col-sm-4 formulario  envio-form">
                        <label for="ciudad" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="Ciudad" minlength="0" maxlength="18">
                    </div>
                    <div class="mb-5 col-lg-4 col-md-4 col-sm-4 formulario  envio-form">
                        <label for="provincia" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="Provincia" minlength="0" maxlength="18">
                    </div>
                    <div class="col-12 text-center">
                        <button type="submit" class="btn boton-enviar pago-carrito">Siguiente</button>
                    </div>
                </div>
                </div>
            </section>
        </div>
        </div>
        `
        contenedorPagoCarrito.appendChild(row);
    }
}

function limpiarPagoCarrito(){
    while(contenedorPagoCarrito.firstChild){
        contenedorPagoCarrito.removeChild(contenedorPagoCarrito.firstChild);
    }
}
function insertarPagoHTML(e){
    if(e.target.classList.contains('pago-carrito')){
        limpiarPagoCarrito()
        limpiarCarrito()
        limpiarVaciarCarrito()
        limpiarComprarCarrito()
        const row = document.createElement('div');
        row.classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center', 'section-producto-carrito-comprar-carrito');
        row.innerHTML = `
        <div class="row justify-content-center d-flex">
        <div class="fondo-pago siguiente-pago">
        <section class="col-lg-12 col-md-12 col-sm-12 justify-content-center">
            <p class="titulo-pagina">Datos de pago</p>
            <div class="justify-content-center d-flex align-items-center">
            </div>
            <div class="row justify-content-center d-flex">
                <div class="container-fluid row d-flex">
                    <div class="mb-1 col-lg-5 col-md-5 col-sm-5 formulario  envio-form">
                        <label for="nombre" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="Nombre" minlength="0" maxlength="10">
                    </div>
                    <div class="mb-1 col-lg-5 col-md-5 col-sm-5 formulario  envio-form">
                        <label for="apellido" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="Apellido" minlength="0" maxlength="10">
                    </div>
                    <div class="mb-1 col-lg-5 col-md-5 col-sm-5 formulario  envio-form">
                        <label for="numbertarjet" class="form-label"></label>
                        <input type="number" class="form-control" placeholder="Numero de tarjeta" min="0" max="9999999999">
                    </div>
                    <div class="mb-1 col-lg-4 col-md-4 col-sm-4 formulario  envio-form">
                        <label for="fechaCad" class="form-label"></label>
                        <input type="month" class="form-control" placeholder="Fecha de caducidad" min="2021-01" max="2035-12">
                    </div>
                    <div class="mb-5 col-lg-1 col-md-1 col-sm-1 formulario  envio-form">
                        <label for="cvv" class="form-label"></label>
                        <input type="number" class="form-control" placeholder="CVV" min="0" max="999">
                    </div>
                    <div class="col-12 text-center">
                        <button type="submit" class="btn boton-enviar pago">Pagar</button>
                    </div>
                </div>
                </div>
            </section>
        </div>
        </div>
        `
        contenedorPagoCarrito.appendChild(row);
    }
}
function insertarPagoFinalizadoHTML(e){
    if(e.target.classList.contains('pago')){
        limpiarPagoCarrito()
        limpiarCarrito()
        limpiarVaciarCarrito()
        limpiarComprarCarrito()
        articulosCarrito = [];
        cantidadProductos();
        guardarStorage();
        limpiarComprarCarrito();
        limpiarVaciarCarrito();
        const row = document.createElement('div');
        row.classList.add('col-lg-12', 'col-md-12', 'col-sm-12', 'd-flex', 'justify-content-center', 'section-producto-carrito-comprar-carrito');
        row.innerHTML = `
        <div class="row justify-content-center d-flex">
        <div class="fondo-pago compra-finalizada">
        <section class="col-lg-12 col-md-12 col-sm-12 justify-content-center">
            <p class="titulo-pagina thx-compra">¡Gracias por tu compra!</p>
            <div class="justify-content-center d-flex align-items-center">
            </div>
            <div class="row justify-content-center d-flex">
                    <div class="col-12 text-center">
                        <a class="btn boton-carrito-vacio" href="productos.html" role="button">Volver a productos</a>
                    </div>
                </div>
                </div>
            </section>
        </div>
        </div>
        `
        contenedorPagoCarrito.appendChild(row);
    }
}