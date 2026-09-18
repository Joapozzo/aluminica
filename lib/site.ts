const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aluminica-cordoba.pozzojoa.chatgpt.site").replace(/\/$/, "");

export const siteConfig = {
  name: "Aluminica",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "Aluminica",
  descriptor: "Herrería y carpintería de aluminio",
  locale: "es_AR",
  language: "es-AR",
  area: "Córdoba y Gran Córdoba",
  serviceArea: ["Córdoba", "Gran Córdoba"],
  siteUrl,
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  publicAddress: process.env.NEXT_PUBLIC_ADDRESS ?? "",
  openingHours: process.env.NEXT_PUBLIC_OPENING_HOURS ?? "",
  instagram: "https://www.instagram.com/_aluminica/",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5493510000000",
  whatsappMessage: "Hola Aluminica, quiero transformar un espacio y necesito asesoramiento.",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  searchConsoleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
} as const;

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.siteUrl}/`).toString();
}
