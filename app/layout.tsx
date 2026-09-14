import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aluminica-cordoba.pozzojoa.chatgpt.site"),
  title: "Aluminica | Herrería y carpintería de aluminio en Córdoba",
  description: "Soluciones integrales y a medida en herrería y carpintería de aluminio para obras, profesionales y hogares en Córdoba y Gran Córdoba.",
  keywords: ["herrería Córdoba", "carpintería de aluminio Córdoba", "estructuras metálicas", "pérgolas", "portones"],
  icons: { icon: "/brand/aluminica-mark.png" },
  openGraph: {
    title: "Una obra. Un equipo. Todo el metal resuelto.",
    description: "Herrería y carpintería de aluminio en Córdoba.",
    type: "website",
    locale: "es_AR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aluminica — Herrería y carpintería de aluminio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Una obra. Un equipo. Todo el metal resuelto.",
    description: "Herrería y carpintería de aluminio en Córdoba.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
