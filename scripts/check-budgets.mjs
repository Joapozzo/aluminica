import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { withNextServer } from "../tests/helpers/next-server.mjs";

const PORT = 4175;

await withNextServer(PORT, async (baseUrl) => {
  const response = await fetch(`${baseUrl}/`, { headers: { accept: "text/html" } });
  if (!response.ok) {
    throw new Error(`Home request failed: ${response.status}`);
  }

  const html = await response.text();
  const assets = [...html.matchAll(/(?:href|src)="(\/_next\/static\/(?:chunks|css)\/[^"]+\.(?:js|css))"/g)].map(
    (match) => match[1],
  );
  const uniqueAssets = [...new Set(assets)];
  const totals = { js: 0, css: 0 };

  for (const asset of uniqueAssets) {
    const relative = asset.replace(/^\/_next\/static\//, "");
    const file = new URL(`../.next/static/${relative}`, import.meta.url);
    const compressed = gzipSync(await readFile(file)).byteLength;
    totals[asset.endsWith(".css") ? "css" : "js"] += compressed;
  }

  // Next.js App Router baseline sits above the old vinext gate (~220 KiB).
  const limits = { js: 260 * 1024, css: 35 * 1024 };
  const failures = [];
  for (const type of ["js", "css"]) {
    if (totals[type] > limits[type]) {
      failures.push(`${type.toUpperCase()}: ${totals[type]} bytes supera ${limits[type]}`);
    }
  }

  for (const name of [
    "facade-detail.webp",
    "glass-doors.webp",
    "glass-house.webp",
    "pergola-black.webp",
    "pergola.webp",
    "staircase.webp",
    "welding.webp",
  ]) {
    const bytes = (await stat(new URL(`../public/stock/${name}`, import.meta.url))).size;
    if (bytes > 1_200_000) failures.push(`${name}: ${bytes} bytes supera 1.2 MB`);
  }

  console.log(
    `Home inicial: ${(totals.js / 1024).toFixed(1)} KiB JS gzip, ${(totals.css / 1024).toFixed(1)} KiB CSS gzip.`,
  );
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
});
