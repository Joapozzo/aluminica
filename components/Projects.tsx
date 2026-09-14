import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

const frames = [
  { src: "/stock/pergola.jpg", kicker: "Sombra", title: "Estructuras que dibujan el cielo", alt: "Detalle de pérgola moderna de aluminio" },
  { src: "/stock/glass-doors.jpg", kicker: "Apertura", title: "Límites que desaparecen", alt: "Puertas plegables de vidrio y aluminio abiertas" },
  { src: "/stock/staircase.jpg", kicker: "Recorrido", title: "Metal que sostiene el movimiento", alt: "Escalera contemporánea con estructura metálica" },
  { src: "/stock/facade-detail.jpg", kicker: "Envolvente", title: "Precisión convertida en fachada", alt: "Detalle azul de fachada metálica contemporánea" },
];

export function Projects() {
  return (
    <section className="projects work-reel section-shell" id="trabajos" aria-labelledby="projects-title">
      <div className="container projects__intro">
        <SectionHeading
          id="projects-title"
          label="Materia en movimiento"
          title={<><span className="title-light">Del plano</span> <span className="title-bold title-wide">al espacio.</span></>}
          body="El metal no termina en una pieza: modifica la luz, el recorrido y la manera de habitar. Deslizá la mirada por cuatro formas de hacerlo trabajar."
          light
        />
      </div>

      <div className="work-reel__viewport">
        <div className="work-reel__progress" aria-hidden="true">
          <span>01</span>
          <span className="work-reel__progress-line"><i data-gallery-progress /></span>
          <span>04</span>
        </div>
        <div className="work-reel__track" data-gallery-track>
          {frames.map((frame, index) => (
            <article className={`work-frame work-frame--${index + 1}`} key={frame.title} data-gallery-frame>
              <div className="work-frame__image">
                <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 760px) 94vw, 70vw" />
              </div>
              <div className="work-frame__copy">
                <span>0{index + 1} / {frame.kicker}</span>
                <h3>{frame.title}</h3>
              </div>
            </article>
          ))}
          <div className="work-reel__exit" aria-hidden="true">
            <span>Cuatro escalas.</span>
            <strong>Una misma precisión.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
