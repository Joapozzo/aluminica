import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsEvent } from "../../../components/AnalyticsEvent.client";
import { InnerPageShell } from "../../../components/InnerPageShell";
import { JsonLd } from "../../../components/JsonLd";
import { getService, services } from "../../../lib/content";
import { buildMetadata } from "../../../lib/seo";
import { absoluteUrl, whatsappUrl } from "../../../lib/site";

const imagery: Record<string, string> = {
  "carpinteria-de-aluminio": "/stock/glass-doors.webp",
  "revestimientos-wpc": "/stock/facade-detail.webp",
  rejas: "/stock/welding.webp",
  "puertas-de-chapa": "/stock/welding.webp",
  "frentes-de-asador": "/stock/glass-house.webp",
  portones: "/stock/glass-house.webp",
  pergolas: "/stock/pergola.webp",
  barandas: "/stock/staircase.webp",
  escaleras: "/stock/staircase.webp",
  "estructuras-metalicas": "/stock/pergola-black.webp",
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({ title: `${service.name} en Córdoba`, description: service.summary, path: `/servicios/${service.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    areaServed: "Córdoba y Gran Córdoba",
    provider: { "@id": `${absoluteUrl("/")}#business` },
    url: absoluteUrl(`/servicios/${service.slug}`),
  };
  return (
    <InnerPageShell>
      <JsonLd data={schema} />
      <AnalyticsEvent name="service_view" label={service.slug} />
      <article>
        <section className="detail-hero container" data-reveal>
          <div>
            <p className="eyebrow">Solución a medida</p>
            <h1>{service.name}</h1>
            <p>{service.summary}</p>
            <a
              className="primary-link"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="whatsapp_click"
              data-analytics-label={`service_${service.slug}`}
            >
              Consultar este trabajo <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="detail-hero__image">
            <Image src={imagery[service.slug]} alt={`Referencia visual de ${service.name.toLowerCase()}`} fill priority sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
        </section>
        <section className="detail-info container" data-reveal>
          <div>
            <p className="eyebrow">Aplicaciones</p>
            <ul>
              {service.applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Cómo lo resolvemos</p>
            <ol>
              {service.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>
        <div className="detail-next container" data-reveal>
          <Link href="/servicios">← Ver todos los servicios</Link>
        </div>
      </article>
    </InnerPageShell>
  );
}
