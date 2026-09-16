"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { siteConfig } from "../lib/site";
import { trackEvent } from "../lib/analytics";

const storageKey = "aluminica-analytics-consent";

export function Analytics() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setConsent(window.localStorage.getItem(storageKey) as "accepted" | "rejected" | null));
    const clickHandler = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>("[data-analytics-event]");
      if (!element) return;
      trackEvent(element.dataset.analyticsEvent ?? "interaction", {
        label: element.dataset.analyticsLabel ?? element.textContent?.trim().slice(0, 80) ?? "",
      });
    };
    document.addEventListener("click", clickHandler);
    const sentDepths = new Set<number>();
    const scrollHandler = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return;
      const depth = Math.round((window.scrollY / available) * 100);
      [25, 50, 75, 90].forEach((threshold) => { if (depth >= threshold && !sentDepths.has(threshold)) { sentDepths.add(threshold); trackEvent("scroll_depth", { percent: threshold }); } });
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => { window.cancelAnimationFrame(frame); document.removeEventListener("click", clickHandler); window.removeEventListener("scroll", scrollHandler); };
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(storageKey, value);
    setConsent(value);
  };

  return (
    <>
      {siteConfig.gaMeasurementId && consent === "accepted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${siteConfig.gaMeasurementId}',{anonymize_ip:true});`}</Script>
        </>
      ) : null}
      {siteConfig.gaMeasurementId && consent === null ? (
        <aside className="consent" aria-label="Preferencias de privacidad">
          <p>Usamos medición anónima para mejorar el sitio.</p>
          <div><button type="button" onClick={() => decide("rejected")}>Solo necesarias</button><button type="button" onClick={() => decide("accepted")}>Aceptar</button></div>
          <a href="/privacidad">Cómo cuidamos tus datos</a>
        </aside>
      ) : null}
    </>
  );
}
