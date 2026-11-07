// Funciones comunes a los simuladores de la Clase 1.
// Todos los números se muestran con coma decimal y punto de miles, como se escriben en clase.
// En todas las cuentas se usa π ≈ 3,14, igual que en la hoja de Herramientas didácticas.

const PI = 3.14;

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
  aire:      { nombre: "Aire",                    d: 0.0012, color: "#e8f1f7", estado: "gaseoso" },
  agua:      { nombre: "Agua",                    d: 1.00,  color: "#6fb7e0", estado: "líquido" },
  aguaSal:   { nombre: "Agua con sal (saturada)", d: 1.20,  color: "#9fcfe8", estado: "líquido" },
  salmuera:  { nombre: "Salmuera para semillas",  d: 1.10,  color: "#a9d4ea", estado: "líquido" },
  aceite:    { nombre: "Aceite de girasol",       d: 0.92,  color: "#e6c34a", estado: "líquido" },
  alcohol:   { nombre: "Alcohol etílico",         d: 0.79,  color: "#d9e6ef", estado: "líquido" },
  glicerina: { nombre: "Glicerina",               d: 1.26,  color: "#c9d6c2", estado: "líquido" },
  gasoil:    { nombre: "Gasoil",                  d: 0.84,  color: "#e8b75c", estado: "líquido" },
  mercurio:  { nombre: "Mercurio (solo de ejemplo: es tóxico)", d: 13.6, color: "#b9bec2", estado: "líquido" },
  corcho:    { nombre: "Corcho",                  d: 0.26,  color: "#c79a6b", estado: "sólido" },
  pino:      { nombre: "Madera de pino",          d: 0.50,  color: "#d9b27c", estado: "sólido" },
  parafina:  { nombre: "Parafina (vela)",         d: 0.90,  color: "#f2eedc", estado: "sólido" },
  hielo:     { nombre: "Hielo",                   d: 0.92,  color: "#dff1fb", estado: "sólido" },
  pvc:       { nombre: "PVC",                     d: 1.38,  color: "#8fa3b8", estado: "sólido" },
  vidrio:    { nombre: "Vidrio",                  d: 2.50,  color: "#a8d8cf", estado: "sólido" },
  aluminio:  { nombre: "Aluminio",                d: 2.70,  color: "#b8c0c6", estado: "sólido" },
  granito:   { nombre: "Piedra (granito)",        d: 2.70,  color: "#9a8f86", estado: "sólido" },
  zinc:      { nombre: "Zinc",                    d: 7.14,  color: "#a3aab0", estado: "sólido" },
  hierro:    { nombre: "Hierro (acero)",          d: 7.87,  color: "#6f7478", estado: "sólido" },
  laton:     { nombre: "Latón",                   d: 8.50,  color: "#c9a94a", estado: "sólido" },
  cobre:     { nombre: "Cobre",                   d: 8.96,  color: "#c87a4a", estado: "sólido" },
  plata:     { nombre: "Plata",                   d: 10.5,  color: "#d6d9dc", estado: "sólido" },
  plomo:     { nombre: "Plomo",                   d: 11.3,  color: "#7d8287", estado: "sólido" },
  oro:       { nombre: "Oro",                     d: 19.3,  color: "#e2b93b", estado: "sólido" }
};
