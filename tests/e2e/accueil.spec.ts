import { expect, test } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

test.describe("Accueil", () => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    test(`en-tête et menu plein écran (${reducedMotion})`, async ({ page }, testInfo) => {
      await page.emulateMedia({ reducedMotion });
      const { errors } = trackErrors(page);
      await page.goto("/");
      const header = page.getByRole("banner");
      await expect(header.getByRole("link", { name: "Audit gratuit" })).toBeVisible();
      await expect(header.getByRole("link", { name: "Audit gratuit" })).toHaveAttribute("href", "/audit-gratuit");
      const width = page.viewportSize()!.width;
      const trigger = header.getByRole("button", { name: "Ouvrir le menu" });
      if (width < 1024) {
        await trigger.click();
        const menu = page.getByRole("dialog", { name: "Navigation" });
        await expect(menu).toBeVisible();
        const menuTitle = menu.getByRole("heading", { name: "Navigation" });
        await expect(menuTitle).toHaveCSS("font-size", "14px");
        await expect(menuTitle).toHaveCSS("font-weight", "600");
        await expect(menuTitle).toHaveCSS("text-transform", "uppercase");
        await expect(menuTitle).toHaveCSS("font-family", /Manrope/i);
        await expect(menu.getByRole("link", { name: "Réalisations", exact: true })).toHaveAttribute("href", "/realisations");
        await expect(menu.getByRole("link", { name: "Audit gratuit" })).toHaveAttribute("href", "/audit-gratuit");
        const box = await menu.boundingBox();
        expect(box?.width).toBe(width);
        expect(box?.height).toBe(page.viewportSize()!.height);
        await checkPage(page, testInfo, `menu-ouvert-${reducedMotion}`, errors);
        const close = menu.getByRole("button", { name: "Fermer le menu" });
        await close.focus();
        await page.keyboard.press("Shift+Tab");
        await expect(menu.getByRole("link", { name: "Audit gratuit" })).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(close).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(menu).not.toBeVisible();
        await expect(trigger).toBeFocused();
        await trigger.click();
        await expect(menu.getByRole("link", { name: "Services", exact: true })).toHaveAttribute("href", "/#services");
        await menu.getByRole("link", { name: "Services", exact: true }).click();
        await expect(menu).not.toBeVisible();
      } else {
        await expect(trigger).not.toBeVisible();
        await expect(header.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/#services");
        await expect(header.getByRole("link", { name: "Réalisations" })).toHaveAttribute("href", "/realisations");
      }
      await checkPage(page, testInfo, `header-${reducedMotion}`, errors);
      if (width < 1024) {
        await trigger.click();
        await page.setViewportSize({ width: 1280, height: 900 });
        await expect(page.getByRole("dialog")).not.toBeVisible();
        await expect(header.getByRole("link", { name: "Services" })).toBeVisible();
      }
    });
  }

  test("en-tête : défilement, focus et mouvement réduit en temps réel", async ({ page }) => {
    const { errors } = trackErrors(page);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/lenis/);
    // La landing est encore un écran de chantier sans hauteur de défilement.
    // Cette hauteur de test permet d'exercer le vrai ScrollTrigger sans modifier le main.
    await page.evaluate(() => {
      document.querySelector("main")!.style.minHeight = "3000px";
    });
    // Un vrai changement de largeur évite ignoreMobileResize de ScrollTrigger.
    // On revient à la largeur du projet avant toute interaction/assertion.
    const viewport = page.viewportSize()!;
    await page.setViewportSize({ ...viewport, width: viewport.width + 1 });
    // Laisser passer le debounce resize avant de rétablir la largeur originale.
    await page.waitForTimeout(300);
    await page.setViewportSize(viewport);
    await page.waitForTimeout(300);
    const header = page.getByRole("banner");
    const audit = header.getByRole("link", { name: "Audit gratuit" });
    const bottom = () => header.evaluate((el) => el.getBoundingClientRect().bottom);
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
    await expect.poll(bottom).toBeLessThanOrEqual(1);
    await audit.focus();
    await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
    await audit.blur();
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
    await expect.poll(bottom).toBeLessThanOrEqual(1);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: "instant" }));
    await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
    await expect(header).toHaveCSS("background-color", "rgb(0, 0, 0)");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
    await expect.poll(bottom).toBeLessThanOrEqual(1);
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
    await expect.poll(() => header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
    expect(errors, errors.join("\n")).toEqual([]);
  });
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
