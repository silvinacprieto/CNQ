// Funciones comunes a los simuladores de la Clase 1.
// Todos los números se muestran con coma decimal y punto de miles, como se escriben en clase.

const fmt = (x, dec = 2) => {
  if (!isFinite(x)) return "—";
  return x.toLocaleString("es-AR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
};
// Muestra hasta "dec" decimales, sin ceros sobrantes a la derecha.
const fmtLibre = (x, dec = 3) => {
  if (!isFinite(x)) return "—";
  return x.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: dec });
};
const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));

// Grupo de chips de selección única. Llama a alCambiar(valor) cada vez que se elige uno.
function grupoChips(contenedor, opciones, inicial, alCambiar) {
  contenedor.innerHTML = "";
  opciones.forEach(op => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = op.texto;
    b.dataset.valor = op.valor;
    b.setAttribute("aria-pressed", String(op.valor === inicial));
    b.addEventListener("click", () => {
      $$(".chip", contenedor).forEach(c => c.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      alCambiar(op.valor);
    });
    contenedor.appendChild(b);
  });
}

// Botón de tema claro/oscuro (el proyector suele verse mejor en claro).
function botonTema(boton) {
  const raiz = document.documentElement;
  const aplicar = t => { raiz.dataset.theme = t; boton.textContent = t === "dark" ? "Tema claro" : "Tema oscuro"; };
  let actual = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  aplicar(actual);
  boton.addEventListener("click", () => { actual = actual === "dark" ? "light" : "dark"; aplicar(actual); });
}

// Densidades de referencia en g/cm³ (a unos 20 °C). Son las mismas que usa la guía del docente.
const MATERIALES = {
  agua:      { nombre: "Agua",               rho: 1.00, color: "#6fb7e0", estado: "líquido" },
  aguaSal:   { nombre: "Agua con sal (saturada)", rho: 1.20, color: "#9fcfe8", estado: "líquido" },
  aceite:    { nombre: "Aceite de girasol",  rho: 0.92, color: "#e6c34a", estado: "líquido" },
  alcohol:   { nombre: "Alcohol etílico",    rho: 0.79, color: "#d9e6ef", estado: "líquido" },
  glicerina: { nombre: "Glicerina",          rho: 1.26, color: "#c9d6c2", estado: "líquido" },
  gasoil:    { nombre: "Gasoil",             rho: 0.84, color: "#e8b75c", estado: "líquido" },
  aluminio:  { nombre: "Aluminio",           rho: 2.70, color: "#b8c0c6", estado: "sólido" },
  hierro:    { nombre: "Hierro (acero)",     rho: 7.87, color: "#6f7478", estado: "sólido" },
  cobre:     { nombre: "Cobre",              rho: 8.96, color: "#c87a4a", estado: "sólido" },
  laton:     { nombre: "Latón",              rho: 8.50, color: "#c9a94a", estado: "sólido" },
  vidrio:    { nombre: "Vidrio",             rho: 2.50, color: "#a8d8cf", estado: "sólido" },
  granito:   { nombre: "Piedra (granito)",   rho: 2.70, color: "#9a8f86", estado: "sólido" },
  pino:      { nombre: "Madera de pino",     rho: 0.50, color: "#d9b27c", estado: "sólido" },
  parafina:  { nombre: "Parafina (vela)",    rho: 0.90, color: "#f2eedc", estado: "sólido" },
  pvc:       { nombre: "PVC",                rho: 1.38, color: "#8fa3b8", estado: "sólido" },
  hielo:     { nombre: "Hielo",              rho: 0.92, color: "#dff1fb", estado: "sólido" },
  telgopor:  { nombre: "Telgopor",           rho: 0.02, color: "#fbfbf6", estado: "sólido" }
};
