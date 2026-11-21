import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { mapFaq, mapFormule, mapPlaces, mapRealisation } from "./mappers";
import type { FaqItem, Formule, Places, Realisation } from "./types";

// En cas d'erreur Supabase, on lève : le build échoue (jamais de page vide publiée)
// et, en ISR, Next.js garde la dernière version valide.

export async function getFormules(): Promise<Formule[]> {
  const { data, error } = await createSupabasePublicClient()
    .from("formules").select("*").eq("publie", true).order("ordre");
  if (error) throw new Error(`formules: ${error.message}`);
  return data.map(mapFormule);
}

export async function getPlaces(): Promise<Places | null> {
  const { data, error } = await createSupabasePublicClient()
    .from("places").select("*").eq("id", 1).maybeSingle();
  if (error) throw new Error(`places: ${error.message}`);
  return mapPlaces(data);
}

export async function getRealisations(limit?: number): Promise<Realisation[]> {
  const supabase = createSupabasePublicClient();
  let query = supabase.from("realisations").select("*").eq("publie", true).order("ordre");
  if (limit !== undefined) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw new Error(`realisations: ${error.message}`);
  const publicUrl = (path: string) => supabase.storage.from("realisations").getPublicUrl(path).data.publicUrl;
  return data.map((row) => mapRealisation(row, publicUrl));
}

export async function getFaq(): Promise<FaqItem[]> {
  const { data, error } = await createSupabasePublicClient()
    .from("faq").select("*").eq("publie", true).order("ordre");
  if (error) throw new Error(`faq: ${error.message}`);
  return data.map(mapFaq);
}
