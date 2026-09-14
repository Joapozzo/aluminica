import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    number: "01",
    lead: "Aluminio",
    title: "que abre",
    image: "/stock/glass-doors.jpg",
    description: "Carpinterías que conectan interior y exterior con luz, hermeticidad y una presencia precisa.",
    items: ["Carpintería de aluminio", "Aberturas", "Puertas"],
  },
  {
    number: "02",
    lead: "Hierro",
    title: "que protege",
    image: "/stock/welding.jpg",
    description: "Seguridad resuelta sin esconder el diseño: piezas robustas que pertenecen a la arquitectura.",
    items: ["Portones", "Rejas", "Puertas de chapa"],
  },
  {
    number: "03",
    lead: "Estructuras",
    title: "que expanden",
    image: "/stock/pergola-black.jpg",
    description: "Sistemas a medida para sumar sombra, recorrido, soporte y nuevos modos de usar cada ambiente.",
    items: ["Pérgolas", "Barandas", "Escaleras", "Estructuras metálicas"],
  },
  {
    number: "04",
    lead: "Terminaciones",
    title: "que transforman",
    image: "/stock/staircase.jpg",
    description: "El último plano también construye: superficies y frentes que cambian cómo se vive el espacio.",
    items: ["Revestimientos WPC", "Frentes de asador"],
  },
];

export function Services() {
  return (
    <section className="services section-shell" id="soluciones" aria-labelledby="services-title">
      <div className="container services__layout">
        <div className="services__sticky">
          <SectionHeading
            id="services-title"
            label="Soluciones"
            title={<><span className="title-light">Un oficio.</span><br /><span className="title-bold title-wide">Muchas formas</span><br /><span className="title-accent">de resolver.</span></>}
            body="No vendemos piezas sueltas: construimos respuestas que se relacionan entre sí y simplifican la obra."
          />
        </div>
        <div className="service-stack">
          {groups.map((group) => (
            <article className="service-panel" data-service-panel key={group.number}>
              <div className="service-panel__top"><span>{group.number}</span><span>Aluminica / Soluciones</span></div>
              <div className="service-panel__media"><Image src={group.image} alt="" fill sizes="(max-width: 760px) 100vw, 38vw" /></div>
              <div className="service-panel__content">
                <h3><strong>{group.lead}</strong> <span>{group.title}</span></h3>
                <p>{group.description}</p>
                <ul>{group.items.map((item) => <li key={item}>{item}<span aria-hidden="true">↗</span></li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
