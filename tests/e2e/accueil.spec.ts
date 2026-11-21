import { expect, test } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

test.describe("Accueil", () => {
  test("s’affiche sans erreur ni débordement", async ({ page }, testInfo) => {
    const { errors } = trackErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await checkPage(page, testInfo, "accueil", errors);
  });

  test.describe("Mouvement réduit", () => {
    test.use({ reducedMotion: "reduce" });

    test("affiche l’accueil avec la préférence de mouvement réduit", async ({ page }, testInfo) => {
      const { errors } = trackErrors(page);
      await page.goto("/");
      const reducedMotion = await page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches,
      );
      expect(reducedMotion).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await checkPage(page, testInfo, "accueil-reduced", errors);
    });
  });
});
