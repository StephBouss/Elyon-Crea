import { describe, expect, it } from "vitest";
import { STACK_ITEMS, valeurTotaleStack } from "@/lib/content/stack";

describe("stack de valeur", () => {
  it("contient les 6 éléments de la maquette", () => {
    expect(STACK_ITEMS).toHaveLength(6);
  });
  it("additionne les valeurs (990 000 FCFA)", () => {
    expect(valeurTotaleStack(STACK_ITEMS)).toBe(990000);
  });
  it("vaut 0 pour une liste vide", () => {
    expect(valeurTotaleStack([])).toBe(0);
  });
});
