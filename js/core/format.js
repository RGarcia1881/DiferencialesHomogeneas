// Utilidades de formato: convierten números y expresiones a HTML legible.

export const MINUS = "−";

export function num(v) {                       // número limpio, sin ceros sobrantes
  if (Math.abs(v) < 1e-10) v = 0;
  return (+v.toFixed(4)).toString().replace("-", MINUS);
}

// #region ecuacion-caracteristica
// Coeficientes → "am² + bm + c = 0" omitiendo términos nulos y coeficientes ±1.
export function characteristicEquation(a, b, c) {
  const terms = [[a, "m<sup>2</sup>"], [b, "m"], [c, ""]];
  let out = "";
  for (const [k, v] of terms) {
    if (k === 0) continue;
    const abs = Math.abs(k);
    const coef = (abs === 1 && v) ? "" : num(abs);
    out += out === ""
      ? (k < 0 ? MINUS : "") + coef + v
      : ` ${k < 0 ? MINUS : "+"} ${coef}${v}`;
  }
  return out + " = 0";
}
// #endregion

export function lin(k, v) {                    // k·v con k = ±1 omitido
  if (k === 1) return v;
  if (k === -1) return MINUS + v;
  return num(k) + v;
}
export function expo(m) {                      // e^(mx); vacío si m = 0
  return Math.abs(m) < 1e-10 ? "" : `e<sup>${lin(m, "x")}</sup>`;
}
export const trig = (fn, b) => `${fn}(${lin(b, "x")})`;
export const cat = (...p) => p.filter(Boolean).join("");
