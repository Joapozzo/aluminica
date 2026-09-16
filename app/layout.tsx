import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "../components/Analytics.client";
import { absoluteUrl, siteConfig } from "../lib/site";
import { defaultDescription } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "Aluminica | Herrería y carpintería de aluminio en Córdoba", template: "%s | Aluminica" },
  description: defaultDescription,
  keywords: ["herrería Córdoba", "carpintería de aluminio Córdoba", "estructuras metálicas", "pérgolas", "portones"],
  icons: { icon: "/brand/aluminica-mark.png" },
  alternates: { canonical: absoluteUrl("/") },
  verification: siteConfig.searchConsoleVerification ? { google: siteConfig.searchConsoleVerification } : undefined,
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
  return <html lang={siteConfig.language}><body>{children}<Analytics /></body></html>;
}
