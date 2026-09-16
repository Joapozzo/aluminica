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
      let removePointerMotion = () => {};
      let resetGalleryHeight = () => {};
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
          .to("[data-hero-image]", { scale: 1.03, yPercent: 5, ease: "none" }, 0)
          .to("[data-hero-wash]", { opacity: 0.88, ease: "none" }, 0)
          .to("[data-hero-copy]", { yPercent: -18, opacity: 0.08, ease: "none" }, 0.38)
          .to('[data-depth-layer="1"]', { yPercent: -55, rotate: -7, ease: "none" }, 0)
          .to('[data-depth-layer="2"]', { yPercent: 78, rotate: 9, ease: "none" }, 0)
          .to("[data-hero-ticker]", { xPercent: -28, ease: "none" }, 0);

        const hero = document.querySelector<HTMLElement>(".hero");
        const depthLayers = gsap.utils.toArray<HTMLElement>("[data-depth-layer]");
        if (hero && window.matchMedia("(pointer: fine)").matches) {
          const onPointerMove = (event: PointerEvent) => {
            const x = event.clientX / window.innerWidth - 0.5;
            const y = event.clientY / window.innerHeight - 0.5;
            depthLayers.forEach((layer, index) => {
              gsap.to(layer, { x: x * (index + 1) * 18, y: y * (index + 1) * 12, duration: 0.8, ease: "power3.out", overwrite: "auto" });
            });
          };
          hero.addEventListener("pointermove", onPointerMove);
          removePointerMotion = () => hero.removeEventListener("pointermove", onPointerMove);
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 54,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          });
        });

        gsap.fromTo("[data-visual-reveal]", { clipPath: "inset(18% 24% 18% 24% round 48%)", rotate: 3 }, {
          clipPath: "inset(0% 0% 0% 0% round 0%)", rotate: 0, ease: "none",
          scrollTrigger: { trigger: ".positioning__visual", start: "top 88%", end: "bottom 54%", scrub: true },
        });
        const structureNotes = gsap.utils.toArray<HTMLElement>("[data-structure-note]");
        if (structureNotes.length && window.matchMedia("(min-width: 761px)").matches) {
          const noteTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".positioning__visual-track",
              start: "top 68%",
              end: "bottom 32%",
              scrub: 0.65,
            },
          });

          structureNotes.forEach((note, index) => {
            const line = note.querySelector<HTMLElement>("[data-note-line]");
            const copy = note.querySelector<HTMLElement>(".structure-note__copy");
            const isLeft = note.classList.contains("structure-note--left");
            const position = index * 0.32;
            if (line) {
              gsap.set(line, { scaleX: 0 });
              noteTimeline.to(line, { scaleX: 1, duration: 0.18, ease: "power2.out" }, position);
            }
            if (copy) {
              gsap.set(copy, { autoAlpha: 0, x: isLeft ? -28 : 28 });
              noteTimeline.to(copy, { autoAlpha: 1, x: 0, duration: 0.2, ease: "power3.out" }, position + 0.06);
            }
          });
        }

        const siteHeader = document.querySelector<HTMLElement>("[data-site-header]");
        const headerProgress = document.querySelector<HTMLElement>("[data-header-progress]");
        if (siteHeader) {
          const brand = siteHeader.querySelector<HTMLElement>(".brand");
          const fullLogo = siteHeader.querySelector<HTMLElement>(".brand__full");
          const compactLogo = siteHeader.querySelector<HTMLElement>(".brand__mark");
          let logoIsCompact: boolean | null = null;
          gsap.fromTo(siteHeader, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 });
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              const isFloating = self.scroll() > 80;
              if (logoIsCompact !== isFloating) {
                logoIsCompact = isFloating;
                const expandedWidth = window.innerWidth <= 760 ? 112 : 150;
                gsap.to(fullLogo, { autoAlpha: isFloating ? 0 : 1, x: isFloating ? -10 : 0, scale: isFloating ? 0.82 : 1, duration: 0.38, ease: "power3.out", overwrite: true });
                gsap.to(compactLogo, { autoAlpha: isFloating ? 1 : 0, x: isFloating ? 0 : -8, scale: isFloating ? 1 : 0.72, duration: 0.38, ease: "power3.out", overwrite: true });
                gsap.to(brand, { width: isFloating ? 24 : expandedWidth, duration: 0.42, ease: "power3.inOut", overwrite: true });
                gsap.to(siteHeader, { minHeight: isFloating ? 72 : window.innerWidth <= 760 ? 76 : 96, duration: 0.42, ease: "power3.inOut", overwrite: "auto" });
              }
              gsap.to(siteHeader, {
                y: isFloating ? 18 : 0,
                backgroundColor: isFloating ? "rgba(8, 22, 25, 0.91)" : "rgba(8, 22, 25, 0)",
                backdropFilter: isFloating ? "blur(14px)" : "blur(0px)",
                borderRadius: isFloating ? 10 : 0,
                boxShadow: isFloating ? "0 16px 42px rgba(0, 0, 0, 0.22)" : "0 0 0 rgba(0, 0, 0, 0)",
                duration: 0.28,
                overwrite: "auto",
              });
              if (headerProgress) {
                headerProgress.style.setProperty("--nav-progress", `${self.progress * 360}deg`);
                headerProgress.style.opacity = self.scroll() > 0 ? "1" : "0";
              }
            },
          });
        }

        const galleryTrack = document.querySelector<HTMLElement>("[data-gallery-track]");
        const galleryScroll = document.querySelector<HTMLElement>("[data-gallery-scroll]");
        if (galleryTrack && galleryScroll) {
          const progress = document.querySelector<HTMLElement>("[data-gallery-progress]");
          const horizontalDistance = () => Math.max(0, galleryTrack.scrollWidth - window.innerWidth);
          const setScrollLength = () => {
            galleryScroll.style.height = `${window.innerHeight + horizontalDistance()}px`;
          };
          setScrollLength();
          const galleryTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: galleryScroll,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.65,
              invalidateOnRefresh: true,
              onRefreshInit: setScrollLength,
              onUpdate: (self) => {
                if (progress) gsap.set(progress, { scaleX: self.progress });
              },
            },
          });
          galleryTimeline
            .to(galleryTrack, { x: () => -horizontalDistance() }, 0)
            .fromTo(galleryTrack.querySelectorAll("img"), { scale: 1.16 }, { scale: 1.015 }, 0);

          resetGalleryHeight = () => {
            galleryScroll.style.removeProperty("height");
          };
        }

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
          const mediaImage = panel.querySelector("img");
          if (mediaImage) gsap.fromTo(mediaImage, { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true } });
        });

        if (window.matchMedia("(min-width: 761px)").matches) {
          gsap.fromTo(
            "[data-legacy-mark]",
            { xPercent: -18 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: ".legacy", start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
        gsap.fromTo("[data-legacy-image]", { scale: 1.22, yPercent: -5 }, { scale: 1.02, yPercent: 5, ease: "none", scrollTrigger: { trigger: ".legacy", start: "top bottom", end: "bottom top", scrub: true } });

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

      return () => {
        removePointerMotion();
        resetGalleryHeight();
        context.revert();
      };
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
