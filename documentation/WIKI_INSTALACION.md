# Instalación y uso

## Requisitos

- Navegador moderno con soporte de módulos ES y `color-mix()` (Chrome/Edge 111+, Firefox 113+, Safari 16.2+).
- **Un servidor HTTP estático**, solo para servir archivos. Cualquiera sirve:

| Opción | Requiere | Comando |
|---|---|---|
| Python | Python 3 | `python3 -m http.server 8000` |
| Node | Node.js | `npx serve .` |
| VS Code | Extensión Live Server | clic en "Go Live" |

No hay `npm install` ni build. (`package.json` solo declara `"type": "module"` para poder probar `solver.js` desde Node.)

## Arrancar

```bash
cd DiferencialesHomogeneas
python3 -m http.server 8000
```

Abrir **http://localhost:8000**. Para detener: `Ctrl+C`.

## Usar

1. En **Resolver**, escribe a, b y c y pulsa **Resolver**. Si a = 0 o falta un valor, aparece un error.
2. Lee el procedimiento a la derecha; "¿por qué? →" salta al tema que lo explica.
3. En **¿Cómo funciona?** navega con la lista, los botones o las flechas ← →.
4. El botón sol/luna cambia el tema.

Ejemplos para probar cada caso:

| a, b, c | Caso | Solución general |
|---|---|---|
| 1, −3, 2 | Δ > 0 | `C₁e^(2x) + C₂e^x` |
| 1, 2, 1 | Δ = 0 | `C₁e^(−x) + C₂·x·e^(−x)` |
| 1, 2, 5 | Δ < 0 | `C₁e^(−x)cos(2x) + C₂e^(−x)sin(2x)` |

## Probar la lógica sin navegador

```bash
node -e "import('./js/core/solver.js').then(m => console.log(m.solve(1, 2, 5)))"
```

---

[← Anterior: Arquitectura](WIKI_ARQUITECTURA.md) · [🏠 Índice](WIKI_README.md) · [Siguiente: Flujos →](WIKI_FLUJOS.md)

---
Última actualización: 2026-11-24
