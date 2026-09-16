import Link from "next/link";
import Image from "next/image";
import { siteConfig, whatsappUrl } from "../lib/site";

export function InnerPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="inner-page">
      <header className="inner-header container">
        <Link className="inner-brand" href="/" aria-label="Aluminica, inicio"><Image className="inner-brand__full" src="/brand/aluminica-logo.png" alt="Aluminica" width={184} height={80} priority /><Image className="inner-brand__mark" src="/brand/aluminica-mark.png" alt="" width={30} height={64} priority aria-hidden="true" /></Link>
        <nav aria-label="Navegación principal"><Link href="/proyectos">Proyectos</Link><Link href="/servicios">Servicios</Link><a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-label="header_inner">Hablemos ↗</a></nav>
      </header>
      <main>{children}</main>
      <footer className="inner-footer container">
        <div><strong>{siteConfig.name}</strong><p>{siteConfig.descriptor}<br />{siteConfig.area}</p></div>
        <nav aria-label="Navegación de pie"><Link href="/servicios">Servicios</Link><Link href="/proyectos">Proyectos</Link><Link href="/privacidad">Privacidad</Link><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></nav>
      </footer>
    </div>
  );
}
