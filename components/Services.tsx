import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    number: "01",
    title: "Aluminio que abre",
    description: "Carpinterías que conectan interior y exterior con luz, hermeticidad y una presencia precisa.",
    items: ["Carpintería de aluminio", "Aberturas", "Puertas"],
  },
  {
    number: "02",
    title: "Hierro que protege",
    description: "Seguridad resuelta sin esconder el diseño: piezas robustas que pertenecen a la arquitectura.",
    items: ["Portones", "Rejas", "Puertas de chapa"],
  },
  {
    number: "03",
    title: "Estructuras que expanden",
    description: "Sistemas a medida para sumar sombra, recorrido, soporte y nuevos modos de usar cada ambiente.",
    items: ["Pérgolas", "Barandas", "Escaleras", "Estructuras metálicas"],
  },
  {
    number: "04",
    title: "Terminaciones que transforman",
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
            title="Un oficio. Muchas formas de resolver."
            body="No vendemos piezas sueltas: construimos respuestas que se relacionan entre sí y simplifican la obra."
          />
        </div>
        <div className="service-stack">
          {groups.map((group) => (
            <article className="service-panel" data-service-panel key={group.number}>
              <div className="service-panel__top"><span>{group.number}</span><span>Aluminica / Soluciones</span></div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>{group.items.map((item) => <li key={item}>{item}<span aria-hidden="true">↗</span></li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
