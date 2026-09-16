"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "../lib/site";

const prompts = [
  {
    label: "Cotizar un proyecto",
    message: "Hola Aluminica, quiero cotizar una solución para mi proyecto. ¿Podemos conversar?",
  },
  {
    label: "Consultar una solución",
    message: "Hola Aluminica, necesito asesoramiento sobre carpintería de aluminio o herrería para una obra.",
  },
  {
    label: "Hablar con el equipo",
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
    <aside className={`whatsapp-assistant${open ? " is-open" : ""}`} aria-label="Contacto por WhatsApp">
      <div className="whatsapp-assistant__panel" id="whatsapp-assistant-panel" aria-hidden={!open}>
        <div className="whatsapp-assistant__heading">
          <span>ALUMINICA / EN LÍNEA</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar asistente">×</button>
        </div>
        <div className="whatsapp-assistant__message">
          <span className="whatsapp-assistant__mini-alu" aria-hidden="true"><Image src="/brand/aluminica-mark.png" alt="" width={18} height={38} /></span>
          <p>Hola. ¿Qué necesitás resolver?</p>
        </div>
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
