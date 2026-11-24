# Troubleshooting

## La página sale en blanco o sin respuesta al abrir `index.html`

- **Causa:** se abrió con doble clic (`file://`); el navegador bloquea los módulos ES.
- **Solución:** servir la carpeta con un servidor local (ver [Instalación](WIKI_INSTALACION.md)).
- **Verificar:** la URL empieza con `http://localhost` y desaparece el aviso amarillo.

## En "¿Cómo funciona?" el código dice "No se pudo cargar"

- **Causa:** el `fetch` del archivo falló (sin servidor) o se renombró/borró un marcador `// #region`.
- **Solución:** usar el servidor local; si se editó el código, conservar `// #region nombre` / `// #endregion` y que `theory.js` apunte al mismo nombre.
- **Verificar:** el bloque aparece con `archivo · línea N`.

## `OSError: [Errno 48] Address already in use`

- **Causa:** el puerto 8000 ya está ocupado (otro servidor en marcha).
- **Solución:** `pkill -f "http.server 8000"` o usar otro puerto (`python3 -m http.server 8080`).
- **Verificar:** `curl -s -o /dev/null -w "%{http_code}" localhost:8000` devuelve `200`.

## Los cambios no se ven tras editar un archivo

- **Causa:** caché del navegador.
- **Solución:** recarga forzada (`Cmd/Ctrl + Shift + R`).

## No aparecen las animaciones

- **Causa:** el sistema tiene activado "reducir movimiento"; la app lo respeta a propósito.
- **Solución:** desactivarlo en las preferencias de accesibilidad del sistema.

---

[← Anterior: Flujos](WIKI_FLUJOS.md) · [🏠 Índice](WIKI_README.md)

---
Última actualización: 2026-11-24
