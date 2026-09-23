import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

export function Legacy() {
  return (
    <section className="legacy section-shell" id="trayectoria" aria-labelledby="legacy-title">
      <Image className="legacy__image" data-legacy-image src="/media/projects/modulos-habitacionales/modulos-habitacionales-01.webp" alt="Módulo habitacional construido por Aluminica" fill sizes="100vw" />
      <div className="legacy__overlay" aria-hidden="true" />
      <div className="legacy__mark" data-legacy-mark aria-hidden="true">50+</div>
      <div className="container legacy__content">
        <SectionHeading
          id="legacy-title"
          label="Empresa familiar · Desde la década del 70"
          title={<>Más de 50 años<br /><span className="title-accent">construyendo confianza.</span></>}
          body="Aluminica reúne tres generaciones dedicadas a la carpintería de aluminio y la herrería. Conocemos los materiales, el taller y la obra; por eso podemos diseñar, fabricar e instalar soluciones que funcionen y duren."
          light
        />
        <div className="legacy__facts" data-reveal>
          <div><strong>50+</strong><span>años de experiencia</span></div>
          <div><strong>03</strong><span>generaciones de oficio</span></div>
          <div><strong>10</strong><span>tipos de soluciones a medida</span></div>
        </div>
      </div>
    </section>
  );
}
