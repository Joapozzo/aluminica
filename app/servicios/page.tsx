import Link from "next/link";
import { InnerPageShell } from "../../components/InnerPageShell";
import { services } from "../../lib/content";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({ title: "Servicios de herrería y aluminio en Córdoba", description: "Carpintería de aluminio, estructuras metálicas, pérgolas, portones, rejas y soluciones a medida para obras y viviendas en Córdoba.", path: "/servicios" });

export default function ServicesPage() {
  return <InnerPageShell><section className="editorial-hero container"><p className="eyebrow">Capacidades</p><h1>Un oficio.<br /><strong>Muchas formas de resolver.</strong></h1><p>Integramos aluminio y herrería para que cada parte del proyecto se piense, fabrique e instale con una misma lógica.</p></section><section className="content-grid container" aria-label="Servicios">{services.map((service, index) => <Link className="content-card" href={`/servicios/${service.slug}`} key={service.slug}><span>{String(index + 1).padStart(2, "0")}</span><h2>{service.name}</h2><p>{service.summary}</p><strong>Conocer la solución ↗</strong></Link>)}</section></InnerPageShell>;
}
