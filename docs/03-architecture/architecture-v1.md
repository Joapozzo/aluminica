# Architecture v1

## Resultado

La aplicación se organizará por responsabilidad y dirección de dependencias, no por cada página individual. La landing compondrá piezas reutilizables, pero conservará una narrativa explícita en lugar de convertirse en un constructor genérico de páginas.

## Estructura prevista

Esta estructura se materializará al comenzar Development:

```text
/
├── brand/                         # Fuentes reemplazables de identidad
├── content/                       # Contenido local tipado y datos de V1
│   ├── global/
│   ├── pages/
│   └── projects/
├── public/
│   ├── brand/
│   ├── images/
│   └── video/
├── src/
│   ├── app/                       # Rutas, layouts, metadata y endpoints
│   ├── components/
│   │   ├── primitives/            # Semántica y fundamentos visuales
│   │   ├── ui/                    # Controles y composiciones pequeñas
│   │   ├── patterns/              # Relaciones reutilizables
│   │   ├── sections/              # Unidades narrativas
│   │   └── layouts/               # Shells espaciales
│   ├── features/                  # Capacidades con lógica propia, p. ej. contacto
│   ├── motion/                    # Runtime, escenas y políticas de movimiento
│   ├── styles/
│   │   ├── generated/             # Tokens generados; no editar manualmente
│   │   ├── globals.css
│   │   └── utilities.css
│   ├── lib/                       # Funciones puras, validación y adapters
│   ├── config/                    # Configuración tipada del sitio
│   └── types/                     # Contratos compartidos estables
├── tests/
│   ├── e2e/
│   └── fixtures/
└── scripts/                       # Validación/generación de tokens y assets
```

No se crearán carpetas vacías por anticipado. La estructura es un mapa de ubicación: cada directorio aparece cuando existe una pieza real que lo necesita.

## Capas y dirección de dependencias

```text
app/pages
   ↓
sections ─────→ features
   ↓               ↓
patterns        ui/primitives
   ↓               ↓
ui ─────────→ primitives
   ↓
primitives
   ↓
styles · config · types · lib puro
```

Reglas:

- Una capa sólo importa su misma capa o capas inferiores.
- `primitives` nunca conoce `patterns`, `sections`, rutas o contenido comercial.
- `sections` no importa otras secciones.
- `app` compone layouts y secciones, pero no contiene coreografías ni estilos complejos.
- `features` encapsula comportamiento con efectos externos; no se usa como contenedor genérico.
- `motion` ofrece capacidades a adaptadores cliente. No importa secciones ni decide contenido.
- El contenido no importa React, CSS o GSAP.
- Se prefieren imports directos; no habrá un barrel global que oculte dependencias o genere ciclos.

## Server y Client Components

- Todo componente comienza como Server Component.
- Sólo archivos que necesitan APIs del navegador, estado interactivo o GSAP declaran frontera cliente.
- Los adaptadores cliente se nombran explícitamente, por ejemplo `ProjectRailMotion.client.tsx`.
- La sección de servidor conserva headings, texto, links y media en HTML inicial; el adaptador recibe referencias o una configuración mínima para mejorarla.
- No se pasa contenido completo serializado a un wrapper cliente si éste sólo necesita animar nodos.
- Un provider cliente global requiere ADR; V1 no lo presupone.

## Tokens y marca

[`../../brand/tokens.json`](../../brand/tokens.json) y [`../../brand/assets.json`](../../brand/assets.json) son las fuentes reemplazables.

El flujo será:

```text
brand/*.json
   ↓ validar esquema, referencias y slots
styles/generated/tokens.css
   ↓ mapear roles útiles a @theme
componentes consumen variables semánticas
```

- `styles/generated` nunca se modifica a mano.
- Los tokens primitivos pueden cambiar; los nombres semánticos deben permanecer estables.
- Logo, favicon y social image se consumen por slot, con fallback visible durante desarrollo.
- Un cambio de marca exige validación de contraste y regresión visual.
- CVA se utiliza sólo en componentes con variantes reales en dos o más ejes; una clase simple no justifica esa abstracción.

## Layout y responsive

Tres shells forman el núcleo:

- `PageShell`: header, main, footer y contexto global de superficie.
- `SectionShell`: ritmo vertical, anclaje, superficie y límites de escena.
- `Container`: ancho máximo, gutters y alineaciones persistentes.

`SplitLayout`, `GridLayout`, `StickyLayout` y `FullBleedLayout` serán patterns/layouts sólo cuando una composición real los requiera.

Reglas responsive:

- El orden del DOM sigue la lectura mobile y semántica.
- CSS reorganiza la presentación; no se duplica contenido para desktop/mobile.
- Breakpoints responden a la composición, no a modelos de dispositivo.
- Container queries se reservan para componentes cuyo comportamiento depende de su contenedor.
- Sólo las capas decorativas pueden desaparecer sin alternativa.
- Targets interactivos apuntan a un mínimo de 44 × 44 CSS px.
- Mobile puede usar otra coreografía sin cambiar el significado ni el orden narrativo.

## Contenido y páginas futuras

La landing se compondrá explícitamente con secciones tipadas. No se construirá un renderer universal basado en una lista arbitraria de bloques durante V1.

Los modelos de `Project`, `Service` y `SiteSettings` sí se diseñan para reutilización futura. Esto permite crear `/proyectos`, `/proyectos/[slug]` y `/servicios/[slug]` después sin acoplar contenido a la landing.

## Media

- Cada imagen declara `src`, dimensiones, `alt`, rol de carga y composición/focal point cuando corresponda.
- Media decorativa usa alt vacío; evidencia de proyecto recibe descripción útil.
- El ratio se reserva antes de la descarga.
- Hero y LCP son una decisión de página, no una propiedad implícita de toda imagen grande.
- Video requiere poster, dimensiones, política de preload y fallback.
- Un recorte transparente es una variante de un asset real, no un efecto improvisado en CSS.

## Motion

Cada sección conserva contenido funcional sin GSAP. Una escena avanzada se divide en:

1. markup de servidor;
2. estilos base y responsive;
3. adaptador cliente local;
4. definición de escena y cleanup;
5. variante reduced-motion.

ScrollTrigger no se registra por sección ni se importa globalmente desde múltiples puntos. El runtime de motion centraliza registro y capacidades; cada escena conserva ownership de sus triggers y los revierte al desmontar.

## Formularios y efectos externos

`features/contact` será dueño de schema, estados, mensajes, adapter de entrega y pruebas. La UI de campos permanece reutilizable. La sección Contact compone esa feature, pero no conoce proveedores, secretos ni reglas anti-spam.

## Error y degradación

- El contenido esencial es visible antes de JavaScript.
- Fallos de media presentan fondo, ratio y texto alternativo adecuados.
- Un fallo de motion no afecta lectura, navegación ni foco.
- El formulario comunica error y alternativa de contacto.
- Los placeholders de marca son visibles en desarrollo; producción no puede publicar slots requeridos en `null`.

## Gates para comenzar Development

- Orden narrativo y contenido V1 aprobados.
- Assets críticos presentes o registrados con sustituto explícito.
- Slots de producción requeridos resueltos o excepción aprobada.
- Componentes necesarios seleccionados del inventario, sin crear todos anticipadamente.
- Escenas de alto riesgo descritas y priorizadas para prototipo.
- Hosting/formulario pueden seguir pendientes si no bloquean el primer build local.

