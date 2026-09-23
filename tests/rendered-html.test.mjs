import assert from "node:assert/strict";
import test from "node:test";
import { withNextServer } from "./helpers/next-server.mjs";

const PORT = 4174;

test("server-renders the Aluminica landing and indexable routes", async () => {
  await withNextServer(PORT, async (baseUrl) => {
    async function render(path = "/") {
      return fetch(`${baseUrl}${path}`, { redirect: "manual" });
    }

    const response = await render();
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);

    const html = await response.text();
    assert.match(html, /<html lang="es-AR"/i);
    assert.match(html, /<title>Aluminica \| Herrería y carpintería de aluminio en Córdoba<\/title>/i);
    assert.match(html, /Proyectos a medida/);
    assert.match(html, /Encontrá la solución/);
    assert.match(html, /Exteriores para disfrutar todo el año/);
    assert.doesNotMatch(html, /Balcones de la Plaza|balcones-plaza/i);
    assert.match(html, /tres generaciones dedicadas a la carpintería de aluminio y la herrería/i);
    assert.match(html, /¿Tenés un proyecto/);
    assert.match(html, /Cotizar mi proyecto/);
    assert.match(html, /application\/ld\+json/);
    assert.doesNotMatch(html, /Building your site|react-loading-skeleton|codex-preview/i);

    const services = await render("/servicios");
    assert.equal(services.status, 200);
    const servicesHtml = await services.text();
    assert.match(servicesHtml, /Carpintería de aluminio/);
    assert.match(servicesHtml, /Estructuras metálicas/);

    const detail = await render("/servicios/pergolas");
    assert.equal(detail.status, 200);
    const detailHtml = await detail.text();
    assert.match(detailHtml, /Pérgolas en Córdoba/);
    assert.match(detailHtml, /application\/ld\+json/);
    assert.match(detailHtml, /Cómo lo resolvemos/);

    const privacy = await render("/privacidad");
    assert.equal(privacy.status, 200);
    const privacyHtml = await privacy.text();
    assert.match(privacyHtml, /Tu consulta/);
    assert.match(privacyHtml, /es tuya\./);

    const robots = await render("/robots.txt");
    assert.equal(robots.status, 200);
    assert.match(await robots.text(), /Sitemap:/);

    const sitemap = await render("/sitemap.xml");
    assert.equal(sitemap.status, 200);
    const sitemapXml = await sitemap.text();
    assert.match(sitemapXml, /\/servicios\/carpinteria-de-aluminio/);
    assert.match(sitemapXml, /\/privacidad/);

    const missing = await render("/una-pagina-que-no-existe");
    assert.equal(missing.status, 404);
    assert.match(await missing.text(), /Esta pieza no está acá/);
  });
});
