import Image from "next/image";
import { CatalogIndex } from "./CatalogIndex";
import { SectionHeading } from "./SectionHeading";

const frames = [
  { src: "/media/projects/revestimientos-wpc/revestimientos-wpc-02.webp", kicker: "Revestimientos WPC", title: "Frentes renovados con terminaciones precisas", alt: "Frente residencial revestido en WPC por Aluminica" },
  { src: "/media/projects/aberturas-de-aluminio/aberturas-de-aluminio-02.webp", kicker: "Aberturas de aluminio", title: "Aberturas fabricadas para cada espacio", alt: "Aberturas de aluminio fabricadas e instaladas por Aluminica" },
  { src: "/media/projects/pergolas-y-galerias/pergolas-y-galerias-02.webp", kicker: "Pérgolas y galerías", title: "Estructuras para disfrutar el exterior", alt: "Galería con estructura metálica realizada por Aluminica" },
  { src: "/media/projects/barandas-y-escaleras/barandas-y-escaleras-01.webp", kicker: "Barandas y escaleras", title: "Recorridos seguros, hechos a medida", alt: "Baranda metálica instalada por Aluminica" },
  { src: "/media/projects/rejas-y-portones/rejas-y-portones-01.webp", kicker: "Rejas y portones", title: "Accesos que protegen y acompañan la arquitectura", alt: "Portón metálico fabricado por Aluminica" },
  { src: "/media/projects/modulos-habitacionales/modulos-habitacionales-01.webp", kicker: "Módulos habitacionales", title: "Sistemas modulares resueltos de punta a punta", alt: "Módulo habitacional fabricado por Aluminica" },
];

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
