import { expect, test } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

test.describe("Accueil", () => {
  test("pied de page et bouton WhatsApp", async ({ page }) => {
    const { errors } = trackErrors(page);
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "contact@elyoncrea.com" })).toHaveAttribute("href", "mailto:contact@elyoncrea.com");
    const mentions = footer.getByRole("link", { name: "Mentions légales" });
    await expect(mentions).toHaveAttribute("href", "/mentions-legales");
    await expect(footer.getByRole("link", { name: "Audit gratuit" })).toHaveAttribute("href", "/audit-gratuit");
    await expect(footer.getByRole("link", { name: "Réalisations" })).toHaveAttribute("href", "/realisations");
    await expect(footer).toContainText(`© ${new Date().getFullYear()} Elyon Créa · Libreville · Gabon`);
    await expect(footer).toContainText("sous 24h ouvrables");
    await expect(footer).not.toContainText("hello@");

    const whatsapp = page.getByRole("link", { name: "Nous écrire sur WhatsApp" });
    await expect(whatsapp).toHaveAttribute("href", /^https:\/\/wa\.me\/\d{8,}\?text=/);
    await expect(whatsapp).toHaveAttribute("target", "_blank");
    const footerWhatsApp = footer.getByRole("link", { name: "Écrire sur WhatsApp" });
    await expect(footerWhatsApp).toHaveAttribute("href", (await whatsapp.getAttribute("href"))!);
    await expect(whatsapp).toHaveCSS("opacity", "1");

    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    const floatingBox = (await whatsapp.boundingBox())!;
    const mentionsBox = (await mentions.boundingBox())!;
    expect(floatingBox.width).toBe(56);
    expect(floatingBox.height).toBe(56);
    expect(mentionsBox.y + mentionsBox.height).toBeLessThanOrEqual(floatingBox.y);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("le nom géant du pied de page n’est pas rogné par son animation", async ({ page }) => {
    await page.goto("/");
    const name = page.locator("footer p[aria-hidden='true']");
    const letters = name.locator("div > div");
    await expect(letters).toHaveCount("ElyonCréa".length);

    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await expect.poll(() => letters.evaluateAll((elements) => elements.every((element) => {
      const { transform } = getComputedStyle(element);
      return transform === "none" || new DOMMatrix(transform).isIdentity;
    }))).toBe(true);
    // Le bouton flottant et l’en-tête bougent encore après l’arrivée en bas de page.
    await page.waitForTimeout(2500);

    const box = (await name.boundingBox())!;
    const clip = { x: 0, y: box.y - box.height * 0.1, width: page.viewportSize()!.width, height: box.height * 1.3 };
    const masked = await page.screenshot({ clip });
    await page.addStyleTag({ content: "footer p[aria-hidden='true'] * { overflow: visible !important; }" });
    const unmasked = await page.screenshot({ clip });
    expect(masked.equals(unmasked), "les masques cachent une partie des lettres").toBe(true);
  });

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
  test("hero : titre unique, 4 messages et boutons", async ({ page }) => {
    const { errors } = trackErrors(page);
    await page.goto("/");
    const hero = page.locator("section[aria-labelledby='hero-titre']");
    await expect(page.getByRole("region", { name: /De la stratégie au déploiement — votre communication 360°/ })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("votre communication 360°");
    await expect(hero.getByRole("link", { name: "Démarrer mon projet" })).toHaveAttribute("href", "/audit-gratuit");
    await expect(hero.getByRole("link", { name: "Voir nos réalisations" })).toHaveAttribute("href", "/realisations");
    const message = (n: number) => hero.getByRole("button", { name: `Afficher le message ${n}` });
    await expect(message(1)).toHaveAttribute("aria-current", "true");
    await message(2).click();
    await expect(page.locator("h1")).toContainText("une identité qui marque les esprits");
    await expect(message(2)).toHaveAttribute("aria-current", "true");
    await message(4).click();
    await message(3).click();
    await expect(page.locator("h1")).toContainText("amplifiée et optimisée");
    await message(4).click();
    await expect(page.locator("h1")).toContainText("de votre communication");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(hero.locator("canvas")).toHaveAttribute("aria-hidden", "true");
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("hero : les particules sont dessinées", async ({ page }) => {
    await page.goto("/");
    await expect.poll(() => page.locator("canvas").evaluate((toile: HTMLCanvasElement) => {
      const { data } = toile.getContext("2d")!.getImageData(0, 0, toile.width, toile.height);
      let pixels = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 40) pixels++;
      return pixels;
    }), { timeout: 20_000 }).toBeGreaterThan(1000);
  });

  test("hero : défilement automatique des messages, avec pause", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/");
    const titre = page.locator("h1");
    await page.getByRole("button", { name: "Mettre les messages en pause" }).click();
    await page.mouse.move(5, 5);
    await page.waitForTimeout(8500);
    await expect(titre).toContainText("votre communication 360°");
    await page.getByRole("button", { name: "Reprendre le défilement des messages" }).click();
    await page.mouse.move(5, 5);
    await expect(titre).toContainText("une identité qui marque les esprits", { timeout: 12_000 });
  });

  test("hero : changer de message ne déplace pas les boutons", async ({ page }) => {
    await page.goto("/");
    const bouton = page.getByRole("link", { name: "Démarrer mon projet" });
    await page.waitForTimeout(2500);
    const avant = (await bouton.boundingBox())!;
    for (const n of [2, 3, 4]) {
      await page.getByRole("button", { name: `Afficher le message ${n}` }).click();
      await page.waitForTimeout(900);
      expect((await bouton.boundingBox())!.y).toBeCloseTo(avant.y, 0);
    }
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
      await expect(page.getByRole("button", { name: "Mettre les messages en pause" })).toBeHidden();
      await checkPage(page, testInfo, "accueil-reduced", errors);
      await page.getByRole("button", { name: "Afficher le message 2" }).click();
      await expect(page.locator("h1")).toContainText("une identité qui marque les esprits");
    });
  });
});
