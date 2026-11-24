# Arquitectura

Aplicación 100 % frontend: HTML + CSS + JavaScript con módulos ES. Sin backend, sin librerías externas, sin build.

## Módulos

| Archivo | Responsabilidad |
|---|---|
| `js/core/solver.js` | Matemática pura (sin DOM): calcula Δ, clasifica y devuelve `{type, raíces}`. |
| `js/core/format.js` | Convierte números y expresiones a HTML (signos limpios, `e^(…)`, omite coeficientes ±1). |
| `js/ui/steps.js` | Arma las soluciones particulares/general y pinta el procedimiento. |
| `js/ui/howItWorks.js` | Lista de temas + detalle; extrae del código fuente los bloques a mostrar. |
| `js/content/theory.js` | Texto de cada tema y la región de código que lo ilustra. |
| `js/main.js` | Formulario, rutas por hash, botón de tema. |
| `css/` | `base` (paleta claro/oscuro), `layout` (ventanas, navbar), `animations`. |

Dependencia entre capas: `main` → `ui` → `core`. `core` no conoce el DOM.

## Decisiones no obvias

- **El código de "¿Cómo funciona?" no está copiado.** Los archivos fuente marcan bloques con `// #region nombre` … `// #endregion`; `howItWorks.js` los lee con `fetch` y los muestra. Si se edita el código, la explicación se actualiza sola. Por eso la app necesita servidor y **no se deben renombrar o borrar los marcadores** sin actualizar `theory.js`.
- **Tolerancia `EPS = 1e-12`** en `solver.js` para decidir Δ = 0, evitando que errores de punto flotante clasifiquen mal una raíz repetida.
- **Tema manual, sin modo automático del sistema.** Se aplica con `data-theme` en `<html>` y se guarda en `localStorage`; un script en `<head>` lo fija antes de pintar para evitar parpadeos.
- **Navegación por hash** (`#resolver`, `#como-funciona/N`): permite que los enlaces "¿por qué?" abran un tema concreto sin librerías de rutas.
- **Animaciones** solo con CSS (`--i` como retraso escalonado) y se desactivan con `prefers-reduced-motion`.

---

[← Anterior: Descripción general](WIKI_HOME.md) · [🏠 Índice](WIKI_README.md) · [Siguiente: Instalación y Uso →](WIKI_INSTALACION.md)

---
Última actualización: 2026-11-24
