# Sistema de identidad v0.1

## Estatus

Esta es una dirección de trabajo específica para la experiencia digital de Aluminica. Define relaciones, carácter y reglas; los valores de color, las fuentes y los archivos de logo son provisionales y se reemplazan mediante [`../../brand/tokens.json`](../../brand/tokens.json) y [`../../brand/assets.json`](../../brand/assets.json).

## Idea rectora: precisión habitable

Aluminica debe mostrar la precisión del metal sin sentirse fría o industrial en exceso. La estructura aporta exactitud; la luz, la escala humana y la fotografía aportan habitabilidad. La tecnología se percibe en el control y el comportamiento, no en ornamentos futuristas.

Tres tensiones organizan la identidad:

| Estructura | Contrapunto |
| --- | --- |
| Precisión técnica | Calidez espacial |
| Masa arquitectónica | Aire y silencio |
| Movimiento inmersivo | Interfaz sobria |

## Principios visuales

### 1. El marco construye la imagen

El grid, los márgenes, las líneas y los encuadres evocan sistemas constructivos. Deben ordenar la fotografía, no decorarla. Los bordes aparecen donde explican una unión, un límite o una lectura.

### 2. La fotografía demuestra

Los proyectos reales son la evidencia principal. Se priorizan vistas de arquitectura, encuentros de perfiles, reflejos controlados, materialidad y relación interior/exterior. Las imágenes grandes establecen atmósfera; los detalles cercanos prueban calidad.

### 3. El contraste cambia el espacio

Light y dark son estados narrativos de una misma identidad. Light comunica apertura, luz natural y detalle. Dark comunica inmersión, proceso, profundidad y precisión. El cambio se vincula al contenido y no requiere un toggle.

### 4. La interfaz habla bajo

Controles, labels y metadata son contenidos y exactos. El protagonismo pertenece al mensaje, la arquitectura y la transición espacial. Se evita la acumulación de chips, brillos, transparencias y bordes.

### 5. El detalle recompensa

Microinteracciones, cambios de luz, máscaras y movimiento diferencial aparecen al observar o avanzar. No compiten simultáneamente por atención.

## Color

La paleta v0.1 utiliza neutros minerales, azul principal y celeste de apoyo provisionales, respetando la preferencia declarada por azul, celeste y blanco. Su función es probar jerarquías, contraste y transición light/dark; los valores exactos deben reemplazarse con los del manual existente.

- **Base mineral:** canvas y superficies de baja saturación, evitando blanco y negro absolutos.
- **Tinta:** contraste alto para titulares y contenido esencial.
- **Metal:** neutros intermedios para metadata, líneas y superficies técnicas.
- **Azul principal:** acción, foco e información prioritaria; uso contenido.
- **Celeste de apoyo:** luz, profundidad o superficie secundaria; no se usa automáticamente para texto.
- **Media:** la fotografía conserva protagonismo; overlays se aplican sólo por legibilidad o continuidad narrativa.

Nunca se consume un valor hexadecimal directamente. Las composiciones usan roles como `surface.canvas`, `text.primary`, `border.subtle`, `action.primary` y sus equivalentes oscuros. Reemplazar una paleta exige verificar contraste, no sólo cambiar códigos.

## Tipografía

Hasta recibir o seleccionar familias definitivas, la identidad se define por comportamiento:

- **Display:** sans de construcción precisa, gran escala, peso regular o medio, tracking levemente cerrado.
- **Texto:** sans de alta legibilidad, ancho neutro, ritmo sereno y pesos limitados.
- **Dato:** estilo compacto para medidas, categorías, índices y captions; puede usar cifras tabulares sin convertir toda la identidad en una estética técnica.
- **Jerarquía:** contraste por escala y espacio antes que por exceso de pesos.
- **Mayúsculas:** sólo para navegación corta, labels y datos; nunca para párrafos extensos.

Los roles `font.display`, `font.body` y `font.data` permiten reemplazar las familias desde un único contrato.

## Composición

- Grid recomendado para explorar: 12 columnas en desktop, 6 en tablet y 4 en mobile.
- El contenido mantiene líneas de alineación persistentes entre secciones.
- Las áreas de gran escala alternan con bloques compactos de evidencia o datos.
- La asimetría debe conservar un contrapeso visible.
- El espacio vacío es estructural; no se rellena para aumentar densidad.
- Los radios se limitan a tres grados: técnico, componente y media. No todas las superficies necesitan radio.
- Las líneas finas y separadores se usan como juntas constructivas, nunca como marco universal.

## Profundidad

La profundidad sigue cuatro planos con responsabilidades estables:

1. **Background:** tono ambiental, luz y continuidad.
2. **Content:** información legible y controles.
3. **Media:** fotografía, video o materialidad protagonista.
4. **Foreground:** recortes y detalles puntuales que conectan planos.

Blur, sombras y transparencias serán discretos. Un elemento sólo cruza límites de sección si ayuda a narrar continuidad.

## Fotografía y media

- Priorizar arquitectura real de Aluminica y detalles constructivos.
- Buscar luz lateral, reflejos controlados y geometrías claras.
- Alternar escala urbana/arquitectónica con escala de material y unión.
- Evitar stock aspiracional genérico, renders sin declarar o imágenes con tratamiento inmobiliario excesivo.
- Reservar espacio negativo según la composición de texto prevista.
- Los recortes transparentes deben provenir de material adecuado; no se simulan con recursos de baja calidad.
- Video y secuencias sólo se justifican si aportan proceso, transformación o percepción espacial.

## Iconografía e interfaz

- Iconos lineales, geométricos y ópticamente corregidos.
- Trazos y esquinas coherentes con los radios del sistema.
- Iconos siempre acompañados por nombre accesible cuando ejecutan una acción.
- Botones primarios sólidos y escasos; secundarios y ghost preservan la calma visual.
- Los estados se expresan con más de una señal, nunca sólo color.

## Identidad verbal

La voz debe ser concreta, segura y conocedora. Explica beneficios mediante decisiones, materiales, procesos y resultados observables.

- Preferir precisión sobre grandilocuencia.
- Usar frases breves en titulares y contexto suficiente en cuerpo.
- Evitar “líderes”, “revolucionario”, “la mejor calidad” y otras afirmaciones sin evidencia.
- Nombrar sistemas, proyectos y soluciones de forma consistente.
- Combinar lenguaje arquitectónico comprensible con detalle técnico útil.

## Responsive

Desktop construye inmersión mediante escala y relación entre planos. Mobile preserva el orden narrativo, el contraste y la evidencia, pero puede reducir pinning, capas simultáneas y desplazamiento diferencial. La prioridad móvil es claridad táctil y continuidad; no reproducir literalmente una coreografía de escritorio.

## Lo que esta identidad no es

- Una estética espacial o de ciencia ficción literal.
- Glassmorphism como recurso dominante.
- Un catálogo oscuro y monocromático.
- Una plantilla de arquitectura con fotografías intercambiables.
- Una demostración constante de efectos de scroll.

## Pendientes para cierre

- Validación del concepto rector con el responsable de Aluminica.
- Logo primario y variantes reales.
- Paleta oficial, si existe.
- Familias tipográficas licenciadas o selección definitiva.
- Inventario y derechos de fotografías, videos y proyectos.
- Mensajes de marca, servicios prioritarios y pruebas de credibilidad.
