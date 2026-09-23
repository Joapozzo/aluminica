export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectCategory = {
  slug: string;
  name: string;
  description: string;
  images: ProjectImage[];
};

export const projectCategories: ProjectCategory[] = [
  {
    slug: "modulos-habitacionales",
    name: "Módulos habitacionales",
    description: "Estructuras modulares resueltas a medida, con fabricación metálica y cerramientos integrados.",
    images: [
      { src: "/media/projects/modulos-habitacionales/modulos-habitacionales-01.webp", alt: "Módulo habitacional fabricado e instalado por Aluminica" },
    ],
  },
  {
    slug: "frentes-de-asador",
    name: "Frentes de asador",
    description: "Frentes metálicos funcionales, resistentes y adaptados a cada quincho o galería.",
    images: [
      { src: "/media/projects/frentes-de-asador/frentes-de-asador-01.webp", alt: "Frente de asador metálico realizado por Aluminica" },
      { src: "/media/projects/frentes-de-asador/frentes-de-asador-02.webp", alt: "Detalle de frente de asador a medida realizado por Aluminica" },
    ],
  },
  {
    slug: "puertas-de-chapa",
    name: "Puertas de chapa",
    description: "Puertas de diseño propio para accesos seguros, con medidas y terminaciones personalizadas.",
    images: [
      { src: "/media/projects/puertas-de-chapa/puertas-de-chapa-01.webp", alt: "Puerta de chapa fabricada a medida por Aluminica" },
      { src: "/media/projects/puertas-de-chapa/puertas-de-chapa-02.webp", alt: "Puerta metálica de chapa instalada por Aluminica" },
    ],
  },
  {
    slug: "rejas-y-portones",
    name: "Rejas y portones",
    description: "Accesos y protecciones que combinan seguridad, funcionamiento y una estética cuidada.",
    images: [
      { src: "/media/projects/rejas-y-portones/rejas-y-portones-01.webp", alt: "Portón metálico fabricado e instalado por Aluminica" },
      { src: "/media/projects/rejas-y-portones/rejas-y-portones-02.webp", alt: "Reja metálica hecha a medida por Aluminica" },
    ],
  },
  {
    slug: "mobiliario",
    name: "Mobiliario",
    description: "Piezas metálicas especiales para sumar funcionalidad e identidad a los espacios.",
    images: [
      { src: "/media/projects/mobiliario/mobiliario-01.webp", alt: "Mobiliario metálico diseñado y fabricado por Aluminica" },
    ],
  },
  {
    slug: "revestimientos-wpc",
    name: "Revestimientos WPC",
    description: "Revestimientos de bajo mantenimiento para renovar y proteger frentes y exteriores.",
    images: [
      { src: "/media/projects/revestimientos-wpc/revestimientos-wpc-01.webp", alt: "Fachada revestida en WPC por Aluminica" },
      { src: "/media/projects/revestimientos-wpc/revestimientos-wpc-02.webp", alt: "Frente residencial con revestimiento WPC instalado por Aluminica" },
      { src: "/media/projects/revestimientos-wpc/revestimientos-wpc-03.webp", alt: "Detalle de frente terminado con revestimiento WPC" },
    ],
  },
  {
    slug: "pergolas-y-galerias",
    name: "Pérgolas y galerías",
    description: "Estructuras metálicas que amplían el uso de patios, cocheras y terrazas durante todo el año.",
    images: [
      { src: "/media/projects/pergolas-y-galerias/pergolas-y-galerias-01.webp", alt: "Pérgola metálica realizada por Aluminica" },
      { src: "/media/projects/pergolas-y-galerias/pergolas-y-galerias-02.webp", alt: "Galería con estructura metálica fabricada por Aluminica" },
      { src: "/media/projects/pergolas-y-galerias/pergolas-y-galerias-03.webp", alt: "Cochera con pérgola metálica instalada por Aluminica" },
    ],
  },
  {
    slug: "barandas-y-escaleras",
    name: "Barandas y escaleras",
    description: "Soluciones seguras y livianas, diseñadas para integrarse con la arquitectura de cada obra.",
    images: [
      { src: "/media/projects/barandas-y-escaleras/barandas-y-escaleras-01.webp", alt: "Baranda metálica realizada e instalada por Aluminica" },
      { src: "/media/projects/barandas-y-escaleras/barandas-y-escaleras-02.webp", alt: "Escalera metálica fabricada a medida por Aluminica" },
      { src: "/media/projects/barandas-y-escaleras/barandas-y-escaleras-03.webp", alt: "Detalle de escalera y baranda metálica de Aluminica" },
    ],
  },
  {
    slug: "aberturas-de-aluminio",
    name: "Aberturas de aluminio",
    description: "Aberturas fabricadas a medida para lograr buen funcionamiento, iluminación y terminaciones precisas.",
    images: [
      { src: "/media/projects/aberturas-de-aluminio/aberturas-de-aluminio-01.webp", alt: "Abertura corrediza de aluminio fabricada por Aluminica" },
      { src: "/media/projects/aberturas-de-aluminio/aberturas-de-aluminio-02.webp", alt: "Conjunto de aberturas de aluminio instalado por Aluminica" },
      { src: "/media/projects/aberturas-de-aluminio/aberturas-de-aluminio-03.webp", alt: "Aberturas de aluminio a medida en una obra terminada" },
    ],
  },
];
