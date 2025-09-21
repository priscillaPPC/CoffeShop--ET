// Variable para saber si estamos editando un producto o un usuario
let indiceProductoEditar = -1;
let indiceUsuarioEditar = -1;

// Patrón de email único para todas las validaciones
const emailPattern = /^[^\s@]+@(?:duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;



// Valida el formulario de inicio de sesión
function validarLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    let hasError = false;
    emailError.innerText = '';
    passwordError.innerText = '';
    if (!email) {
        emailError.innerText = 'El correo electrónico es requerido.';
        hasError = true;
    } else {
        if (!emailPattern.test(email)) {
            emailError.innerText = 'Por favor, ingrese un correo válido de @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            hasError = true;
        }
    }
    if (!password) {
        passwordError.innerText = 'La contraseña es requerida.';
        hasError = true;
    } else if (password.length < 4 || password.length > 10) {
        passwordError.innerText = 'La contraseña debe tener entre 4 y 10 caracteres.';
        hasError = true;
    }
    if (hasError) {
        return false;
    } else {
        alert('Inicio de sesión exitoso. ¡Bienvenido!');
        return true;
    }
}

// Valida el formulario de registro de usuario y guarda los datos
function validarRegistro() {
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const repetirCorreo = document.getElementById('repetirCorreo').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const nombreError = document.getElementById('nombre-error');
    const correoError = document.getElementById('correo-error');
    const repetirCorreoError = document.getElementById('repetir-correo-error');
    const contrasenaError = document.getElementById('contrasena-error');
    const confirmarContrasenaError = document.getElementById('confirmar-contrasena-error');
    const regionError = document.getElementById('region-error');
    const comunaError = document.getElementById('comuna-error');
    let hasError = false;
    nombreError.innerText = '';
    correoError.innerText = '';
    repetirCorreoError.innerText = '';
    contrasenaError.innerText = '';
    confirmarContrasenaError.innerText = '';
    regionError.innerText = '';
    comunaError.innerText = '';
    if (!nombreCompleto) {
        nombreError.innerText = 'El nombre completo es requerido.';
        hasError = true;
    }
    if (!correo || !emailPattern.test(correo)) {
        correoError.innerText = 'Por favor, ingrese un correo válido.';
        hasError = true;
    } else if (correo !== repetirCorreo) {
        repetirCorreoError.innerText = 'Los correos no coinciden.';
        hasError = true;
    }
    if (!contrasena) {
        contrasenaError.innerText = 'La contraseña es requerida.';
        hasError = true;
    } else if (contrasena.length < 4) {
        contrasenaError.innerText = 'La contraseña debe tener al menos 4 caracteres.';
        hasError = true;
    }
    if (contrasena !== confirmarContrasena) {
        confirmarContrasenaError.innerText = 'Las contraseñas no coinciden.';
        hasError = true;
    }
    if (!region) {
        regionError.innerText = 'Por favor, seleccione una región.';
        hasError = true;
    }
    if (!comuna) {
        comunaError.innerText = 'Por favor, seleccione una comuna.';
        hasError = true;
    }
    if (!hasError) {
        const usuario = {
            nombre: nombreCompleto,
            correo: correo,
            contrasena: contrasena,
            telefono: document.getElementById('telefono').value,
            region: region,
            comuna: comuna
        };
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        return true;
    } else {
        return false;
    }
}

// Valida el formulario de contacto
function validarContacto() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const comentario = document.getElementById('comentario').value.trim();
    const nombreError = document.getElementById('nombre-error');
    const correoError = document.getElementById('correo-error');
    const comentarioError = document.getElementById('comentario-error');
    let hasError = false;
    nombreError.innerText = '';
    correoError.innerText = '';
    comentarioError.innerText = '';
    if (!nombre) {
        nombreError.innerText = 'El nombre es requerido.';
        hasError = true;
    } else if (nombre.length > 100) {
        nombreError.innerText = 'El nombre no debe exceder los 100 caracteres.';
        hasError = true;
    }
    const emailPattern = /^[^\s@]+@(?:duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!correo) {
        correoError.innerText = 'El correo es requerido.';
        hasError = true;
    } else if (correo.length > 100) {
        correoError.innerText = 'El correo no debe exceder los 100 caracteres.';
        hasError = true;
    } else if (!emailPattern.test(correo)) {
        correoError.innerText = 'Por favor, ingrese un correo válido de @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        hasError = true;
    }
    if (!comentario) {
        comentarioError.innerText = 'El comentario es requerido.';
        hasError = true;
    } else if (comentario.length > 500) {
        comentarioError.innerText = 'El comentario no debe exceder los 500 caracteres.';
        hasError = true;
    }
    if (!hasError) {
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        return true;
    } else {
        return false;
    }
}

// Valida el formulario de nuevo producto y lo guarda
function validarProducto() {
    const codigo = document.getElementById('codigoProducto').value.trim();
    const nombre = document.getElementById('nombreProducto').value.trim();
    const precio = document.getElementById('precioProducto').value;
    const stock = document.getElementById('stockProducto').value;
    const categoria = document.getElementById('categoriaProducto').value;
    const codigoError = document.getElementById('codigo-error');
    const nombreError = document.getElementById('nombre-producto-error');
    const precioError = document.getElementById('precio-error');
    const stockError = document.getElementById('stock-error');
    const categoriaError = document.getElementById('categoria-error');
    let hasError = false;
    codigoError.innerText = '';
    nombreError.innerText = '';
    precioError.innerText = '';
    stockError.innerText = '';
    categoriaError.innerText = '';
    if (!codigo) {
        codigoError.innerText = 'El código del producto es requerido.';
        hasError = true;
    }
    if (!nombre) {
        nombreError.innerText = 'El nombre del producto es requerido.';
        hasError = true;
    } else if (nombre.length > 100) {
        nombreError.innerText = 'El nombre no debe exceder los 100 caracteres.';
        hasError = true;
    }
    if (precio === '' || isNaN(precio) || precio < 0) {
        precioError.innerText = 'El precio es requerido y debe ser un número mayor o igual a 0.';
        hasError = true;
    }
    if (stock === '' || isNaN(stock) || stock < 0 || !Number.isInteger(parseFloat(stock))) {
        stockError.innerText = 'El stock es requerido y debe ser un número entero mayor o igual a 0.';
        hasError = true;
    }
    if (!categoria) {
        categoriaError.innerText = 'Debe seleccionar una categoría.';
        hasError = true;
    }
    if (!hasError) {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        const producto = {
            codigo: codigo,
            nombre: nombre,
            descripcion: document.getElementById('descripcionProducto').value,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria: categoria,
            imagen: document.getElementById('imagenProducto').value
        };
        if (indiceProductoEditar !== -1) {
            productos[indiceProductoEditar] = producto;
            alert('Producto actualizado con éxito.');
            indiceProductoEditar = -1;
        } else {
            productos.push(producto);
            alert('Producto creado con éxito.');
        }
        localStorage.setItem('productos', JSON.stringify(productos));
        return true;
    } else {
        return false;
    }
}

// Valida el formulario de nuevo usuario (admin) y lo guarda
function validarUsuarioAdmin() {
    const run = document.getElementById('runUsuario').value.trim();
    const nombre = document.getElementById('nombreUsuario').value.trim();
    const apellido = document.getElementById('apellidoUsuario').value.trim();
    const correo = document.getElementById('correoUsuario').value.trim();
    const direccion = document.getElementById('direccionUsuario').value.trim();
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const runError = document.getElementById('run-error');
    const nombreError = document.getElementById('nombre-usuario-error');
    const apellidoError = document.getElementById('apellido-usuario-error');
    const correoError = document.getElementById('correo-usuario-error');
    const direccionError = document.getElementById('direccion-error');
    const tipoUsuarioError = document.getElementById('tipo-usuario-error');
    let hasError = false;
    runError.innerText = '';
    nombreError.innerText = '';
    apellidoError.innerText = '';
    correoError.innerText = '';
    direccionError.innerText = '';
    tipoUsuarioError.innerText = '';
    if (!run) {
        runError.innerText = 'El RUT es requerido.';
        hasError = true;
    } else if (!/^[0-9]+[0-9K]$/i.test(run) || run.length < 7 || run.length > 9) {
        runError.innerText = 'Formato de RUT no válido. Ej: 19011022K';
        hasError = true;
    }
    if (!nombre) {
        nombreError.innerText = 'El nombre es requerido.';
        hasError = true;
    } else if (nombre.length > 50) {
        nombreError.innerText = 'El nombre no debe exceder los 50 caracteres.';
        hasError = true;
    }
    if (!apellido) {
        apellidoError.innerText = 'El apellido es requerido.';
        hasError = true;
    } else if (apellido.length > 100) {
        apellidoError.innerText = 'El apellido no debe exceder los 100 caracteres.';
        hasError = true;
    }
    if (!correo) {
        correoError.innerText = 'El correo es requerido.';
        hasError = true;
    } else if (correo.length > 100) {
        correoError.innerText = 'El correo no debe exceder los 100 caracteres.';
        hasError = true;
    } else if (!emailPattern.test(correo)) {
        correoError.innerText = 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        hasError = true;
    }
    if (!direccion) {
        direccionError.innerText = 'La dirección es requerida.';
        hasError = true;
    } else if (direccion.length > 300) {
        direccionError.innerText = 'La dirección no debe exceder los 300 caracteres.';
        hasError = true;
    }
    if (!tipoUsuario) {
        tipoUsuarioError.innerText = 'Debe seleccionar un tipo de usuario.';
        hasError = true;
    }
    if (!hasError) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = {
            run: run,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            fechaNacimiento: document.getElementById('fechaNacimientoUsuario').value,
            tipoUsuario: tipoUsuario,
            direccion: direccion
        };
        if (indiceUsuarioEditar !== -1) {
            usuarios[indiceUsuarioEditar] = usuario;
            alert('Usuario actualizado con éxito.');
            indiceUsuarioEditar = -1;
        } else {
            usuarios.push(usuario);
            alert('Usuario creado con éxito.');
        }
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return true;
    } else {
        return false;
    }
}

// Carga los usuarios en la tabla del panel de administración
function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tableBody = document.getElementById('usuarios-table').querySelector('tbody');
    tableBody.innerHTML = '';
    if (usuarios.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.innerText = 'No hay usuarios registrados.';
        return;
    }
    usuarios.forEach((usuario, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = usuario.nombre;
        row.insertCell(1).innerText = usuario.apellido;
        row.insertCell(2).innerText = usuario.correo;
        row.insertCell(3).innerText = usuario.tipoUsuario;
        const accionesCell = row.insertCell(4);
        accionesCell.innerHTML = `
            <button onclick="editarUsuario(${index})">Editar</button>
            <button onclick="eliminarUsuario(${index})">Eliminar</button>
        `;
    });
}

// Carga los productos en la tabla del panel de administración
function cargarProductosAdmin() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const tableBody = document.getElementById('productos-table').querySelector('tbody');
    tableBody.innerHTML = '';
    if (productos.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.innerText = 'No hay productos registrados.';
        return;
    }
    productos.forEach((producto, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = producto.codigo;
        row.insertCell(1).innerText = producto.nombre;
        row.insertCell(2).innerText = `$${producto.precio}`;
        row.insertCell(3).innerText = producto.stock;
        const accionesCell = row.insertCell(4);
        accionesCell.innerHTML = `
            <button onclick="editarProducto(${index})">Editar</button>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
    });
}

// Elimina un usuario del localStorage
function eliminarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (confirm(`¿Estás seguro de que quieres eliminar a ${usuarios[index].nombre}?`)) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        cargarUsuarios();
        alert('Usuario eliminado correctamente.');
    }
}

// Elimina un producto del localStorage
function eliminarProducto(index) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    if (confirm(`¿Estás seguro de que quieres eliminar el producto ${productos[index].nombre}?`)) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        cargarProductosAdmin();
        alert('Producto eliminado correctamente.');
    }
}

// Carga los datos de un producto en el formulario para editar
function editarProducto(index) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const producto = productos[index];
    if (producto) {
        document.getElementById('codigoProducto').value = producto.codigo;
        document.getElementById('nombreProducto').value = producto.nombre;
        document.getElementById('descripcionProducto').value = producto.descripcion;
        document.getElementById('precioProducto').value = producto.precio;
        document.getElementById('stockProducto').value = producto.stock;
        document.getElementById('categoriaProducto').value = producto.categoria;
        document.getElementById('producto-form').style.display = 'block';
        document.getElementById('usuario-form').style.display = 'none';
        document.getElementById('lista-productos-container').style.display = 'none';
        indiceProductoEditar = index;
        document.querySelector('#producto-form button').innerText = 'Guardar Cambios';
    }
}

// Carga los datos de un usuario en el formulario para editar
function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];
    if (usuario) {
        document.getElementById('runUsuario').value = usuario.run;
        document.getElementById('nombreUsuario').value = usuario.nombre;
        document.getElementById('apellidoUsuario').value = usuario.apellido;
        document.getElementById('correoUsuario').value = usuario.correo;
        document.getElementById('fechaNacimientoUsuario').value = usuario.fechaNacimiento;
        document.getElementById('tipoUsuario').value = usuario.tipoUsuario;
        document.getElementById('direccionUsuario').value = usuario.direccion;
        document.getElementById('usuario-form').style.display = 'block';
        document.getElementById('producto-form').style.display = 'none';
        document.getElementById('lista-usuarios-container').style.display = 'none';
        indiceUsuarioEditar = index;
        document.querySelector('#usuario-form button').innerText = 'Guardar Cambios';
    }
}

// Ejecuta la función al cargar la página
