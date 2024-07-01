const PRODUCTOS_CLAVE = "PRODUCTOS";

const NOMBRE_PRODUCTO_INPUT = document.getElementById('nombre-producto');
const PRECIO_PRODUCTO_INPUT = document.getElementById('precio-producto');
const BOTON_GUARDAR_PRODUCTO = document.getElementById('guardar-producto');
const LISTA_PRODUCTOS = document.getElementById('lista-productos');
const PRODUCTOS_SELECCIONADOS = document.getElementById('productos-seleccionados');
const BOTON_CALCULAR_COSTO = document.getElementById('calcular-costo');
const COSTO_TOTAL = document.getElementById('costo-total');

const obtenerDatos = (clave) => {
    const datosJSON = localStorage.getItem(clave);
    return datosJSON ? JSON.parse(datosJSON) : [];
};

const guardarDatos = (clave, datos) => {
    localStorage.setItem(clave, JSON.stringify(datos));
};

const renderizarProductos = () => {
    LISTA_PRODUCTOS.innerHTML = '';
    const productos = obtenerDatos(PRODUCTOS_CLAVE);
    productos.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.className = 'item';
        productoElemento.textContent = `Producto: ${producto.nombre} - Precio: $${producto.precio}`;
        LISTA_PRODUCTOS.appendChild(productoElemento);
        
        productoElemento.addEventListener('click', () => {
            agregarProductoSeleccionado(producto);
        });
    });
};

const agregarProductoSeleccionado = (producto) => {
    const productoExistente = Array.from(PRODUCTOS_SELECCIONADOS.children).find(item => item.dataset.nombre === producto.nombre);
    
    if (productoExistente) {
        const cantidadElemento = productoExistente.querySelector('.cantidad');
        let cantidad = parseInt(cantidadElemento.textContent);
        cantidad++;
        cantidadElemento.textContent = cantidad;
    } else {
        const productoSeleccionado = document.createElement('div');
        productoSeleccionado.className = 'item';
        productoSeleccionado.dataset.nombre = producto.nombre;
        productoSeleccionado.innerHTML = `Producto: ${producto.nombre} - Precio: $${producto.precio} - Cantidad: <span class="cantidad">1</span>`;
        PRODUCTOS_SELECCIONADOS.appendChild(productoSeleccionado);
    }
};

BOTON_GUARDAR_PRODUCTO.addEventListener('click', () => {
    const nombreProducto = NOMBRE_PRODUCTO_INPUT.value.trim();
    const precioProducto = parseFloat(PRECIO_PRODUCTO_INPUT.value);
    if (nombreProducto && !isNaN(precioProducto)) {
        const productos = obtenerDatos(PRODUCTOS_CLAVE);
        productos.push({ nombre: nombreProducto, precio: precioProducto });
        guardarDatos(PRODUCTOS_CLAVE, productos);
        NOMBRE_PRODUCTO_INPUT.value = '';
        PRECIO_PRODUCTO_INPUT.value = '';
        renderizarProductos();
    }
});

BOTON_CALCULAR_COSTO.addEventListener('click', () => {
    let costoTotal = 0;
    PRODUCTOS_SELECCIONADOS.childNodes.forEach(producto => {
        const cantidad = parseInt(producto.querySelector('.cantidad').textContent);
        const precioTexto = producto.textContent.split('- Precio: $')[1].split(' -')[0];
        const precio = parseFloat(precioTexto);
        costoTotal += precio * cantidad;
    });
    COSTO_TOTAL.textContent = `Costo Total: $${costoTotal}`;
});

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
});
