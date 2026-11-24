// Renderiza el procedimiento paso a paso a partir de la solución estructurada.
import { num, characteristicEquation, expo, trig, cat } from "../core/format.js";

// #region solucion-general
// Soluciones particulares y_1, y_2 según el caso; la general es su combinación lineal.
export function particular(s) {
  switch (s.type) {
    case "distinct": return [expo(s.m1) || "1", expo(s.m2) || "1"];
    case "repeated": return [expo(s.m) || "1", cat("x", expo(s.m))];
    case "complex":  return [cat(expo(s.alpha), trig("cos", s.beta)),
                             cat(expo(s.alpha), trig("sin", s.beta))];
  }
}

export function general(s) {
  const [y1, y2] = particular(s);
  return `C<sub>1</sub>${y1 === "1" ? "" : "·" + y1} + C<sub>2</sub>·${y2}`;
}
// #endregion

const CASES = {
  distinct: "Δ > 0 · raíces reales distintas",
  repeated: "Δ = 0 · raíz real repetida",
  complex:  "Δ < 0 · raíces complejas conjugadas",
};

export function rootsText(s) {
  if (s.type === "distinct")
    return `m<sub>1</sub> = ${num(s.m1)}, &nbsp; m<sub>2</sub> = ${num(s.m2)}`;
  if (s.type === "repeated")
    return `m<sub>1</sub> = m<sub>2</sub> = ${num(s.m)}`;
  const al = num(s.alpha), be = num(s.beta);
  return `m<sub>1,2</sub> = ${al === "0" ? "" : al + " "}± ${be === "1" ? "" : be}<i>i</i>`;
}

export function renderSteps(container, s) {
  const [y1, y2] = particular(s);
  // [título, contenido, índice del tema en "¿Cómo funciona?" que explica este paso]
  const caseTopic = { distinct: 2, repeated: 3, complex: 4 }[s.type];
  const steps = [
    ["1. Ecuación característica",
      `Se propone y = e<sup><i>mx</i></sup>:<br><i>${characteristicEquation(s.a, s.b, s.c)}</i>`, 0],
    ["Discriminante",
      `Δ = b² − 4ac = ${num(s.b * s.b)} − ${num(4 * s.a * s.c)} = <b>${num(s.D)}</b>`, 1],
    ["2. Raíces", `<span class="tag">${CASES[s.type]}</span><br>${rootsText(s)}`, caseTopic],
    ["3. Soluciones particulares", `y<sub>1</sub> = ${y1}<br>y<sub>2</sub> = ${y2}`, 5],
    ["4. Solución general", `<div class="final">y<sub>c</sub> = ${general(s)}</div>`, 5],
  ];
  // #region animacion-pasos
  // --i alimenta el retraso escalonado definido en css/animations.css;
  // el enlace "¿por qué?" abre el tema correspondiente (ruta #como-funciona/N).
  container.innerHTML = steps
    .map(([t, body, topic], i) => `<div class="step" style="--i:${i}"><h2>${t}
      <a class="why" href="#como-funciona/${topic}">¿por qué? →</a></h2>${body}</div>`)
    .join("");
  // #endregion
}
