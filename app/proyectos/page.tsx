import Image from "next/image";
import { InnerPageShell } from "../../components/InnerPageShell";
import { projectCategories } from "../../lib/projectGallery";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Trabajos de aluminio y herrería",
  description: "Trabajos reales de aberturas, revestimientos WPC, pérgolas, portones, escaleras y estructuras realizados por Aluminica en Córdoba.",
  path: "/proyectos",
});

export default function ProjectsPage() {
  return (
    <InnerPageShell>
      <section className="editorial-hero container" data-reveal>
        <p className="eyebrow">Proyectos a medida</p>
        <h1>
          Soluciones para crear
          <br />
          <span className="title-accent">tu próximo proyecto.</span>
        </h1>
        <p>Una selección de trabajos reales de Aluminica, ordenados por categoría. Cada solución fue diseñada, fabricada e instalada a medida.</p>
      </section>
      <section className="project-categories container">
        {projectCategories.map((category, index) => (
          <article className="project-category" key={category.slug} data-reveal>
            <header>
              <span>
                0{index + 1} / Trabajo real
              </span>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </header>
            <div className={`project-category__grid project-category__grid--${category.images.length}`}>
              {category.images.map((image) => (
                <div className="project-category__image" key={image.src}>
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </InnerPageShell>
  );
}
