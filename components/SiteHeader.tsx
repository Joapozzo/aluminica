import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header" data-site-header>
      <Link className="brand" href="/#inicio" aria-label="Aluminica, inicio">
        <Image className="brand__full" src="/brand/aluminica-logo.png" alt="Aluminica" width={184} height={80} priority />
        <Image className="brand__mark" src="/brand/aluminica-mark.png" alt="" width={30} height={64} priority aria-hidden="true" />
      </Link>
      <nav aria-label="Navegación principal">
        <Link href="/#trabajos">Trabajos</Link>
        <Link href="/#soluciones">Soluciones</Link>
        <Link href="/#trayectoria">Trayectoria</Link>
        <Link className="header-cta" href="/#contacto" data-analytics-event="contact_navigation" data-analytics-label="header">Hablemos <span aria-hidden="true">↗</span></Link>
      </nav>
      <span className="site-header__progress" data-header-progress aria-hidden="true" />
    </header>
  );
}
