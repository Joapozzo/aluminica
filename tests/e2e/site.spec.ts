import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home is usable, accessible and maps vertical scroll to the project reel", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Transformá tus espacios. Ganá luz, seguridad y funcionalidad." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir asistente de WhatsApp" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);

  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const seriousViolations = accessibility.violations
    .filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))
    .map((violation) => ({
      id: violation.id,
      nodes: violation.nodes.map((node) => ({ target: node.target.join(" "), message: node.any[0]?.message })),
    }));
  expect(seriousViolations).toEqual([]);

  const gallery = page.locator("[data-gallery-scroll]");
  const box = await gallery.boundingBox();
  expect(box).not.toBeNull();
  await page.evaluate((top) => window.scrollTo({ top: top + 200, behavior: "instant" }), box!.y);
  await page.waitForTimeout(250);
  const before = await page.locator("[data-gallery-track]").evaluate((element) => getComputedStyle(element).transform);
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(700);
  const after = await page.locator("[data-gallery-track]").evaluate((element) => getComputedStyle(element).transform);
  expect(after).not.toBe(before);
});

test("assistant opens and closes without losing focusable actions", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(700);
  const launcher = page.locator(".whatsapp-assistant__launcher");
  await expect(launcher).toHaveAccessibleName("Abrir asistente de WhatsApp");
  await launcher.click();
  await expect(launcher).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("button", { name: "Cotizar mi proyecto", exact: true })).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: "Cerrar asistente", exact: true }).click();
  await expect(launcher).toHaveAttribute("aria-expanded", "false", { timeout: 10_000 });
  await expect(launcher).toHaveAccessibleName("Abrir asistente de WhatsApp");
});

test("service pages are indexable and responsive", async ({ page }) => {
  await page.goto("/servicios/pergolas");
  await expect(page.getByRole("heading", { name: "Pérgolas" })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/servicios\/pergolas$/);
  await expect(page.getByRole("link", { name: /Hablemos/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
});

test("essential content remains available with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Transformá tus espacios. Ganá luz, seguridad y funcionalidad." })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Soluciones para transformar/ })).toBeAttached();
  await expect(page.getByRole("heading", { name: /Contanos qué querés transformar/ })).toBeAttached();
});
