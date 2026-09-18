import { InnerPageShell } from "../../components/InnerPageShell";
import { buildMetadata } from "../../lib/seo";
import { PrivacyPreferences } from "../../components/PrivacyPreferences.client";

export const metadata = buildMetadata({
  title: "Privacidad",
  description: "Cómo Aluminica trata la información enviada desde este sitio y la medición anónima de uso.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <InnerPageShell>
      <article className="legal-copy container" data-reveal>
        <p className="eyebrow">Privacidad</p>
        <h1>
          Tu consulta <span className="title-accent">es tuya.</span>
        </h1>
        <p>
          Este sitio no almacena formularios ni solicita información sensible. Cuando elegís iniciar una consulta, preparamos un mensaje en tu dispositivo y te dirigimos a WhatsApp; el envío se realiza únicamente si vos lo confirmás allí.
        </p>
        <h2>Medición del sitio</h2>
        <p>
          Si la medición de Google Analytics está habilitada, solo se activa después de tu consentimiento. Se utiliza para comprender páginas visitadas e interacciones generales, sin enviar el contenido de tus consultas.
        </p>
        <PrivacyPreferences />
        <h2>Servicios externos</h2>
        <p>
          Los enlaces a WhatsApp e Instagram están sujetos a las políticas de esas plataformas. Podés rechazar la medición del sitio y seguir utilizando todas sus funciones esenciales.
        </p>
        <h2>Contacto</h2>
        <p>Para ejercer derechos de acceso, actualización o eliminación de datos, utilizá el canal de contacto publicado por Aluminica.</p>
        <p className="legal-copy__date">Última actualización: septiembre de 2026.</p>
      </article>
    </InnerPageShell>
  );
}
