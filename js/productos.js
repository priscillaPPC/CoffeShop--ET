const productos = [
    {
        id: 1,
        nombre: 'Café de la casa',
        precio: 2500,
        imagen: 'imagenes/coffe1.png',
        descripcion: 'Un clásico de nuestra cafetería, con un sabor inigualable.'
    },
    {
        id: 2,
        nombre: 'Pastel de fresa',
        precio: 4500,
        imagen: 'imagenes/cake1.png',
        descripcion: 'Delicioso pastel de vainilla con capas de crema y fresas frescas.'
    },
    {
        id: 3,
        nombre: 'Helado de pistacho',
        precio: 3800,
        imagen: 'imagenes/ice1.png',
        descripcion: 'Helado cremoso de pistacho con trozos crujientes.'
    }
];

function mostrarProductos() {
    const productosGrid = document.getElementById('productos-grid');

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-item');

        productoDiv.innerHTML = `
            <a href="detalle-producto.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
            </a>
            <p>$${producto.precio}</p>
            <p>${producto.descripcion}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        
        productosGrid.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId) {
    const productoAñadir = productos.find(p => p.id === productoId);
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productoAñadir);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`${productoAñadir.nombre} ha sido añadido al carrito.`);
    console.log(carrito);
}

document.addEventListener('DOMContentLoaded', mostrarProductos);