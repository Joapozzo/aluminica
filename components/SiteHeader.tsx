import Image from "next/image";
import Link from "next/link";
import { HomeLogoLink } from "./HomeLogoLink.client";
import { IconArrowUpRight } from "./Icons";

type SiteHeaderProps = {
  light?: boolean;
};

export function SiteHeader({ light = false }: SiteHeaderProps) {
  return (
    <header className={`site-header${light ? " site-header--light" : ""}`} data-site-header data-header-light={light ? "true" : "false"}>
      <HomeLogoLink className="brand" href="/#inicio" aria-label="Aluminica, inicio">
        <Image className="brand__full" src="/brand/aluminica-logo.png" alt="Aluminica" width={184} height={80} priority />
        <Image className="brand__mark" src="/brand/aluminica-mark.png" alt="" width={30} height={64} priority aria-hidden="true" />
      </HomeLogoLink>
      <nav aria-label="Navegación principal">
        <Link href="/#trabajos">Proyectos</Link>
        <Link href="/#soluciones">Servicios</Link>
        <Link href="/#trayectoria">Trayectoria</Link>
        <Link className="header-cta" href="/#contacto" data-analytics-event="contact_navigation" data-analytics-label="header">
          Cotizar proyecto <IconArrowUpRight size={14} />
        </Link>
      </nav>
      <span className="site-header__progress" data-header-progress aria-hidden="true" />
    </header>
  );
}
