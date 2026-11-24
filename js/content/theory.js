// Contenido de "¿Cómo funciona?": cada entrada enlaza una idea teórica con un bloque
// "#region" real del código (file + region). `live(sol)` muestra los valores del ejemplo actual.
import { num, characteristicEquation } from "../core/format.js";
import { rootsText, general } from "../ui/steps.js";

export const THEORY = [
  {
    title: "1 · De la EDO a la ecuación característica",
    theory: `<p>Para <i>ay″ + by′ + cy = 0</i> se prueba <i>y = e<sup>mx</sup></i>. Entonces
      <i>y′ = m·e<sup>mx</sup></i> y <i>y″ = m²·e<sup>mx</sup></i>. Al sustituir y dividir entre
      <i>e<sup>mx</sup></i> (nunca es 0) queda un polinomio: <b>am² + bm + c = 0</b>.</p>
      <p>La función <code>characteristicEquation</code> imprime ese polinomio con signos limpios.</p>`,
    file: "js/core/format.js", region: "ecuacion-caracteristica",
    live: s => `<i>${characteristicEquation(s.a, s.b, s.c)}</i>`,
  },
  {
    title: "2 · El discriminante decide el caso",
    theory: `<p>Las raíces son <i>m = (−b ± √Δ) / 2a</i> con <b>Δ = b² − 4ac</b>. El signo de Δ
      determina la forma de la solución: positivo (dos reales), cero (una repetida) o negativo
      (complejas conjugadas).</p>
      <p><code>solve</code> calcula Δ y delega en una función por caso. Se usa una tolerancia
      <code>EPS</code> para que errores de punto flotante no confundan Δ ≈ 0 con Δ ≠ 0.</p>`,
    file: "js/core/solver.js", region: "clasificacion",
    live: s => `Δ = ${num(s.D)}`,
  },
  {
    title: "3 · Caso Δ > 0: raíces reales distintas",
    theory: `<p>Hay dos soluciones independientes <i>y₁ = e<sup>m₁x</sup></i> y
      <i>y₂ = e<sup>m₂x</sup></i>. Como la ecuación es lineal y homogénea, cualquier combinación
      lineal también lo es: <b>y<sub>c</sub> = C₁e<sup>m₁x</sup> + C₂e<sup>m₂x</sup></b>.</p>`,
    file: "js/core/solver.js", region: "caso-distintas",
    live: s => s.type === "distinct" ? rootsText(s) : "No aplica a tu ecuación actual.",
  },
  {
    title: "4 · Caso Δ = 0: raíz repetida",
    theory: `<p>Solo aparece <i>e<sup>mx</sup></i>. Con reducción de orden (<i>y = u(x)e<sup>mx</sup></i>)
      se obtiene <i>u″ = 0</i>, así que <i>u = C₁ + C₂x</i> y la segunda es
      <b>x·e<sup>mx</sup></b>. Por eso <code>particular</code> devuelve <code>x·e^(mx)</code>.</p>`,
    file: "js/core/solver.js", region: "caso-repetida",
    live: s => s.type === "repeated" ? rootsText(s) : "No aplica a tu ecuación actual.",
  },
  {
    title: "5 · Caso Δ < 0: raíces complejas",
    theory: `<p>Las raíces son <i>α ± βi</i> con <i>α = −b/2a</i> y <i>β = √(−Δ)/2|a|</i>. Por la fórmula
      de Euler, <i>e<sup>(α±βi)x</sup> = e<sup>αx</sup>(cos βx ± i·sen βx)</i>. Sumando y restando
      las dos soluciones se obtienen dos soluciones <b>reales</b>:
      <i>e<sup>αx</sup>cos βx</i> y <i>e<sup>αx</sup>sen βx</i>.</p>`,
    file: "js/core/solver.js", region: "caso-compleja",
    live: s => s.type === "complex" ? rootsText(s) : "No aplica a tu ecuación actual.",
  },
  {
    title: "6 · Soluciones particulares y solución general",
    theory: `<p><i>y₁</i> y <i>y₂</i> son linealmente independientes (su Wronskiano ≠ 0), así que forman una
      base del espacio de soluciones, que tiene dimensión 2. <b>y<sub>c</sub> = C₁y₁ + C₂y₂</b>
      describe <i>todas</i> las soluciones; C₁ y C₂ se fijan con condiciones iniciales.</p>`,
    file: "js/ui/steps.js", region: "solucion-general",
    live: s => `y<sub>c</sub> = ${general(s)}`,
  },
  {
    title: "7 · Animaciones del procedimiento",
    theory: `<p>Cada paso se genera con un <code>--i</code> (su índice) y CSS lo usa como retraso:
      <code>animation-delay: calc(350ms + var(--i) * 170ms)</code> (ver <code>css/animations.css</code>).
      Así los pasos aparecen uno tras otro, como si se fueran deduciendo.</p>
      <p>El enlace «¿por qué?» de cada paso apunta a la ruta <code>#como-funciona/N</code>, que abre
      el tema correspondiente. Si tu sistema pide "reducir movimiento", todo aparece de inmediato.</p>`,
    file: "js/ui/steps.js", region: "animacion-pasos",
    live: () => "Pulsa «Resolver» otra vez para ver la secuencia.",
  },
];
