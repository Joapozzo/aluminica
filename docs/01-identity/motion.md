# Gramática de motion v0.1

## Principio

El movimiento expresa ensamblaje, apertura y cambio de profundidad. Debe sentirse preciso y continuo, como una estructura que se revela al recorrerla. La interfaz permanece estable mientras el contenido espacial adquiere movimiento.

## Jerarquía

1. **Narrativa:** transiciones entre grandes estados o secciones.
2. **Orientación:** aparición de títulos, cambios de plano y relaciones sticky.
3. **Respuesta:** hover, focus, press y confirmaciones.
4. **Atmósfera:** parallax leve, luz o materialidad; siempre subordinados.

No deben ejecutarse varios movimientos de nivel 1 al mismo tiempo.

## Familias de movimiento

### Ensamble

Líneas, máscaras o planos se alinean para revelar una composición. Comunica construcción y precisión. Se reserva para entradas estructurales.

### Apertura

Una imagen o viewport gana escala o campo visible. Comunica relación interior/exterior y expansión espacial. Debe conservar un punto de referencia para evitar desorientación.

### Desplazamiento de plano

Fondo, media y primer plano avanzan a velocidades distintas y contenidas. Comunica profundidad. No se usa en bloques de lectura larga.

### Continuidad

Un elemento visual, línea o tono atraviesa el límite entre dos secciones. Comunica que el relato continúa y evita la sensación de bloques aislados.

### Respuesta táctil

Controles cambian estado con distancia corta, contraste y duración breve. Comunica disponibilidad y confirmación, sin elasticidad caricaturesca.

## Ritmo provisional

Los nombres, no los milisegundos, constituyen el contrato: `instant`, `fast`, `base`, `slow` y `scene`. Los valores actuales viven en [`../../brand/tokens.json`](../../brand/tokens.json) y podrán calibrarse tras prototipos en dispositivos reales.

La curva principal debe acelerar con decisión y asentarse con suavidad. Las entradas editoriales pueden ser más lentas; los controles nunca deben esperar a una animación escénica.

## Scroll

- Cada escena define entrada, desarrollo, transición y salida.
- El progreso del scroll controla transformaciones sólo cuando mejora causalidad y comprensión.
- El texto principal debe permanecer legible sin depender de scrub.
- Pinning se limita a relatos que necesitan comparación, proceso o cambio de estado.
- No se bloquea ni se altera artificialmente la velocidad del scroll nativo.
- Las transiciones entre light y dark deben ocurrir en zonas claras, no durante lectura crítica.

## Mobile

- Reducir cantidad de capas simultáneas y distancias de parallax.
- Sustituir pinning largo por secuencias naturales cuando el viewport o la ergonomía lo exijan.
- Mantener triggers asociados a la posición real del contenido.
- Evitar animaciones que dependan de hover.

## Reduced motion y carga progresiva

- Con `prefers-reduced-motion`, eliminar scrub, parallax, pinning no esencial y grandes cambios de escala.
- Conservar cambios instantáneos o fades breves sólo si ayudan a comprender estado.
- El contenido y el orden visual deben ser correctos antes de inicializar motion.
- Si JavaScript tarda o falla, nada esencial puede quedar oculto, desplazado o inaccesible.

## Checklist de aprobación

Toda animación debe documentar intención, prioridad, trigger, duración o relación con progreso, comportamiento mobile, alternativa reducida, fallback sin JavaScript y costo esperado. La checklist completa de ingeniería permanece en [`../05-development/brief.md`](../05-development/brief.md).
