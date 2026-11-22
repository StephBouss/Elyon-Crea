import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("@/components/site/header", () => ({ Header: () => null }));
vi.mock("@/components/site/footer-name", () => ({ FooterName: () => null }));
vi.mock("@/components/site/motion/smooth-scroll", () => ({
  SmoothScroll: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@/components/site/whatsapp-button", () => ({
  WhatsAppButton: ({ href }: { href: string }) => createElement("a", { href }, "Bouton WhatsApp flottant"),
}));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it("garde le contact par e-mail sans rendre de liens WhatsApp si le numéro est absent", async () => {
  vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");
  const { default: SiteLayout } = await import("@/app/(site)/layout");
  const html = renderToStaticMarkup(createElement(SiteLayout, null, null));

  expect(html).toContain('href="mailto:contact@elyoncrea.com"');
  expect(html).toContain("[À CONFIRMER]");
  expect(html).not.toContain("Écrire sur WhatsApp");
  expect(html).not.toContain("Bouton WhatsApp flottant");
  expect(html).not.toContain("https://wa.me/");
});
