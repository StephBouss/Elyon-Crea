import type { Chiffre } from "./types";

export const REALISATION_PLACEHOLDER = "/images/placeholders/realisation.jpg";

/** Chiffres clés : valeurs à fournir par Steph (null = « [À CONFIRMER] »). */
export const CHIFFRES: Chiffre[] = [
  { valeur: null, prefixe: "+", suffixe: "", label: "Projets livrés" },
  { valeur: null, prefixe: "+", suffixe: "", label: "Clients satisfaits" },
  { valeur: null, prefixe: "", suffixe: "", label: "Années d'expérience" },
  { valeur: null, prefixe: "", suffixe: " %", label: "Taux de satisfaction" },
];
