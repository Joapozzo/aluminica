import Image from "next/image";
import { CatalogIndex } from "./CatalogIndex";
import { SectionHeading } from "./SectionHeading";

const frames = [
  { src: "/stock/pergola.webp", kicker: "Sombra", title: "Exteriores para disfrutar todo el año", alt: "Detalle de pérgola moderna de aluminio" },
  { src: "/stock/glass-doors.webp", kicker: "Apertura", title: "Interior y exterior, mejor conectados", alt: "Puertas plegables de vidrio y aluminio abiertas" },
  { src: "/stock/staircase.webp", kicker: "Circulación", title: "Recorridos seguros, hechos a medida", alt: "Escalera contemporánea con estructura metálica" },
  { src: "/stock/facade-detail.webp", kicker: "Protección", title: "Fachadas que protegen y renuevan", alt: "Detalle azul de fachada metálica contemporánea" },
];

export function Projects() {
  return (
    <>
      <section className="projects work-reel section-shell" id="trabajos" aria-labelledby="projects-title">
        <div className="container projects__intro">
          <SectionHeading
            id="projects-title"
            label="Ideas para transformar"
            title={
              <>
                Mirá todo lo que podés hacer <span className="title-accent">con tus espacios.</span>
              </>
            }
            body="Abrir un ambiente, sumar sombra, mejorar un acceso o aprovechar un lugar que hoy no estás usando. Recorré cuatro posibilidades concretas."
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
                <article className={`work-frame work-frame--${index + 1}`} key={frame.title} data-gallery-frame>
                  <div className="work-frame__image">
                    <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 760px) 94vw, 70vw" />
                  </div>
                  <div className="work-frame__copy">
                    <span>
                      0{index + 1} / {frame.kicker}
                    </span>
                    <h3>{frame.title}</h3>
                  </div>
                </article>
              ))}
              <div className="work-reel__exit" aria-hidden="true">
                <span>Distintas soluciones.</span>
                <span className="title-accent">Beneficios que se viven.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CatalogIndex
        id="projects-index-title"
        label="Aplicaciones"
        title={
          <>
            Cada espacio puede
            <br />
            <span className="title-accent">funcionar mejor.</span>
          </>
        }
        body="Explorá referencias de aluminio y herrería aplicadas a aperturas, exteriores, circulaciones y fachadas."
        tone="cream"
        cta={{ href: "/proyectos", label: "Ver todas las referencias" }}
        items={frames.map((frame) => ({
          href: "/proyectos",
          name: frame.title,
          meta: frame.kicker,
        }))}
      />
    </>
  );
}
