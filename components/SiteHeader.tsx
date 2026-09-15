import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="site-header" data-site-header>
      <a className="brand" href="#inicio" aria-label="Aluminica, inicio">
        <Image src="/brand/aluminica-logo.png" alt="Aluminica" width={184} height={80} priority />
      </a>
      <nav aria-label="Navegación principal">
        <a href="#trabajos">Trabajos</a>
        <a href="#soluciones">Soluciones</a>
        <a href="#trayectoria">Trayectoria</a>
        <a className="header-cta" href="#contacto">Hablemos <span aria-hidden="true">↗</span></a>
      </nav>
      <span className="site-header__progress" data-header-progress aria-hidden="true" />
    </header>
  );
}
