function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercelHost) {
    return `https://${vercelHost.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Aluminica",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME?.trim() || "Aluminica",
  descriptor: "Herrería y carpintería de aluminio",
  locale: "es_AR",
  language: "es-AR",
  area: "Córdoba y Gran Córdoba",
  serviceArea: ["Córdoba", "Gran Córdoba"],
  siteUrl,
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",
  publicAddress: process.env.NEXT_PUBLIC_ADDRESS?.trim() ?? "",
  openingHours: process.env.NEXT_PUBLIC_OPENING_HOURS?.trim() ?? "",
  instagram: "https://www.instagram.com/_aluminica/",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "5493510000000",
  whatsappMessage: "Hola Aluminica, quiero cotizar un proyecto a medida y necesito asesoramiento.",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "",
  searchConsoleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? "",
} as const;

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.siteUrl}/`).toString();
}
