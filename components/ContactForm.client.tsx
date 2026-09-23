"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { siteConfig } from "../lib/site";
import { trackEvent } from "../lib/analytics";

const projectOptions = [
  "Cerrar una galería o un quincho",
  "Hacer una abertura de aluminio",
  "Hacer un portón, una puerta o una reja",
  "Hacer una pérgola",
  "Hacer una baranda o una escalera",
  "Hacer una estructura metálica",
  "Otro proyecto",
];

export function ContactForm() {
  const [project, setProject] = useState("");
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [projectError, setProjectError] = useState(false);
  const projectField = useRef<HTMLDivElement>(null);
  const projectTrigger = useRef<HTMLButtonElement>(null);
  const projectListId = useId();

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!projectField.current?.contains(event.target as Node)) setIsProjectOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  function chooseProject(option: string) {
    setProject(option);
    setProjectError(false);
    setActiveProject(projectOptions.indexOf(option));
    setIsProjectOpen(false);
    projectTrigger.current?.focus();
  }

  function handleProjectKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setIsProjectOpen(true);
      setActiveProject((current) => (current + direction + projectOptions.length) % projectOptions.length);
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setIsProjectOpen(true);
      setActiveProject(event.key === "Home" ? 0 : projectOptions.length - 1);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && isProjectOpen) {
      event.preventDefault();
      chooseProject(projectOptions[activeProject]);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setIsProjectOpen(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    if (!project) {
      setProjectError(true);
      setIsProjectOpen(true);
      projectTrigger.current?.focus();
      return;
    }
    const message = [
      `Hola Aluminica, soy ${name || "una persona interesada"}.`,
      `Quiero cotizar: ${project || "un proyecto a medida"}.`,
      phone ? `Mi WhatsApp es ${phone}.` : "",
      details ? `Detalles: ${details}` : "",
      "Puedo enviar fotos y medidas por este chat.",
    ].filter(Boolean).join(" ");
    trackEvent("generate_lead", { method: "whatsapp_form" });
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label><span>Tu nombre</span><input name="name" autoComplete="name" required placeholder="¿Cómo te llamás?" /></label>
      <label><span>Tu WhatsApp</span><input name="phone" type="tel" autoComplete="tel" required placeholder="Código de área + número" /></label>
      <div className="contact-form__field" ref={projectField}>
        <span className="contact-form__field-label" id={`${projectListId}-label`}>¿Qué necesitás hacer?</span>
        <input type="hidden" name="project" value={project} />
        <div className={`contact-select${isProjectOpen ? " is-open" : ""}${projectError ? " has-error" : ""}`}>
          <button
            ref={projectTrigger}
            className="contact-select__trigger"
            type="button"
            aria-labelledby={`${projectListId}-label ${projectListId}-value`}
            aria-haspopup="listbox"
            aria-expanded={isProjectOpen}
            aria-controls={projectListId}
            aria-activedescendant={isProjectOpen ? `${projectListId}-option-${activeProject}` : undefined}
            aria-invalid={projectError || undefined}
            onClick={() => setIsProjectOpen((open) => !open)}
            onKeyDown={handleProjectKeyDown}
          >
            <span id={`${projectListId}-value`} className={project ? "" : "is-placeholder"}>{project || "Elegí una opción"}</span>
            <span className="contact-select__chevron" aria-hidden="true" />
          </button>
          <div className="contact-select__list" id={projectListId} role="listbox" aria-labelledby={`${projectListId}-label`}>
            {projectOptions.map((option, index) => (
              <button
                className={`contact-select__option${activeProject === index ? " is-active" : ""}`}
                id={`${projectListId}-option-${index}`}
                key={option}
                type="button"
                role="option"
                aria-selected={project === option}
                onMouseEnter={() => setActiveProject(index)}
                onClick={() => chooseProject(option)}
              >
                <strong>{option}</strong>
              </button>
            ))}
          </div>
        </div>
        {projectError ? <span className="contact-form__error" role="alert">Elegí el tipo de proyecto.</span> : null}
      </div>
      <label><span>Contanos un poco más</span><textarea name="details" rows={3} placeholder="Medidas aproximadas, ubicación y cualquier dato útil" /></label>
      <button type="submit" data-analytics-event="whatsapp_click" data-analytics-label="contact_form"><span>Cotizar mi proyecto</span><span aria-hidden="true">↗</span></button>
      <p className="contact-form__note">Al continuar se abrirá WhatsApp. Allí también vas a poder enviarnos fotos y medidas del proyecto.</p>
    </form>
  );
}
