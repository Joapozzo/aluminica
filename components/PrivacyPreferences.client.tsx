"use client";
export function PrivacyPreferences() {
  return <button className="privacy-reset" type="button" onClick={() => { window.localStorage.removeItem("aluminica-analytics-consent"); window.location.reload(); }}>Cambiar preferencia de medición</button>;
}
