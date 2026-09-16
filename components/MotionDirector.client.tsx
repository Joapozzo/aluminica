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
          const noteParts = structureNotes.map((note) => ({
            note,
            line: note.querySelector<HTMLElement>("[data-note-line]"),
            copy: note.querySelector<HTMLElement>(".structure-note__copy"),
            offset: note.classList.contains("structure-note--left") ? -28 : 28,
          }));
          const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
          const smooth = (value: number) => {
            const clamped = clamp01(value);
            return clamped * clamped * (3 - 2 * clamped);
          };
          const renderStructureNotes = (progress: number) => {
            const phase = Math.min(progress * noteParts.length, noteParts.length - 0.0001);
            const activeIndex = Math.floor(phase);
            const localProgress = phase - activeIndex;
            const lineStrength = Math.min(smooth(localProgress / 0.18), smooth((1 - localProgress) / 0.14));
            const copyStrength = Math.min(smooth((localProgress - 0.08) / 0.2), smooth((0.88 - localProgress) / 0.16));

            noteParts.forEach(({ line, copy, offset }, index) => {
              const isActive = index === activeIndex;
              const currentLineStrength = isActive ? lineStrength : 0;
              const currentCopyStrength = isActive ? copyStrength : 0;
              if (line) gsap.set(line, { scaleX: currentLineStrength, opacity: currentLineStrength });
              if (copy) {
                gsap.set(copy, {
                  x: offset * (1 - currentCopyStrength),
                  opacity: currentCopyStrength,
                  visibility: currentCopyStrength > 0.01 ? "visible" : "hidden",
                });
              }
            });
          };

          renderStructureNotes(0);
          ScrollTrigger.create({
            trigger: ".positioning__visual-track",
            start: "top 68%",
            end: "bottom 32%",
            onRefresh: (self) => renderStructureNotes(self.progress),
            onUpdate: (self) => renderStructureNotes(self.progress),
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

        const immersiveTrack = document.querySelector<HTMLElement>("[data-immersive-track]");
        if (immersiveTrack && window.matchMedia("(min-width: 761px)").matches) {
          const base = immersiveTrack.querySelector<HTMLElement>("[data-immersive-base]");
          const facade = immersiveTrack.querySelector<HTMLElement>('[data-immersive-plane="facade"]');
          const opening = immersiveTrack.querySelector<HTMLElement>('[data-immersive-plane="opening"]');
          const structure = immersiveTrack.querySelector<HTMLElement>('[data-immersive-plane="structure"]');
          const chapters = gsap.utils.toArray<HTMLElement>("[data-immersive-chapter]", immersiveTrack);
          const progress = immersiveTrack.querySelector<HTMLElement>("[data-immersive-progress]");
          const counter = immersiveTrack.querySelector<HTMLElement>("[data-immersive-counter]");
          let activeChapter = 0;

          gsap.set(chapters, { autoAlpha: 0, y: 34 });
          if (chapters[0]) gsap.set(chapters[0], { autoAlpha: 1, y: 0 });

          const updateImmersiveUI = (scrollProgress: number) => {
            const nextChapter = Math.min(chapters.length - 1, Math.floor(scrollProgress * chapters.length));
            if (nextChapter !== activeChapter) {
              const direction = nextChapter > activeChapter ? 1 : -1;
              gsap.to(chapters[activeChapter], { autoAlpha: 0, y: -24 * direction, duration: 0.34, ease: "power2.inOut", overwrite: true });
              gsap.fromTo(chapters[nextChapter], { autoAlpha: 0, y: 34 * direction }, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out", overwrite: true });
              activeChapter = nextChapter;
            }
            if (counter) counter.textContent = String(nextChapter + 1).padStart(2, "0");
            if (progress) gsap.set(progress, { scaleX: scrollProgress });
          };

          const immersiveTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: immersiveTrack,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.9,
              invalidateOnRefresh: true,
              onUpdate: (self) => updateImmersiveUI(self.progress),
              onRefresh: (self) => updateImmersiveUI(self.progress),
            },
          });

          if (base) immersiveTimeline.fromTo(base, { scale: 1.02, xPercent: 0, yPercent: 0 }, { scale: 1.2, xPercent: -4, yPercent: 2, duration: 1 }, 0);
          if (facade) {
            immersiveTimeline
              .fromTo(facade, { autoAlpha: 0, scale: 0.68, z: -520, rotateY: 12, xPercent: 18 }, { autoAlpha: 1, scale: 1, z: 0, rotateY: 0, xPercent: 0, duration: 0.16 }, 0.18)
              .to(facade, { autoAlpha: 0, scale: 1.12, z: 180, xPercent: -14, duration: 0.14 }, 0.37);
          }
          if (opening) {
            immersiveTimeline
              .fromTo(opening, { autoAlpha: 0, scale: 0.72, z: -460, rotateY: -11, xPercent: -16 }, { autoAlpha: 1, scale: 1, z: 0, rotateY: 0, xPercent: 0, duration: 0.17 }, 0.42)
              .to(opening, { autoAlpha: 0, scale: 1.1, z: 170, xPercent: 13, duration: 0.14 }, 0.62);
          }
          if (structure) {
            immersiveTimeline.fromTo(structure, { autoAlpha: 0, scale: 0.7, z: -500, rotateX: 8, yPercent: 15 }, { autoAlpha: 1, scale: 1, z: 0, rotateX: 0, yPercent: 0, duration: 0.2 }, 0.68);
          }
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
