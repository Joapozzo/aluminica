# Registro de assets requeridos

No hay assets disponibles confirmados todavía. Las necesidades siguientes derivan de la narrativa V1; describen funciones y especificaciones, no inventan el contenido de las imágenes.

## Formato de registro

```text
ASSET_REQUIRED:
- id:
- tema / contenido:
- fuente preferida: Aluminica | proyecto real | cliente | profesional | producción específica
- uso previsto:
- resolución mínima recomendada:
- orientación / aspect ratio:
- espacio negativo / composición:
- recorte o transparencia:
- tratamiento responsive:
- derechos / autorización:
- estado: requerido | disponible | en producción | aprobado
- notas:
```

## Inventario

| ID | Asset | Uso | Estado |
| --- | --- | --- | --- |
| BRAND-001 | Logo primario vectorial | Header, footer y marca general | Requerido |
| BRAND-002 | Variante inversa y monocromática | Superficies dark y usos de una tinta | Requerido |
| BRAND-003 | Isotipo, si existe | Favicon y espacios compactos | Por confirmar |
| BRAND-004 | Paleta oficial, si existe | Reemplazo de tokens provisionales | Por confirmar |
| BRAND-005 | Archivos/licencias tipográficas, si existen | Roles display, body y data | Por confirmar |
| MEDIA-001 | Inventario de fotografías de proyectos | Narrativa, portfolio y evidencia | Requerido |
| MEDIA-002 | Detalles de perfiles, uniones y terminaciones | Prueba de precisión/materialidad | Requerido |
| MEDIA-003 | Video o secuencias de proceso disponibles | Evaluación para escenas inmersivas | Opcional |
| MEDIA-004 | Imagen hero de proyecto emblemático | Apertura/LCP; original horizontal y crop mobile viable | Requerido |
| MEDIA-005 | 3–5 covers de proyectos autorizados | Evidencia y portfolio | Requerido o narrativa alternativa aprobada |
| MEDIA-006 | Foto de proceso, taller o instalación | Sección Precisión | Requerido |
| MEDIA-007 | Posters y variantes mobile de todo video aprobado | Fallback y performance | Condicional |
| SEO-001 | Imagen social 1200 × 630 | Open Graph | Requerido para publicación |

Los slots técnicos correspondientes al logo están centralizados en [`../../brand/assets.json`](../../brand/assets.json).
El uso narrativo y las adaptaciones se detallan en [`../04-content-assets/asset-plan.md`](../04-content-assets/asset-plan.md).
