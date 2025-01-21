/******************************************************
 * scriptCheckout.js
 * - Lee "autoSeleccionado" de localStorage (id)
 * - Carga modelos.json, encuentra ese auto
 * - Muestra ficha técnica (con los nuevos campos)
 * - Form para datos usuario
 ******************************************************/

const appCheckout = document.getElementById("appCheckout");
let autoEnCompra = null;

function crearEstructuraCheckout() {
  const titulo = document.createElement("h1");
  titulo.textContent = "Checkout - Ficha Técnica y Compra";
  appCheckout.appendChild(titulo);

  // Sección ficha técnica
  const secFicha = document.createElement("section");
  secFicha.id = "secFicha";
  appCheckout.appendChild(secFicha);

  // Formulario compra
  const formCompra = document.createElement("form");
  formCompra.id = "formCompra";
  formCompra.innerHTML = `
    <h2>Tus Datos</h2>
    <label>Nombre:</label>
    <input type="text" id="nombreUser" required />

    <label>Email:</label>
    <input type="email" id="emailUser" required />

    <label>Dirección:</label>
    <input type="text" id="direccionUser" required />

    <button type="submit">Finalizar Compra</button>
  `;
  appCheckout.appendChild(formCompra);

  formCompra.addEventListener("submit", (e) => {
    e.preventDefault();
    finalizarCompra();
  });
}

function renderizarFichaTecnica() {
  const secFicha = document.getElementById("secFicha");
  secFicha.innerHTML = "";

  // Operador ternario para chequear si autoEnCompra existe
  autoEnCompra 
    ? mostrarDatosAuto(secFicha) 
    : secFicha.innerHTML = "<p>No se encontró el auto en la base de datos.</p>";
}

function mostrarDatosAuto(contenedor) {
  const {
    nombre, division, anio, precio, img,
    potencia, torque, velMax, transmision, motor
  } = autoEnCompra;

  const urlImg = img || "img/default.jpg";

  const fichaHTML = `
    <h2>Ficha Técnica</h2>
    <h3>${nombre} (${division})</h3>
    <img src="${urlImg}" alt="${nombre}" style="max-width:300px;" />
    <p><strong>Año:</strong> ${anio}</p>
    <p><strong>Precio:</strong> $${precio}</p>
    <p><strong>Potencia:</strong> ${potencia} CV</p>
    <p><strong>Torque:</strong> ${torque} Nm</p>
    <p><strong>Vel. Máx:</strong> ${velMax} km/h</p>
    <p><strong>Transmisión:</strong> ${transmision}</p>
    <p><strong>Motor:</strong> ${motor}</p>
  `;
  contenedor.innerHTML = fichaHTML;
}

function finalizarCompra() {
  const nombre = document.getElementById("nombreUser").value;
  const email = document.getElementById("emailUser").value;
  const direccion = document.getElementById("direccionUser").value;

  appCheckout.innerHTML = `
    <h2>Confirmacion Realizada</h2>
    <p>Gracias <strong>${nombre}</strong>, hemos registrado la confirmacion de tu compra del auto <strong>${autoEnCompra?.nombre}</strong>.</p>
    <p>Te contactaremos a <strong>${email}</strong> y enviaremos como proseguir a <strong>${direccion}</strong>.</p>
  `;

  // Limpiar localStorage
  localStorage.removeItem("autoSeleccionado");
}

function cargarAutoSeleccionado() {
  const idAuto = localStorage.getItem("autoSeleccionado");
  if (!idAuto) {
    document.getElementById("secFicha").innerHTML = "<p>No se ha seleccionado ningún auto.</p>";
    return;
  }

  fetch("modelos.json")
    .then((res) => res.json())
    .then((data) => {
      const { autos } = data;
      autoEnCompra = autos.find(a => a.id === parseInt(idAuto, 10));
      renderizarFichaTecnica();
    })
    .catch((err) => {
      document.getElementById("secFicha").innerHTML = "<p>Error al cargar datos del auto.</p>";
      console.warn("Error fetch:", err);
    });
}

// Inicializamos
crearEstructuraCheckout();
cargarAutoSeleccionado();
