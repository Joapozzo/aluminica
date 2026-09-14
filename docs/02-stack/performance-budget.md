# Presupuesto de performance v1

## Objetivo

Los valores siguientes son gates de ingeniería, no promesas basadas en una máquina local. Se verifican por plantilla, dispositivo y condiciones representativas; después del lanzamiento se gobiernan por el percentil 75 de datos reales.

## Core Web Vitals

| Métrica | Gate interno | Límite “good” de referencia |
| --- | ---: | ---: |
| LCP | ≤ 2.0 s en laboratorio móvil objetivo | ≤ 2.5 s en p75 |
| INP | ≤ 150 ms en pruebas controladas | ≤ 200 ms en p75 |
| CLS | ≤ 0.05 | ≤ 0.10 en p75 |

El gate interno deja margen para variaciones de dispositivo, red y terceros. Los umbrales públicos vigentes y su evaluación en p75 se basan en [Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds).

## Transferencia inicial

| Recurso | Presupuesto objetivo comprimido |
| --- | ---: |
| JavaScript propio + dependencias para carga inicial | ≤ 130 KiB gzip |
| CSS crítico y global | ≤ 35 KiB gzip |
| Fuentes iniciales | ≤ 100 KiB total |
| Asset LCP mobile | ≤ 180 KiB como objetivo |
| Asset LCP desktop | ≤ 280 KiB como objetivo |
| Total inicial antes de interacción, sin video | ≤ 700 KiB mobile |

Son objetivos iniciales. Si una fotografía crítica necesita excederlos para evitar degradación visible, se documentará el tradeoff y se recuperará presupuesto en otra categoría.

## Límites de arquitectura

- Máximo dos familias tipográficas; preferentemente archivos variables y sólo los subsets necesarios.
- Ningún video pesado comienza a descargarse automáticamente en el primer viewport.
- GSAP y ScrollTrigger no se importan en el layout global si una ruta no los necesita.
- Una escena cliente no puede arrastrar la página completa a hidratación.
- Todo asset visual reserva dimensiones antes de cargar.
- Scripts de terceros requieren dueño, propósito, peso medido y estrategia de carga.

## Medición

### Antes de merge

- Build de producción sin errores.
- Comparación del bundle y recursos contra estos presupuestos.
- Lighthouse móvil en una configuración repetible.
- Playwright para rutas, viewport, teclado y reduced motion.
- Revisión manual de carga sin cache y con throttling.

### Antes de lanzar

- Prueba en al menos un móvil de gama media real.
- Validación de LCP, CLS, foco, navegación y formulario.
- Auditoría de imágenes, fuentes y scripts de terceros.
- Verificación sin JavaScript para contenido, navegación y datos de contacto esenciales.

### Después de lanzar

- Recoger datos de campo por ruta y tipo de dispositivo.
- Evaluar p75 durante una ventana con tráfico suficiente.
- Tratar regresiones de Core Web Vitals como defectos, no como tareas cosméticas.

## Excepciones

Una excepción debe registrar recurso, beneficio narrativo, costo medido, dispositivos afectados, fallback y fecha de revisión. “Se ve mejor” sin comparación verificable no es justificación suficiente.

