# Brief de Architecture

> Estado: **Architecture v1 definida**. Ver [`architecture-v1.md`](architecture-v1.md), [`components.md`](components.md), [`contracts.md`](contracts.md) y [`decisions.md`](decisions.md). Esta etapa no inicializó la aplicación.

## Objetivo de la etapa

Convertir Identity y Stack aprobados en contratos componibles. La arquitectura debe servir a la landing V1 y a futuras páginas sin generalizar prematuramente.

## Capas orientativas

1. **Primitives:** controles, texto, iconografía, media y fundamentos accesibles.
2. **Components:** composiciones pequeñas con variantes controladas.
3. **Patterns:** relaciones repetibles entre contenido, interacción y media.
4. **Sections:** unidades narrativas con propósito y ciclo de scroll.
5. **Layouts:** reglas espaciales y shells compartidos.
6. **Pages:** composición de contenido y narrativa, con mínima lógica propia.

## Contratos a definir

- Tokens de color, tipografía, spacing, grid, radios, capas, sombras y motion.
- Variantes por tamaño, estado, tema, interacción y contexto visual.
- Primitivas iniciales candidatas: Button, Input, Textarea, Select, Link, Badge, Tag, IconButton, Container, Section, Heading, Text, Media, Image y Video.
- Shells candidatos para página, sección, contenido, media, hero, split, grid, sticky, full-bleed y scroll.
- Contrato de media con dimensiones/aspect ratio declarados, sources responsivos, carga y fallback.
- Contrato de sección: propósito, entrada, desarrollo, transición, salida y adaptación mobile.
- Frontera entre animación CSS, motor de motion y estado de aplicación.
- Política para `prefers-reduced-motion` y experiencia sin JavaScript.

Los nombres anteriores son inventario conceptual; se crearán sólo las abstracciones que demuestren reutilización o consistencia reales.

## Reglas

- No duplicar componentes para resolver diferencias menores; usar variantes acotadas.
- No concentrar toda una sección compleja en un componente monolítico.
- No dividir elementos si la separación no mejora composición, legibilidad, pruebas o reutilización.
- Mantener semántica y accesibilidad dentro de las primitivas, sin ocultarlas tras APIs visuales ambiguas.
- Mantener el contenido indexable separado del enhancement visual.
- Diseñar desktop y mobile como expresiones relacionadas, no como una misma coreografía comprimida.

## Entregables esperados

- Mapa de capas y dependencias permitidas.
- Inventario inicial de tokens, primitivas, patrones, shells y secciones.
- Contratos de variantes, media, responsive y motion.
- Estrategia de contenido y expansión a servicios/proyectos.
- ADRs para decisiones con impacto transversal.

## Evaluación actual

- Mapa de capas, estructura futura y reglas de dependencias: definidos.
- Fronteras Server/Client y ownership de motion: definidos.
- Inventario inicial de primitivas, layouts, patterns y candidatos de secciones: definido.
- Contratos de marca, contenido, media, navegación, proyectos, formularios y escenas: definidos.
- Estrategia responsive, accesibilidad y expansión futura: definida.
- Contenido final, orden narrativo y assets reales: pendientes de Content & Assets.

