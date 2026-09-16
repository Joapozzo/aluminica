import type { MetadataRoute } from "next";
import { services } from "../lib/content";
import { absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/", "/servicios", "/proyectos", "/privacidad"];
  return [
    ...staticPages.map((path) => ({ url: absoluteUrl(path), changeFrequency: path === "/" ? "weekly" as const : "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...services.map((service) => ({ url: absoluteUrl(`/servicios/${service.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
