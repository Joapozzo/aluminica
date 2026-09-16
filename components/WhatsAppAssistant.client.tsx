"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteConfig } from "../lib/site";

const prompts = [
  { label: "Cotizar un proyecto", message: "Hola Aluminica, quiero cotizar una solución para mi proyecto. ¿Podemos conversar?" },
  { label: "Consultar una solución", message: "Hola Aluminica, necesito asesoramiento sobre carpintería de aluminio o herrería para una obra." },
  { label: "Hablar con el equipo", message: "Hola Aluminica, quisiera hablar con una persona del equipo para realizar una consulta." },
];

export function WhatsAppAssistant() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<HTMLSpanElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const buildLineRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const mascot = mascotRef.current;
    const target = targetRef.current;
    const heading = headingRef.current;
    const message = messageRef.current;
    const options = optionsRef.current;
    const nudge = nudgeRef.current;
    const launcher = launcherRef.current;
    const buildLine = buildLineRef.current;
    if (!root || !panel || !mascot || !target || !heading || !message || !options || !nudge || !launcher || !buildLine) return;

    timelineRef.current?.kill();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!didMountRef.current) {
      didMountRef.current = true;
      gsap.set(panel, { autoAlpha: 0, clipPath: "inset(92% 0% 0% 78% round 16px)" });
      gsap.set([heading, message, options.children], { autoAlpha: 0 });
      return;
    }

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(panel, { autoAlpha: open ? 1 : 0, clipPath: open ? "inset(0% 0% 0% 0% round 16px)" : "inset(92% 0% 0% 78% round 16px)" });
        gsap.set([heading, message, options.children], { autoAlpha: open ? 1 : 0 });
        gsap.set(mascot, { x: 0, y: 0, rotation: 0, scale: 1 });
        gsap.set(nudge, { autoAlpha: open ? 0 : 1, x: open ? 10 : 0 });
        return;
      }

      if (open) {
        gsap.set(panel, { visibility: "visible" });
        gsap.set(heading, { autoAlpha: 0, y: 0 });
        gsap.set([message, options.children], { autoAlpha: 0 });
        gsap.set(message, { y: 10 });
        gsap.set(options.children, { y: 12 });
        gsap.set(buildLine, { scaleX: 0, transformOrigin: "right center" });

        const mascotBox = mascot.getBoundingClientRect();
        const targetBox = target.getBoundingClientRect();
        const travelX = targetBox.left + targetBox.width / 2 - (mascotBox.left + mascotBox.width / 2);
        const travelY = targetBox.top + targetBox.height / 2 - (mascotBox.top + mascotBox.height / 2);

        timelineRef.current = gsap.timeline({ defaults: { ease: "power3.out" } })
          .to(nudge, { autoAlpha: 0, x: 12, duration: 0.18 }, 0)
          .to(launcher, { scale: 0.92, duration: 0.16 }, 0)
          .to(mascot, { y: -10, scaleX: 1.12, scaleY: 0.88, duration: 0.16, ease: "power2.in" }, 0)
          .to(mascot, { y: -24, scaleX: 0.88, scaleY: 1.12, rotation: -8, duration: 0.2, ease: "power2.out" })
          .to(panel, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 0.5 }, "-=0.12")
          .to(buildLine, { scaleX: 1, duration: 0.42, ease: "power2.inOut" }, "-=0.42")
          .to(mascot, { keyframes: [
            { x: travelX * 0.35, y: travelY * 0.48 - 22, rotation: 12, duration: 0.22 },
            { x: travelX * 0.72, y: travelY * 0.78 - 14, rotation: -7, duration: 0.22 },
            { x: travelX, y: travelY, rotation: 0, scaleX: 1, scaleY: 1, duration: 0.26 },
          ], ease: "none" }, "-=0.28")
          .to(launcher, { scale: 1, duration: 0.24 }, "-=0.45")
          .to(mascot, { scale: 1.06, repeat: 1, yoyo: true, duration: 0.15 }, "-=0.2")
          .to(heading, { autoAlpha: 1, duration: 0.24 }, "-=0.36")
          .to(message, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.08")
          .to(options.children, { autoAlpha: 1, y: 0, duration: 0.26, stagger: 0.08 }, "-=0.08");
      } else {
        timelineRef.current = gsap.timeline({ defaults: { ease: "power2.inOut" } })
          .to(options.children, { autoAlpha: 0, y: 8, duration: 0.14, stagger: 0.035 })
          .to([message, heading], { autoAlpha: 0, y: 6, duration: 0.16 }, "-=0.08")
          .to(mascot, { x: 0, y: -16, rotation: 8, duration: 0.34, ease: "power3.inOut" }, "-=0.12")
          .to(panel, { autoAlpha: 0, clipPath: "inset(92% 0% 0% 78% round 16px)", duration: 0.34 }, "-=0.25")
          .to(mascot, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.24, ease: "back.out(1.8)" }, "-=0.08")
          .set(panel, { visibility: "hidden" })
          .to(nudge, { autoAlpha: 1, x: 0, duration: 0.22 });
      }
    }, root);

    return () => {
      timelineRef.current?.kill();
      context.kill(false);
    };
  }, [open]);

  const sendMessage = (message: string) => {
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <aside ref={rootRef} className={`whatsapp-assistant${open ? " is-open" : ""}`} aria-label="Contacto por WhatsApp">
      <div ref={panelRef} className="whatsapp-assistant__panel" id="whatsapp-assistant-panel" aria-hidden={!open}>
        <span ref={buildLineRef} className="whatsapp-assistant__build-line" aria-hidden="true" />
        <div ref={headingRef} className="whatsapp-assistant__heading">
          <div className="whatsapp-assistant__identity"><strong>ALU</strong><span className="whatsapp-assistant__online"><i aria-hidden="true" />En línea</span></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar asistente">×</button>
        </div>
        <div ref={messageRef} className="whatsapp-assistant__message">
          <span ref={targetRef} className="whatsapp-assistant__alu-seat" aria-hidden="true" />
          <p>Hola. ¿Qué necesitás resolver?</p>
        </div>
        <div ref={optionsRef} className="whatsapp-assistant__options">
          {prompts.map((prompt) => <button type="button" key={prompt.label} onClick={() => sendMessage(prompt.message)}><span>{prompt.label}</span><span aria-hidden="true">↗</span></button>)}
        </div>
      </div>

      <div className="whatsapp-assistant__dock">
        <span ref={nudgeRef} className="whatsapp-assistant__nudge" aria-hidden={open}>¿Te ayudo con tu obra?</span>
        <button ref={launcherRef} className="whatsapp-assistant__launcher" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="whatsapp-assistant-panel" aria-label={open ? "Cerrar asistente de WhatsApp" : "Abrir asistente de WhatsApp"}>
          <span className="whatsapp-assistant__launcher-core" aria-hidden="true" />
          <span className="whatsapp-assistant__status" aria-hidden="true" />
        </button>
      </div>

      <span ref={mascotRef} className="alu-character" aria-hidden="true">
        <Image className="alu-character__art" src="/brand/alu-mascot.png" alt="" width={120} height={136} />
        <i className="alu-character__spark" />
      </span>
    </aside>
  );
}
