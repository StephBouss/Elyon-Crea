/** Lien wa.me ; null si le numéro n'est pas exploitable (bouton masqué). */
export function buildWhatsAppLink(numero: string, message?: string): string | null {
  const chiffres = numero.replace(/\D/g, "");
  if (chiffres.length < 8) return null;
  const base = `https://wa.me/${chiffres}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
