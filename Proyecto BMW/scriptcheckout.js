
const appCheckout = document.getElementById("appCheckout");
let autoEnCompra = null;

function crearEstructuraCheckout() {
  const titulo = document.createElement("h1");
  titulo.textContent = "Checkout - Ficha Técnica y Compra";
  appCheckout.appendChild(titulo);

  const secFicha = document.createElement("section");
  secFicha.id = "secFicha";
  appCheckout.appendChild(secFicha);

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

  if (!autoEnCompra) {
    secFicha.innerHTML = "<p>No se encontró el auto en la base local.</p>";
    return;
  }

  const { nombre, division, anio, precio, img, potencia, torque, velMax, transmision, motor } = autoEnCompra;
  const urlImg = img || 'img/default.jpg';

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

  secFicha.innerHTML = fichaHTML;
}

function finalizarCompra() {
  const nombre = document.getElementById("nombreUser").value;
  const email = document.getElementById("emailUser").value;
  const direccion = document.getElementById("direccionUser").value;

  appCheckout.innerHTML = `
    <h2>Compra Realizada</h2>
    <p>Gracias <strong>${nombre}</strong>, compra del auto <strong>${autoEnCompra?.nombre}</strong> registrada.</p>
    <p>Te contactaremos a <strong>${email}</strong> y enviaremos a <strong>${direccion}</strong>.</p>
  `;

  
  localStorage.removeItem("autoSeleccionado");
}

function cargarAutoSeleccionado() {
  const idAuto = localStorage.getItem("autoSeleccionado");
  if (!idAuto) {
    document.getElementById("secFicha").innerHTML = "<p>No se seleccionó ningún auto.</p>";
    return;
  }

  
  fetch('modelos.json')
    .then(r => r.json())
    .then(data => {
      const autos = data.autos;
      autoEnCompra = autos.find(a => a.id === parseInt(idAuto, 10));
      renderizarFichaTecnica();
    })
    .catch(err => {
      console.error("Error al cargar modelos locales en checkout:", err);
      document.getElementById("secFicha").innerHTML = "<p>Error al cargar datos del auto.</p>";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  crearEstructuraCheckout();
  cargarAutoSeleccionado();
});
