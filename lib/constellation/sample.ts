export type Pixels = { largeur: number; hauteur: number; rgba: Uint8ClampedArray | Uint8Array };

export function mulberry32(graine: number): () => number {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function couleurProche(r: number, g: number, b: number, palette: [number, number, number][]): number {
  let meilleur = 0, distMin = Infinity;
  palette.forEach(([pr, pg, pb], i) => {
    const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
    if (d < distMin) { distMin = d; meilleur = i; }
  });
  return meilleur;
}

export function echantillonner(px: Pixels, n: number, alea: () => number, palette?: [number, number, number][]): Float32Array {
  const { largeur, hauteur, rgba } = px;
  const pleins: number[] = [];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let y = 0; y < hauteur; y++) for (let x = 0; x < largeur; x++) {
    if (rgba[(y * largeur + x) * 4 + 3] > 128) {
      pleins.push(y * largeur + x);
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
  if (pleins.length === 0) throw new Error("Masque vide : aucun pixel opaque");
  const cx = (minX + maxX + 1) / 2, cy = (minY + maxY + 1) / 2;
  const demiCote = Math.max(maxX - minX + 1, maxY - minY + 1) / 2;
  const out = new Float32Array(n * 3);
  for (let k = 0; k < n; k++) {
    const p = pleins[Math.floor(alea() * pleins.length)];
    const x = p % largeur, y = Math.floor(p / largeur);
    const i = p * 4;
    out[k * 3] = Math.max(-1, Math.min(1, (x + alea() - cx) / demiCote));
    out[k * 3 + 1] = Math.max(-1, Math.min(1, (y + alea() - cy) / demiCote));
    out[k * 3 + 2] = palette ? couleurProche(rgba[i], rgba[i + 1], rgba[i + 2], palette) : 0;
  }
  return out;
}
