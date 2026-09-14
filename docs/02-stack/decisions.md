# Decisiones de Stack

## ADR-S001 — Framework

- **Estado:** aceptada.
- **Decisión:** Next.js con App Router y TypeScript estricto.
- **Motivo:** permite HTML prerenderizado, Server Components, metadata, optimización de media y expansión futura sin convertir la landing en una aplicación cliente completa.
- **Consecuencia:** se deberán mantener pequeñas las fronteras `use client`.

## ADR-S002 — Estrategia de renderizado

- **Estado:** aceptada.
- **Decisión:** estático/servidor primero; runtime disponible. No activar inicialmente exportación puramente estática.
- **Motivo:** conserva optimización de imágenes, formularios y crecimiento futuro mientras el contenido principal sigue prerenderizado.
- **Revisión:** al seleccionar hosting.

## ADR-S003 — Estilos y marca

- **Estado:** aceptada.
- **Decisión:** Tailwind CSS v4 + CSS nativo, alimentados por tokens semánticos transformados desde `brand/tokens.json`.
- **Motivo:** combina velocidad de composición, variables reemplazables y acceso directo a capacidades modernas de CSS.
- **Consecuencia:** quedan prohibidos valores de marca dispersos en componentes.

## ADR-S004 — Motion

- **Estado:** aceptada.
- **Decisión:** CSS para interacción simple; GSAP + ScrollTrigger para coreografía compleja y scroll narrativo.
- **Motivo:** evita enviar o ejecutar un motor imperativo para efectos que CSS resuelve mejor.
- **Consecuencia:** carga bajo demanda, cleanup por scope y alternativa reduced-motion obligatoria.

## ADR-S005 — UI y estado

- **Estado:** aceptada.
- **Decisión:** primitivas propias, HTML semántico y estado local. Sin UI kit ni store global en V1.
- **Motivo:** la landing no justifica esas capas y la identidad requiere control visual.
- **Revisión:** si aparecen flujos interactivos compartidos complejos.

## ADR-S006 — Contenido

- **Estado:** aceptada con revisión.
- **Decisión:** contenido local y tipado para V1, detrás de modelos que admitan un adapter futuro.
- **Motivo:** todavía no existe evidencia de que un CMS compense su complejidad.
- **Revisión:** al identificar responsables y frecuencia de edición.

## ADR-S007 — Testing

- **Estado:** aceptada.
- **Decisión:** Vitest/Testing Library para lógica crítica y Playwright + axe-core para flujos, responsive y accesibilidad.
- **Motivo:** la mayor parte del riesgo está en integración, movimiento, navegación y adaptación entre viewports.

## Pendientes no bloqueantes

| ID | Decisión | Se resuelve cuando… |
| --- | --- | --- |
| P-S01 | Hosting | se conozcan cuentas, dominio, presupuesto y necesidades de runtime |
| P-S02 | Formularios/anti-spam | se defina el destino comercial de los leads |
| P-S03 | Analytics y consentimiento | se acuerden métricas y política de privacidad |
| P-S04 | CMS | se confirme quién edita, cuánto y con qué workflow |
| P-S05 | Pipeline externo de media | exista inventario real y volumen que lo justifique |

