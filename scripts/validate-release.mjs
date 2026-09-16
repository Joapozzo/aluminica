import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredEnvironment = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_LEGAL_NAME",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
];

const failures = [];

for (const key of requiredEnvironment) {
  const value = process.env[key]?.trim();
  if (!value) failures.push(`${key} no está configurada`);
  if (value && /example\.com|x{4,}|0{6,}|placeholder/i.test(value)) {
    failures.push(`${key} todavía contiene un valor genérico`);
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (siteUrl) {
  try {
    const url = new URL(siteUrl);
    if (url.protocol !== "https:") failures.push("NEXT_PUBLIC_SITE_URL debe usar HTTPS");
    if (url.hostname.endsWith("chatgpt.site")) failures.push("NEXT_PUBLIC_SITE_URL todavía usa el dominio temporal");
  } catch {
    failures.push("NEXT_PUBLIC_SITE_URL no es una URL válida");
  }
}

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
if (whatsapp && !/^\d{10,15}$/.test(whatsapp)) {
  failures.push("NEXT_PUBLIC_WHATSAPP_NUMBER debe contener sólo dígitos en formato internacional");
}

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  failures.push("NEXT_PUBLIC_CONTACT_EMAIL no es válido");
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(target);
    return entry.name.endsWith(".json") && !entry.name.startsWith("_template") ? [target] : [];
  }));
  return nested.flat();
}

for (const directory of ["content"]) {
  const files = await collectFiles(path.join(root, directory));
  for (const file of files) {
    const source = await readFile(file, "utf8");
    if (/\{\{[^}]+\}\}/.test(source) && !file.endsWith("_template.json")) {
      failures.push(`${path.relative(root, file)} contiene placeholders sin resolver`);
    }
  }
}

if (failures.length) {
  console.error("Release bloqueado:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log("Release data validated.");
