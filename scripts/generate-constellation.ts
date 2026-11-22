/** Génère public/constellation/formes.json (positions des particules) : `npm run constellation`. */
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { echantillonner, mulberry32, type Pixels } from "../lib/constellation/sample";

const N = 2000;
// Orchidée, Cyan doux, Rose poudré, Orchidée claire.
const PALETTE_HEX = ["#A10684", "#38BFCB", "#EEDCE9", "#C24BA8"];
const PALETTE = PALETTE_HEX.map(
  (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number],
);

async function pixelsDepuis(entree: Buffer, taille = 480): Promise<Pixels> {
  const { data, info } = await sharp(entree, { density: 144 })
    .resize(taille, taille, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { largeur: info.width, hauteur: info.height, rgba: data };
}

/** Orchidée à gauche → Cyan à droite, avec quelques touches claires. */
function colorierParPosition(points: Float32Array, alea: () => number) {
  for (let i = 0; i < points.length; i += 3) {
    const t = (points[i] + 1) / 2;
    const r = alea();
    points[i + 2] = r < 0.1 ? 2 : r < 0.18 ? 3 : alea() < t ? 1 : 0;
  }
}

const arrondir = (valeurs: Float32Array) => Array.from(valeurs, (v) => Math.round(v * 1000) / 1000);

async function main() {
  const alea = mulberry32(2026);
  const colibri = echantillonner(await pixelsDepuis(await readFile("design/logo/colibri.png")), N, alea, PALETTE);
  const cerveau = echantillonner(await pixelsDepuis(await readFile("design/constellation/cerveau.svg")), N, alea);
  colorierParPosition(cerveau, alea);
  const ampoule = echantillonner(await pixelsDepuis(await readFile("design/constellation/ampoule.svg")), N, alea);
  colorierParPosition(ampoule, alea);

  await mkdir("public/constellation", { recursive: true });
  await copyFile("design/logo/colibri.png", "public/constellation/colibri.png");
  const json = JSON.stringify({
    n: N,
    palette: PALETTE_HEX,
    formes: { colibri: arrondir(colibri), cerveau: arrondir(cerveau), ampoule: arrondir(ampoule) },
  });
  await writeFile("public/constellation/formes.json", json);
  console.log(`✓ public/constellation/formes.json (${Math.round(json.length / 1024)} Ko)`);
}

void main();
