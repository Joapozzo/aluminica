"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MotionDirector } from "./MotionDirector.client";
import { WhatsAppAssistant } from "./WhatsAppAssistant.client";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <SiteHeader light={!isHome} />
      {children}
      <SiteFooter />
      <WhatsAppAssistant />
      <MotionDirector key={pathname} />
    </>
  );
}
