# Contratos v1

Los siguientes contratos son modelos conceptuales TypeScript. Se implementarán y validarán en Development; no representan todavía archivos de aplicación.

## Marca

```ts
type LogoSlot = "primary" | "inverse" | "monochrome" | "mark";

interface BrandAsset {
  src: string | null;
  fallbackText?: string;
  status: "required" | "optional" | "approved";
}
```

Los componentes consultan slots; no reciben rutas de logo repetidas por página. Un build de producción falla si un slot usado y requerido permanece vacío.

## Media

```ts
interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: { x: number; y: number };
  placeholder?: string;
  credit?: string;
}

interface VideoAsset {
  src: string;
  poster: ImageAsset;
  width: number;
  height: number;
  captions?: string;
  preload: "none" | "metadata";
}
```

Una imagen decorativa declara `alt: ""`. El texto alternativo describe propósito o evidencia, no repite el caption.

## Navegación

```ts
interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface SiteSettings {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  locale: "es-AR";
  navigation: NavigationItem[];
  contact: ContactDetails;
  social: NavigationItem[];
}
```

Header, menú móvil y footer consumen la misma fuente de navegación, aunque presenten composiciones diferentes.

## Proyectos y servicios

```ts
interface Project {
  slug: string;
  title: string;
  summary: string;
  location?: string;
  year?: number;
  services: string[];
  cover: ImageAsset;
  gallery?: ImageAsset[];
  featured: boolean;
}

interface Service {
  slug: string;
  name: string;
  summary: string;
  detail?: string;
  media?: ImageAsset;
}
```

No se inventan location, year, métricas o servicios. Un campo opcional ausente cambia la composición sin mostrar placeholders públicos.

## Secciones

Cada sección recibe contenido específico y un pequeño contrato transversal:

```ts
interface SectionFrame {
  id: string;
  surface: "light" | "dark" | "media";
  spacing?: "compact" | "default" | "spacious";
  headingId?: string;
}
```

No se crea un `GenericSection` con decenas de props ni un JSON renderer universal. Los contratos `HeroContent`, `FeaturedProjectsContent` o equivalentes nacen al aprobar el contenido real.

## Motion

```ts
interface MotionSceneDefinition {
  id: string;
  intent: "assemble" | "open" | "depth" | "continuity";
  priority: 1 | 2 | 3 | 4;
  trigger: "enter" | "progress" | "interaction";
  desktop: MotionStrategy;
  mobile: MotionStrategy;
  reduced: "none" | "instant" | "short-fade";
  fallback: "static-final-state";
}

interface MotionStrategy {
  enabled: boolean;
  scrub?: boolean;
  pin?: boolean;
  distance?: "short" | "medium" | "scene";
}
```

La definición documenta intención y política. Selectores, refs y timelines pertenecen a la implementación local de la escena y no se almacenan como contenido.

## Formulario de contacto

```ts
interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  consent?: boolean;
}

type ContactResult =
  | { ok: true; reference?: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; formError?: string };

interface ContactDelivery {
  send(input: ContactInput): Promise<ContactResult>;
}
```

La UI no conoce email, CRM ni proveedor anti-spam. El adapter se valida en servidor y traduce errores externos a resultados seguros.

## Metadata

```ts
interface PageSeo {
  title: string;
  description: string;
  canonicalPath: string;
  image?: ImageAsset;
  noIndex?: boolean;
}
```

Structured data se deriva sólo de información real y validada. No se agregan reviews, ratings o atributos comerciales no comprobados.

## Fuente de contenido

V1 usa módulos locales tipados. Si aparece un CMS, un adapter transforma su respuesta a estos contratos; los componentes no reciben modelos específicos del proveedor.

