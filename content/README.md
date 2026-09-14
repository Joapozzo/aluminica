# Paquete editorial

Estos archivos contienen contenido de trabajo estructurado. Los valores `{{PLACEHOLDER}}` y los campos `null` no están aprobados para publicación.

## Archivos

- [`global/site.json`](global/site.json): configuración, navegación y contacto.
- [`pages/home.json`](pages/home.json): contenido y estado de la landing.
- [`projects/_template.json`](projects/_template.json): ficha a duplicar por proyecto real.
- [`services/_template.json`](services/_template.json): ficha base para capacidades futuras.
- `services/*.json`: inventario de los diez servicios confirmados; sus descripciones siguen pendientes.

## Reglas

- No reemplazar placeholders con afirmaciones supuestas.
- Mantener fuente y fecha de métricas en `evidence`.
- Una sección puede eliminarse si no existe evidencia suficiente.
- Development deberá validar estos archivos contra schemas tipados.
- Un build público falla si encuentra `{{...}}` en campos requeridos o assets críticos en `null`.
