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
          src="/images/balcones-plaza-01.jpg"
          alt="Pérgola y estructura metálica realizadas por Aluminica en Balcones de la Plaza"
          fill
          priority
          quality={78}
          sizes="100vw"
        />
        <div className="hero__wash" data-hero-wash />
        <div className="hero__grid" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="Aluminica, inicio">
            <Image src="/brand/aluminica-logo.png" alt="Aluminica" width={184} height={80} priority />
          </a>
          <nav aria-label="Navegación principal">
            <a href="#trabajos">Trabajos</a>
            <a href="#soluciones">Soluciones</a>
            <a href="#trayectoria">Trayectoria</a>
            <a className="header-cta" href="#contacto">Hablemos <span aria-hidden="true">↗</span></a>
          </nav>
        </header>

        <div className="hero__content" data-hero-copy>
          <p className="eyebrow">Herrería + carpintería de aluminio · Córdoba</p>
          <h1 id="hero-title" aria-label="Una obra. Un equipo. Todo el metal resuelto.">
            <span className="hero-line"><span data-hero-line>Una obra. Un equipo.</span></span>
            <span className="hero-line hero-line--muted"><span data-hero-line>Todo el metal resuelto.</span></span>
          </h1>
          <div className="hero__bottom">
            <p>Soluciones integrales y a medida para arquitectura, construcción y hogares. Más de cinco décadas haciendo que las ideas encajen.</p>
            <ButtonLink href={whatsappUrl} variant="outline" external>Contanos tu proyecto</ButtonLink>
          </div>
        </div>

        <div className="hero__meta" aria-hidden="true">
          <span>01 / 06</span><span>Desde los años 70</span><span>Deslizá para explorar</span>
        </div>
      </div>
    </section>
  );
}
