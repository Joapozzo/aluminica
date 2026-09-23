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
      let resetGalleryHeight = () => {};
      const context = gsap.context(() => {
        const hasHero = Boolean(document.querySelector(".hero-track"));

        if (hasHero) {
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
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          });
          heroTimeline
            .to("[data-hero-image]", { scale: 1.03, yPercent: 5, ease: "none" }, 0)
            .to("[data-hero-wash]", { opacity: 0.88, ease: "none" }, 0)
            .to("[data-hero-copy]", { yPercent: -12, opacity: 0.2, ease: "none" }, 0.38);
        }

        const isDesktop = window.matchMedia("(min-width: 981px)").matches;

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          // Principles use dedicated clip-path scrub (desktop + mobile).
          if (element.hasAttribute("data-principle")) return;
          // Mobile contact uses a dedicated stagger reveal below.
          if (!isDesktop && element.closest(".contact")) return;
          gsap.from(element, {
            y: 54,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          });
        });

        // Desktop: circle expand runs on its own scrub. Mobile drives it inside renderMobileScene
        // so notes wait until the image is fully open.
        if (isDesktop && document.querySelector("[data-visual-reveal]")) {
          gsap.fromTo("[data-visual-reveal]", { clipPath: "circle(24% at 50% 50%)", rotate: 3 }, {
            clipPath: "circle(72% at 50% 50%)", rotate: 0, ease: "none",
            scrollTrigger: { trigger: ".positioning__visual", start: "top 88%", end: "bottom 40%", scrub: 0.8 },
          });
        }
        const structureNotes = gsap.utils.toArray<HTMLElement>("[data-structure-note]");
        if (structureNotes.length) {
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
            // Wide local windows so arrow line + label ease in and out slowly.
            const lineStrength = Math.min(
              smooth(localProgress / 0.42),
              smooth((1 - localProgress) / 0.36),
            );
            const copyStrength = Math.min(
              smooth((localProgress - 0.14) / 0.44),
              smooth((0.9 - localProgress) / 0.38),
            );

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

          const visual = document.querySelector<HTMLElement>("[data-positioning-visual]");
          const visualTrack = document.querySelector<HTMLElement>("[data-positioning-track]");
          const stage = document.querySelector<HTMLElement>("[data-positioning-stage]");
          const principlesWrap = document.querySelector<HTMLElement>("[data-principles]");
          const principleCards = gsap.utils.toArray<HTMLElement>("[data-principle]");
          const useDesktopSplit = isDesktop && Boolean(visual && visualTrack && stage && principlesWrap && principleCards.length);
          const isMobileLayout = window.matchMedia("(max-width: 760px)").matches;
          const sceneTopValue = stage ? getComputedStyle(stage).top : "140px";
          const sceneTop = !sceneTopValue || sceneTopValue === "auto" ? "140px" : sceneTopValue;

          const applySplitLayout = () => {
            if (!visual || !principlesWrap || !stage) return 0;
            const currentX = Number(gsap.getProperty(visual, "x")) || 0;
            const stageRect = stage.getBoundingClientRect();
            const visualRect = visual.getBoundingClientRect();
            const layoutLeft = visualRect.left - stageRect.left - currentX;
            gsap.set(principlesWrap, { "--principle-left": `${visualRect.width + 24}px` });
            return Math.max(0, layoutLeft);
          };

          const renderDesktopScene = (progress: number) => {
            const shift = applySplitLayout();
            const positioning = document.querySelector<HTMLElement>(".positioning");
            const integralEnd = 0.22;
            const notesStart = 0.2;
            const notesEnd = 0.58;
            const splitStart = 0.66;
            const splitEnd = 0.76;

            const integral = smooth(clamp01(progress / integralEnd));
            if (positioning) {
              positioning.style.setProperty("--integral-opacity", String(integral));
              positioning.style.setProperty("--integral-y", `${(1 - integral) * 36}px`);
            }

            renderStructureNotes(clamp01((progress - notesStart) / (notesEnd - notesStart)));

            const split = smooth(clamp01((progress - splitStart) / (splitEnd - splitStart)));
            if (visual) gsap.set(visual, { x: -shift * split });

            principleCards.forEach((card, index) => {
              if (index === 0) {
                gsap.set(card, { clipPath: `inset(0 ${(1 - split) * 100}% 0 0)` });
                const copyReveal = smooth(clamp01((split - 0.72) / 0.22));
                gsap.set(card.children, { opacity: copyReveal, x: 22 * (1 - copyReveal) });
                return;
              }
              const span = (1 - splitEnd) / Math.max(1, principleCards.length - 1);
              const cardStart = splitEnd + (index - 1) * span;
              const wipe = smooth(clamp01((progress - cardStart) / span));
              gsap.set(card, { clipPath: `inset(${(1 - wipe) * 100}% 0 0 0)` });
              const copyReveal = smooth(clamp01((wipe - 0.72) / 0.22));
              gsap.set(card.children, { opacity: copyReveal, y: 18 * (1 - copyReveal) });
            });
          };

          renderStructureNotes(0);
          if (useDesktopSplit) {
            renderDesktopScene(0);
            ScrollTrigger.create({
              trigger: visualTrack,
              start: `top ${sceneTop}`,
              end: "bottom bottom",
              invalidateOnRefresh: true,
              onRefresh: (self) => renderDesktopScene(self.progress),
              onUpdate: (self) => renderDesktopScene(self.progress),
            });
          } else {
            const positioning = document.querySelector<HTMLElement>(".positioning");
            const media = document.querySelector<HTMLElement>("[data-visual-reveal]");
            // Mobile: expand → notes (slow arrows) → principles (cards + copy).
            // principlesEnd = 1 so sticky releases with no dead gap after.
            const expandEnd = 0.1;
            const notesStart = 0.12;
            const notesEnd = 0.55;
            const principlesStart = 0.58;
            const principlesEnd = 1;

            if (visual) gsap.set(visual, { x: 0, clearProps: "x" });
            if (media) gsap.set(media, { clipPath: "circle(24% at 50% 50%)", rotate: 3 });

            const renderMobileScene = (progress: number) => {
              const expand = smooth(clamp01(progress / expandEnd));
              if (media) {
                const radius = 24 + (72 - 24) * expand;
                gsap.set(media, {
                  clipPath: `circle(${radius}% at 50% 50%)`,
                  rotate: 3 * (1 - expand),
                });
              }

              // Integral fades in alongside the open circle, finishes as expand completes.
              const integral = smooth(clamp01(progress / expandEnd));
              if (positioning) {
                positioning.style.setProperty("--integral-opacity", String(integral));
                positioning.style.setProperty("--integral-y", `${(1 - integral) * 36}px`);
              }

              if (visual) gsap.set(visual, { x: 0 });

              // Notes only after the circle is fully expanded — full 0→1 so exit plays.
              if (progress < notesStart) {
                renderStructureNotes(0);
              } else {
                const notesProgress = clamp01((progress - notesStart) / (notesEnd - notesStart));
                renderStructureNotes(notesProgress);
              }

              const principlesProgress = clamp01(
                (progress - principlesStart) / Math.max(0.001, principlesEnd - principlesStart),
              );
              if (isMobileLayout) {
                const stageHeight = stage?.offsetHeight || window.innerHeight;
                // Start well below the stage so each card rises into its stacked slot.
                const fromBelow = stageHeight * 1.05;
                const settled = progress >= principlesEnd;
                principleCards.forEach((card, index) => {
                  if (settled) {
                    gsap.set(card, { y: 0, x: 0, clipPath: "none" });
                    gsap.set(card.children, { y: 0, opacity: 1 });
                    return;
                  }
                  const span = 1 / Math.max(1, principleCards.length);
                  const cardStart = index * span;
                  // Larger divisor = slower rise within each slot.
                  const t = smooth(clamp01((principlesProgress - cardStart) / (span * 1.12)));
                  gsap.set(card, {
                    y: (1 - t) * fromBelow,
                    x: 0,
                    clipPath: "none",
                  });
                  // Copy trails the parent slightly so text rides with the panel.
                  const childT = smooth(clamp01((t - 0.12) / 0.88));
                  gsap.set(card.children, {
                    y: (1 - childT) * 36,
                    opacity: childT,
                  });
                });
              } else {
                principleCards.forEach((card) => {
                  gsap.set(card, { y: 0, x: 0, clipPath: "none", clearProps: "clipPath" });
                  gsap.set(card.children, { y: 0, opacity: 1, clearProps: "transform,opacity" });
                });
              }
            };

            renderMobileScene(0);
            ScrollTrigger.create({
              trigger: visualTrack || ".positioning__visual-track",
              start: `top ${sceneTop}`,
              end: "bottom bottom",
              invalidateOnRefresh: true,
              onRefresh: (self) => renderMobileScene(self.progress),
              onUpdate: (self) => renderMobileScene(self.progress),
            });
          }
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
                gsap.to(brand, { width: isFloating ? 40 : expandedWidth, duration: 0.42, ease: "power3.inOut", overwrite: true });
                gsap.to(siteHeader, { minHeight: isFloating ? (window.innerWidth <= 760 ? 76 : 88) : window.innerWidth <= 760 ? 88 : 112, duration: 0.42, ease: "power3.inOut", overwrite: "auto" });
              }
              const compactPad = window.innerWidth <= 760 ? 12 : 16;
              gsap.to(siteHeader, {
                y: 0,
                paddingLeft: isFloating ? compactPad : 0,
                paddingRight: isFloating ? compactPad : 0,
                backgroundColor: isFloating ? "rgba(8, 22, 25, 0.91)" : "rgba(8, 22, 25, 0)",
                backdropFilter: isFloating ? "blur(14px)" : "blur(0px)",
                borderRadius: isFloating ? 10 : 0,
                boxShadow: isFloating ? "0 16px 42px rgba(0, 0, 0, 0.22)" : "0 0 0 rgba(0, 0, 0, 0)",
                color: isFloating || siteHeader.dataset.headerLight !== "true" ? "#ffffff" : "#0b1619",
                duration: 0.28,
                overwrite: "auto",
              });
              siteHeader.classList.toggle("is-floating", isFloating);
              if (headerProgress) {
                headerProgress.style.setProperty("--nav-progress", `${self.progress * 360}deg`);
                headerProgress.style.opacity = self.scroll() > 0 ? "1" : "0";
              }
            },
          });
        }

        const isMobile = window.matchMedia("(max-width: 760px)").matches;

        const immersiveTrack = document.querySelector<HTMLElement>("[data-immersive-track]");
        if (immersiveTrack) {
          const base = immersiveTrack.querySelector<HTMLElement>("[data-immersive-base]");
          const facade = immersiveTrack.querySelector<HTMLElement>('[data-immersive-plane="facade"]');
          const opening = immersiveTrack.querySelector<HTMLElement>('[data-immersive-plane="opening"]');
          const structure = immersiveTrack.querySelector<HTMLElement>('[data-immersive-plane="structure"]');
          const chapters = gsap.utils.toArray<HTMLElement>("[data-immersive-chapter]", immersiveTrack);
          const progress = immersiveTrack.querySelector<HTMLElement>("[data-immersive-progress]");
          const counter = immersiveTrack.querySelector<HTMLElement>("[data-immersive-counter]");
          let activeChapter = 0;
          // Mobile: hold while the sticky scene settles/centers before chapter scrub.
          const immersiveHold = isMobile ? 0.22 : 0;
          const holdRatio = immersiveHold / (immersiveHold + 1);

          gsap.set(chapters, { autoAlpha: 0, y: 34 });
          if (chapters[0]) gsap.set(chapters[0], { autoAlpha: 1, y: 0 });

          const updateImmersiveUI = (scrollProgress: number) => {
            const motionProgress =
              holdRatio > 0
                ? Math.min(1, Math.max(0, (scrollProgress - holdRatio) / (1 - holdRatio)))
                : scrollProgress;
            const nextChapter = Math.min(chapters.length - 1, Math.floor(motionProgress * chapters.length));
            if (nextChapter !== activeChapter) {
              const direction = nextChapter > activeChapter ? 1 : -1;
              gsap.to(chapters[activeChapter], { autoAlpha: 0, y: -24 * direction, duration: 0.34, ease: "power2.inOut", overwrite: true });
              gsap.fromTo(chapters[nextChapter], { autoAlpha: 0, y: 34 * direction }, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out", overwrite: true });
              activeChapter = nextChapter;
            }
            if (counter) counter.textContent = String(nextChapter + 1).padStart(2, "0");
            if (progress) gsap.set(progress, { scaleX: motionProgress });
          };

          const immersiveTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: immersiveTrack,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.15,
              invalidateOnRefresh: true,
              onUpdate: (self) => updateImmersiveUI(self.progress),
              onRefresh: (self) => updateImmersiveUI(self.progress),
            },
          });

          if (immersiveHold) immersiveTimeline.to({}, { duration: immersiveHold });
          if (base) immersiveTimeline.fromTo(base, { scale: 1.02, xPercent: 0, yPercent: 0 }, { scale: 1.2, xPercent: -4, yPercent: 2, duration: 1 }, immersiveHold);
          if (facade) {
            immersiveTimeline
              .fromTo(facade, { autoAlpha: 0, scale: 0.68, z: -520, rotateY: 12, xPercent: 18 }, { autoAlpha: 1, scale: 1, z: 0, rotateY: 0, xPercent: 0, duration: 0.16 }, immersiveHold + 0.18)
              .to(facade, { autoAlpha: 0, scale: 1.12, z: 180, xPercent: -14, duration: 0.14 }, immersiveHold + 0.37);
          }
          if (opening) {
            immersiveTimeline
              .fromTo(opening, { autoAlpha: 0, scale: 0.72, z: -460, rotateY: -11, xPercent: -16 }, { autoAlpha: 1, scale: 1, z: 0, rotateY: 0, xPercent: 0, duration: 0.17 }, immersiveHold + 0.42)
              .to(opening, { autoAlpha: 0, scale: 1.1, z: 170, xPercent: 13, duration: 0.14 }, immersiveHold + 0.62);
          }
          if (structure) {
            immersiveTimeline.fromTo(structure, { autoAlpha: 0, scale: 0.7, z: -500, rotateX: 8, yPercent: 15 }, { autoAlpha: 1, scale: 1, z: 0, rotateX: 0, yPercent: 0, duration: 0.2 }, immersiveHold + 0.68);
          }
        }

        const galleryTrack = document.querySelector<HTMLElement>("[data-gallery-track]");
        const galleryScroll = document.querySelector<HTMLElement>("[data-gallery-scroll]");
        if (galleryTrack && galleryScroll) {
          const progress = document.querySelector<HTMLElement>("[data-gallery-progress]");
          const galleryFrames = gsap.utils.toArray<HTMLElement>("[data-gallery-frame]", galleryTrack);
          // Mobile: hold while the reel settles/centers before horizontal scrub.
          const galleryHold = isMobile ? 0.2 : 0;
          const horizontalDistance = () => Math.max(0, galleryTrack.scrollWidth - window.innerWidth);
          const setScrollLength = () => {
            // Extra scroll runway so the horizontal reel reads slower (+ mobile hold).
            const holdRunway = isMobile ? window.innerHeight * 0.4 : 0;
            galleryScroll.style.height = `${window.innerHeight + horizontalDistance() * 1.45 + holdRunway}px`;
          };
          setScrollLength();

          const horizontalTween = gsap.timeline({
            scrollTrigger: {
              trigger: galleryScroll,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.95,
              invalidateOnRefresh: true,
              onRefreshInit: setScrollLength,
              onUpdate: (self) => {
                if (!progress) return;
                const motionProgress =
                  galleryHold > 0
                    ? Math.min(1, Math.max(0, (self.progress - galleryHold) / (1 - galleryHold)))
                    : self.progress;
                gsap.set(progress, { scaleX: motionProgress });
              },
            },
          });
          if (galleryHold) horizontalTween.to({}, { duration: galleryHold });
          horizontalTween.to(galleryTrack, {
            x: () => -horizontalDistance(),
            duration: 1 - galleryHold,
            ease: "none",
          });

          const galleryImages = galleryTrack.querySelectorAll("img");
          const imageTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: galleryScroll,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.95,
              invalidateOnRefresh: true,
            },
          });
          if (galleryHold) imageTimeline.to({}, { duration: galleryHold });
          imageTimeline.fromTo(
            galleryImages,
            { scale: 1.16 },
            { scale: 1.015, duration: 1 - galleryHold, ease: "none" },
          );

          galleryFrames.forEach((frame) => {
            const marks = gsap.utils.toArray<HTMLElement>("[data-text-mark]", frame);
            if (!marks.length) return;

            const markTimeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: frame,
                containerAnimation: horizontalTween,
                // Wait until the frame is more centered, then scrub in both directions.
                start: "left 55%",
                end: "left 22%",
                scrub: 0.7,
              },
            });

            // Sequential LTR / top-to-bottom: each mark fills after the previous.
            const step = 1 / marks.length;
            marks.forEach((mark, index) => {
              markTimeline.fromTo(
                mark,
                { backgroundSize: "0% 72%" },
                { backgroundSize: "100% 72%", duration: step * 0.85 },
                index * step,
              );
            });
          });

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
              scrollTrigger: { trigger: panel, start: "top bottom", end: "top 28%", scrub: 0.85 },
            },
          );
          const mediaImage = panel.querySelector("img");
          if (mediaImage) gsap.fromTo(mediaImage, { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 0.85 } });
        });

        if (window.matchMedia("(min-width: 761px)").matches) {
          gsap.fromTo(
            "[data-legacy-mark]",
            { xPercent: -18 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: ".legacy", start: "top bottom", end: "bottom top", scrub: 0.9 },
            },
          );
        }
        gsap.fromTo("[data-legacy-image]", { scale: 1.22, yPercent: -5 }, { scale: 1.02, yPercent: 5, ease: "none", scrollTrigger: { trigger: ".legacy", start: "top bottom", end: "bottom top", scrub: 0.9 } });

        if (document.querySelector("[data-contact-panel]")) {
          if (isDesktop) {
            gsap.fromTo(
              "[data-contact-panel]",
              { clipPath: "inset(10% 3% 0% 3% round 24px 24px 0 0)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                ease: "none",
                scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 12%", scrub: 0.9 },
              },
            );
          } else {
            gsap.fromTo(
              "[data-contact-panel]",
              { clipPath: "inset(18% 6% 0% 6% round 28px 28px 0 0)", y: 40 },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: ".contact",
                  start: "top 92%",
                  end: "top 22%",
                  scrub: 0.85,
                },
              },
            );

            gsap.from(
              ".contact__main h2, .contact-form label, .contact-form button, .contact-form__note",
              {
                y: 36,
                opacity: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: ".contact__main", start: "top 78%", once: true },
              },
            );
          }
        }
      });

      return () => {
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
