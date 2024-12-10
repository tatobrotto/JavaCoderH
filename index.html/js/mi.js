// Constante del IVA
const IVA = 1.21;

// Función para calcular el precio con IVA
function calcularPrecioConIVA(precio) {
    if (precio <= 0 || isNaN(precio)) {
        alert("El precio ingresado no es válido. Intenta de nuevo.");
        return null; // Detener si el precio es inválido
    }

    let precioFinal = precio * IVA;
    return precioFinal.toFixed(2); // Redondea a 2 decimales
}

// Función principal para el simulador
function iniciarSimulador() {
    alert("¡Bienvenido al Simulador de Precio Final con IVA!");

    let continuar = true; // Variable para controlar el ciclo

    while (continuar) {
        // Pedir precio del producto
        let precio = parseFloat(prompt("Ingresa el precio del producto:"));

        // Llamar a la función para calcular el precio con IVA
        let precioConIVA = calcularPrecioConIVA(precio);

        // Si el cálculo es válido, mostrar el resultado
        if (precioConIVA !== null) {
            alert(`El precio original es: $${precio.toFixed(2)}\nEl precio final con IVA es: $${precioConIVA}`);
        }

        // Preguntar al usuario si quiere calcular otro producto
        continuar = confirm("¿Quieres calcular otro producto?");
    }

    alert("Gracias por usar el simulador. ¡Hasta la próxima!");
}

// Llamar a la función principal para iniciar el simulador
iniciarSimulador();
