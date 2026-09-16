"use client";
import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

export function AnalyticsEvent({ name, label }: { name: string; label: string }) {
  useEffect(() => { trackEvent(name, { label }); }, [name, label]);
  return null;
}
