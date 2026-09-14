# Brief de Stack

## Estado

**Stack v1 decidido documentalmente.** Ver [`stack-v1.md`](stack-v1.md), [`performance-budget.md`](performance-budget.md) y [`decisions.md`](decisions.md). Todavía no se inicializó la aplicación ni se instalaron dependencias.

## Objetivo de la etapa

Seleccionar la solución más simple que sostenga la identidad aprobada, la reutilización, el storytelling por scroll, el SEO, la accesibilidad y la performance esperada.

## Criterios de evaluación

- Render inicial rápido y contenido esencial disponible sin depender de JavaScript cliente.
- Control explícito de fronteras servidor/cliente y del JavaScript enviado.
- Optimización de imágenes, fuentes, carga progresiva y prevención de layout shifts.
- HTML semántico, metadata, sitemap, robots, canonical y datos estructurados.
- Tokens, variantes, composición y responsive behavior mantenibles.
- Motion coordinado, scroll-driven y con limpieza segura del ciclo de vida.
- Experiencia funcional con JavaScript lento o ausente y con movimiento reducido.
- Buen flujo de medición para Core Web Vitals, accesibilidad y regresiones visuales.

## Dirección de responsabilidades de motion

- CSS deberá resolver transiciones y estados simples cuando sea claramente más eficiente.
- GSAP, si se confirma, se reservará para timelines, ScrollTrigger, pinning, parallax, transforms complejos y transiciones coordinadas asociadas al relato.
- No se elegirá una herramienta ni un efecto sólo por disponibilidad técnica.

## Entregables esperados

- ADR de stack aprobado y alternativas descartadas con motivos.
- Presupuesto inicial de performance y JavaScript.
- Estrategia de renderizado, imágenes, fuentes y media pesada.
- Estrategia de motion y comportamiento sin JavaScript.
- Plan de SEO técnico, accesibilidad, testing y observabilidad.
- Riesgos y prototipos técnicos mínimos para las decisiones inciertas.

## Decisiones que permanecen abiertas

- Proveedor de hosting y región de despliegue.
- Endpoint o servicio de entrega de formularios y estrategia anti-spam.
- Analytics/RUM y política de consentimiento.
- Necesidad de CMS después de validar quién editará el contenido y con qué frecuencia.
- Servicios externos de imagen o video si el volumen real los justifica.

Estas decisiones no bloquean Architecture porque tendrán contratos desacoplados.

