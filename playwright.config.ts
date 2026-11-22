import { defineConfig, devices } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT ?? "3000";
const baseURL = `http://localhost:${port}`;
const widths = [360, 390, 768, 1024, 1280, 1440, 1920];

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    locale: "fr-FR",
  },
  projects: [
    ...widths.map((width) => ({
      name: `chromium-${width}`,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width, height: width < 768 ? 800 : 900 },
        isMobile: width < 768,
        hasTouch: width < 1024,
      },
    })),
    { name: "webkit-390", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    env: {
      PORT: port,
      NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "24100000000",
    },
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
