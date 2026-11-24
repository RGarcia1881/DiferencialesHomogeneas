// Punto de entrada: conecta formulario, solver, pasos, navegación y tema.
import { solve } from "./core/solver.js";
import { renderSteps } from "./ui/steps.js";
import { initHowItWorks } from "./ui/howItWorks.js";

const $ = id => document.getElementById(id);
let current = null;

/* ───────── Navegación por hash: #resolver · #como-funciona · #como-funciona/3 ───────── */
const views = { "resolver": $("view-resolver"), "como-funciona": $("view-how") };
const tabs = [...document.querySelectorAll(".tabs a")];
const ind = document.querySelector(".tabs .ind");

const how = initHowItWorks({
  listEl: $("how-list"),
  detailEl: $("how-detail"),
  goTo: i => { location.hash = `#como-funciona/${i}`; },
});

function moveIndicator(animate = true) {
  const a = tabs.find(t => t.classList.contains("active"));
  if (!a) return;
  ind.style.transition = animate ? "" : "none";
  ind.style.width = a.offsetWidth + "px";
  ind.style.transform = `translateX(${a.offsetLeft}px)`;
}

let shown = null;
function route() {
  const [v, n] = location.hash.slice(1).split("/");
  const name = views[v] ? v : "resolver";
  const first = shown === null;
  if (name !== shown) {
    Object.entries(views).forEach(([k, el]) => (el.hidden = k !== name));   // al mostrarse, sus animaciones CSS reinician
    tabs.forEach(t => t.classList.toggle("active", t.dataset.view === name));
    moveIndicator(!first);
    shown = name;
  }
  if (name === "como-funciona") how.select(n === undefined ? 0 : parseInt(n, 10) || 0);
}
addEventListener("hashchange", route);
addEventListener("resize", () => moveIndicator(false));

/* ───────── Tema claro / oscuro (manual, recordado) ───────── */
$("theme").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});

/* ───────── Formulario ───────── */
$("form").addEventListener("submit", e => {
  e.preventDefault();
  const [a, b, c] = ["a", "b", "c"].map(id => parseFloat($(id).value));
  const err = $("error");
  // Se vacía y se fuerza un reflow para reiniciar la animación "shake" con el mismo mensaje.
  const fail = msg => { err.textContent = ""; void err.offsetWidth; err.textContent = msg; };

  if ([a, b, c].some(v => !isFinite(v))) return fail("Ingresa valores numéricos en a, b y c.");
  if (a === 0) return fail("El coeficiente a debe ser distinto de 0 (si no, no es de segundo orden).");
  err.textContent = "";

  current = solve(a, b, c);
  renderSteps($("steps"), current);
  how.update(current);
});

route();
$("form").requestSubmit();   // resuelve el ejemplo inicial
