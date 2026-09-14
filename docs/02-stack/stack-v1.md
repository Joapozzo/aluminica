# Stack v1

## Resultado

Se aprueba una base **Next.js + TypeScript + Tailwind CSS + GSAP**, con renderizado estático/servidor por defecto y JavaScript cliente limitado a interacción real. La landing no será una SPA puramente cliente.

Las versiones exactas se fijarán en el lockfile al iniciar Development usando releases estables compatibles en ese momento; no se dejan rangos flotantes sin lockfile.

## Stack aprobado

| Capa | Decisión | Responsabilidad |
| --- | --- | --- |
| Runtime | Node.js LTS vigente al iniciar Development | Build, tooling y runtime de servidor si se necesita |
| Framework | Next.js, App Router | Rutas, layouts, prerender, metadata, imágenes y fuentes |
| UI | React con Server Components por defecto | Composición y render sin enviar JS innecesario |
| Lenguaje | TypeScript en modo estricto | Contratos para contenido, variantes, assets y motion |
| Estilos | Tailwind CSS v4 + CSS nativo | Tokens, layout, responsive, estados y animaciones simples |
| Motion | GSAP 3 + ScrollTrigger; integración React oficial | Timelines, scrub, pinning y transformaciones coordinadas |
| Variantes | Class Variance Authority, si Architecture confirma utilidad | Variantes tipadas sin duplicar componentes |
| Calidad | ESLint + Prettier | Reglas estáticas y formato consistente |
| Unit/component | Vitest + Testing Library | Lógica y comportamiento de primitivas críticas |
| End-to-end | Playwright + axe-core | Flujos, responsive, accesibilidad y reduced motion |

Las herramientas de pruebas son dependencias de desarrollo y no forman parte del bundle entregado al visitante.

## Estrategia de renderizado

1. El contenido indexable se renderiza en servidor y se prerenderiza siempre que sea posible.
2. Server Components son la opción predeterminada.
3. Un componente se vuelve cliente sólo si necesita estado del navegador, medición de layout, eventos avanzados o motion imperativo.
4. Las fronteras cliente se colocan lo más abajo posible; una escena animada no convierte toda la página en Client Component.
5. La primera pintura contiene el orden, contenido y estilos finales necesarios. GSAP mejora la experiencia después de hidratar.

No se activa todavía `output: "export"`. La landing podrá ser mayormente estática, pero conservar el runtime de Next evita bloquear optimización de imágenes, formularios y futuras rutas dinámicas. Si hosting exige exportación estática, se registrará un ADR y se resolverán sus limitaciones explícitamente.

## Estilos y tokens

- [`../../brand/tokens.json`](../../brand/tokens.json) permanece como fuente conceptual y reemplazable.
- Architecture definirá una transformación controlada hacia CSS variables y namespaces `@theme` de Tailwind.
- Los componentes consumirán roles semánticos; nunca valores de paleta o rutas de logo escritos ad hoc.
- CSS resuelve layout, responsive, hover/focus, transiciones simples y reduced motion.
- Las clases arbitrarias repetidas se promueven a token, variante o patrón; una excepción única puede permanecer local.
- No se adopta una librería visual cerrada: la identidad requiere primitivas propias sobre HTML semántico.

Tailwind v4 usa variables de tema que también se exponen como CSS variables, por lo que encaja con el contrato de marca reemplazable sin acoplar la identidad a una página concreta.

## Motion

### CSS

CSS controla estados simples, fades breves, color, foco, press, hover y transiciones que no requieren coordinación temporal compleja.

### GSAP

GSAP se limita a:

- timelines entre múltiples elementos;
- relaciones vinculadas al progreso de scroll;
- pinning justificado;
- parallax por planos;
- máscaras y transformaciones coordinadas;
- continuidad entre secciones.

ScrollTrigger se cargará sólo en rutas o escenas que lo usen. Las animaciones se crearán dentro de un scope con cleanup/revert seguro. Cada escena tendrá variante desktop, mobile y reduced motion conforme a [`../01-identity/motion.md`](../01-identity/motion.md).

No se usarán smooth-scroll artificial, hijacking del scroll ni librerías extra de animación durante V1 salvo ADR aprobado.

## Imágenes, video y fuentes

- `next/image` será la vía predeterminada para raster, con dimensiones o ratio conocidos y `sizes` explícito.
- El hero/LCP no usa lazy loading; el resto se carga según distancia y prioridad narrativa.
- Assets remotos deberán declarar hosts permitidos de forma específica.
- SVG se reserva para logos, iconos y gráficos realmente vectoriales.
- Recortes transparentes se entregan en formatos y tamaños adaptados al viewport; no se envía un master gigante a todos los dispositivos.
- Video usa HTML nativo y poster optimizado; sin autoplay pesado above-the-fold.
- `next/font` alojará localmente las fuentes elegidas para eliminar requests externos y reducir layout shift.

## Contenido

V1 comienza con contenido local tipado y separado de la estructura visual. Las secciones reciben modelos de contenido; no incrustan textos comerciales en primitivas.

No se incorpora CMS hasta confirmar editores, frecuencia, workflow y volumen. El modelo debe permitir agregar posteriormente un adapter sin reescribir componentes.

## Formularios

- HTML semántico y validación accesible en cliente y servidor.
- Entrega a través de Route Handler o Server Action sólo en la frontera correspondiente.
- El proveedor de email/CRM y anti-spam permanece detrás de un adapter.
- Nunca se exponen secretos al cliente ni se depende de JavaScript para entender errores esenciales.
- Rate limiting, honeypot y/o challenge se decidirán con el proveedor y el riesgo real.

## SEO

- Metadata API y archivos convencionales de App Router para title, description, canonical, Open Graph, favicon, robots y sitemap.
- Jerarquía semántica visible desde el HTML inicial.
- JSON-LD generado desde modelos tipados cuando se confirme la entidad y sus datos reales.
- URLs y arquitectura listas para proyectos y servicios, aunque V1 sea una landing.
- No se generan keywords definitivas antes de la investigación correspondiente.

## Analytics y observabilidad

- Core Web Vitals se mide en campo al publicar y se complementa con pruebas de laboratorio.
- El proveedor de analytics no podrá ser dependencia estructural de componentes.
- Scripts de terceros se difieren y requieren presupuesto explícito.
- Marketing tags y trackers no entran por defecto; se evalúan por valor, privacidad y costo.

## Despliegue

La aplicación debe poder desplegarse en un host compatible con Next.js y Node.js. El proveedor no se elige sin conocer dominio, cuentas existentes, formularios, residencia de datos, previews y presupuesto.

Requisitos del proveedor:

- HTTPS, CDN y compresión moderna;
- previews por cambio;
- variables de entorno por ambiente;
- rollback sencillo;
- logs de errores y métricas de rendimiento;
- soporte completo para la modalidad de Next elegida.

## Dependencias que no se adoptan por defecto

- UI kits visuales completos.
- Gestores de estado global.
- Cliente de fetching para contenido estático.
- Smooth-scroll, WebGL o Three.js.
- CMS, plataforma de video o CDN de imágenes externos.
- Dos motores de animación superpuestos.

Cualquiera puede incorporarse después si una necesidad verificable supera su costo.

## Fuentes técnicas consultadas

- [Next.js App Router](https://nextjs.org/docs/app)
- [Server y Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Optimización de imágenes](https://nextjs.org/docs/app/getting-started/images)
- [Optimización de fuentes](https://nextjs.org/docs/app/getting-started/fonts)
- [Metadata y Open Graph](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Exportación estática](https://nextjs.org/docs/app/guides/static-exports)
- [Variables de tema de Tailwind CSS](https://tailwindcss.com/docs/theme)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP context y cleanup](https://gsap.com/docs/v3/GSAP/gsap.context%28%29/)

