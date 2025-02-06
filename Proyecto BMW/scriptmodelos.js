

const appModelos = document.getElementById("appModelos");
const API_KEY = "c9188d620f890d6e2a6b47d0";


let autos = [];


let conversionRates = null;


function crearEstructuraBase() {
  
  const titulo = document.createElement("h1");
  titulo.textContent = "Catálogo de BMW (M, CSL, Alpina)";
  appModelos.appendChild(titulo);

  
  const desc = document.createElement("p");
  desc.textContent = "Selecciona un auto para ver su ficha y comprar. También elige la moneda deseada:";
  appModelos.appendChild(desc);

  
  const divMoneda = document.createElement("div");
  divMoneda.innerHTML = `
    <label for="selectMoneda">Moneda:</label>
    <select id="selectMoneda">
      <option value="USD">USD</option>
      <option value="MXN">MXN</option>
      <option value="ARS">ARS</option>
      <option value="CLP">CLP</option>
      <option value="BRL">BRL</option>
    </select>
  `;
  appModelos.appendChild(divMoneda);

  
  const contenedorAutos = document.createElement("section");
  contenedorAutos.id = "contenedorAutos";
  contenedorAutos.className = "grid";
  appModelos.appendChild(contenedorAutos);

  
  const msgError = document.createElement("div");
  msgError.id = "msgError";
  appModelos.appendChild(msgError);

  
  const selectMoneda = document.getElementById("selectMoneda");
  selectMoneda.addEventListener("change", () => {
    renderizarAutos(autos); 
  });
}


function cargarModelos() {
  fetch("modelos.json")
    .then(response => response.json())
    .then(data => {
      autos = data.autos || [];
      
      iniciarApiExchangeRates();
    })
    .catch(error => {
      document.getElementById("msgError").textContent = "Error al cargar modelos.";
      console.error("Error fetch modelos.json:", error);
    });
}


function iniciarApiExchangeRates() {
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      
      if (data.result === "error") {
        throw new Error(data["error-type"]);
      }
      
      conversionRates = data.conversion_rates;
      
      renderizarAutos(autos);
    })
    .catch(err => {
      document.getElementById("msgError").textContent = 
        "No se pudo obtener tasas de cambio, se usarán precios en USD por defecto.";
      console.error("Error Exchange API:", err);
      
      conversionRates = null;
      
      renderizarAutos(autos);
    });
}


function renderizarAutos(arrayDeAutos) {
  const contenedorAutos = document.getElementById("contenedorAutos");
  contenedorAutos.innerHTML = "";

  
  const selectMoneda = document.getElementById("selectMoneda");
  const monedaElegida = selectMoneda ? selectMoneda.value : "USD";

  arrayDeAutos.forEach(auto => {
    const { id, nombre, division, anio, precio, img } = auto;
    const card = document.createElement("div");
    card.className = "card";

    const urlImg = img || "img/default.jpg";

    
    const precioConvertido = obtenerPrecioConvertido(precio, monedaElegida);

    card.innerHTML = `
      <h3>${nombre} (${division})</h3>
      <img src="${urlImg}" alt="${nombre}" />
      <p>Año: ${anio}</p>
      <p>Precio: ${precioConvertido}</p>
    `;

    
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


function obtenerPrecioConvertido(precioUSD, moneda) {
  
  if (!conversionRates || moneda === "USD") {
    return `$${precioUSD} (USD)`;
  }

  
  const tasa = conversionRates[moneda];
  if (!tasa) {
    
    return `$${precioUSD} (USD)*`;
  }

  
  const resultado = (precioUSD * tasa).toFixed(2);
  return `$${resultado} (${moneda})`;
}


function init() {
  crearEstructuraBase();
  cargarModelos(); 
}

init();
