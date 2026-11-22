import { existsSync, readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Logo } from "@/components/site/logo";

const DOSSIER = "public/images/logos";
const lire = (nom: string) => readFileSync(`${DOSSIER}/${nom}.svg`, "utf8");
/** Bornes verticales d'un tracé (commandes absolues M, L, Q, C, Z uniquement). */
function bornesY(svg: string, id: string) {
  const d = svg.match(new RegExp(`<path id="${id}"[^>]* d="([^"]+)"`))?.[1];
  if (!d) throw new Error(`tracé « ${id} » introuvable`);
  const ys = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number).filter((_, i) => i % 2 === 1);
  return { haut: Math.min(...ys), bas: Math.max(...ys) };
}

describe.each(["fond_clair", "fond_sombre"])("logo %s", (fond) => {
  for (const nom of [`elyon_crea_logo_${fond}`, `elyon_crea_logo_compact_${fond}`]) {
    it(`${nom} ne dépend d’aucune police`, () => {
      expect(lire(nom)).not.toMatch(/<text|font-family/);
    });

    it(`${nom} pose l’accent juste au-dessus du « e »`, () => {
      const accent = bornesY(lire(nom), "accent");
      const e = bornesY(lire(nom), "lettre-e");
      expect(accent.bas).toBeLessThanOrEqual(e.haut);
      expect(e.haut - accent.bas).toBeLessThan(10);
    });
  }

  it("garde la signature dans la version complète seulement", () => {
    expect(lire(`elyon_crea_logo_${fond}`)).toContain('id="signature"');
    expect(lire(`elyon_crea_logo_compact_${fond}`)).not.toContain('id="signature"');
  });
});

it.each([["dark", "sombre"], ["light", "clair"]] as const)("affiche la version compacte sur fond %s", (background, fond) => {
  const html = renderToStaticMarkup(createElement(Logo, { background }));
  expect(decodeURIComponent(html)).toContain(`/images/logos/elyon_crea_logo_compact_fond_${fond}.svg`);
  expect(existsSync(`${DOSSIER}/elyon_crea_logo_compact_fond_${fond}.svg`)).toBe(true);
  expect(html).toContain('alt="Elyon Créa"');
});
