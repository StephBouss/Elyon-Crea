import { describe, expect, it } from "vitest";
import { couleurProche, echantillonner, mulberry32, type Pixels } from "@/lib/constellation/sample";

/** Masque 10×10 en forme de L : colonne gauche (x<3) + ligne du bas (y>=7), le reste transparent. */
function masqueL(): Pixels {
  const largeur = 10, hauteur = 10;
  const rgba = new Uint8ClampedArray(largeur * hauteur * 4);
  for (let y = 0; y < hauteur; y++) for (let x = 0; x < largeur; x++) {
    const i = (y * largeur + x) * 4;
    const plein = x < 3 || y >= 7;
    rgba[i] = 161; rgba[i + 1] = 6; rgba[i + 2] = 132; rgba[i + 3] = plein ? 255 : 0;
  }
  return { largeur, hauteur, rgba };
}

describe("mulberry32", () => {
  it("est reproductible", () => {
    const a = mulberry32(42), b = mulberry32(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});

describe("couleurProche", () => {
  it("trouve l'Orchidée et le Cyan", () => {
    const palette: [number, number, number][] = [[161, 6, 132], [56, 191, 203]];
    expect(couleurProche(150, 20, 120, palette)).toBe(0);
    expect(couleurProche(60, 180, 200, palette)).toBe(1);
  });
});

describe("echantillonner", () => {
  it("rend n points de 3 valeurs, tous dans [-1, 1]", () => {
    const pts = echantillonner(masqueL(), 500, mulberry32(1));
    expect(pts.length).toBe(1500);
    for (let i = 0; i < pts.length; i += 3) {
      expect(Math.abs(pts[i])).toBeLessThanOrEqual(1);
      expect(Math.abs(pts[i + 1])).toBeLessThanOrEqual(1);
    }
  });
  it("ne place aucun point dans la zone transparente (coin haut droit du L)", () => {
    const pts = echantillonner(masqueL(), 800, mulberry32(2));
    // Après normalisation, le coin haut droit vide correspond à x > -0.35 et y < 0.35.
    for (let i = 0; i < pts.length; i += 3) {
      expect(pts[i] > -0.35 && pts[i + 1] < 0.35).toBe(false);
    }
  });
  it("attribue l'index de couleur de la palette", () => {
    const pts = echantillonner(masqueL(), 50, mulberry32(3), [[0, 0, 0], [161, 6, 132]]);
    for (let i = 2; i < pts.length; i += 3) expect(pts[i]).toBe(1);
  });
  it("est reproductible avec la même graine", () => {
    expect(Array.from(echantillonner(masqueL(), 20, mulberry32(7)))).toEqual(Array.from(echantillonner(masqueL(), 20, mulberry32(7))));
  });
  it("refuse un masque vide", () => {
    const vide: Pixels = { largeur: 2, hauteur: 2, rgba: new Uint8ClampedArray(16) };
    expect(() => echantillonner(vide, 10, mulberry32(1))).toThrow();
  });
});
