"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "../lib/site";

const prompts = [
  {
    label: "Cotizar aberturas",
    message: "Hola Aluminica, quiero cotizar aberturas de aluminio para mi proyecto. ¿Podemos conversar?",
  },
  {
    label: "Tengo una obra en curso",
    message: "Hola Aluminica, tengo una obra en curso y necesito resolver carpintería de aluminio y/o herrería. Quiero recibir asesoramiento.",
  },
  {
    label: "Herrería a medida",
    message: "Hola Aluminica, necesito una solución de herrería a medida. Quisiera contarles el proyecto y solicitar un presupuesto.",
  },
  {
    label: "Hablar con una persona",
    message: "Hola Aluminica, quisiera hablar con una persona del equipo para realizar una consulta.",
  },
];

export function WhatsAppAssistant() {
  const [open, setOpen] = useState(false);

  const sendMessage = (message: string) => {
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <aside className={`whatsapp-assistant${open ? " is-open" : ""}`} aria-label="Asistente de WhatsApp">
      <div className="whatsapp-assistant__panel" id="whatsapp-assistant-panel" aria-hidden={!open}>
        <div className="whatsapp-assistant__heading">
          <div>
            <span>ALU / ASISTENTE</span>
            <strong>¿En qué podemos ayudarte?</strong>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar asistente">×</button>
        </div>
        <p>Elegí una opción y dejamos el mensaje listo para continuar directamente en WhatsApp.</p>
        <div className="whatsapp-assistant__options">
          {prompts.map((prompt) => (
            <button type="button" key={prompt.label} onClick={() => sendMessage(prompt.message)}>
              <span>{prompt.label}</span><span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>

      <div className="whatsapp-assistant__dock">
        <span className="whatsapp-assistant__nudge" aria-hidden={open}>¿Te ayudo con tu obra?</span>
        <button
          className="whatsapp-assistant__launcher"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="whatsapp-assistant-panel"
          aria-label={open ? "Cerrar asistente de WhatsApp" : "Abrir asistente de WhatsApp"}
        >
          <span className="alu-character" aria-hidden="true">
            <Image src="/brand/aluminica-mark.png" alt="" width={30} height={64} />
            <i className="alu-character__eye alu-character__eye--left" />
            <i className="alu-character__eye alu-character__eye--right" />
            <i className="alu-character__smile" />
          </span>
          <span className="whatsapp-assistant__status" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
