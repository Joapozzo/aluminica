import Image from "next/image";
import { ButtonLink } from "./ButtonLink";
import { whatsappUrl } from "../lib/site";

export function Hero() {
  return (
    <section className="hero-track" id="inicio" aria-labelledby="hero-title">
      <div className="hero">
        <Image
          className="hero__image"
          data-hero-image
          src="/stock/glass-doors.jpg"
          alt="Carpintería de aluminio plegable abierta hacia una galería contemporánea"
          fill
          priority
          quality={78}
          sizes="100vw"
        />
        <div className="hero__wash" data-hero-wash />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__cutout hero__cutout--facade" data-depth-layer="1" aria-hidden="true">
          <Image src="/stock/facade-detail.jpg" alt="" fill sizes="28vw" />
        </div>
        <div className="hero__cutout hero__cutout--pergola" data-depth-layer="2" aria-hidden="true">
          <Image src="/stock/pergola-black.jpg" alt="" fill sizes="22vw" />
        </div>

        <div className="hero__content" data-hero-copy>
          <p className="eyebrow">Herrería + carpintería de aluminio · Córdoba</p>
          <h1 id="hero-title" aria-label="Una obra. Un equipo. Todo el metal resuelto.">
            <span className="hero-line"><span data-hero-line><strong>Una obra.</strong> <em>Un equipo.</em></span></span>
            <span className="hero-line hero-line--muted"><span data-hero-line><strong>Todo el metal</strong> <em>resuelto.</em></span></span>
          </h1>
          <div className="hero__bottom">
            <p>Soluciones integrales y a medida para arquitectura, construcción y hogares. Más de cinco décadas haciendo que las ideas encajen.</p>
            <ButtonLink href={whatsappUrl} variant="outline" external>Contanos tu proyecto</ButtonLink>
          </div>
        </div>

        <div className="hero__meta" aria-hidden="true">
          <span>01 / 06</span><span>Desde los años 70</span><span>Deslizá para explorar</span>
        </div>
        <div className="hero__ticker" data-hero-ticker aria-hidden="true">
          <span>ALUMINIO</span><i>+</i><span>HIERRO</span><i>+</i><span>ARQUITECTURA</span><i>+</i><span>DETALLE</span><i>+</i><span>ALUMINIO</span><i>+</i><span>HIERRO</span>
        </div>
      </div>
    </section>
  );
}
