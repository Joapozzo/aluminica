"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionDirector() {
  useEffect(() => {
    const media = gsap.matchMedia();
    let cancelled = false;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-hero-line]", {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.12,
        });

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-track",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        heroTimeline
          .to("[data-hero-image]", { scale: 1.02, ease: "none" }, 0)
          .to("[data-hero-wash]", { opacity: 0.88, ease: "none" }, 0)
          .to("[data-hero-copy]", { yPercent: -16, opacity: 0.16, ease: "none" }, 0.44);

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 54,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-project-image]").forEach((element, index) => {
          gsap.fromTo(
            element,
            { clipPath: index ? "inset(16% 0 0 28%)" : "inset(12% 8% 12% 8%)", y: index ? 70 : 0 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: index ? -24 : 0,
              ease: "none",
              scrollTrigger: { trigger: ".project-stage", start: "top 85%", end: "bottom 42%", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-service-panel]").forEach((panel, index) => {
          gsap.fromTo(
            panel,
            { y: index === 0 ? 0 : 90, scale: 0.96 },
            {
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: panel, start: "top bottom", end: "top 34%", scrub: true },
            },
          );
        });

        gsap.fromTo(
          "[data-legacy-mark]",
          { xPercent: -18 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ".legacy", start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        gsap.fromTo(
          "[data-contact-panel]",
          { clipPath: "inset(10% 3% 0% 3% round 24px 24px 0 0)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 18%", scrub: true },
          },
        );
      });

      return () => context.revert();
    });

    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      media.revert();
    };
  }, []);

  return null;
}

