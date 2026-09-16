"use client";

import type { FormEvent } from "react";
import { siteConfig } from "../lib/site";
import { trackEvent } from "../lib/analytics";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();
    const message = `Hola Aluminica, soy ${name || "una persona interesada"}. Quiero consultar por: ${project || "un proyecto"}.`;
    trackEvent("generate_lead", { method: "whatsapp_form" });
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label><span>Tu nombre</span><input name="name" autoComplete="name" required placeholder="¿Cómo te llamás?" /></label>
      <label><span>Tipo de proyecto</span><input name="project" required placeholder="Obra, remodelación, abertura…" /></label>
      <button type="submit" data-analytics-event="whatsapp_click" data-analytics-label="contact_form"><span>Empezar por WhatsApp</span><span aria-hidden="true">↗</span></button>
      <p className="contact-form__note">Tu consulta se prepara acá y continúa directamente por WhatsApp.</p>
    </form>
  );
}
