import Image from "next/image";
import { InnerPageShell } from "../../components/InnerPageShell";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Referencias de aluminio y herrería",
  description: "Referencias visuales de aberturas, pérgolas, escaleras y fachadas para imaginar soluciones a medida en Córdoba.",
  path: "/proyectos",
});

const studies = [
  { title: "Exteriores para disfrutar todo el año", type: "Pérgolas y estructuras", image: "/stock/pergola.webp" },
  { title: "Aberturas que conectan los espacios", type: "Carpintería de aluminio", image: "/stock/glass-doors.webp" },
  { title: "Circulaciones seguras y a medida", type: "Escaleras y barandas", image: "/stock/staircase.webp" },
  { title: "Fachadas que protegen y renuevan", type: "Fachadas y revestimientos", image: "/stock/facade-detail.webp" },
];

export default function ProjectsPage() {
  return (
    <InnerPageShell>
      <section className="editorial-hero container" data-reveal>
        <p className="eyebrow">Referencias de aplicación</p>
        <h1>
          Ideas para transformar
          <br />
          <span className="title-accent">cada espacio.</span>
        </h1>
        <p>Estas imágenes son referencias visuales para explorar posibilidades de luz, apertura, protección y uso. Cada solución de Aluminica se desarrolla a medida del proyecto.</p>
      </section>
      <section className="project-list container">
        {studies.map((study, index) => (
          <article key={study.title} data-reveal>
            <div className="project-list__image">
              <Image src={study.image} alt={`Referencia arquitectónica: ${study.title}`} fill sizes="(max-width: 760px) 100vw, 68vw" />
            </div>
            <div>
              <span>
                0{index + 1} / {study.type}
              </span>
              <h2>{study.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </InnerPageShell>
  );
}
