import type { Metadata, Viewport } from "next";
import { Archivo_Narrow, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "../components/Analytics.client";
import { AppShell } from "../components/AppShell.client";
import { absoluteUrl, siteConfig } from "../lib/site";
import { defaultDescription } from "../lib/seo";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#29535c",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "Aluminica | Herrería y carpintería de aluminio en Córdoba", template: "%s | Aluminica" },
  description: defaultDescription,
  keywords: ["herrería Córdoba", "carpintería de aluminio Córdoba", "aberturas de aluminio", "cerramientos", "pérgolas", "portones", "estructuras metálicas"],
  icons: { icon: [{ url: "/brand/aluminica-favicon.png", type: "image/png", sizes: "512x512" }] },
  alternates: { canonical: absoluteUrl("/") },
  verification: siteConfig.searchConsoleVerification ? { google: siteConfig.searchConsoleVerification } : undefined,
  openGraph: {
    title: "Transformá tus espacios. Ganá luz, seguridad y funcionalidad.",
    description: "Soluciones de aluminio y herrería a medida para viviendas, locales, talleres y obras en Córdoba.",
    type: "website",
    locale: "es_AR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aluminica — Herrería y carpintería de aluminio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transformá tus espacios. Ganá luz, seguridad y funcionalidad.",
    description: "Soluciones de aluminio y herrería a medida para viviendas, locales, talleres y obras en Córdoba.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.language} className={`${inter.variable} ${archivoNarrow.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
