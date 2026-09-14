import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Aluminica landing", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es"/i);
  assert.match(html, /<title>Aluminica \| Herrería y carpintería de aluminio en Córdoba<\/title>/i);
  assert.match(html, /Una obra\. Un equipo\. Todo el metal resuelto\./);
  assert.match(html, /Del plano/);
  assert.match(html, /Estructuras que dibujan el cielo/);
  assert.doesNotMatch(html, /Balcones de la Plaza|balcones-plaza/i);
  assert.match(html, /Empezamos en la década del 70/);
  assert.match(html, /La próxima pieza empieza con una conversación/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /Building your site|react-loading-skeleton|codex-preview/i);
});
