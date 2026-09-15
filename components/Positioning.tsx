import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

const principles = [
  ["01", "Menos intermediarios", "Aluminio y herrería coordinados desde el mismo lugar."],
  ["02", "Más criterio en cada encuentro", "Cada pieza se piensa como parte del espacio, no como un agregado."],
  ["03", "Una respuesta para esa obra", "Medidas, materiales y resolución ajustados a cada necesidad real."],
];

export function Positioning() {
  return (
    <section className="positioning section-shell" aria-labelledby="positioning-title">
      <div className="container">
        <SectionHeading
          id="positioning-title"
          label="Una forma integral de trabajar"
          title={<><span className="title-light">El proyecto no viene</span> <span className="title-bold title-wide">por partes.</span><br /><span className="title-accent">Nosotros tampoco.</span></>}
          body="Cuando aluminio y herrería conversan desde el principio, la obra gana coherencia y vos ganás tiempo. Un solo equipo acompaña la idea, la resolución y cada detalle que hace que funcione."
        />
        <div className="positioning__visual" data-visual-reveal>
          <Image src="/stock/glass-house.jpg" alt="Casa contemporánea rodeada de vegetación con grandes paños de vidrio" fill sizes="(max-width: 760px) 90vw, 52vw" />
          <span className="positioning__disc" data-depth-float aria-hidden="true">UN SOLO<br />EQUIPO</span>
        </div>
        <div className="principles">
          {principles.map(([number, title, body]) => (
            <article className="principle" key={number} data-reveal>
              <span className="principle__number">{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
