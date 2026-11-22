import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { FormesJson } from "@/lib/constellation/engine";

const donnees = JSON.parse(readFileSync("public/constellation/formes.json", "utf8")) as FormesJson;

/** On ramène chaque particule dans le repère de l’emblème du logo, large de 396 (de 26 à 422) et haut de 289. */
const colibri = Array.from({ length: donnees.formes.colibri.length / 3 }, (_, i) => {
  const [x, y, c] = donnees.formes.colibri.slice(i * 3, i * 3 + 3);
  return { x: 224 + x * 198, y: 157.5 + y * 198, c: donnees.palette[c] };
});
const dans = (x1: number, y1: number, x2: number, y2: number) =>
  colibri.filter((q) => q.x >= x1 && q.x <= x2 && q.y >= y1 && q.y <= y2);

describe("colibri de la constellation = colibri du logo", () => {
  it("a les proportions de l’emblème", () => {
    const etendue = (v: number[]) => Math.max(...v) - Math.min(...v);
    const ratio = etendue(colibri.map((q) => q.x)) / etendue(colibri.map((q) => q.y));
    expect(ratio).toBeGreaterThan(1.25);
    expect(ratio).toBeLessThan(1.45);
  });

  it("a le bec à droite", () => {
    expect(dans(345, 75, 425, 105).length).toBeGreaterThan(5);
    expect(dans(345, 130, 425, 305).length).toBe(0);
  });

  it("a ses carrés numériques cyan à gauche", () => {
    const carres = dans(60, 20, 92, 60);
    expect(carres.length).toBeGreaterThan(15);
    expect(carres.filter((q) => ["#00CFE6", "#38BFCB", "#2455F4"].includes(q.c)).length / carres.length).toBeGreaterThan(0.9);
  });

  it("a un œil vide, avec son reflet", () => {
    expect(dans(307, 93, 312, 97).length).toBe(0);
  });

  it("garde le cerveau et l’ampoule dans les quatre teintes d’origine", () => {
    for (const nom of ["cerveau", "ampoule"] as const) {
      expect(Math.max(...donnees.formes[nom].filter((_, i) => i % 3 === 2))).toBeLessThan(4);
    }
    expect(donnees.palette.slice(0, 4)).toEqual(["#A10684", "#38BFCB", "#EEDCE9", "#C24BA8"]);
  });
});
