const NBSP = " ";

/** 500000 → "500 000" (espaces insécables, jamais coupé). */
export function formatNombre(n: number): string {
  const entier = Math.round(n);
  const signe = entier < 0 ? "-" : "";
  const chiffres = Math.abs(entier).toString();
  return signe + chiffres.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** 500000 → "500 000 FCFA". */
export function formatFCFA(n: number): string {
  return `${formatNombre(n)}${NBSP}FCFA`;
}
