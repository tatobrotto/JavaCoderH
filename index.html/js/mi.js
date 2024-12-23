// Productos disponibles
const productos = [
    { id: 1, nombre: "Cuadro F1", precio: 12000, stock: 10 },
    { id: 2, nombre: "Cuadro Rally", precio: 15000, stock: 5 },
    { id: 3, nombre: "Cuadro Nascar", precio: 10000, stock: 7 },
    { id: 4, nombre: "Cuadro Ayrton Senna", precio: 20000, stock: 3 },
    { id: 5, nombre: "Cuadro Michael Schumacher", precio: 25000, stock: 4 },
    { id: 6, nombre: "Cuadro Le Mans", precio: 18000, stock: 6 },
];

// Carrito de compras
let carrito = [];

// Función para mostrar productos disponibles
function mostrarProductos() {
    let catalogo = "=== Productos disponibles ===\n";
    productos.forEach(prod => {
        catalogo += `ID: ${prod.id} - Producto: ${prod.nombre} - Precio: $${prod.precio} - Stock: ${prod.stock}\n`;
    });
    catalogo += "=============================";
    alert(catalogo);
}

// Función para ver el carrito
function verCarrito() {
    if (carrito.length > 0) {
        let detalleCarrito = "=== Productos en el carrito ===\n";
        carrito.forEach((item, index) => {
            detalleCarrito += `${index + 1}. ${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.precio * item.cantidad}\n`;
        });
        alert(detalleCarrito);
    } else {
        alert("El carrito está vacío.");
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
    const idProducto = parseInt(prompt(
        "Ingrese el ID del producto que desea comprar:\n" +
        productos.map(prod => `ID ${prod.id}: ${prod.nombre} ($${prod.precio})`).join("\n")
    ));

    const producto = productos.find(prod => prod.id === idProducto);

    if (producto) {
        const cantidad = parseInt(prompt(`¿Cuántas unidades de "${producto.nombre}" desea comprar?`));
        if (cantidad <= producto.stock) {
            carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad });
            producto.stock -= cantidad;
            alert(`Producto "${producto.nombre}" agregado al carrito.`);
        } else {
            alert(`Lo sentimos, no tenemos suficiente stock. Stock disponible: ${producto.stock}`);
        }
    } else {
        alert("Producto no encontrado. Intente nuevamente.");
    }
}

// Función para calcular el total de la compra
function calcularTotal() {
    if (carrito.length > 0) {
        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        alert(`El total de su compra es: $${total}`);
    } else {
        alert("El carrito está vacío. No hay nada para calcular.");
    }
}

// Función para ejecutar el simulador
function iniciarSimulador() {
    let continuar = true;
    while (continuar) {
        const opcion = prompt(
            "Seleccione una opción:\n" +
            "1: Ver productos disponibles\n" +
            "2: Agregar producto al carrito\n" +
            "3: Ver productos en el carrito\n" +
            "4: Ver total de la compra\n" +
            "5: Salir"
        );

        switch (opcion) {
            case "1":
                mostrarProductos();
                break;
            case "2":
                agregarAlCarrito();
                break;
            case "3":
                verCarrito();
                break;
            case "4":
                calcularTotal();
                break;
            case "5":
                alert("Gracias por visitar Percipius. ¡Hasta la próxima!");
                continuar = false;
                break;
            default:
                alert("Opción no válida. Intente nuevamente.");
        }
    }
}

// Iniciar simulador
iniciarSimulador();
