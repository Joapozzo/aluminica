import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Aluminica", short_name: "Aluminica", description: "Herrería y carpintería de aluminio en Córdoba.", start_url: "/", display: "standalone", background_color: "#f2f4f0", theme_color: "#29535c", icons: [{ src: "/brand/aluminica-favicon.png", sizes: "512x512", type: "image/png" }] };
}
