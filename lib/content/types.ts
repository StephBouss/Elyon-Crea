export type Formule = {
  id: string;
  slug: string;
  nom: string;
  prix: number | null;
  prixMention: string | null;
  prixNote: string | null;
  prixBarre: number | null;
  accroche: string;
  description: string;
  avantages: string[];
  miseEnAvant: boolean;
  cta: string;
};

/** Sans configuration, les lectures renvoient null. */
export type Places = { total: number; restantes: number };

export type Realisation = {
  id: string;
  titre: string;
  client: string;
  categorie: string;
  resultat: string;
  description: string;
  imageUrl: string;
};

export type FaqItem = { id: string; question: string; reponse: string };

/** valeur null → affiche « [À CONFIRMER] » sans animation. */
export type Chiffre = { valeur: number | null; prefixe: string; suffixe: string; label: string };

export type StackItem = { label: string; valeur: number };
