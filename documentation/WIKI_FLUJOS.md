# Flujos

## Resolver una ecuación

Se dispara al pulsar **Resolver** (y una vez al cargar la página con el ejemplo 1, 2, 5).

```mermaid
flowchart TD
    START([Clic en Resolver]) --> READ[Leer a, b, c]
    READ -->|algún valor no numérico| ERR1[/"Error: ingresa valores numéricos"/]
    READ -->|ok| CHECKA{"a = 0?"}
    CHECKA -->|sí| ERR2[/"Error: a debe ser distinto de 0"/]
    CHECKA -->|no| DISC["Calcular Δ = b² − 4ac"]

    DISC --> CASE{"Δ"}
    CASE -->|"Δ > EPS"| DIST[Raíces reales distintas<br/>e^(m1·x), e^(m2·x)]
    CASE -->|"|Δ| ≤ EPS"| REP[Raíz repetida<br/>e^(m·x), x·e^(m·x)]
    CASE -->|"Δ < −EPS"| CPLX[Complejas α ± βi<br/>e^(αx)cos βx, e^(αx)sen βx]

    DIST --> RENDER[Pintar procedimiento animado]
    REP --> RENDER
    CPLX --> RENDER
    RENDER --> LIVE[["Actualizar 'En tu ejemplo'<br/>en ¿Cómo funciona?"]]
    LIVE --> OK(["Solución mostrada"])

    ERR1 --> SHAKE[["Mensaje con animación shake"]]
    ERR2 --> SHAKE

    style OK fill:#2d5016,color:#fff
    style ERR1 fill:#5f1e3a,color:#fff
    style ERR2 fill:#5f1e3a,color:#fff
```

Implementación: validación en `js/main.js`, clasificación en `js/core/solver.js` (región `clasificacion`), render en `js/ui/steps.js`.

## Mostrar un tema de "¿Cómo funciona?"

1. La ruta `#como-funciona/N` (clic en un tema o en "¿por qué?") dispara `select(N)`.
2. Se pinta teoría y marcadores; en paralelo se hace `fetch` del archivo indicado en `theory.js`.
3. Se extrae el bloque `#region` y se muestra con archivo y línea. Si el bloque no existe o el `fetch` falla, se muestra un mensaje en lugar del código (ver [Troubleshooting](WIKI_TROUBLESHOOTING.md)).

---

[← Anterior: Instalación y Uso](WIKI_INSTALACION.md) · [🏠 Índice](WIKI_README.md) · [Siguiente: Troubleshooting →](WIKI_TROUBLESHOOTING.md)

---
Última actualización: 2026-11-24
