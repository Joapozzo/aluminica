export const siteConfig = {
  name: "Aluminica",
  area: "Córdoba y Gran Córdoba",
  instagram: "https://www.instagram.com/_aluminica/",
  whatsappNumber: "5493510000000",
  whatsappMessage:
    "Hola Aluminica, quiero consultar por una solución para mi proyecto.",
} as const;

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

