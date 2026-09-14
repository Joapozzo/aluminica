# Brief de Development

## Condición de inicio

Development comienza sólo después de aprobar Identity, Stack y Architecture, y de resolver los requisitos críticos de Content & Assets. Este documento registra requisitos futuros; no autoriza implementación mientras existan bloqueos editoriales de publicación.

## Requisitos de ejecución

### Performance

- Minimizar JavaScript cliente y trabajo del hilo principal.
- Reservar dimensiones de media y evitar layout shifts.
- Servir imágenes responsivas y formatos adecuados.
- Aplicar lazy loading de forma estratégica, sin retrasar contenido crítico.
- Optimizar fuentes y cargar progresivamente recursos pesados.
- Animar propiedades eficientes y medir el costo real del scroll.
- Aplicar los gates de [`../02-stack/performance-budget.md`](../02-stack/performance-budget.md).

### SEO y accesibilidad

- HTML semántico y headings jerarquizados.
- Contenido principal indexable y enlaces navegables.
- Metadata, Open Graph, sitemap, robots, canonical y schema cuando corresponda.
- SEO local y arquitectura extensible a servicios y proyectos.
- Navegación por teclado, foco visible, labels, contraste y estados comprensibles.
- `prefers-reduced-motion` como comportamiento diseñado, no como parche.

### Motion engineering

Antes de aceptar una animación se deberá responder:

1. ¿Qué comunica?
2. ¿Por qué ocurre?
3. ¿Qué elemento tiene prioridad?
4. ¿Cómo se relaciona con el scroll?
5. ¿Cómo funciona en mobile?
6. ¿Cómo responde a movimiento reducido?
7. ¿Cuál es su costo de performance?
8. ¿Qué ocurre si JavaScript tarda o falla?

Si no hay respuestas satisfactorias, la animación debe simplificarse o eliminarse.

### Assets y contenido

- Usar el orden de prioridad definido en principios globales.
- No sustituir silenciosamente material faltante por stock genérico.
- Registrar cada faltante antes de producir, buscar o generar recursos.
- Validar derechos, resolución, orientación, encuadre y tratamiento responsive.
- Fallar el build público ante placeholders requeridos o slots críticos vacíos.
- No publicar cifras, clientes, certificaciones ni proyectos sin evidencia y autorización.

## Validación mínima futura

- Pruebas funcionales y de navegación por teclado.
- Revisión en viewports representativos y dispositivos reales cuando sea posible.
- Auditoría de movimiento reducido y degradación sin JavaScript.
- Medición de Core Web Vitals/Lighthouse en condiciones representativas.
- Verificación de metadata, indexabilidad y datos estructurados.
- Revisión visual de continuidad entre secciones y de la adaptación mobile.
- Regresión visual de componentes, variantes y estados críticos.
- Validación editorial y de permisos de todos los assets publicados.

