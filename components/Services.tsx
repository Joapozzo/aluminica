import { CatalogIndex } from "./CatalogIndex";
import { services as servicePages } from "../lib/content";

export function Services() {
  return (
    <div id="soluciones">
      <CatalogIndex
        id="services-index-title"
        label="Servicios"
        title={
          <>
            Un catálogo completo
            <br />
            <span className="title-accent">de soluciones.</span>
          </>
        }
        body="Carpintería de aluminio y herrería a medida para viviendas, comercios, talleres, remodelaciones y obras nuevas en Córdoba."
        tone="ink"
        cta={{ href: "#contacto", label: "Cotizar mi proyecto" }}
        items={servicePages.map((service) => ({
          href: `/servicios/${service.slug}`,
          name: service.name,
          meta: "Córdoba",
        }))}
      />
    </div>
  );
}
