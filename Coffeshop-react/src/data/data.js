export const productosIniciales = [
    { id: 1, nombre: 'Café de la casa', precio: 2500, stock: 10, categoria: 'Cafés', imagen: 'coffe1.png', descripcion: 'Un clásico tostado oscuro.' },
    { id: 2, nombre: 'Pastel de fresa', precio: 4500, stock: 5, categoria: 'Pasteles', imagen: 'cake1.png', descripcion: 'Pastel de vainilla con fresas frescas.' },
    { id: 3, nombre: 'Helado de pistacho', precio: 3800, stock: 8, categoria: 'Helados', imagen: 'ice1.png', descripcion: 'Helado cremoso de pistacho.' },
    { id: 4, nombre: 'Grano Guatemala', precio: 8000, stock: 20, categoria: 'Granos', imagen: 'grano1.png', descripcion: 'Tostado rubio, notas florales.' }
];

export const usuariosIniciales = [
    { rut: '20453639-2', nombre: 'Priscilla', apellido: 'Pereira', email: 'pri.pereira@duocuc.cl', rol: 'administrador', direccion: 'Río aconcagua, 939' },
    { rut: '98765432-1', nombre: 'Gabriel', apellido: 'Palma', email: 'gabriel.palma@gmail.com', rol: 'vendedor', direccion: 'Río aconcagua, 938' }
];

// Regiones y Comunas 
export const regionesComunas = {
    "arica-y-parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "tarapaca": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Toconao", "María Elena"],
    "atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "valparaiso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llay-Llay", "Panquehue", "Putaendo", "Santa María", "Limache", "Olmué", "Quilpué", "Villa Alemana"],
    "metropolitana-de-santiago": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "libertador-general-bernardo-o-higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchigüe", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "nuble": ["Chillán", "Chillán Viejo", "Coihueco", "El Carmen", "Pinto", "Pemuco", "San Ignacio", "Yungay", "Quillón", "Bulnes", "San Carlos", "Coihueco", "Ninhue", "Ñiquén", "San Fabián", "San Nicolás"],
    "biobio": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Bío Bío", "Mulchén"],
    "la-araucania": ["Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "los-rios": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "los-lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"],
    "aisen-del-general-carlos-ibanez-del-campo": ["Coihaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "magallanes-y-de-la-antartica-chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Puerto Natales", "Torres del Paine"]
};


//productos del localStorage 
export const getProductsLS = () => {
    return JSON.parse(localStorage.getItem('productos')) || productosIniciales;
};

//Añade un producto al carrito en localStorage
export const addToCartLS = (product) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(product);
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

export const getUsersLS = () => {
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
        return usuariosIniciales; 
    }
    return JSON.parse(localStorage.getItem('usuarios')) || [];
};


export const initializeData = () => {
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
    }
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', JSON.stringify([]));
    }
};