/** Génère public/constellation/formes.json (positions des particules) : `npm run constellation`. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { echantillonner, mulberry32, type Pixels } from "../lib/constellation/sample";

const N = 2000;
const LOGO = "public/images/logos/elyon_crea_logo_compact_fond_sombre.svg";
const PALETTE_HEX = [
  // Charte : Orchidée, Cyan doux, Rose poudré, Orchidée claire.
  "#A10684", "#38BFCB", "#EEDCE9", "#C24BA8",
  // Dégradés du colibri du logo : magenta vif, violet, bleu, cyan vif.
  "#FF12C3", "#6332DF", "#2455F4", "#00CFE6",
  // Violet sombre de l’aile, éclairci pour rester visible sur fond noir.
  "#8B2BE0",
];
/** Teinte d’origine, dans le logo, de la couleur éclaircie ci-dessus. */
const REPERES: Record<string, string> = { "#8B2BE0": "#6B0AAB" };
const PALETTE = PALETTE_HEX.map(
  (hex) => [1, 3, 5].map((i) => parseInt((REPERES[hex] ?? hex).slice(i, i + 2), 16)) as [number, number, number],
);

async function pixelsDepuis(entree: Buffer, taille = 480): Promise<Pixels> {
  const { data, info } = await sharp(entree, { density: 144 })
    .resize(taille, taille, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { largeur: info.width, hauteur: info.height, rgba: data };
}

/** Le colibri est lu dans le fichier du logo : s’il change, relancer `npm run constellation` suffit. */
async function colibriDuLogo(): Promise<Pixels> {
  const svg = (await readFile(LOGO, "utf8")).replaceAll("\r\n", "\n");
  const degrades = svg.match(/<defs>[\s\S]*?<\/defs>/)?.[0];
  // L’emblème est le premier groupe ; le nom « Elyon Créa » commence juste après.
  const embleme = svg.match(/<g transform="translate\(10 6\)">[\s\S]*?\n <\/g>/)?.[0];
  if (!degrades || !embleme) throw new Error(`Emblème introuvable dans ${LOGO}`);
  const px = await pixelsDepuis(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 310" width="440" height="310">${degrades}${embleme}</svg>`,
    ),
    880,
  );
  // L’œil est presque noir : invisible sur fond noir, il reste donc vide.
  for (let i = 0; i < px.rgba.length; i += 4) {
    if (Math.max(px.rgba[i], px.rgba[i + 1], px.rgba[i + 2]) < 40) px.rgba[i + 3] = 0;
  }
  return px;
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
  const colibri = echantillonner(await colibriDuLogo(), N, alea, PALETTE);
  const cerveau = echantillonner(await pixelsDepuis(await readFile("design/constellation/cerveau.svg")), N, alea);
  colorierParPosition(cerveau, alea);
  const ampoule = echantillonner(await pixelsDepuis(await readFile("design/constellation/ampoule.svg")), N, alea);
  colorierParPosition(ampoule, alea);

  await mkdir("public/constellation", { recursive: true });
  const json = JSON.stringify({
    n: N,
    palette: PALETTE_HEX,
    // Les particules d’ambiance n’emploient que les premières teintes (charte).
    teintesAmbiance: 4,
    formes: { colibri: arrondir(colibri), cerveau: arrondir(cerveau), ampoule: arrondir(ampoule) },
  });
  await writeFile("public/constellation/formes.json", json);
  console.log(`✓ public/constellation/formes.json (${Math.round(json.length / 1024)} Ko)`);
}

void main();
