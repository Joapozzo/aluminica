import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

const principles = [
  ["01", "Diseñamos", "Definimos la solución según el uso, el espacio, las medidas y las terminaciones que necesita cada proyecto."],
  ["02", "Fabricamos", "Trabajamos aluminio y hierro a medida, cuidando cada encuentro, mecanismo y detalle de terminación."],
  ["03", "Instalamos", "Llevamos la solución a obra y coordinamos el montaje para que funcione bien desde el primer día."],
];

export function Positioning() {
  return (
    <section className="positioning section-shell" aria-labelledby="positioning-title">
      <div className="container">
        <SectionHeading
          id="positioning-title"
          label="Qué hacemos"
          title={<>De la idea a la instalación.<br /><span className="title-accent">Todo, a medida.</span></>}
          body="Creamos soluciones nuevas y resolvemos necesidades concretas en aluminio y herrería. Cada proyecto se diseña, fabrica e instala según su espacio y su forma de uso."
        />
        <div className="positioning__visual-track" data-positioning-track>
          <div className="positioning__stage" data-positioning-stage>
            <div className="positioning__visual" data-positioning-visual>
              <div className="positioning__media" data-visual-reveal>
                <Image src="/media/projects/pergolas-y-galerias/pergolas-y-galerias-02.webp" alt="Pérgolas, barandas y aberturas realizadas por Aluminica" fill sizes="(max-width: 760px) 100vw, 76vw" />
              </div>
              <span className="structure-note structure-note--left structure-note--profiles" data-structure-note aria-hidden="true">
                <span className="structure-note__copy">01 / Pérgolas</span>
                <span className="structure-note__line" data-note-line />
              </span>
              <span className="structure-note structure-note--right structure-note--glass" data-structure-note aria-hidden="true">
                <span className="structure-note__line" data-note-line />
                <span className="structure-note__copy">02 / Aberturas</span>
              </span>
              <span className="structure-note structure-note--left structure-note--beam" data-structure-note aria-hidden="true">
                <span className="structure-note__copy">03 / Barandas</span>
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
