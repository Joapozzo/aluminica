import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Aluminica", short_name: "Aluminica", description: "Herrería y carpintería de aluminio en Córdoba.", start_url: "/", display: "standalone", background_color: "#f4f0e8", theme_color: "#071b1d", icons: [{ src: "/brand/aluminica-mark.png", sizes: "any", type: "image/png" }] };
}
