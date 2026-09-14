import { SectionHeading } from "./SectionHeading";

export function Legacy() {
  return (
    <section className="legacy section-shell" id="trayectoria" aria-labelledby="legacy-title">
      <div className="legacy__mark" data-legacy-mark aria-hidden="true">50+</div>
      <div className="container legacy__content">
        <SectionHeading
          id="legacy-title"
          label="Empresa familiar · Córdoba"
          title="La experiencia no envejece cuando sigue aprendiendo."
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
