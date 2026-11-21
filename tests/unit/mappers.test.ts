import { describe, expect, it } from "vitest";
import { mapFaq, mapFormule, mapPlaces, mapRealisation, prixAffiche } from "@/lib/content/mappers";
import { REALISATION_PLACEHOLDER } from "@/lib/content/static";

const NBSP = "\u00A0";

const formuleRow = {
  id: "1", slug: "envol-360", nom: "Envol 360°", prix: 500000, prix_mention: null, prix_note: null,
  prix_barre: null, accroche: "a", description: "d", avantages: ["x", "y"], mise_en_avant: true,
  cta: "Go", ordre: 2, publie: true, created_at: "", updated_at: "",
};

describe("mapFormule / prixAffiche", () => {
  it("convertit une ligne en Formule", () => {
    const f = mapFormule(formuleRow);
    expect(f).toMatchObject({ slug: "envol-360", prix: 500000, miseEnAvant: true, avantages: ["x", "y"] });
  });
  it("affiche le prix en FCFA", () => {
    expect(prixAffiche(mapFormule(formuleRow))).toBe(`500${NBSP}000${NBSP}FCFA`);
  });
  it("affiche un prix de zéro en FCFA", () => {
    const f = mapFormule({ ...formuleRow, prix: 0 });
    expect(prixAffiche(f)).toBe(`0${NBSP}FCFA`);
  });
  it("affiche la mention quand il n'y a pas de prix", () => {
    const f = mapFormule({ ...formuleRow, prix: null, prix_mention: "Sur devis" });
    expect(prixAffiche(f)).toBe("Sur devis");
  });
});

describe("mapPlaces", () => {
  it("retourne la ligne", () => {
    expect(mapPlaces({ id: 1, total: 5, restantes: 4, updated_at: "" })).toEqual({ total: 5, restantes: 4 });
  });
  it("borne restantes entre 0 et total", () => {
    expect(mapPlaces({ id: 1, total: 5, restantes: 9, updated_at: "" })).toEqual({ total: 5, restantes: 5 });
  });
  it("conserve un nombre de places réellement configuré à zéro", () => {
    expect(mapPlaces({ id: 1, total: 0, restantes: 0, updated_at: "" })).toEqual({ total: 0, restantes: 0 });
  });
  it("retourne null si la ligne manque", () => {
    expect(mapPlaces(null)).toBeNull();
  });
});

describe("mapRealisation", () => {
  const row = {
    id: "r1", titre: "T", client: "C", categorie: "Branding & Print", resultat: "R", description: "D",
    image_path: "projet-1.jpg", ordre: 1, publie: true, created_at: "", updated_at: "",
  };
  it("construit l'URL publique de l'image", () => {
    const r = mapRealisation(row, (p) => `https://cdn/${p}`);
    expect(r.imageUrl).toBe("https://cdn/projet-1.jpg");
  });
  it("utilise l'image provisoire si aucune image", () => {
    const r = mapRealisation({ ...row, image_path: null }, (p) => p);
    expect(r.imageUrl).toBe(REALISATION_PLACEHOLDER);
  });
});

describe("mapFaq", () => {
  it("convertit une ligne", () => {
    expect(mapFaq({ id: "f", question: "Q", reponse: "R", ordre: 1, publie: true, created_at: "", updated_at: "" }))
      .toEqual({ id: "f", question: "Q", reponse: "R" });
  });
});
