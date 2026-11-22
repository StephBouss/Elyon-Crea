import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, type TestInfo } from "@playwright/test";

export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`exception: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`http ${response.status()}: ${response.url()}`);
  });
  page.on("requestfailed", (request) => {
    const failure = request.failure()?.errorText ?? "";
    // Chromium signale aussi les préchargements volontairement interrompus.
    if (failure !== "net::ERR_ABORTED") errors.push(`échec: ${request.url()} ${failure}`);
  });
  return { errors };
}

export async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  // « networkidle » peut précéder l’installation des animations par React : défiler trop tôt
  // laisserait le nom géant caché. En mouvement réduit, il n’est jamais découpé en lettres.
  await page.waitForFunction(() => {
    const name = document.querySelector("footer p[aria-hidden='true']");
    return !name || matchMedia("(prefers-reduced-motion: reduce)").matches || name.querySelector("div > div");
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Déclenche les animations à l’apparition et le chargement différé.
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo({ top: height, left: 0, behavior: "instant" });
  });
  // On attend en bas de page que le nom géant soit vraiment révélé avant de remonter.
  await expect.poll(() => page.locator("footer p[aria-hidden='true'] div > div").evaluateAll(
    (letters) => letters.every((letter) => {
      const { transform } = getComputedStyle(letter);
      return transform === "none" || new DOMMatrix(transform).isIdentity;
    }),
  ), { message: "le nom géant du pied de page n’est pas révélé" }).toBe(true);
  await page.evaluate(async () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const animations = document.getAnimations().filter(
      (animation) => animation.playState === "running" &&
        animation.effect?.getTiming().iterations !== Infinity,
    );
    await Promise.allSettled(animations.map((animation) => animation.finished));
    await document.fonts.ready;
  });
  // GSAP utilise des animations qui ne figurent pas dans document.getAnimations().
  await page.waitForTimeout(900);
  const whatsapp = page.getByRole("link", { name: "Nous écrire sur WhatsApp", includeHidden: true });
  if (await whatsapp.count()) {
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveCSS("opacity", "1");
  }
  await page.waitForLoadState("networkidle");
}

export async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  // Un débordement peut agrandir innerWidth sur un navigateur mobile.
  const viewportWidth = Math.min(innerWidth, page.viewportSize()?.width ?? innerWidth);
  expect(scrollWidth, "la page défile horizontalement").toBeLessThanOrEqual(viewportWidth);
}

export async function expectNoOverflow(page: Page, root = "body") {
  const problems = await page.evaluate(({ root, viewportWidth }) => {
    const rootElement = document.querySelector(root);
    if (!rootElement) return [`racine introuvable: ${root}`];

    const width = Math.min(document.documentElement.clientWidth, viewportWidth ?? Infinity);
    const tolerance = 1;
    const problems: string[] = [];
    const range = document.createRange();
    const hidesSubtree = (style: CSSStyleDeclaration) =>
      style.display === "none" || style.opacity === "0" ||
      style.contentVisibility === "hidden" || style.clip === "rect(0px, 0px, 0px, 0px)";
    function* layoutElements(element: Element): Generator<[Element, CSSStyleDeclaration]> {
      const style = getComputedStyle(element);
      if (hidesSubtree(style)) return;
      yield [element, style];
      if (element.hasAttribute("data-allow-overflow")) return;
      for (const child of element.children) yield* layoutElements(child);
    }

    function* textNodes(element: Element, clipper?: Element): Generator<Node> {
      if (element.hasAttribute("data-allow-overflow")) return;
      const style = getComputedStyle(element);
      if (hidesSubtree(style)) return;

      for (const child of element.childNodes) {
        if (style.visibility === "visible" && child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
          yield child;
        }
        if (!(child instanceof Element)) continue;

        const childStyle = getComputedStyle(child);
        if (clipper && child instanceof HTMLElement &&
          (childStyle.position === "absolute" || childStyle.position === "fixed")) {
          // Le rognage ne s’applique pas entre un élément positionné et son bloc contenant.
          if (!child.offsetParent || !clipper.contains(child.offsetParent)) continue;
        }

        if (clipper || childStyle.display === "inline" || childStyle.display === "contents") {
          yield* textNodes(child, clipper);
        }
      }
    }
    const describe = (element: Element) => {
      const id = element.id ? `#${element.id}` : "";
      const classes = Array.from(element.classList).slice(0, 3).map((name) => `.${name}`).join("");
      const text = (element.textContent ?? "").trim().slice(0, 40);
      return `<${element.localName}${id}${classes}> « ${text} »`;
    };

    if (rootElement.parentElement?.closest("[data-allow-overflow]")) return problems;
    for (const [element, style] of layoutElements(rootElement)) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (style.visibility === "visible" && (rect.right > width + tolerance || rect.left < -tolerance)) {
        problems.push(`hors écran: ${describe(element)}`);
      }

      const checkWidth = element.scrollWidth > element.clientWidth + tolerance;
      const checkHeight = style.overflowY !== "visible" &&
        element.scrollHeight > element.clientHeight + tolerance;
      if (!checkWidth && !checkHeight) continue;
      const clipsWidth = checkWidth && style.overflowX !== "visible";
      const left = rect.left + element.clientLeft;
      const right = rect.right - parseFloat(style.borderRightWidth);
      const top = rect.top + element.clientTop;
      const bottom = rect.bottom - parseFloat(style.borderBottomWidth);

      // Quand le bloc rogne son contenu, il peut aussi couper le texte d’un sous-bloc.
      for (const child of textNodes(element, clipsWidth || checkHeight ? element : undefined)) {
        range.selectNodeContents(child);
        const textRects = Array.from(range.getClientRects());
        const exceedsWidth = checkWidth && textRects.some(
          (textRect) => textRect.left < left - tolerance || textRect.right > right + tolerance,
        );
        const exceedsHeight = checkHeight && textRects.some(
          (textRect) => textRect.top < top - tolerance || textRect.bottom > bottom + tolerance,
        );
        if (exceedsWidth || exceedsHeight) {
          const clipped = exceedsHeight || clipsWidth;
          problems.push(`${clipped ? "texte coupé" : "texte qui déborde"}: ${describe(element)}`);
          break;
        }
      }
    }

    return problems.slice(0, 15);
  }, { root, viewportWidth: page.viewportSize()?.width });
  expect(problems, problems.join("\n")).toEqual([]);
}

export async function expectNoSeriousA11yViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const serious = violations.filter(({ impact }) => impact === "critical" || impact === "serious");
  const summary = serious.map(({ id, impact, nodes }) =>
    `${id} (${impact}): ${nodes.slice(0, 3).map(({ target }) => target.join(" ")).join(" | ")}`,
  );
  expect(serious, summary.join("\n")).toEqual([]);
}

export async function fullPageScreenshot(page: Page, name: string, testInfo: TestInfo) {
  await page.screenshot({
    path: `tests/screenshots/${name}-${testInfo.project.name}.png`,
    fullPage: true,
    animations: "disabled",
  });
}

export async function checkPage(page: Page, testInfo: TestInfo, name: string, errors: string[]) {
  await settle(page);
  await expectNoHorizontalScroll(page);
  await expectNoOverflow(page);
  await expectNoSeriousA11yViolations(page);
  await fullPageScreenshot(page, name, testInfo);
  expect(errors, errors.join("\n")).toEqual([]);
}
