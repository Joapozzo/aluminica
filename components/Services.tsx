import Image from "next/image";
import Link from "next/link";
import { CatalogIndex } from "./CatalogIndex";
import { SectionHeading } from "./SectionHeading";
import { services as servicePages } from "../lib/content";

const groups = [
  {
    number: "01",
    lead: "Aluminio",
    title: "que conecta",
    image: "/stock/glass-doors.webp",
    description: "Aberturas y cerramientos que suman luz, mejoran la conexión entre ambientes y protegen del exterior.",
    items: ["Carpintería de aluminio", "Aberturas", "Puertas"],
  },
  {
    number: "02",
    lead: "Herrería",
    title: "que protege",
    image: "/stock/welding.webp",
    description: "Portones, rejas y puertas resistentes para controlar accesos y proteger cada espacio.",
    items: ["Portones", "Rejas", "Puertas de chapa"],
  },
  {
    number: "03",
    lead: "Estructuras",
    title: "que amplían",
    image: "/stock/pergola-black.webp",
    description: "Pérgolas, escaleras y estructuras que suman sombra, circulación y superficie aprovechable.",
    items: ["Pérgolas", "Barandas", "Escaleras", "Estructuras metálicas"],
  },
  {
    number: "04",
    lead: "Terminaciones",
    title: "que renuevan",
    image: "/stock/staircase.webp",
    description: "Revestimientos y frentes que actualizan la imagen, facilitan el mantenimiento y completan cada proyecto.",
    items: ["Revestimientos WPC", "Frentes de asador"],
  },
];

export function Services() {
  return (
    <>
      <section className="services section-shell" id="soluciones" aria-labelledby="services-title">
        <div className="container services__layout">
          <div className="services__sticky">
            <SectionHeading
              id="services-title"
              label="Qué podemos hacer"
              title={
                <>
                  Soluciones para transformar
                  <br />
                  <span className="title-accent">cada espacio.</span>
                </>
              }
              body="Desde una abertura hasta una estructura completa: cada trabajo se diseña según el espacio, el uso y las medidas reales."
            />
          </div>
          <div className="service-stack">
            {groups.map((group) => (
              <article className="service-panel" data-service-panel key={group.number}>
                <div className="service-panel__top">
                  <span>{group.number}</span>
                </div>
                <div className="service-panel__media">
                  <Image src={group.image} alt="" fill sizes="(max-width: 760px) 100vw, 38vw" />
                </div>
                <div className="service-panel__content">
                  <h3>
                    {group.lead} {group.title}
                  </h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.items.map((item) => {
                      const page = servicePages.find(
                        (service) => service.name === item || service.name.replace(" de ", " ") === item,
                      );
                      return (
                        <li key={item}>
                          {page ? (
                            <Link href={`/servicios/${page.slug}`}>
                              {item}
                              <span aria-hidden="true">↗</span>
                            </Link>
                          ) : (
                            <span>{item}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CatalogIndex
        id="services-index-title"
        label="Todas las soluciones"
        title={
          <>
            Todo lo que podemos
            <br />
            <span className="title-accent">resolver.</span>
          </>
        }
        body="Explorá servicios de aluminio y herrería para viviendas, locales, talleres, remodelaciones y obras nuevas."
        tone="ink"
        cta={{ href: "/servicios", label: "Ver el índice completo" }}
        items={servicePages.map((service) => ({
          href: `/servicios/${service.slug}`,
          name: service.name,
          meta: "Córdoba",
        }))}
      />
    </>
  );
}
