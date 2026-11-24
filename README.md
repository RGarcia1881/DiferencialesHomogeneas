# EDO Lab

Aplicación web que resuelve ecuaciones diferenciales lineales homogéneas de segundo orden con coeficientes constantes (**ay″ + by′ + cy = 0**) y muestra el procedimiento paso a paso.

## Descripción

Recibe a, b y c y presenta: ecuación característica, discriminante, raíces (3 casos), soluciones particulares y solución general con C₁ y C₂. Incluye una sección "¿Cómo funciona?" que enlaza la teoría con el código real. No resuelve ecuaciones no homogéneas ni de orden distinto a 2, y no calcula valores de C₁ y C₂ (condiciones iniciales).

## 📋 Índice

- [Descripción General](documentation/WIKI_HOME.md)
- [Arquitectura del Sistema](documentation/WIKI_ARQUITECTURA.md)
- [Instalación y Uso](documentation/WIKI_INSTALACION.md)
- [Flujos](documentation/WIKI_FLUJOS.md)
- [Troubleshooting](documentation/WIKI_TROUBLESHOOTING.md)

## Requisitos

- Un navegador moderno (Chrome, Firefox, Safari, Edge).
- Un servidor HTTP estático local (cualquiera). Abrir `index.html` con doble clic **no funciona** (módulos ES).

## Instalación rápida

```bash
cd DiferencialesHomogeneas
python3 -m http.server 8000      # o: npx serve
# abrir http://localhost:8000
```

No hay dependencias que instalar ni paso de build. Detalle en [WIKI_INSTALACION.md](documentation/WIKI_INSTALACION.md).

## Estructura del proyecto

```
index.html     # estructura de la página (navbar + 2 vistas)
css/           # base (paleta y temas), layout (ventanas), animations
js/core/       # solver.js (matemática), format.js (formato HTML)
js/ui/         # steps.js (procedimiento), howItWorks.js (teoría ↔ código)
js/content/    # theory.js (textos de "¿Cómo funciona?")
js/main.js     # punto de entrada: formulario, rutas, tema
```

## Documentación

Índice completo en [documentation/WIKI_README.md](documentation/WIKI_README.md).
