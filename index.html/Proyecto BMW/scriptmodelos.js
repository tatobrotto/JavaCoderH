/******************************************************
 * scriptModelos.js
 ******************************************************/

const appModelos = document.getElementById("appModelos");

// Arreglo global de autos (cargados desde JSON)
let autos = [];

// 1. Estructura base
function crearEstructuraBase() {
  // Título
  const titulo = document.createElement("h1");
  titulo.textContent = "Catálogo de BMW (M, CSL, Alpina)";
  appModelos.appendChild(titulo);

  // Descripción
  const desc = document.createElement("p");
  desc.textContent = "Selecciona un auto para ver su ficha técnica y completar la compra. O ingresa un presupuesto para ver qué modelos puedes costear.";
  appModelos.appendChild(desc);

  // Formu de presupuesto
  const presupuestoDiv = document.createElement("div");
  presupuestoDiv.id = "presupuestoDiv";
  presupuestoDiv.innerHTML = `
    <label for="inputPresupuesto">Presupuesto: </label>
    <input type="number" id="inputPresupuesto" min="0" />
    <button id="btnFiltrarPresupuesto">Filtrar por Presupuesto</button>
  `;
  appModelos.appendChild(presupuestoDiv);

  // Contenedor donde se listarán los autos
  const contenedorAutos = document.createElement("section");
  contenedorAutos.id = "contenedorAutos";
  contenedorAutos.className = "grid";
  appModelos.appendChild(contenedorAutos);

  // Mensaje de error / info
  const msgError = document.createElement("div");
  msgError.id = "msgError";
  appModelos.appendChild(msgError);

  // Evento del botón "Filtrar Presupuesto"
  document.getElementById("btnFiltrarPresupuesto").addEventListener("click", () => {
    filtrarPorPresupuesto();
  });
}

// 2. Cargar autos (como siempre)
function cargarModelos() {
  fetch("modelos.json")
    .then(res => res.json())
    .then(data => {
      autos = data.autos || []; // guarda en la variable global
      autos.length > 0 
        ? renderizarAutos(autos)
        : document.getElementById("msgError").textContent = "No se encontraron autos en el JSON.";
    })
    .catch(error => {
      document.getElementById("msgError").textContent = "Error al cargar los modelos.";
      console.error(error);
    });
}

// 3. Renderizar autos
function renderizarAutos(arrayAutos) {
  const contenedorAutos = document.getElementById("contenedorAutos");
  contenedorAutos.innerHTML = "";

  arrayAutos.forEach(auto => {
    const { id, nombre, division, anio, precio, img } = auto;
    const card = document.createElement("div");
    card.className = "card";

    const urlImg = img || "img/default.jpg";
    card.innerHTML = `
      <h3>${nombre} (${division})</h3>
      <img src="${urlImg}" alt="${nombre}" />
      <p>Año: ${anio}</p>
      <p>Precio: $${precio}</p>
    `;

    // Botón "Ver / Comprar"
    const btnVer = document.createElement("button");
    btnVer.textContent = "Ver / Comprar";
    btnVer.addEventListener("click", () => {
      localStorage.setItem("autoSeleccionado", id);
      window.location.href = "checkout.html";
    });

    card.appendChild(btnVer);
    contenedorAutos.appendChild(card);
  });
}

// 4. Función filtrar por presupuesto
function filtrarPorPresupuesto() {
  const inputPresupuesto = document.getElementById("inputPresupuesto");
  const valor = parseFloat(inputPresupuesto.value);

  // Si el usuario no ingresa nada o ingresa un valor no válido,
  if (isNaN(valor) || valor < 0) {
    document.getElementById("msgError").textContent = "Ingrese un presupuesto válido.";
    return;
  } else {
    document.getElementById("msgError").textContent = "";
  }

  // Filtrar
  const autosFiltrados = autos.filter(auto => auto.precio <= valor);

  // Renderizar
  autosFiltrados.length > 0 
    ? renderizarAutos(autosFiltrados) 
    : document.getElementById("msgError").textContent = "Ningún modelo disponible con ese presupuesto.";
}

// Inicializar
crearEstructuraBase();
cargarModelos();
