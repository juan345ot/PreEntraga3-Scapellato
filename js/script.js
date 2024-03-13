// Definimos la clase Producto
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Definimos la clase TiendaDulces
class TiendaDulces {
    // El constructor se llama cuando creamos una nueva instancia de la clase
    constructor() {
        // Inicializamos los productos y el carrito como arrays vacíos
        this.productos = [
            new Producto(1, "Dulce de leche", 1000),
            new Producto(2, "Alfajor", 500),
            new Producto(3, "Chupetín", 150),
            new Producto(4, "Turrón", 100),
            new Producto(5, "Bon o Bon", 300),
            new Producto(6, "Caramelos Ácidos", 60),
            new Producto(7, "Rocklets", 600),
        ];
        this.carrito = [];
    }

    // Este método muestra los productos en la página
    mostrarProductos() {
        const listaProductos = document.getElementById('lista-productos');
        listaProductos.innerHTML = this.productos.map(producto => `<li class="list-group-item">${producto.id}) ${producto.nombre} - $${producto.precio} <button id="agregar-${producto.id}" class="btn btn-primary float-right">Agregar al carrito</button></li>`).join('');

        // Agregar eventos para los botones "Agregar al carrito"
        this.productos.forEach(producto => {
            const botonAgregar = document.getElementById(`agregar-${producto.id}`);
            botonAgregar.addEventListener('click', () => {
                this.agregarAlCarrito(producto.id);
            });
        });
    }

    // Este método agrega un producto al carrito
    agregarAlCarrito(id) {
        const producto = this.productos.find(producto => producto.id === id);
        const productoEnCarrito = this.carrito.find(item => item.id === id);

        // Si el producto ya está en el carrito, incrementamos su cantidad
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            // Si el producto no está en el carrito, lo agregamos con una cantidad de 1
            this.carrito.push({ ...producto, cantidad: 1 });
        }

        // Actualizamos la vista del carrito
        this.mostrarCarrito();
    }

    // Este método muestra el carrito en la página
    mostrarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = this.carrito.map(item => `<li class="list-group-item">${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad} <button id="remover-${item.id}" class="btn btn-danger float-right">Remover del carrito</button></li>`).join('');

        // Agregar eventos para los botones "Remover del carrito"
        this.carrito.forEach(item => {
            const botonRemover = document.getElementById(`remover-${item.id}`);
            botonRemover.addEventListener('click', () => {
                this.removerDelCarrito(item.id);
            });
        });

        // Calculamos y mostramos el total
        const total = this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
        listaCarrito.innerHTML += `<li class="list-group-item">Total: $${total}</li>`;
    }

    // Este método remueve un producto del carrito
    removerDelCarrito(id) {
        const productoEnCarrito = this.carrito.find(item => item.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad--;
            if (productoEnCarrito.cantidad === 0) {
                // Si la cantidad del producto es 0, lo removemos del carrito
                this.carrito = this.carrito.filter(item => item.id !== id);
            }
        }
        // Actualizamos la vista del carrito
        this.mostrarCarrito();
    }

    // Este método finaliza la compra
    finalizarCompra() {
        if (this.carrito.length > 0) {
            alert("Gracias por tu compra!");
            this.carrito = [];
            this.mostrarCarrito();
        } else {
            alert("Tu carrito está vacío.");
        }
    }
}

// Creamos una nueva instancia de la tienda de dulces
const tienda = new TiendaDulces();

// Mostramos los productos al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    tienda.mostrarProductos();
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        tienda.finalizarCompra();
    });

    document.getElementById('iniciar-sesion').addEventListener('click', () => {
        const username = prompt('Ingresa tu nombre de usuario:');
        const password = prompt('Ingresa tu contraseña:');
        login(username, password);
    });

    document.getElementById('registrarse').addEventListener('click', () => {
        const username = prompt('Elige un nombre de usuario:');
        const password = prompt('Elige una contraseña:');
        register(username, password);
    });
});

// Simulamos una base de datos de usuarios
const users = [
    { username: 'usuario1', password: 'contraseña1' },
    { username: 'usuario2', password: 'contraseña2' },
    // ...
];

// Función para iniciar sesión
function login(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Has iniciado sesión correctamente!');
    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}

// Función para registrarse
function register(username, password) {
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        alert('El nombre de usuario ya existe.');
    } else {
        users.push({ username, password });
        alert('Te has registrado correctamente!');
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('user');
    alert('Has cerrado sesión correctamente!');
}

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    return localStorage.getItem('user') !== null;
}

// Función para obtener el usuario autenticado
function getAuthenticatedUser() {
    return JSON.parse(localStorage.getItem('user'));
}
