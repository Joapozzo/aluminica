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
          src="/stock/glass-doors.webp"
          alt="Carpintería de aluminio plegable abierta hacia una galería contemporánea"
          fill
          priority
          quality={78}
          sizes="100vw"
        />
        <div className="hero__wash" data-hero-wash />

        <div className="hero__content" data-hero-copy>
          <p className="eyebrow">Aluminio + herrería a medida · Córdoba</p>
          <h1 id="hero-title">
            <span className="hero-line">
              <span data-hero-line>Transformá tus espacios.</span>
            </span>
            <span className="hero-line">
              <span data-hero-line>
                <span className="title-accent">Ganá luz, seguridad</span>
              </span>
            </span>
            <span className="hero-line">
              <span data-hero-line>
                <span className="title-accent">y funcionalidad.</span>
              </span>
            </span>
          </h1>
          <div className="hero__bottom">
            <p>Aberturas, cerramientos, portones, pérgolas y estructuras a medida para viviendas, locales, talleres y obras.</p>
            <ButtonLink href={whatsappUrl} variant="outline" external>
              Contanos qué necesitás
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
