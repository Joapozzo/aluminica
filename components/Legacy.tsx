import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

export function Legacy() {
  return (
    <section className="legacy section-shell" id="trayectoria" aria-labelledby="legacy-title">
      <Image className="legacy__image" data-legacy-image src="/stock/welding.jpg" alt="Trabajo de soldadura sobre una estructura de acero" fill sizes="100vw" />
      <div className="legacy__overlay" aria-hidden="true" />
      <div className="legacy__mark" data-legacy-mark aria-hidden="true">50+</div>
      <div className="container legacy__content">
        <SectionHeading
          id="legacy-title"
          label="Empresa familiar · Córdoba"
          title={<><span className="title-light">La experiencia</span> <span className="title-bold title-wide">no envejece</span><br /><span className="title-accent">cuando sigue aprendiendo.</span></>}
          body="Empezamos en la década del 70. Tres generaciones después, el oficio sigue siendo el mismo compromiso: entender el problema, encontrar la forma y hacer que dure. Lo que cambió es todo lo que hoy podemos imaginar con el metal."
          light
        />
        <div className="legacy__facts" data-reveal>
          <div><strong>50+</strong><span>años resolviendo proyectos</span></div>
          <div><strong>02</strong><span>oficios integrados</span></div>
          <div><strong>01</strong><span>equipo de principio a fin</span></div>
        </div>
      </div>
    </section>
  );
}
