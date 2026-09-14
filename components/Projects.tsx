import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section className="projects section-shell" id="trabajos" aria-labelledby="projects-title">
      <div className="container projects__intro">
        <SectionHeading
          id="projects-title"
          label="Trabajo seleccionado · Balcones de la Plaza"
          title="La mejor carta de presentación ocupa espacio."
          body="No mostramos renders de intención. Mostramos decisiones construidas: estructura, sombra, cerramiento y material encontrándose en una misma obra."
          light
        />
      </div>

      <div className="project-stage" data-project-stage>
        <div className="project-stage__primary media-frame" data-project-image>
          <Image
            src="/images/balcones-plaza-02.jpg"
            alt="Pérgola de WPC con estructura de perfil UPN realizada en Balcones de la Plaza"
            fill
            sizes="(max-width: 760px) 100vw, 66vw"
          />
        </div>
        <div className="project-stage__secondary media-frame" data-project-image>
          <Image
            src="/images/balcones-plaza-01.jpg"
            alt="Vista integral de la intervención de Aluminica en Balcones de la Plaza"
            fill
            sizes="(max-width: 760px) 70vw, 25vw"
          />
        </div>
        <div className="project-stage__caption" data-reveal>
          <p className="section-label"><span aria-hidden="true">+</span>Proyecto 01</p>
          <h3>Balcones<br />de la Plaza</h3>
          <dl>
            <div><dt>Resolución</dt><dd>Pérgola WPC + herrería</dd></div>
            <div><dt>Estructura</dt><dd>Perfil UPN 120</dd></div>
            <div><dt>Enfoque</dt><dd>Intervención integral</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
