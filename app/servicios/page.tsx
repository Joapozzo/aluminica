import Link from "next/link";
import { InnerPageShell } from "../../components/InnerPageShell";
import { services } from "../../lib/content";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Servicios de herrería y aluminio en Córdoba",
  description: "Carpintería de aluminio, herrería, pérgolas, portones, rejas y estructuras a medida para viviendas, locales, talleres y obras en Córdoba.",
  path: "/servicios",
});

export default function ServicesPage() {
  return (
    <InnerPageShell>
      <section className="editorial-hero container" data-reveal>
        <p className="eyebrow">Aluminio + herrería</p>
        <h1>
          Todo lo que podemos
          <br />
          <span className="title-accent">resolver.</span>
        </h1>
        <p>Aberturas, cerramientos, portones, rejas, pérgolas, escaleras, revestimientos y estructuras fabricadas a medida para cada espacio.</p>
      </section>
      <section className="content-grid container" aria-label="Servicios">
        {services.map((service, index) => (
          <Link className="content-card" href={`/servicios/${service.slug}`} key={service.slug} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.name}</h2>
            <p>{service.summary}</p>
            <strong>Ver solución ↗</strong>
          </Link>
        ))}
      </section>
    </InnerPageShell>
  );
}
