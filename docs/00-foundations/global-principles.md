# Principios globales

## Alcance y autoridad

Este documento es la fuente normativa transversal para Identity, Stack, Architecture y Development. Registra intención y restricciones; no define todavía una landing, una identidad final ni una selección tecnológica definitiva.

## 1. Sistema antes que página

La landing V1 será la primera consumidora del sistema, no su única razón de existencia. El proyecto debe favorecer reutilización real en UI, layouts, secciones, motion, tipografía, spacing, containers, navegación, formularios, media y comportamiento responsive.

Las abstracciones deben aportar consistencia, variantes, accesibilidad, mantenibilidad o comportamiento compartido. No se crearán abstracciones artificiales ni se repetirá HTML estilizado cuando exista una primitiva razonable.

La composición seguirá, de forma orientativa, esta progresión:

`primitives → components → patterns → sections → layouts → pages`

El objetivo es un sistema componible, evitando tanto componentes monolíticos como atomización sin beneficio.

## 2. Estructura espacial coherente

Se deberán definir shells reutilizables que conserven alineación, ritmo, márgenes, gutters, ancho máximo, consistencia vertical y respuesta entre viewports. Las secciones podrán diferir visualmente sin perder una estructura espacial común.

Posibles conceptos a evaluar durante Architecture: `PageShell`, `SectionShell`, `ContentShell`, `MediaShell`, `HeroShell`, `SplitSection`, `GridSection`, `StickySection`, `FullBleedSection` y `ScrollSection`. Estos nombres son ejemplos, no una API aprobada.

## 3. Dirección de experiencia

La experiencia debe sentirse arquitectónica, precisa, espacial, moderna, tecnológica, sobria, premium y confiable. La dirección visual inicial incluye fotografía protagonista, superficies amplias, composición editorial, aire, grids estrictos, asimetría equilibrada, cards, radios controlados, contraste de escala y tipografía protagonista.

Las referencias son insumos, no plantillas a copiar. La inspiración “NASA” significa inmersión, profundidad, storytelling, precisión, exploración y movimiento; no implica copiar su identidad visual.

## 4. Light, dark y profundidad

La identidad debe poder vivir sobre superficies claras y oscuras. Se explorarán profundidad, contraste, superficies, transparencias controladas, blur e iluminación sutil cuando tengan una función clara. Esto no prescribe glassmorphism ni un selector de tema.

La composición podrá utilizar planos de fondo, contenido, media y primer plano. Fotografías, recortes transparentes, materiales, tipografía, overlays, máscaras, blur y sombras sutiles podrán conectar secciones y producir profundidad.

## 5. Motion y scroll como sistema narrativo

Motion es parte de la identidad digital y debe diseñarse desde el inicio junto con performance. Los elementos relevantes podrán tener entradas, transiciones o respuestas al scroll, con jerarquía y sin movimiento constante o gratuito.

El movimiento debe dirigir la mirada, conectar secciones, comunicar profundidad, establecer ritmo y reforzar el relato. El scroll debe concebirse como experiencia continua, no como una suma de bloques independientes. Cada sección tendrá propósito, inicio, desarrollo, transición y salida.

Recursos como reveals, clipping, máscaras, parallax, composiciones sticky o pinned, escalado de imágenes, profundidad, movimiento diferencial, revelado tipográfico, secuencias de imágenes, transiciones entre secciones y movimiento horizontal controlado son posibilidades a evaluar; no son requisitos de uso.

## 6. Performance

Performance es una prioridad de primer nivel. La ambición visual no justifica degradar significativamente la experiencia. La solución deberá buscar excelente carga inicial, mínimo JavaScript en cliente, imágenes y fuentes optimizadas, responsive images, lazy loading estratégico, carga progresiva de recursos pesados, prevención de layout shifts y animaciones eficientes, con Core Web Vitals profesionales.

## 7. SEO y accesibilidad

La arquitectura debe permitir posicionamiento orgánico profesional y futuras páginas de servicios y proyectos. Más adelante se contemplarán metadata, HTML semántico, jerarquía correcta de headings, contenido indexable, Open Graph, sitemap, robots, canonical, datos estructurados cuando correspondan, imágenes optimizadas, performance, accesibilidad y SEO local.

No se realizará todavía keyword research definitivo. Las keywords existentes se consideran hipótesis.

## 8. Assets

Orden de prioridad: material real de Aluminica, fotografías reales de proyectos, recursos provistos por el cliente, assets profesionales y, finalmente, recursos producidos o generados específicamente.

No se usarán silenciosamente imágenes genéricas ni se inventarán recursos faltantes. Toda necesidad deberá registrarse en [`../assets/requirements.md`](../assets/requirements.md) con tema, resolución, orientación, composición, uso y necesidad de transparencia o recorte.

## 9. Mobile y accesibilidad de movimiento

La experiencia no puede depender de desktop. Mobile puede requerir distinta composición, intensidad, profundidad, movimiento y triggers, manteniendo la misma identidad. No se limitará a comprimir la experiencia de escritorio.

Toda estrategia de motion deberá contemplar `prefers-reduced-motion`, degradación funcional si JavaScript tarda o falla y un costo compatible con los objetivos de performance.

## 10. Mapa de consumo

| Tema | Identity | Stack | Architecture | Development |
| --- | --- | --- | --- | --- |
| Norte visual, light/dark, profundidad | Define lenguaje | Evalúa soporte | Modela tokens/capas | Ejecuta y valida |
| Reutilización, variantes, shells | Define coherencia | Habilita herramientas | Define sistema | Implementa sin duplicación |
| Motion y scroll | Define intención | Selecciona capacidades | Define patrones | Implementa, degrada y prueba |
| Performance | Fija límites visuales | Evalúa costo | Decide fronteras | Mide y optimiza |
| SEO y accesibilidad | Protege legibilidad | Evalúa soporte | Preserva semántica | Implementa y audita |
| Assets | Define criterio | Define pipeline | Define contratos media | Optimiza y entrega |
| Mobile | Define equivalencia de identidad | Evalúa soporte | Define adaptaciones | Implementa y prueba |

