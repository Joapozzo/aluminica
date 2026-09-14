import Image from "next/image";
import { ContactForm } from "./ContactForm.client";
import { siteConfig, whatsappUrl } from "../lib/site";

export function Contact() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="contact__panel" data-contact-panel>
        <div className="contact__top">
          <p className="section-label"><span aria-hidden="true">+</span>El próximo paso</p>
          <p>Córdoba y Gran Córdoba<br />Obras · Profesionales · Hogares</p>
        </div>
        <div className="contact__main">
          <h2 id="contact-title">La próxima pieza empieza con una conversación.</h2>
          <ContactForm />
        </div>
        <div className="contact__footer">
          <a className="contact__logo" href="#inicio" aria-label="Aluminica, volver al inicio"><Image src="/brand/aluminica-logo.png" alt="Aluminica" width={240} height={104} /></a>
          <div><span>Contacto directo</span><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
          <div><span>Seguinos</span><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div>
          <div><span>Base</span><p>Córdoba, Argentina</p></div>
        </div>
      </div>
    </section>
  );
}

