import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

const principles = [
  ["01", "Más luz y amplitud", "Aberturas y cerramientos que conectan mejor cada ambiente con el exterior."],
  ["02", "Más seguridad", "Portones, puertas y rejas que protegen sin descuidar el funcionamiento ni el diseño."],
  ["03", "Más espacio para usar", "Pérgolas y estructuras que vuelven útiles patios, galerías, terrazas y áreas de trabajo."],
];

export function Positioning() {
  return (
    <section className="positioning section-shell" aria-labelledby="positioning-title">
      <div className="container">
        <SectionHeading
          id="positioning-title"
          label="Soluciones a medida"
          title={<>Abrí. Protegé. Ampliá.<br /><span className="title-accent">Aprovechá cada espacio.</span></>}
          body="Combinamos aluminio y herrería para mejorar la luz, la seguridad y el uso de cada ambiente. Cada solución se define según el proyecto, las medidas y la necesidad real."
        />
        <div className="positioning__visual-track" data-positioning-track>
          <div className="positioning__stage" data-positioning-stage>
            <div className="positioning__visual" data-positioning-visual>
              <div className="positioning__media" data-visual-reveal>
                <Image src="/stock/glass-house.webp" alt="Casa contemporánea rodeada de vegetación con grandes paños de vidrio" fill sizes="(max-width: 760px) 90vw, 55vh" />
              </div>
              <span className="structure-note structure-note--left structure-note--profiles" data-structure-note aria-hidden="true">
                <span className="structure-note__copy">01 / Perfiles de aluminio</span>
                <span className="structure-note__line" data-note-line />
              </span>
              <span className="structure-note structure-note--right structure-note--glass" data-structure-note aria-hidden="true">
                <span className="structure-note__line" data-note-line />
                <span className="structure-note__copy">02 / Paños de vidrio</span>
              </span>
              <span className="structure-note structure-note--left structure-note--beam" data-structure-note aria-hidden="true">
                <span className="structure-note__copy">03 / Viga perimetral</span>
                <span className="structure-note__line" data-note-line />
              </span>
            </div>
            <div className="principles" data-principles>
              {principles.map(([number, title, body]) => (
                <article className="principle" key={number} data-principle data-reveal>
                  <span className="principle__number">{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
