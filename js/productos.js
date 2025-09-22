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

const usuarios = [
    {
        rut: '12345678-9',
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        contrasena: 'password123',
        fechaNacimiento: '01-12-2000',
        rol: 'cliente',
        direccion: 'Calle Falsa 123, Ciudad, País'
    },
    {
        rut: '98765432-1',
        nombre: 'María',
        apellido: 'González',
        email: 'maria.gonzalez@example.com',
        contrasena: 'password456',
        fechaNacimiento: '15-05-1995',
        rol: 'admin',
        direccion: 'Avenida Siempre Viva 742, Ciudad, País'
    }
]

function mostrarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = ""; 

    const productosLS = JSON.parse(localStorage.getItem('productos')) || productos;

    productosLS.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-item');

        productoDiv.innerHTML = `
            <a href="detalle-producto.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </a>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;

        productosGrid.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId) {
    const productosLS = JSON.parse(localStorage.getItem('productos')) || [];
    const productoAñadir = productosLS.find(p => p.id === productoId);
    if (!productoAñadir) return;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productoAñadir);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${productoAñadir.nombre} ha sido añadido al carrito.`);
}

document.addEventListener('DOMContentLoaded', mostrarProductos);





function cargarProductosTabla() {
    let productosLS = JSON.parse(localStorage.getItem('productos'));
    if (productosLS === null) {
        localStorage.setItem('productos', JSON.stringify(productos));
        productosLS = [...productos];
    }
    const tbody = document.querySelector('#tabla-productos tbody');
    tbody.innerHTML = "";

    productosLS.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>
                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                <button onclick="editarProducto(${producto.id})">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function agregarProducto() {
    var nombre = document.getElementById('nombreProducto').value;
    var precio = document.getElementById('precioProducto').value;
    var stock = document.getElementById('stockProducto').value;
    var categoria = document.getElementById('categoriaProducto').value;
    var descripcion = document.getElementById('descripcionProducto').value;
    var imagenInput = document.getElementById('imagenProducto');
    var imagenArchivo = imagenInput.files[0];

    if (!nombre || !precio || !stock || !categoria) {
        alert("Todos los campos obligatorios deben estar completos.");
        return false;
    }

    if (imagenArchivo) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imagenBase64 = e.target.result;
            guardarProductoConImagen(imagenBase64);
        };
        reader.readAsDataURL(imagenArchivo);
    } else {
        guardarProductoConImagen(""); // Sin imagen
    }

    return false; // Evita el envío normal del formulario
}

function guardarProductoConImagen(imagenBase64) {
    let productosLS = JSON.parse(localStorage.getItem('productos')) || [];
    var codigo = productosLS.length > 0 ? Math.max(...productosLS.map(p => p.id)) + 1 : 1;
    var nombre = document.getElementById('nombreProducto').value;
    var precio = document.getElementById('precioProducto').value;
    var stock = document.getElementById('stockProducto').value;
    var categoria = document.getElementById('categoriaProducto').value;
    var descripcion = document.getElementById('descripcionProducto').value;

    var nuevoProducto = {
        id: codigo,
        nombre: nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        categoria: categoria,
        imagen: imagenBase64,
        descripcion: descripcion
    };

    productosLS.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosLS));
    alert("Producto agregado exitosamente.");
    cargarProductosTabla();
    document.querySelector('#producto-form form').reset();
}

function eliminarProducto(id) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        cargarProductosTabla();
    }
}


function editarProducto(id) {
    const productosLS = JSON.parse(localStorage.getItem('productos')) || [];
    const index = productosLS.findIndex(p => p.id === id);
    if (index === -1) return;
    const tbody = document.querySelector('#tabla-productos tbody');
    const row = tbody.rows[index];
    const producto = productosLS[index];

    row.cells[0].innerHTML = `<input type="number" value="${producto.id}" id="edit-id">`;
    row.cells[1].innerHTML = `<input type="text" value="${producto.nombre}" id="edit-nombre">`;
    row.cells[2].innerHTML = `<input type="number" value="${producto.precio}" id="edit-precio" min="0">`;
    row.cells[3].innerHTML = `<input type="number" value="${producto.stock}" id="edit-stock" min="0">`;
    row.cells[4].innerHTML = `
        <button onclick="guardarEdicionProductoLS(${index})">Guardar</button>
        <button onclick="cargarProductosTabla()">Cancelar</button>
    `;
}

function guardarEdicionProductoLS(index) {
    const productosLS = JSON.parse(localStorage.getItem('productos')) || [];
    const nuevoId = parseInt(document.getElementById('edit-id').value);
    const nuevoNombre = document.getElementById('edit-nombre').value.trim();
    const nuevoPrecio = parseFloat(document.getElementById('edit-precio').value);
    const nuevoStock = parseInt(document.getElementById('edit-stock').value);

    if (productosLS.some((p, i) => p.id === nuevoId && i !== index)) {
        alert('El ID ya existe en otro producto.');
        return;
    }
    if (!nuevoNombre || isNaN(nuevoPrecio) || isNaN(nuevoStock)) {
        alert('Todos los campos son obligatorios y deben ser válidos.');
        return;
    }

    productosLS[index].id = nuevoId;
    productosLS[index].nombre = nuevoNombre;
    productosLS[index].precio = nuevoPrecio;
    productosLS[index].stock = nuevoStock;

    localStorage.setItem('productos', JSON.stringify(productosLS));
    cargarProductosTabla();
    alert('Producto editado correctamente.');
}

function guardarEdicionProducto(index) {
    const nuevoId = parseInt(document.getElementById('edit-id').value);
    const nuevoNombre = document.getElementById('edit-nombre').value.trim();
    const nuevoPrecio = parseFloat(document.getElementById('edit-precio').value);
    const nuevoStock = parseInt(document.getElementById('edit-stock').value);
    if (productos.some((p, i) => p.id === nuevoId && i !== index)) {
        alert('El ID ya existe en otro producto.');
        return;
    }
    if (!nuevoNombre || isNaN(nuevoPrecio) || isNaN(nuevoStock)) {
        alert('Todos los campos son obligatorios y deben ser válidos.');
        return;
    }
    productos[index].id = nuevoId;
    productos[index].nombre = nuevoNombre;
    productos[index].precio = nuevoPrecio;
    productos[index].stock = nuevoStock;

    localStorage.setItem('productos', JSON.stringify(productos));
    cargarProductosTabla();
    alert('Producto editado correctamente.');
}


function agregarUsuario() {
    var rut = document.getElementById('runUsuario').value.trim();
    var nombre = document.getElementById('nombreUsuario').value.trim();
    var apellido = document.getElementById('apellidoUsuario').value.trim();
    var email = document.getElementById('correoUsuario').value.trim();
    var fechaNacimiento = document.getElementById('fechaNacimientoUsuario').value.trim();
    var tipoUsuario = document.getElementById('tipoUsuario').value.trim();
    var direccion = document.getElementById('direccionUsuario').value.trim();

    if (!rut || !nombre || !apellido || !email || !tipoUsuario || !direccion) {
        alert("Todos los campos obligatorios deben estar completos.");
        return false;
    }

    let usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || [...usuarios];

    if (usuariosLS.some(u => u.rut === rut)) {
        alert("El RUT ya está registrado.");
        return false;
    }

    if (usuariosLS.some(u => u.email === email)) {
        alert("El correo electrónico ya está registrado.");
        return false;
    }

    var nuevoUsuario = {
        rut: rut,
        nombre: nombre,
        apellido: apellido,
        email: email,
        fechaNacimiento: fechaNacimiento,
        rol: tipoUsuario,
        direccion: direccion
    };

    usuariosLS.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosLS));
    alert("Usuario agregado exitosamente.");
    cargarUsuariosTabla();

    document.querySelector('#usuario-form form').reset();
    return false; 
}

function eliminarUsuario(rut) {
    let usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || [...usuarios];
    const index = usuariosLS.findIndex(u => u.rut === rut);
    if (index !== -1) {
        usuariosLS.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuariosLS));
        cargarUsuariosTabla();
    }
}

function editarUsuario(rut) {
    let usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || [...usuarios];
    const index = usuariosLS.findIndex(u => u.rut === rut);
    if (index === -1) return;
    const tbody = document.querySelector('#tabla-usuarios tbody');
    const row = tbody.rows[index];
    const usuario = usuariosLS[index];

    row.cells[0].innerHTML = `<input type="text" value="${usuario.rut}" id="edit-rut">`;
    row.cells[1].innerHTML = `<input type="text" value="${usuario.nombre}" id="edit-nombre">`;
    row.cells[2].innerHTML = `<input type="text" value="${usuario.apellido}" id="edit-apellido">`;
    row.cells[3].innerHTML = `<input type="email" value="${usuario.email}" id="edit-email">`;
    row.cells[4].innerHTML = `<select id="edit-rol">
        <option value="administrador" ${usuario.rol === "administrador" ? "selected" : ""}>Administrador</option>
        <option value="vendedor" ${usuario.rol === "vendedor" ? "selected" : ""}>Vendedor</option>
        <option value="cliente" ${usuario.rol === "cliente" ? "selected" : ""}>Cliente</option>
    </select>`;
    row.cells[5].innerHTML = `
        <button onclick="guardarEdicionUsuarioLS(${index})">Guardar</button>
        <button onclick="cargarUsuariosTabla()">Cancelar</button>
    `;
}

function guardarEdicionUsuarioLS(index) {
    let usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || [...usuarios];
    const nuevoRut = document.getElementById('edit-rut').value.trim();
    const nuevoNombre = document.getElementById('edit-nombre').value.trim();
    const nuevoApellido = document.getElementById('edit-apellido').value.trim();
    const nuevoEmail = document.getElementById('edit-email').value.trim();
    const nuevoRol = document.getElementById('edit-rol').value;

    if (usuariosLS.some((u, i) => u.rut === nuevoRut && i !== index)) {
        alert('El RUT ya existe en otro usuario.');
        return;
    }
    if (!nuevoRut || !nuevoNombre || !nuevoApellido || !nuevoEmail || !nuevoRol) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    usuariosLS[index].rut = nuevoRut;
    usuariosLS[index].nombre = nuevoNombre;
    usuariosLS[index].apellido = nuevoApellido;
    usuariosLS[index].email = nuevoEmail;
    usuariosLS[index].rol = nuevoRol;

    localStorage.setItem('usuarios', JSON.stringify(usuariosLS));
    cargarUsuariosTabla();
    alert('Usuario editado correctamente.');
}

function cargarUsuariosTabla() {
    let usuariosLS = JSON.parse(localStorage.getItem('usuarios'));
    if (usuariosLS === null) {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        usuariosLS = [...usuarios];
    }
    const tbody = document.querySelector('#tabla-usuarios tbody');
    tbody.innerHTML = "";

    usuariosLS.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.rut}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.email}</td>
            <td>${usuario.rol}</td>
            <td>
                <button onclick="eliminarUsuario('${usuario.rut}')">Eliminar</button>
                <button onclick="editarUsuario('${usuario.rut}')">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}
document.addEventListener('DOMContentLoaded', cargarUsuariosTabla);
document.addEventListener('DOMContentLoaded', cargarProductosTabla);