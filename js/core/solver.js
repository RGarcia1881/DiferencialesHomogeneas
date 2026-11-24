// Lógica matemática pura: sin DOM. Recibe (a, b, c) y devuelve la solución estructurada.
// Los bloques "#region" los lee la sección "¿Cómo funciona?" para mostrar este código en pantalla.

const EPS = 1e-12;

// #region caso-distintas
// Δ > 0  →  m₁ ≠ m₂ reales  →  yc = C₁e^(m₁x) + C₂e^(m₂x)
function distinctReal(a, b, D) {
  const s = Math.sqrt(D);
  const m1 = (-b + s) / (2 * a);
  const m2 = (-b - s) / (2 * a);
  return {
    type: "distinct", m1, m2
  };
}
// #endregion

// #region caso-repetida
// Δ = 0  →  m₁ = m₂ = m  →  yc = (C₁ + C₂x)e^(mx)
function repeatedReal(a, b) {
  const m = -b / (2 * a);
  return {
    type: "repeated", m
  };
}
// #endregion

// #region caso-compleja
// Δ < 0  →  m = α ± βi  →  yc = e^(αx)(C₁cos βx + C₂sin βx)
function complexPair(a, b, D) {
  const alpha = -b / (2 * a);
  const beta = Math.sqrt(-D) / (2 * Math.abs(a));
  return {
    type: "complex", alpha, beta
  };
}
// #endregion

// #region clasificacion
export function solve(a, b, c) {
  const D = b * b - 4 * a * c;          // discriminante de am² + bm + c = 0
  let result;
  if (D > EPS)              result = distinctReal(a, b, D);
  else if (Math.abs(D) <= EPS) result = repeatedReal(a, b);
  else                      result = complexPair(a, b, D);
  return { a, b, c, D, ...result };
}
// #endregion
