import barandas from "../content/services/barandas.json";
import carpinteria from "../content/services/carpinteria-de-aluminio.json";
import escaleras from "../content/services/escaleras.json";
import estructuras from "../content/services/estructuras-metalicas.json";
import frentes from "../content/services/frentes-de-asador.json";
import pergolas from "../content/services/pergolas.json";
import portones from "../content/services/portones.json";
import puertas from "../content/services/puertas-de-chapa.json";
import rejas from "../content/services/rejas.json";
import wpc from "../content/services/revestimientos-wpc.json";

export type Service = {
  slug: string;
  name: string;
  summary: string;
  applications: string[];
  scope: string[];
  priority: number;
};

export const services = [carpinteria, wpc, rejas, puertas, frentes, portones, pergolas, barandas, escaleras, estructuras]
  .filter((service) => service.meta.publicationReady)
  .map((service) => ({ slug: service.slug, name: service.name, summary: service.summary, applications: service.applications, scope: service.scope, priority: service.priority }) as Service)
  .sort((a, b) => a.priority - b.priority);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
