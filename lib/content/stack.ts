import type { StackItem } from "./types";

/** Valeurs de la maquette à faire valider avant publication. */
export const STACK_ITEMS: StackItem[] = [
  { label: "Logo relooké + charte graphique complète", valeur: 200000 },
  { label: "Site vitrine / landing page mobile-first", valeur: 350000 },
  { label: "5 templates réseaux + calendrier 1 mois", valeur: 150000 },
  { label: "Kit papeterie (carte, flyer, en-tête, signature mail)", valeur: 120000 },
  { label: "Pack goodies personnalisés", valeur: 80000 },
  { label: "1 support grand format prêt à imprimer", valeur: 90000 },
];

export function valeurTotaleStack(items: StackItem[]): number {
  return items.reduce((total, item) => total + item.valeur, 0);
}
