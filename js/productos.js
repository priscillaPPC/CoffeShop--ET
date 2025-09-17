const productos = [
    {
        id: 1,
        nombre: 'Café de la casa',
        precio: 2500,
        stock: 10,
        categoria: 'cafes',
        imagen: 'imagenes/coffe1.png',
        descripcion: 'Un clásico de nuestra cafetería, con un sabor inigualable.'
    },
    {
        id: 2,
        nombre: 'Pastel de fresa',
        precio: 4500,
        stock: 5,
        categoria: 'pasteles',
        imagen: 'imagenes/cake1.png',
        descripcion: 'Delicioso pastel de vainilla con capas de crema y fresas frescas.'
    },
    {
        id: 3,
        nombre: 'Helado de pistacho',
        precio: 3800,
        stock: 8,
        categoria: 'helados',
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

function cargarProductosTabla() {
    const tbody = document.querySelector('#tabla-productos tbody');
    tbody.innerHTML = ""; 

    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button> <button onclick="editarProducto(${producto.id})">Editar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

function eliminarProducto(id) {
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productos.splice(index, 1);
        cargarProductosTabla();
    }
}


function agregarProducto() {
    var codigo = productos.length + 1;
    var nombre = document.getElementById('nombreProducto').value;
    var precio = document.getElementById('precioProducto').value;
    var stock = document.getElementById('stockProducto').value;
    var categoria = document.getElementById('categoriaProducto').value;
    var imagen = document.getElementById('imagenProducto').value;
    var descripcion = document.getElementById('descripcionProducto').value;

    var nuevoProducto = {
        id: codigo,
        nombre: nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        categoria: categoria,
        imagen: imagen,
        descripcion: descripcion
    };

    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    alert("Producto agregado exitosamente.");
    cargarProductosTabla();
    document.getElementById('producto-form').reset();
}

document.addEventListener('DOMContentLoaded', cargarProductosTabla);