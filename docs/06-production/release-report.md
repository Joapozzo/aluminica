# Estado de preparación para producción

## Cerrado técnicamente

- Dependencias actualizadas y auditoría de runtime: **0 vulnerabilidades**.
- ESLint, TypeScript estricto, build y suite de render/contenido en verde.
- Suite E2E de Playwright en build de producción: **8/8 escenarios aprobados** en Chromium desktop y mobile. Incluye navegación, aperturas/cierre del asistente, rutas de servicio, modo de movimiento reducido y scroll vertical enlazado al reel horizontal.
- Auditoría automática axe sobre el home: sin infracciones WCAG A/AA de impacto serio o crítico. Se reforzó el contraste de llamados a la acción, tarjetas y formulario sin alterar la identidad cromática.
- Configuración pública centralizada y validador de release con bloqueo ante datos genéricos.
- Diez páginas de servicio con contenido único, índice de servicios, índice editorial de proyectos, privacidad y 404.
- Canonical, Open Graph, Twitter cards, manifest, robots, sitemap y JSON-LD de negocio/servicio.
- Medición GA4 condicional, consentimiento previo y eventos de leads, WhatsApp, asistente, Instagram, servicios y profundidad.
- Headers de seguridad en el worker.
- Imágenes de experiencia convertidas a WebP; reducción aproximada entre 36 % y 73 % según el activo.
- El home inicial queda en **218.1 KiB JS gzip** y **12.7 KiB CSS gzip**. El objetivo original de 130 KiB de JavaScript no es alcanzable con React + vinext y la experiencia GSAP actual; se adopta un gate automático de 220 KiB y queda registrada la reducción adicional como trabajo posterior a una migración del runtime, sin comprometer estabilidad.
- QA de render automatizado y comprobación responsive local sin overflow horizontal ni recursos rotos visibles.

## Gate externo pendiente

La publicación pública y la indexación permanecen bloqueadas hasta recibir y aprobar:

1. Dominio oficial y acceso DNS.
2. WhatsApp real.
3. Email público y razón social.
4. Dirección o confirmación de negocio por área de servicio y horarios.
5. Measurement ID de GA4 y código de verificación de Search Console.
6. Acceso/estado de Google Business Profile.
7. Casos e imágenes reales autorizadas si se quieren presentar como trabajos ejecutados.
8. Aprobación explícita para volver pública la versión final.

El comando `npm run validate:release` debe pasar antes de promover producción. Mientras falle, el sitio puede publicarse únicamente como preproducción privada.

## Rollback

Cada despliegue se guarda como una versión inmutable de Sites. Ante una regresión, se redepliega la última versión privada aprobada y se conserva el commit Git asociado.
