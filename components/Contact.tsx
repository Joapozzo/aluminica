import { ContactForm } from "./ContactForm.client";

export function Contact() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="contact__panel" data-contact-panel>
        <div className="contact__main" data-reveal>
          <h2 id="contact-title">¿Tenés un proyecto <span className="title-accent">en mente?</span></h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
