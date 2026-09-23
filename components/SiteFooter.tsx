import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__panel">
        <Link className="site-footer__logo" href="/#inicio" aria-label="Aluminica, volver al inicio">
          <Image src="/brand/aluminica-logo.png" alt="Aluminica" width={240} height={104} />
        </Link>
        <div>
          <span>Contacto directo</span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-label="footer">
            WhatsApp ↗
          </a>
        </div>
        <div>
          <span>Seguinos</span>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" data-analytics-event="instagram_click" data-analytics-label="instagram">
            Instagram ↗
          </a>
        </div>
        <div>
          <span>Base</span>
          <p>Córdoba, Argentina</p>
          <Link href="/privacidad">Privacidad</Link>
        </div>
      </div>
    </footer>
  );
}
