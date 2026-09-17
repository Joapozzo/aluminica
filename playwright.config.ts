import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 0,
  reporter: "line",
  use: { baseURL: "http://localhost:4173", trace: "retain-on-failure" },
  webServer: { command: "npm run build && npm run start:test", url: "http://localhost:4173", reuseExistingServer: true, timeout: 180_000 },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } },
  ],
});
