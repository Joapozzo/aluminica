# Decisiones de Architecture

## ADR-A001 — Capas y composición

- **Estado:** aceptada.
- **Decisión:** `primitives → ui → patterns → sections → pages`, con layouts y features de responsabilidad explícita.
- **Motivo:** permite reutilización sin convertir toda la interfaz en abstracciones genéricas.
- **Regla:** imports hacia capas superiores están prohibidos.

## ADR-A002 — Frontera servidor/cliente

- **Estado:** aceptada.
- **Decisión:** Server Components por defecto; adaptadores cliente locales para interacción y motion.
- **Motivo:** protege HTML inicial, SEO y presupuesto de JavaScript.
- **Regla:** una sección animada conserva su contenido en servidor.

## ADR-A003 — Tokens generados

- **Estado:** aceptada.
- **Decisión:** validar `brand/*.json` y generar CSS variables; mapear a Tailwind sólo los roles necesarios.
- **Motivo:** permite sustituir identidad desde una fuente central y evita hexadecimales dispersos.
- **Regla:** el CSS generado no se edita manualmente.

## ADR-A004 — Composición de páginas

- **Estado:** aceptada.
- **Decisión:** composición explícita de secciones tipadas; sin page builder o renderer universal en V1.
- **Motivo:** la landing tiene narrativa propia y todavía no existe un caso real para esa complejidad.
- **Revisión:** si un CMS futuro necesita páginas configurables por editores.

## ADR-A005 — Variantes

- **Estado:** aceptada.
- **Decisión:** CVA sólo para matrices reales de variantes; CSS/clases directas para piezas simples.
- **Motivo:** evita tanto duplicación como abstracción ceremonial.

## ADR-A006 — Ownership de motion

- **Estado:** aceptada.
- **Decisión:** runtime central para registro/capacidades; escena local para triggers, timeline y cleanup.
- **Motivo:** previene efectos globales, fugas y dependencias entre secciones.
- **Regla:** cada escena define mobile, reduced-motion y estado final estático.

## ADR-A007 — Contenido desacoplado

- **Estado:** aceptada.
- **Decisión:** modelos propios y contenido local tipado; adapters para fuentes futuras.
- **Motivo:** un CMS o CRM puede cambiar sin alterar componentes.

## ADR-A008 — Responsive semántico

- **Estado:** aceptada.
- **Decisión:** orden DOM orientado a lectura mobile; layout adaptado con CSS, sin duplicar contenido.
- **Motivo:** mejora accesibilidad, mantenimiento y consistencia SEO.

## Pendientes para Content & Assets

| ID | Decisión | Insumo necesario |
| --- | --- | --- |
| P-A01 | Orden y cantidad de secciones | objetivos comerciales y contenido real |
| P-A02 | Proyectos destacados | inventario, permisos y calidad visual |
| P-A03 | Escenas de motion prioritarias | narrativa aprobada y media disponible |
| P-A04 | Campos de contacto | proceso comercial y destino de leads |
| P-A05 | Rutas iniciales adicionales | alcance real de servicios y proyectos |

