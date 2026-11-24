// Sección "¿Cómo funciona?": lista de temas a la izquierda; teoría + código real a la derecha.
// El código NO está copiado: se lee de los archivos fuente y se extrae el bloque #region.
import { THEORY } from "../content/theory.js";

const files = new Map();
const loadFile = path => {
  if (!files.has(path)) files.set(path, fetch(path).then(r => r.text()));
  return files.get(path);
};
const escapeHtml = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function extractRegion(path, id) {
  const text = await loadFile(path);
  const m = text.match(new RegExp(`^[ \\t]*//\\s*#region ${id}\\n([\\s\\S]*?)^[ \\t]*//\\s*#endregion`, "m"));
  if (!m) return null;
  const line = text.slice(0, m.index).split("\n").length + 1;   // primera línea del bloque
  const lines = m[1].replace(/\s+$/, "").split("\n");
  const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^\s*/)[0].length));
  return { code: lines.map(l => l.slice(indent)).join("\n"), line };
}

export function initHowItWorks({ listEl, detailEl, goTo }) {
  let idx = 0, solution = null, token = 0;

  listEl.innerHTML = THEORY.map((t, i) => `
    <button class="topic" type="button" data-i="${i}" style="--i:${i}">
      <span class="n">${i + 1}</span><span>${t.title.replace(/^\d+ · /, "")}</span>
    </button>`).join("");

  function select(i) {
    idx = Math.max(0, Math.min(THEORY.length - 1, i));
    const t = THEORY[idx], my = ++token;
    listEl.querySelectorAll(".topic").forEach((b, k) => b.classList.toggle("active", k === idx));

    detailEl.innerHTML = `
      <div class="detail-head"><small>Tema ${idx + 1} de ${THEORY.length}</small><h3>${t.title.replace(/^\d+ · /, "")}</h3></div>
      <div class="detail-grid">
        <div class="how-theory">${t.theory}<div class="how-live"></div></div>
        <div class="how-code"><div class="file">${t.file}</div><pre>Cargando…</pre></div>
      </div>
      <div class="detail-foot">
        <button class="nav-btn" data-step="-1" ${idx === 0 ? "disabled" : ""}>← Anterior</button>
        <button class="nav-btn" data-step="1" ${idx === THEORY.length - 1 ? "disabled" : ""}>Siguiente →</button>
      </div>`;
    paintLive();

    const pre = detailEl.querySelector("pre"), file = detailEl.querySelector(".file");
    extractRegion(t.file, t.region).then(r => {
      if (my !== token) return;                                  // el usuario ya cambió de tema
      if (!r) throw new Error();
      pre.textContent = r.code;
      file.textContent = `${t.file} · línea ${r.line}`;
    }).catch(() => { if (my === token) pre.textContent = "No se pudo cargar el código (¿estás usando un servidor local?)."; });
  }

  function paintLive() {
    const el = detailEl.querySelector(".how-live");
    if (!el) return;
    el.innerHTML = solution
      ? `<b>En tu ejemplo</b>${THEORY[idx].live(solution)}`
      : "";
  }

  listEl.addEventListener("click", e => {
    const b = e.target.closest(".topic");
    if (b) goTo(+b.dataset.i);
  });
  detailEl.addEventListener("click", e => {
    const b = e.target.closest("[data-step]");
    if (b) goTo(idx + +b.dataset.step);
  });
  document.addEventListener("keydown", e => {                    // ← → solo cuando esta vista está visible
    if (!detailEl.offsetParent || e.target.matches("input")) return;
    if (e.key === "ArrowRight") goTo(idx + 1);
    if (e.key === "ArrowLeft") goTo(idx - 1);
  });

  select(0);
  return {
    select,
    update(s) { solution = s; paintLive(); },
  };
}
