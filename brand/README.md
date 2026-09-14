# Contrato de marca reemplazable

Esta carpeta centraliza los valores provisionales que todavía no fueron entregados por el cliente. El cuestionario confirma que existen logo y referencias/manual de marca, y que la preferencia cromática es azul, celeste y blanco; faltan los archivos y valores exactos. Esta carpeta no inventa un logo.

## Archivos

- [`tokens.json`](tokens.json): roles semánticos de color, tipografía, geometría y motion.
- [`assets.json`](assets.json): slots para los archivos reales de logo, favicon y marca social.

## Regla de consumo futuro

La implementación deberá consumir nombres semánticos, nunca valores provisionales dispersos. Por ejemplo, una acción usa `color.light.action.primary`, no un azul hexadecimal; el header usa `logo.primary`, no una ruta escrita directamente en el componente.

## Cómo reemplazar material

1. Incorporar el archivo real en el pipeline de assets que Architecture defina.
2. Actualizar únicamente el slot o token correspondiente.
3. Verificar contraste, tamaños mínimos, áreas de seguridad y variantes light/dark.
4. Ejecutar regresión visual y accesibilidad antes de aprobar el cambio.

Los tokens actuales son una base de exploración. Cambiar un color primitivo no garantiza por sí solo que todos los pares semánticos sigan siendo accesibles.
