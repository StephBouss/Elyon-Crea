import { formatFCFA } from "@/lib/format";
import type { Database } from "@/lib/supabase/types";
import { REALISATION_PLACEHOLDER } from "./static";
import type { FaqItem, Formule, Places, Realisation } from "./types";

type Row<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

export function mapFormule(row: Row<"formules">): Formule {
  return {
    id: row.id,
    slug: row.slug,
    nom: row.nom,
    prix: row.prix,
    prixMention: row.prix_mention,
    prixNote: row.prix_note,
    prixBarre: row.prix_barre,
    accroche: row.accroche,
    description: row.description,
    avantages: row.avantages,
    miseEnAvant: row.mise_en_avant,
    cta: row.cta,
  };
}

export function prixAffiche(f: Formule): string {
  return f.prix !== null ? formatFCFA(f.prix) : (f.prixMention ?? "Sur devis");
}

export function mapPlaces(row: Row<"places"> | null): Places | null {
  if (!row) return null;
  const total = Math.max(0, row.total);
  return { total, restantes: Math.min(Math.max(0, row.restantes), total) };
}

export function mapRealisation(row: Row<"realisations">, publicImageUrl: (path: string) => string): Realisation {
  return {
    id: row.id,
    titre: row.titre,
    client: row.client,
    categorie: row.categorie,
    resultat: row.resultat,
    description: row.description,
    imageUrl: row.image_path ? publicImageUrl(row.image_path) : REALISATION_PLACEHOLDER,
  };
}

export function mapFaq(row: Row<"faq">): FaqItem {
  return { id: row.id, question: row.question, reponse: row.reponse };
}
