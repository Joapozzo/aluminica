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
import { IconArrowUpRight } from "../../../components/Icons";

const imagery: Record<string, string> = {
  "carpinteria-de-aluminio": "/media/projects/aberturas-de-aluminio/aberturas-de-aluminio-02.webp",
  "revestimientos-wpc": "/media/projects/revestimientos-wpc/revestimientos-wpc-02.webp",
  rejas: "/media/projects/rejas-y-portones/rejas-y-portones-02.webp",
  "puertas-de-chapa": "/media/projects/puertas-de-chapa/puertas-de-chapa-01.webp",
  "frentes-de-asador": "/media/projects/frentes-de-asador/frentes-de-asador-01.webp",
  portones: "/media/projects/rejas-y-portones/rejas-y-portones-01.webp",
  pergolas: "/media/projects/pergolas-y-galerias/pergolas-y-galerias-02.webp",
  barandas: "/media/projects/barandas-y-escaleras/barandas-y-escaleras-01.webp",
  escaleras: "/media/projects/barandas-y-escaleras/barandas-y-escaleras-02.webp",
  "estructuras-metalicas": "/media/projects/modulos-habitacionales/modulos-habitacionales-01.webp",
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
              Cotizar este proyecto <IconArrowUpRight size={16} />
            </a>
          </div>
          <div className="detail-hero__image">
            <Image src={imagery[service.slug]} alt={`Trabajo de ${service.name.toLowerCase()} realizado por Aluminica`} fill priority sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
        </section>
        <section className="detail-info container" data-reveal>
          <div>
            <p className="eyebrow">Qué podemos hacer</p>
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
