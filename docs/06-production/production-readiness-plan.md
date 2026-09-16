# Plan maestro de producción, SEO y medición

## Objetivo

Llevar Aluminica desde la versión visual actual hasta una publicación pública,
medible, indexable, segura, accesible y mantenible. El proyecto no se considera
terminado por compilar o verse bien: cada uno de los 14 frentes debe cerrar con
evidencia verificable.

## Estado de partida

- La experiencia visual y la narrativa principal están implementadas.
- El build, TypeScript, ESLint y el smoke test de render pasan.
- La publicación actual exige autenticación y devuelve `401` a visitantes no
  autenticados; por lo tanto todavía no es indexable.
- No hay Analytics, Search Console, canonical explícito, sitemap ni robots.
- El número de WhatsApp es genérico.
- Persisten contenidos de trabajo marcados como borrador y placeholders.
- El test automatizado actual sólo cubre render y presencia de algunos textos.
- El árbol completo de dependencias tiene avisos de seguridad que deben
  resolverse y volver a validarse antes de producción.

## Datos y accesos requeridos del cliente

Estos datos se solicitan una sola vez al comienzo. Ninguno se inventa:

1. Dominio oficial y acceso para configurar DNS.
2. Nombre público y razón social, si corresponde mostrarla.
3. WhatsApp real con código de país y área.
4. Email público.
5. Dirección verificable o confirmación de negocio por área de servicio.
6. Horarios de atención.
7. Zona exacta atendida.
8. Acceso o autorización para crear GA4 y Search Console.
9. Estado actual de Google Business Profile.
10. Política de privacidad o datos para redactar una versión inicial revisable.
11. Fotografías y casos reales que puedan publicarse, con autorización de uso.
12. Aprobación explícita para hacer pública la versión final.

## Fases y orden de ejecución

| Fase | Puntos | Resultado |
| --- | --- | --- |
| A. Fundamentos | 1–3 | Datos reales, dependencias seguras y arquitectura mantenible |
| B. Contenido y adquisición | 4–7 | Páginas indexables, SEO técnico, medición y privacidad |
| C. Preproducción | 8–10 | Entorno público controlado, QA integral y performance aprobada |
| D. Lanzamiento | 11–13 | Dominio definitivo, Google indexando y presencia local consistente |
| E. Estabilización | 14 | Monitoreo con datos reales y cierre de regresiones |

Las fases son secuenciales. Dentro de cada fase pueden ejecutarse tareas en
paralelo siempre que no oculten un bloqueo de la fase anterior.

---

## 1. Confirmar dominio y datos oficiales

### Trabajo

- Sustituir WhatsApp, email, nombre legal, área, horarios y dirección/modalidad
  de servicio por datos confirmados.
- Elegir un único dominio canónico, con o sin `www`.
- Crear configuración tipada y una única fuente de verdad para datos de marca.
- Eliminar o aislar archivos de contenido borrador que no participen del build.
- Añadir un validador que haga fallar producción ante placeholders, números
  genéricos, dominios temporales o campos obligatorios vacíos.

### Entregables

- Configuración de sitio validada.
- Inventario de datos públicos aprobado.
- Validador de contenido integrado al pipeline.

### Aceptación

- No aparece `{{...}}`, `0000000`, `example`, `draft` ni un dominio temporal en
  ningún recurso publicado.
- Todos los CTA abren el WhatsApp real con un mensaje correcto.
- El dominio canónico queda documentado y aprobado.

## 2. Actualizar dependencias y cerrar seguridad

### Trabajo

- Actualizar de forma controlada vinext, Vite, Wrangler, el plugin de Cloudflare,
  React Server DOM y dependencias transitivas vulnerables.
- No ejecutar correcciones automáticas destructivas sin revisar el cambio.
- Regenerar lockfile reproducible.
- Ejecutar build, lint, tests y regresión de motion después de cada grupo de
  actualizaciones.
- Documentar cualquier aviso que no pueda corregirse, su alcance y mitigación.

### Entregables

- Dependencias actualizadas y lockfile estable.
- Informe de auditoría de producción y del toolchain.
- Registro de excepciones, si existieran.

### Aceptación

- `npm audit --omit=dev` sin vulnerabilidades.
- Sin vulnerabilidades altas o críticas explotables en runtime o build.
- Build limpio y experiencia visual sin regresiones.

## 3. Profesionalizar arquitectura y calidad de código

### Trabajo

- Dividir `MotionDirector` en controladores de escena con una capa común para
  registro, media queries, refresh y cleanup.
- Separar estilos por fundamentos, layouts, secciones y features; eliminar reglas
  duplicadas o heredadas.
- Convertir `content/` en la fuente real del contenido o retirarlo del runtime;
  no mantener dos verdades paralelas.
- Extraer Analytics, WhatsApp y configuración a adaptadores independientes.
- Mantener contenido crítico en Server Components y lógica de navegador sólo
  en Client Components pequeños.
- Añadir reglas de validación para imports, complejidad y límites de tamaño.

### Entregables

- Arquitectura documentada y aplicada.
- Motion modular con cleanup verificable.
- Contenido tipado y validado.
- CSS sin bloques duplicados.

### Aceptación

- Ningún controlador de motion monopoliza toda la página.
- No quedan listeners, tweens o ScrollTriggers al desmontar.
- No hay contenido comercial duplicado entre TSX y JSON.
- TypeScript estricto y ESLint pasan sin excepciones improvisadas.

## 4. Crear páginas de servicios y proyectos

### Trabajo

- Crear páginas únicas para carpintería de aluminio, pérgolas, estructuras
  metálicas, portones/rejas y los servicios prioritarios restantes.
- Crear un índice de servicios y un índice de trabajos.
- Crear casos de obra reales con problema, solución, materiales, ubicación
  general, galería y resultado.
- Convertir las listas con flechas de la landing en enlaces rastreables.
- Añadir enlazado contextual entre servicio, proyecto y contacto.
- Evitar páginas repetidas o creadas sólo para capturar keywords.

### Entregables

- Arquitectura de información y mapa de URLs.
- Plantillas de servicio y proyecto.
- Contenido real y metadata individual.

### Aceptación

- Cada página resuelve una intención de búsqueda concreta con contenido único.
- Todas las páginas indexables son alcanzables mediante enlaces HTML.
- No hay páginas huérfanas, vacías ni duplicadas.
- Cada imagen de evidencia tiene texto alternativo y fuente/autorización.

## 5. Implementar SEO técnico completo

### Trabajo

- Configurar metadata por ruta: title, description, canonical, Open Graph y X.
- Generar `robots.txt` y `sitemap.xml` desde las rutas publicables.
- Implementar schema `LocalBusiness`/`Organization`, `Service`, `BreadcrumbList`
  y proyectos sólo con datos verificables.
- Incorporar favicon, manifest y social preview optimizados.
- Definir redirecciones permanentes de variantes de dominio y URLs antiguas.
- Añadir página 404 útil y reglas de indexación para entornos no productivos.
- Validar HTML, canonical, sitemap, robots y datos estructurados.

### Entregables

- Capa SEO centralizada y metadata por página.
- Sitemap, robots y schemas válidos.
- Matriz URL → intención → title → description → canonical.

### Aceptación

- La URL pública devuelve `200` sin autenticación.
- `robots.txt` permite producción y declara el sitemap absoluto.
- El sitemap contiene sólo URLs canónicas que responden `200`.
- Cada página tiene exactamente un canonical coherente.
- Rich Results Test no muestra errores de datos estructurados.
- Open Graph usa imágenes válidas, livianas y específicas cuando corresponde.

## 6. Implementar GA4 y medición de conversiones

### Decisión inicial

Usar GA4 directo para la primera versión. Incorporar Google Tag Manager sólo si
se confirma Google Ads, Meta Pixel u operación de etiquetas sin despliegue.

### Trabajo

- Crear/configurar propiedad GA4 y stream web del dominio oficial.
- Cargar el Measurement ID como configuración de entorno, nunca hardcodeado en
  varios componentes.
- Implementar eventos: `generate_lead`, `whatsapp_click`, `assistant_open`,
  `assistant_option_select`, `instagram_click`, `service_view`, `project_view`
  y profundidad de scroll.
- Añadir parámetros de contexto sin información personal.
- Marcar `generate_lead` y los contactos de WhatsApp relevantes como key events.
- Definir UTMs para campañas y enlaces externos.
- Excluir tráfico interno y documentar ambientes.

### Entregables

- GA4 operativo.
- Taxonomía de eventos documentada.
- Dashboard básico de adquisición y conversiones.

### Aceptación

- Realtime recibe page views del dominio final.
- DebugView muestra cada evento una sola vez y con parámetros correctos.
- No se envían nombre, mensaje, teléfono ni otros datos personales a GA4.
- Las conversiones pueden atribuirse por fuente, medio y campaña.

## 7. Privacidad y consentimiento

### Trabajo

- Definir política de privacidad y responsable de los datos.
- Documentar qué información se recoge, finalidad, retención y contacto.
- Determinar, según audiencia y campañas, si se necesita banner/CMP.
- Implementar Consent Mode cuando corresponda.
- Hacer que Analytics respete el consentimiento elegido.
- Añadir enlace permanente a privacidad y mecanismo de cambio de preferencia.

### Entregables

- Política publicada y revisable.
- Configuración de consentimiento documentada.
- Matriz de cookies/tecnologías utilizadas.

### Aceptación

- No se carga medición que requiera consentimiento antes de obtenerlo.
- Rechazar y aceptar producen estados comprobables.
- El sitio sigue funcionando si Analytics está bloqueado.

## 8. Montar preproducción pública controlada

### Trabajo

- Crear una URL de staging accesible al equipo y a herramientas de prueba.
- Mantener staging fuera del índice mediante autenticación o `noindex` coherente.
- Configurar variables separadas para staging y producción.
- Verificar HTTPS, redirecciones, headers y caché.
- Congelar contenido y diseño durante la ronda final de QA, salvo correcciones.

### Entregables

- Staging reproducible con el mismo build que producción.
- Checklist de configuración por ambiente.

### Aceptación

- El artefacto probado es exactamente el que puede promoverse a producción.
- Staging no contamina Analytics ni Search Console productivos.
- No contiene secretos ni endpoints internos.

## 9. QA funcional, responsive y accesible

### Trabajo

- Incorporar Playwright para escritorio, tablet y mobile.
- Probar navegación, anclas, formulario, WhatsApp, asistente, scroll horizontal,
  escena inmersiva y regreso al inicio.
- Probar teclado, orden de foco, Escape, foco visible y lector de pantalla.
- Probar `prefers-reduced-motion`, touch y orientación.
- Incorporar axe y una revisión manual WCAG 2.2 AA.
- Verificar enlaces, imágenes, 404, errores de consola y ausencia de overflow.
- Añadir regresión visual de viewports críticos.

### Entregables

- Suite E2E y accesibilidad automatizada.
- Matriz de navegadores/dispositivos.
- Registro de defectos y evidencias de cierre.

### Aceptación

- Flujos críticos pasan en Chromium, WebKit y Firefox.
- Cero defectos críticos/altos abiertos.
- Cero violaciones axe serias o críticas sin excepción aprobada.
- Todo el contenido y las acciones esenciales funcionan sin motion.

## 10. Performance y Core Web Vitals

### Trabajo

- Establecer Lighthouse CI móvil con configuración reproducible.
- Reducir JavaScript inicial y cargar escenas por necesidad.
- Revisar si GSAP completo y MotionPath deben vivir en el primer viewport.
- Convertir y dimensionar imágenes; usar formatos modernos y focal points.
- Optimizar `og.png`, precarga LCP y política de carga del resto.
- Medir CLS causado por header, imágenes, fuentes y escenas pinned.
- Añadir medición de campo para LCP, INP y CLS.

### Presupuestos

- LCP laboratorio móvil interno: ≤ 2.0 s.
- LCP de campo p75: ≤ 2.5 s.
- INP p75: ≤ 200 ms.
- CLS p75: ≤ 0.10; objetivo interno ≤ 0.05.
- JavaScript inicial propio + dependencias: ≤ 130 KiB gzip.
- CSS inicial: ≤ 35 KiB gzip.
- Transferencia inicial mobile: ≤ 700 KiB sin video.

### Entregables

- Reporte Lighthouse reproducible.
- Presupuesto automático de bundles y media.
- Registro de excepciones con impacto y fallback.

### Aceptación

- Performance, accesibilidad, buenas prácticas y SEO cumplen el gate acordado.
- No hay regresiones de CLS al recorrer las escenas.
- La experiencia es usable en un móvil real de gama media.

## 11. Publicar el dominio definitivo

### Trabajo

- Hacer backup/versionado del último staging aprobado.
- Configurar DNS, HTTPS, dominio canónico y redirecciones.
- Publicar exactamente el artefacto aprobado.
- Cambiar acceso de producción a público sólo con autorización explícita.
- Ejecutar smoke tests inmediatos y verificar logs.
- Documentar rollback y versión anterior estable.

### Entregables

- Sitio público en dominio oficial.
- Registro de publicación y rollback.

### Aceptación

- Home y rutas canónicas devuelven `200` sin sesión.
- Variantes de dominio redirigen una sola vez al canonical.
- Formulario, WhatsApp, Analytics, robots, sitemap y metadata funcionan en vivo.
- No hay errores 5xx ni fallos de assets.

## 12. Configurar Search Console e indexación

### Trabajo

- Crear propiedad de dominio mediante DNS.
- Verificar propiedad y vincularla con GA4.
- Enviar sitemap definitivo.
- Inspeccionar home, servicios principales y casos de obra.
- Solicitar indexación sólo de URLs prioritarias.
- Revisar Page Indexing, HTTPS, Core Web Vitals y mejoras enriquecidas.

### Entregables

- Search Console verificada y vinculada.
- Sitemap procesado.
- Registro inicial de URLs inspeccionadas.

### Aceptación

- Google puede probar en vivo cada URL prioritaria.
- No existen bloqueos de robots, autenticación, canonical o `noindex`.
- Sitemap figura como correcto y sin URLs inválidas.
- La indexación posterior se monitorea; no se promete una fecha que Google no
  garantiza.

## 13. Completar Google Business Profile y SEO local

### Trabajo

- Reclamar/verificar el perfil si todavía no está administrado.
- Unificar nombre, teléfono, dominio, zona, horarios y categorías.
- Añadir servicios, descripción y fotografías reales.
- Definir flujo ético de solicitud y respuesta de reseñas.
- Corregir citas locales inconsistentes y enlazar el sitio oficial.
- Usar UTMs para medir tráfico proveniente del perfil.

### Entregables

- Perfil completo y consistente con el sitio.
- Guía de reseñas y respuestas.
- Inventario básico de presencia local.

### Aceptación

- Perfil verificado o proceso de verificación documentado con responsable.
- NAP/datos públicos son idénticos en sitio, perfil y principales directorios.
- Enlace al sitio y CTA del perfil quedan medidos.

## 14. Monitorear y estabilizar durante 30 días

### Trabajo

- Revisar disponibilidad y errores diariamente la primera semana.
- Revisar GA4 Realtime y eventos tras el lanzamiento.
- Revisar Search Console semanalmente y ante cambios importantes.
- Medir consultas, impresiones, CTR, landing pages y conversiones.
- Revisar Core Web Vitals de campo cuando exista volumen suficiente.
- Detectar 404, enlaces rotos, caídas de conversión y errores de JavaScript.
- Priorizar ajustes por impacto, no por opiniones aisladas.
- Cerrar con un informe de resultados y backlog del siguiente ciclo.

### Entregables

- Dashboard de seguimiento.
- Informes de día 1, día 7 y día 30.
- Backlog priorizado con evidencia.

### Aceptación

- Eventos y conversiones siguen llegando sin duplicados.
- No hay errores críticos de rastreo, disponibilidad o JavaScript.
- URLs prioritarias tienen estado conocido en Search Console.
- Se documenta una línea base de tráfico, consultas, CTR y leads.

---

## Gates obligatorios

### Gate A — Contenido y datos

- Datos oficiales aprobados.
- Sin placeholders ni contactos genéricos.
- Derechos de publicación de imágenes confirmados.

### Gate B — Ingeniería

- TypeScript, ESLint, unitarios, integración y build aprobados.
- Auditoría de seguridad dentro del criterio acordado.
- Bundle dentro de presupuesto o excepción documentada.

### Gate C — Experiencia

- E2E desktop/tablet/mobile aprobado.
- Teclado, reduced motion y accesibilidad aprobados.
- Sin errores de consola, overflow, links rotos o formularios fallidos.

### Gate D — SEO y medición

- Canonical, robots, sitemap, metadata y schema verificados.
- GA4 y conversiones validados en DebugView.
- Política/consentimiento aprobados.

### Gate E — Producción

- Dominio y DNS confirmados.
- Acceso público autorizado.
- Rollback listo.
- Smoke test en producción aprobado.
- Search Console y Business Profile asignados a responsables.

Ningún gate se marca completo por inferencia. Cada ítem requiere salida de test,
captura de herramienta, respuesta HTTP, configuración externa o aprobación
explícita, según corresponda.

## Suite mínima de pruebas que quedará automatizada

- `lint`: reglas TypeScript, React, hooks, Next y accesibilidad.
- `typecheck`: TypeScript estricto independiente del build.
- `unit`: validadores, URLs, metadata, Analytics y contenido.
- `integration`: render de rutas, headers, sitemap, robots y 404.
- `e2e`: navegación, contacto, WhatsApp, asistente y scroll narrativo.
- `a11y`: axe por ruta y viewport.
- `visual`: snapshots de estados críticos.
- `links`: enlaces internos, externos y assets.
- `lighthouse`: performance móvil, accesibilidad, SEO y buenas prácticas.
- `audit`: dependencias de producción y toolchain.
- `production-smoke`: HTTP, canonical, Analytics, sitemap y conversiones.

## Definición final de terminado

El proyecto queda 100% listo para producción sólo cuando:

1. Los 14 puntos cumplen sus criterios de aceptación.
2. Los cinco gates están aprobados con evidencia.
3. No existen defectos críticos o altos abiertos.
4. El sitio público usa el dominio oficial, responde `200` sin autenticación y
   dispone de rollback.
5. Google puede rastrear las URLs canónicas y Search Console procesa el sitemap.
6. GA4 recibe page views y conversiones correctas sin datos personales.
7. El código, contenido, tests y documentación coinciden con lo desplegado.
8. El monitoreo de 30 días concluye con línea base y backlog aprobado.

