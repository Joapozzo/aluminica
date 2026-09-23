"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { siteConfig } from "../lib/site";
import { trackEvent } from "../lib/analytics";
import { IconArrowUpRight } from "./Icons";

gsap.registerPlugin(MotionPathPlugin);

const prompts = [
  { label: "Cotizar mi proyecto", message: "Hola Aluminica, quiero cotizar una solución para mi proyecto. ¿Podemos conversar?" },
  { label: "Consultar un servicio", message: "Hola Aluminica, necesito asesoramiento sobre una solución de aluminio o herrería." },
  { label: "Hacer otra consulta", message: "Hola Aluminica, tengo una consulta y quisiera recibir asesoramiento." },
];

export function WhatsAppAssistant() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
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
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);
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
    idleTweenRef.current?.kill();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!didMountRef.current) {
      didMountRef.current = true;
      gsap.set(panel, { autoAlpha: 0, clipPath: "inset(92% 0% 0% 78% round 16px)" });
      gsap.set([heading, message, options.children], { autoAlpha: 0 });
      return;
    }

    const context = gsap.context(() => {
      if (reduceMotion) {
        if (open) gsap.set(panel, { visibility: "visible" });
        const mascotBox = mascot.getBoundingClientRect();
        const targetBox = target.getBoundingClientRect();
        const restingX = targetBox.left + targetBox.width / 2 - (mascotBox.left + mascotBox.width / 2);
        const restingY = targetBox.top + targetBox.height / 2 - (mascotBox.top + mascotBox.height / 2);
        gsap.set(panel, { autoAlpha: open ? 1 : 0, clipPath: open ? "inset(0% 0% 0% 0% round 16px)" : "inset(92% 0% 0% 78% round 16px)" });
        gsap.set([heading, message, options.children], { autoAlpha: open ? 1 : 0 });
        gsap.set(mascot, { x: open ? restingX : 0, y: open ? restingY : 0, rotation: 0, scale: 1 });
        gsap.set(nudge, { autoAlpha: open ? 0 : 1, x: open ? 10 : 0 });
        if (!open) {
          gsap.set(panel, { visibility: "hidden" });
          setClosing(false);
        }
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
          .to(launcher, { scaleX: 1.06, scaleY: 0.9, duration: 0.16 }, 0)
          .to(mascot, { y: 4, scaleX: 1.13, scaleY: 0.82, duration: 0.16, ease: "power2.in" }, 0)
          .to(buildLine, { scaleX: 1, duration: 0.42, ease: "power2.inOut" }, 0.08)
          .to(panel, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 0.48 }, 0.16)
          .to(heading, { autoAlpha: 1, duration: 0.24 }, 0.38)
          .to(mascot, {
            motionPath: {
              path: [
                { x: 0, y: 4 },
                { x: travelX * 0.34, y: travelY * 0.3 - 72 },
                { x: travelX * 0.72, y: travelY * 0.68 - 42 },
                { x: travelX, y: travelY },
              ],
              curviness: 1.65,
            },
            scaleX: 0.94,
            scaleY: 1.07,
            duration: 0.78,
            ease: "power1.inOut",
          }, 0.14)
          .to(mascot, { rotation: -11, duration: 0.22, ease: "power1.out" }, 0.14)
          .to(mascot, { rotation: 7, duration: 0.28, ease: "sine.inOut" }, 0.36)
          .to(mascot, { rotation: 0, duration: 0.26, ease: "power2.out" }, 0.64)
          .to(target, { scaleX: 1.12, scaleY: 0.88, duration: 0.1 }, 0.86)
          .to(mascot, { scaleX: 1.14, scaleY: 0.86, duration: 0.1, ease: "power2.in" }, 0.88)
          .to([mascot, target], { scaleX: 1, scaleY: 1, duration: 0.28, ease: "back.out(2.2)" }, 0.98)
          .to(launcher, { scaleX: 1, scaleY: 1, duration: 0.24 }, 0.72)
          .to(message, { autoAlpha: 1, y: 0, duration: 0.3 }, 1.05)
          .to(options.children, { autoAlpha: 1, y: 0, duration: 0.26, stagger: 0.08 }, 1.18);

        timelineRef.current.eventCallback("onComplete", () => {
          idleTweenRef.current = gsap.to(mascot, {
            y: travelY - 3,
            rotation: 1.4,
            scaleY: 1.015,
            duration: 1.45,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      } else {
        const currentX = Number(gsap.getProperty(mascot, "x")) || 0;
        const currentY = Number(gsap.getProperty(mascot, "y")) || 0;
        timelineRef.current = gsap.timeline({ defaults: { ease: "power2.inOut" } })
          .to(options.children, { autoAlpha: 0, y: 8, duration: 0.14, stagger: 0.035 })
          .to(message, { autoAlpha: 0, y: 6, duration: 0.16 }, "-=0.08")
          .to(mascot, { scaleX: 1.1, scaleY: 0.88, duration: 0.12, ease: "power2.in" }, "-=0.04")
          .to(mascot, {
            motionPath: {
              path: [
                { x: currentX, y: currentY },
                { x: currentX * 0.7, y: currentY * 0.68 - 36 },
                { x: currentX * 0.3, y: currentY * 0.28 - 54 },
                { x: 0, y: 0 },
              ],
              curviness: 1.55,
            },
            rotation: -8,
            scaleX: 0.96,
            scaleY: 1.04,
            duration: 0.62,
            ease: "power1.inOut",
          })
          .to(heading, { autoAlpha: 0, y: 5, duration: 0.18 }, "-=0.34")
          .to(buildLine, { scaleX: 0, duration: 0.3, ease: "power2.inOut" }, "-=0.34")
          .to(panel, { autoAlpha: 0, clipPath: "inset(92% 0% 0% 78% round 16px)", duration: 0.36 }, "-=0.3")
          .to(mascot, { x: 0, y: 0, rotation: 0, scaleX: 1.12, scaleY: 0.88, duration: 0.1, ease: "power2.in" }, "-=0.08")
          .to(mascot, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "back.out(2)" })
          .set(panel, { visibility: "hidden" })
          .to(nudge, { autoAlpha: 1, x: 0, duration: 0.22 });

        timelineRef.current.eventCallback("onComplete", () => setClosing(false));
      }
    }, root);

    return () => {
      timelineRef.current?.kill();
      idleTweenRef.current?.kill();
      context.kill(false);
    };
  }, [open]);

  const sendMessage = (message: string) => {
    trackEvent("generate_lead", { method: "whatsapp_assistant" });
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const toggleAssistant = () => {
    if (open) {
      trackEvent("assistant_close");
      setClosing(true);
      setOpen(false);
      return;
    }
    trackEvent("assistant_open");
    setClosing(false);
    setOpen(true);
  };

  const active = open || closing;

  return (
    <aside ref={rootRef} className={`whatsapp-assistant${active ? " is-open" : ""}${closing ? " is-closing" : ""}`} aria-label="Contacto por WhatsApp">
      <div ref={panelRef} className="whatsapp-assistant__panel" id="whatsapp-assistant-panel" aria-hidden={!open}>
        <span ref={buildLineRef} className="whatsapp-assistant__build-line" aria-hidden="true" />
        <div ref={headingRef} className="whatsapp-assistant__heading">
          <span className="whatsapp-assistant__online"><i aria-hidden="true" />En línea</span>
          <button type="button" onClick={toggleAssistant} aria-label="Cerrar asistente">×</button>
        </div>
        <div ref={messageRef} className="whatsapp-assistant__message">
          <span ref={targetRef} className="whatsapp-assistant__alu-seat" aria-hidden="true" />
          <div className="whatsapp-assistant__message-copy">
            <strong>ALU</strong>
            <p>Hola. ¿Qué necesitás hacer?</p>
          </div>
        </div>
        <div ref={optionsRef} className="whatsapp-assistant__options">
          {prompts.map((prompt) => <button type="button" key={prompt.label} onClick={() => sendMessage(prompt.message)} data-analytics-event="whatsapp_click" data-analytics-label={prompt.label}><span>{prompt.label}</span><IconArrowUpRight size={14} /></button>)}
        </div>
      </div>

      <div className="whatsapp-assistant__dock">
        <span ref={nudgeRef} className="whatsapp-assistant__nudge" aria-hidden={active}>¿Qué necesitás resolver?</span>
        <button ref={launcherRef} className="whatsapp-assistant__launcher" type="button" onClick={toggleAssistant} aria-expanded={open} aria-controls="whatsapp-assistant-panel" aria-label={active ? "Cerrar asistente de WhatsApp" : "Abrir asistente de WhatsApp"}>
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
