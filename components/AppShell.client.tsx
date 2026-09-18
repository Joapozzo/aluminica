"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MotionDirector } from "./MotionDirector.client";
import { WhatsAppAssistant } from "./WhatsAppAssistant.client";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
