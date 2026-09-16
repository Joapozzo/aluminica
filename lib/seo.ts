import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

export const defaultDescription = "Soluciones integrales y a medida en herrería y carpintería de aluminio para obras, profesionales y hogares en Córdoba y Gran Córdoba.";

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.descriptor}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og.png")] },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    image: absoluteUrl("/og.png"),
    description: defaultDescription,
    areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: [siteConfig.instagram],
    ...(siteConfig.publicEmail ? { email: siteConfig.publicEmail } : {}),
    ...(siteConfig.publicAddress ? { address: siteConfig.publicAddress } : {}),
    ...(siteConfig.openingHours ? { openingHours: siteConfig.openingHours } : {}),
  };
}
