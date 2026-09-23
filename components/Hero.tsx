import Image from "next/image";
import { ButtonLink } from "./ButtonLink";
import { whatsappUrl } from "../lib/site";

export function Hero() {
  return (
    <section className="hero-track" id="inicio" aria-labelledby="hero-title">
      <div className="hero">
        <Image
          className="hero__poster"
          src="/media/hero/aluminica-obras-drone-poster.webp"
          alt="Obra de Aluminica vista desde el aire"
          fill
          priority
          quality={82}
          sizes="100vw"
        />
        <video
          className="hero__image hero__video"
          data-hero-image
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero/aluminica-obras-drone-poster.webp"
          aria-hidden="true"
        >
          <source src="/media/hero/aluminica-obras-drone.mp4" type="video/mp4" />
        </video>
        <div className="hero__wash" data-hero-wash />

        <div className="hero__content" data-hero-copy>
          <p className="eyebrow">Aluminio + herrería a medida · Córdoba</p>
          <h1 id="hero-title">
            <span className="hero-line">
              <span data-hero-line>Proyectos a medida</span>
            </span>
            <span className="hero-line">
              <span data-hero-line>
                <span className="title-accent">en aluminio</span>
              </span>
            </span>
            <span className="hero-line">
              <span data-hero-line>
                <span className="title-accent">y herrería.</span>
              </span>
            </span>
          </h1>
          <div className="hero__bottom">
            <p>Diseñamos, fabricamos e instalamos aberturas, cerramientos, portones, pérgolas y estructuras para viviendas, comercios y obras en Córdoba.</p>
            <ButtonLink href={whatsappUrl} variant="outline" external>
              Cotizar mi proyecto
            </ButtonLink>
          </div>
          <ul className="hero__proof" aria-label="Trayectoria de Aluminica">
            <li><strong>50+</strong><span>años de experiencia</span></li>
            <li><strong>03</strong><span>generaciones de oficio</span></li>
            <li><strong>A medida</strong><span>diseño y fabricación</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
