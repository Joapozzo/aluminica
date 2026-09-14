# Inventario de componentes v1

## Regla de creación

Este inventario es una clasificación, no una orden para generar todos los archivos. Un componente nace cuando tiene un consumidor real; se generaliza al segundo uso o cuando semántica, accesibilidad o variantes justifican centralizarlo desde el primero.

## Primitives

| Pieza | Responsabilidad | Variantes iniciales |
| --- | --- | --- |
| `Box` | Elemento estructural excepcional | `as`; sin API visual extensa |
| `Container` | Ancho, gutter y alineación | `default`, `wide`, `bleed` |
| `SectionShell` | Sección semántica y ritmo | superficie, spacing, anchor |
| `Heading` | Heading semántico con estilo desacoplado | nivel HTML, escala visual |
| `Text` | Texto y medida legible | body, lead, caption, data |
| `Link` | Navegación accesible | text, nav, inline, inverse |
| `Image` | Wrapper del pipeline de imagen | fit, ratio, loading role |
| `Video` | Video, poster y fallback | inline, ambient, controlled |
| `VisuallyHidden` | Texto sólo para tecnologías asistivas | ninguna |

`Box` no debe convertirse en una capa que replique todas las propiedades CSS como props.

## UI

| Pieza | Responsabilidad | Variantes iniciales |
| --- | --- | --- |
| `Button` | Acción semántica | primary, secondary, ghost, inverse; tamaños |
| `IconButton` | Acción compacta con nombre accesible | default, inverse; tamaños |
| `Input` | Entrada de una línea | default, error, disabled |
| `Textarea` | Entrada extensa | default, error, disabled |
| `Select` | Selección nativa o mejorada justificadamente | default, error, disabled |
| `Field` | Label, descripción y error | requerido/opcional |
| `Badge` | Metadata compacta no interactiva | neutral, signal, inverse |
| `Logo` | Resolución de slots de marca | primary, inverse, monochrome, mark |

`Button` y `Link` conservan elementos HTML distintos; no se intercambian sólo porque se vean parecidos.

## Patterns y layouts

| Pieza candidata | Uso |
| --- | --- |
| `PageShell` | Marco global de una página pública |
| `SplitLayout` | Texto y media con orden responsive |
| `GridLayout` | Retícula de proyectos, servicios o datos |
| `StickyLayout` | Narrativa con contenido persistente, sólo si se justifica |
| `FullBleedMedia` | Media que rompe el container conservando alineación |
| `SectionIntro` | Eyebrow, heading y texto introductorio |
| `ProjectCard` | Resumen enlazable de proyecto |
| `MetricItem` | Valor, unidad, label y contexto |
| `MediaFrame` | Ratio, borde, overlay y caption coherentes |
| `PrimaryNavigation` | Navegación desktop/mobile con misma fuente de datos |

## Sections candidatas

Content & Assets decidirá nombres, orden y existencia. El mapa inicial es:

- `HeroSection`: promesa, contexto y evidencia visual principal.
- `PositioningSection`: enfoque y diferenciación verificable.
- `CapabilitiesSection`: sistemas, servicios o capacidades reales.
- `FeaturedProjectsSection`: selección de proyectos con datos consistentes.
- `PrecisionSection`: detalle, proceso, material o desempeño.
- `ContactSection`: llamada a acción y feature de contacto.
- `SiteHeader` y `SiteFooter`: navegación y datos globales.

No se crearán `Section1`, `Section2` ni abstracciones basadas sólo en posición.

## Estados obligatorios

Todo elemento interactivo contempla default, hover cuando exista, focus-visible, active/pressed, disabled cuando aplique y error/success en controles. Los estados no dependen sólo del color y funcionan con teclado y touch.

## Política de variantes

- Variantes visuales pequeñas se expresan en una única API.
- Si dos variantes requieren markup o semántica radicalmente distintos, probablemente son componentes distintos.
- `className` permite ajustes de layout local, no reescribir la identidad del componente.
- Props booleanas visuales acumulativas se reemplazan por variantes nombradas.
- CVA se adopta para `Button`, `IconButton`, `Badge`, `Heading` y otros componentes con matrices reales; no se exige universalmente.

## Criterios de extracción

Extraer una pieza cuando cumpla al menos uno:

- encapsula semántica o accesibilidad que no debe repetirse;
- aparece en dos contextos reales;
- tiene variantes o estados que necesitan gobernanza;
- contiene una regla responsive o de media difícil de reproducir correctamente;
- posee pruebas o comportamiento propio.

No extraerla cuando sólo reduce unas pocas líneas, oculta contenido específico o necesita una API más compleja que su implementación.

