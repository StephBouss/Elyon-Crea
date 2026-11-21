import { describe, expect, it } from "vitest";
import { formatFCFA, formatNombre } from "@/lib/format";

const NBSP = " ";

describe("formatNombre", () => {
  it("groupe les milliers avec des espaces insécables", () => {
    expect(formatNombre(500000)).toBe(`500${NBSP}000`);
    expect(formatNombre(1000000)).toBe(`1${NBSP}000${NBSP}000`);
  });
  it("laisse les petits nombres intacts", () => {
    expect(formatNombre(0)).toBe("0");
    expect(formatNombre(999)).toBe("999");
  });
  it("arrondit à l'entier", () => {
    expect(formatNombre(1500.6)).toBe(`1${NBSP}501`);
  });
  it("gère les négatifs", () => {
    expect(formatNombre(-25000)).toBe(`-25${NBSP}000`);
  });
});

describe("formatFCFA", () => {
  it("ajoute FCFA avec un espace insécable", () => {
    expect(formatFCFA(500000)).toBe(`500${NBSP}000${NBSP}FCFA`);
    expect(formatFCFA(150000)).toBe(`150${NBSP}000${NBSP}FCFA`);
  });
  it("ne contient aucun espace sécable", () => {
    expect(formatFCFA(990000)).not.toMatch(/ /);
  });
});
