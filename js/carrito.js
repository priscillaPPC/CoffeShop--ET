// Muestra los productos agregados al carrito y el total 
document.addEventListener('DOMContentLoaded', mostrarCarrito);

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosLS = JSON.parse(localStorage.getItem('productos')) || [];
    const tbody = document.getElementById('productos-en-carrito');
    const totalSpan = document.getElementById('total-precio');
    const mensajeVacio = document.getElementById('carrito-vacio-mensaje');
    const botonPagar = document.getElementById('boton-pagar');

    tbody.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block';
        botonPagar.style.display = 'none';
        totalSpan.textContent = '0';
        return;
    } else {
        mensajeVacio.style.display = 'none';
        botonPagar.style.display = 'block';
    }

    // Agrupar productos por id
    const productosAgrupados = {};
    carrito.forEach(producto => {
        // Actualizar datos desde productosLS
        const productoActual = productosLS.find(p => p.id === producto.id) || producto;
        if (!productosAgrupados[productoActual.id]) {
            productosAgrupados[productoActual.id] = { ...productoActual, cantidad: 1 };
        } else {
            productosAgrupados[productoActual.id].cantidad++;
        }
    });

    Object.values(productosAgrupados).forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="modificarCantidad(${producto.id}, -1)">-</button>
                ${producto.cantidad}
                <button onclick="modificarCantidad(${producto.id}, 1)">+</button>
            </td>
            <td>$${subtotal}</td>
            <td>
                <button onclick="eliminarUnaUnidad(${producto.id})">Eliminar 1</button>
                <button onclick="eliminarDelCarrito(${producto.id})">Eliminar todo</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    totalSpan.textContent = total;
}
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Elimina todos los productos con ese id
    carrito = carrito.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarUnaUnidad(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function modificarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (cambio > 0) {
        // Agrega una unidad
        const producto = carrito.find(p => p.id === id);
        if (producto) {
            carrito.push(producto);
        }
    } else {
        // Elimina una unidad
        const index = carrito.findIndex(producto => producto.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function pagarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    localStorage.removeItem('carrito');
    mostrarCarrito();
    alert('¡Pago realizado con éxito! Gracias por tu compra.');
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    const botonPagar = document.getElementById('boton-pagar');
    if (botonPagar) {
        botonPagar.onclick = pagarCarrito;
    }
});
