# Criterio de motion design

La landing usa MotionPrompts como biblioteca de principios, no como plantilla visual.

## Referencias adoptadas

- **Voltlites Pinned Hero Zoom-Out Reveal**: se extrajo el principio de alejar el plano inicial durante el scroll. Se redujo a una sola imagen real y una transición de escala/opacidad para mantener rendimiento y foco.
- **Sticky Stacking Cards on Scroll**: se adoptó la lectura por capas para agrupar servicios relacionados. La versión propia usa `position: sticky` nativo y animación mínima, sin scroll artificial.
- **Oversized Year Counter-Scrolled**: inspiró el `50+` como dato editorial de gran escala, con desplazamiento sutil en sentido contrario al scroll.
- **Contact Form Reveal** y **Frame Collapse Reveal**: aportaron el principio de revelar el cierre como un nuevo plano; se implementó con máscara CSS y un formulario integrado, sin overlay invasivo.

## Referencias descartadas

- **3D Circular Image Gallery**: exige muchas imágenes y una escena 3D que no aporta a la historia actual.
- **Fanned Steps on Arc**: supone una secuencia ordenada; los servicios de Aluminica son complementarios, no pasos.
- **MaximaTherapy Sticky Cards**: el recorrido de 700svh y los flips 3D alargan la experiencia sin mejorar la comprensión.
- **Wodniack Work Section Scroll**: el costo de WebGL/Three.js no se justifica con el material disponible.

## Implementación

La lógica vive en un único componente cliente, usa `gsap.context()`, registra y limpia `ScrollTrigger`, anima principalmente `transform`, `opacity` y `clip-path`, y queda desactivada cuando el sistema solicita movimiento reducido. En mobile se acortan recorridos y se elimina el sticky prolongado del hero.
