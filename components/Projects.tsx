import type { ReactNode } from "react";
import Image from "next/image";
import { CatalogIndex } from "./CatalogIndex";
import { SectionHeading } from "./SectionHeading";

type TitlePart = { text: string; mark?: boolean };

const frames: {
  src: string;
  kicker: string;
  title: TitlePart[];
  alt: string;
}[] = [
  {
    src: "/media/projects/puertas-de-chapa/puertas-de-chapa-01.webp",
    kicker: "Puertas de chapa",
    title: [
      { text: "Accesos diseñados como " },
      { text: "parte", mark: true },
      { text: " " },
      { text: "de la arquitectura", mark: true },
    ],
    alt: "Puerta de chapa de acceso fabricada a medida por Aluminica",
  },
  {
    src: "/media/projects/frentes-de-asador/frentes-de-asador-01.webp",
    kicker: "Frentes de asador",
    title: [
      { text: "Frentes integrales para " },
      { text: "quinchos", mark: true },
      { text: " " },
      { text: "y galerías", mark: true },
    ],
    alt: "Frente de asador metálico integral realizado por Aluminica",
  },
  {
    src: "/media/projects/pergolas-y-galerias/pergolas-y-galerias-01.webp",
    kicker: "Pérgolas y galerías",
    title: [
      { text: "Galerías que amplían " },
      { text: "la forma", mark: true },
      { text: " " },
      { text: "de vivir el exterior", mark: true },
    ],
    alt: "Galería con estructura metálica y cielorraso de madera realizada por Aluminica",
  },
  {
    src: "/media/projects/revestimientos-wpc/revestimientos-wpc-02.webp",
    kicker: "Revestimientos WPC",
    title: [
      { text: "Frentes renovados con " },
      { text: "terminaciones", mark: true },
      { text: " " },
      { text: "precisas", mark: true },
    ],
    alt: "Frente residencial revestido en WPC por Aluminica",
  },
  {
    src: "/media/projects/aberturas-de-aluminio/aberturas-de-aluminio-02.webp",
    kicker: "Aberturas de aluminio",
    title: [
      { text: "Aberturas fabricadas " },
      { text: "para", mark: true },
      { text: " " },
      { text: "cada espacio", mark: true },
    ],
    alt: "Aberturas de aluminio fabricadas e instaladas por Aluminica",
  },
  {
    src: "/media/projects/barandas-y-escaleras/barandas-y-escaleras-01.webp",
    kicker: "Barandas y escaleras",
    title: [
      { text: "Recorridos seguros, " },
      { text: "hechos", mark: true },
      { text: " " },
      { text: "a medida", mark: true },
    ],
    alt: "Baranda metálica instalada por Aluminica",
  },
  {
    src: "/media/projects/rejas-y-portones/rejas-y-portones-01.webp",
    kicker: "Rejas y portones",
    title: [
      { text: "Accesos que " },
      { text: "protegen", mark: true },
      { text: " y acompañan " },
      { text: "la arquitectura", mark: true },
    ],
    alt: "Portón metálico fabricado por Aluminica",
  },
  {
    src: "/media/projects/modulos-habitacionales/modulos-habitacionales-01.webp",
    kicker: "Módulos habitacionales",
    title: [
      { text: "Sistemas modulares " },
      { text: "resueltos", mark: true },
      { text: " " },
      { text: "de punta a punta", mark: true },
    ],
    alt: "Módulo habitacional fabricado por Aluminica",
  },
];

function renderTitle(parts: TitlePart[]): ReactNode {
  return parts.map((part, index) =>
    part.mark ? (
      <span className="text-mark" data-text-mark key={index}>
        {part.text}
      </span>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

export function Projects() {
  return (
    <>
      <CatalogIndex
        id="needs-index-title"
        label="¿Qué necesitás hacer?"
        title={
          <>
            Encontrá la solución
            <br />
            <span className="title-accent">para tu proyecto.</span>
          </>
        }
        body="Elegí la necesidad que más se parece a la tuya. Si todavía no sabés cuál es la mejor solución, te ayudamos a definirla."
        tone="cream"
        cta={{ href: "#contacto", label: "Cotizar mi proyecto" }}
        items={[
          { href: "/servicios/carpinteria-de-aluminio", name: "Quiero cerrar una galería o un quincho", meta: "Cerramientos" },
          { href: "/servicios/carpinteria-de-aluminio", name: "Necesito una abertura de aluminio", meta: "Aberturas" },
          { href: "/servicios/portones", name: "Quiero hacer un portón", meta: "Accesos" },
          { href: "/servicios/pergolas", name: "Necesito una pérgola", meta: "Exteriores" },
          { href: "/servicios/barandas", name: "Quiero una baranda o escalera", meta: "Circulación" },
          { href: "/servicios/estructuras-metalicas", name: "Necesito una estructura metálica", meta: "Estructuras" },
        ]}
      />

      <section className="projects work-reel section-shell" id="trabajos" aria-labelledby="projects-title">
        <div className="container projects__intro">
          <SectionHeading
            id="projects-title"
            label="Trabajos reales"
            title={
              <>
                Soluciones pensadas <span className="title-accent">para cada necesidad.</span>
              </>
            }
            body="Una selección de trabajos diseñados, fabricados e instalados por Aluminica. Cada solución se desarrolla a medida del proyecto."
            light
          />
        </div>

        <div className="work-reel__scroll" data-gallery-scroll>
          <div className="work-reel__viewport">
            <div className="work-reel__progress" aria-hidden="true">
              <i data-gallery-progress />
            </div>
            <div className="work-reel__track" data-gallery-track>
              {frames.map((frame, index) => (
                <article className={`work-frame work-frame--${(index % 4) + 1}`} key={frame.kicker} data-gallery-frame>
                  <div className="work-frame__image">
                    <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 760px) 94vw, 70vw" />
                  </div>
                  <div className="work-frame__copy">
                    <span className="work-frame__kicker">
                      {String(index + 1).padStart(2, "0")} / {frame.kicker}
                    </span>
                    <h3>{renderTitle(frame.title)}</h3>
                  </div>
                </article>
              ))}
              <div className="work-reel__exit" aria-hidden="true">
                <span>Trabajo real.</span>
                <span className="title-accent">Resultado a medida.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
