import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

test("all published services have complete unique SEO content", async () => {
  const directory = new URL("../content/services/", import.meta.url);
  const files = (await readdir(directory)).filter((name) => name.endsWith(".json") && !name.startsWith("_"));
  const slugs = new Set();
  for (const file of files) {
    const service = JSON.parse(await readFile(new URL(file, directory), "utf8"));
    assert.equal(service.meta.publicationReady, true, `${file} must be publication-ready`);
    assert.ok(service.summary.length >= 100, `${file} needs a useful summary`);
    assert.ok(service.applications.length >= 4, `${file} needs applications`);
    assert.ok(service.scope.length >= 4, `${file} needs scope steps`);
    assert.ok(!slugs.has(service.slug), `${file} duplicates a slug`);
    slugs.add(service.slug);
  }
});
