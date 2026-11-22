import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConstellationEngine, type FormesJson, type OptionsConstellation } from "@/lib/constellation/engine";

/** Chaque forme est un seul point : la position moyenne des triangles dit quelle forme est visée. */
const donnees: FormesJson = {
  n: 20,
  palette: ["#A10684", "#38BFCB"],
  formes: {
    colibri: Array.from({ length: 20 }, () => [0, 0, 0]).flat(),
    cerveau: Array.from({ length: 20 }, () => [-1, 0, 1]).flat(),
    ampoule: Array.from({ length: 20 }, () => [1, 0, 1]).flat(),
  },
};
const base: OptionsConstellation = {
  n: 20,
  ambiance: 0,
  centre: { x: 0.5, y: 0.5 },
  echelle: 0.4,
  interactif: true,
  reduit: false,
  entree: "convergence",
};

let maintenant = 0;
let images: Map<number, FrameRequestCallback>;
let surVisible: ((visible: boolean) => void) | undefined;
let surTaille: (() => void) | undefined;
let triangles: [number, number][];
let alphas: number[];
let traits = 0;
let ecouteurs: Set<string>;
let envoyer: Map<string, (e: unknown) => void>;
let documentFactice: { hidden: boolean };
let pointeurFin = true;

function canvas(largeur = 1000, hauteur = 1000) {
  const ctx = {
    globalAlpha: 1,
    strokeStyle: "",
    lineWidth: 1,
    clearRect: () => {
      triangles = [];
      alphas = [];
    },
    beginPath() {},
    closePath() {},
    moveTo: (x: number, y: number) => {
      triangles.push([x, y]);
    },
    lineTo() {},
    stroke() {
      traits++;
      alphas.push(this.globalAlpha);
    },
  };
  return {
    clientWidth: largeur,
    clientHeight: hauteur,
    width: 0,
    height: 0,
    getContext: () => ctx,
    getBoundingClientRect: () => ({ left: 0, top: 0 }),
  } as unknown as HTMLCanvasElement;
}

function avancer(ms: number, pas = 1000 / 60) {
  for (let t = 0; t < ms; t += pas) {
    maintenant += pas;
    const file = [...images.values()];
    images.clear();
    file.forEach((f) => f(maintenant));
  }
}
const moyenneX = () => triangles.reduce((somme, [x]) => somme + x, 0) / triangles.length;

beforeEach(() => {
  maintenant = 1000;
  images = new Map();
  triangles = [];
  alphas = [];
  traits = 0;
  ecouteurs = new Set();
  envoyer = new Map();
  pointeurFin = true;
  let id = 0;
  const cible = (nom: string) => ({
    addEventListener: (type: string, f: (e: unknown) => void) => {
      ecouteurs.add(`${nom}:${type}`);
      envoyer.set(type, f);
    },
    removeEventListener: (type: string) => {
      ecouteurs.delete(`${nom}:${type}`);
    },
  });
  const noeud = cible("document");
  documentFactice = { hidden: false, ...noeud, documentElement: cible("racine") } as { hidden: boolean };
  vi.stubGlobal("window", {
    devicePixelRatio: 1,
    innerWidth: 1440,
    matchMedia: () => ({ matches: pointeurFin }),
    ...cible("window"),
  });
  vi.stubGlobal("document", documentFactice);
  vi.stubGlobal("performance", { now: () => maintenant });
  vi.stubGlobal("requestAnimationFrame", (f: FrameRequestCallback) => {
    images.set(++id, f);
    return id;
  });
  vi.stubGlobal("cancelAnimationFrame", (n: number) => {
    images.delete(n);
  });
  vi.stubGlobal("IntersectionObserver", class {
    constructor(f: (e: { isIntersecting: boolean }[]) => void) {
      surVisible = (visible) => f([{ isIntersecting: visible }]);
    }
    observe() { ecouteurs.add("io"); }
    disconnect() { ecouteurs.delete("io"); }
  });
  vi.stubGlobal("ResizeObserver", class {
    constructor(f: () => void) { surTaille = f; }
    observe() { ecouteurs.add("ro"); }
    disconnect() { ecouteurs.delete("ro"); }
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ConstellationEngine", () => {
  it("rassemble les particules au centre de la forme", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, base);
    moteur.start();
    avancer(3000);
    expect(moyenneX()).toBeGreaterThan(490);
    expect(moyenneX()).toBeLessThan(510);
  });

  it("se recompose vers la nouvelle forme, après un départ échelonné", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, base);
    moteur.start();
    avancer(3000);
    moteur.morph("ampoule");
    avancer(100);
    expect(moyenneX()).toBeLessThan(800);
    avancer(3000);
    expect(moyenneX()).toBeGreaterThan(890);
    expect(moyenneX()).toBeLessThan(910);
  });

  it("avance à la même vitesse à 60 et à 120 images par seconde", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.2);
    const position = (pas: number) => {
      const moteur = new ConstellationEngine(canvas(), donnees, { ...base, entree: "immediate" });
      moteur.start();
      avancer(1500, pas);
      moteur.morph("ampoule");
      avancer(260, pas);
      const x = moyenneX();
      moteur.destroy();
      return x;
    };
    const ecart = Math.abs(position(1000 / 60) - position(1000 / 120));
    vi.restoreAllMocks();
    expect(ecart).toBeLessThan(40);
  });

  it("dessine par petits lots : très peu de tracés par image, jamais un tracé géant", () => {
    const beaucoup: FormesJson = {
      n: 320,
      palette: ["#A10684", "#38BFCB"],
      formes: { ...donnees.formes, colibri: Array.from({ length: 320 }, () => [0, 0, 0]).flat() },
    };
    const moteur = new ConstellationEngine(canvas(), beaucoup, { ...base, n: 320 });
    moteur.start();
    avancer(50);
    traits = 0;
    avancer(10);
    expect(traits).toBe(10);
    expect(triangles.length).toBe(320);
  });

  it("atténue les particules quand elles se dispersent, sans dépasser la dispersion maximale", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, base);
    moteur.start();
    avancer(3000);
    expect(alphas[0]).toBeCloseTo(1);
    moteur.setDispersion(5);
    avancer(20);
    expect(alphas[0]).toBeCloseTo(0.3);
  });

  it("en mouvement réduit : une image fixe, aucune boucle, nouveau dessin au redimensionnement", () => {
    const toile = canvas();
    const moteur = new ConstellationEngine(toile, donnees, { ...base, reduit: true });
    moteur.start();
    moteur.morph("ampoule");
    expect(images.size).toBe(0);
    expect(triangles.length).toBe(20);
    expect(moyenneX()).toBeGreaterThan(490);
    expect(moyenneX()).toBeLessThan(510);
    (toile as unknown as { clientWidth: number }).clientWidth = 500;
    surTaille!();
    expect(moyenneX()).toBeGreaterThan(240);
    expect(moyenneX()).toBeLessThan(260);
  });

  it("s’arrête hors écran et onglet caché, puis reprend", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, base);
    moteur.start();
    surVisible!(false);
    expect(images.size).toBe(0);
    surVisible!(true);
    expect(images.size).toBe(1);
    documentFactice.hidden = true;
    envoyer.get("visibilitychange")!({});
    expect(images.size).toBe(0);
    documentFactice.hidden = false;
    envoyer.get("visibilitychange")!({});
    expect(images.size).toBe(1);
  });

  it("ne démarre pas tout seul avant start(), même si la toile devient visible", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, base);
    surVisible!(true);
    expect(images.size).toBe(0);
    moteur.start();
    expect(images.size).toBe(1);
  });

  it("reste arrêté après stop(), même si la toile redevient visible", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, base);
    moteur.start();
    moteur.stop();
    surVisible!(false);
    surVisible!(true);
    expect(images.size).toBe(0);
  });

  it("repousse les particules autour du pointeur, uniquement avec un pointeur fin", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, { ...base, entree: "immediate" });
    moteur.start();
    avancer(1500);
    envoyer.get("pointermove")!({ clientX: 480, clientY: 500 });
    avancer(600);
    expect(moyenneX()).toBeGreaterThan(504);
    moteur.destroy();
    ecouteurs.clear();
    pointeurFin = false;
    const tactile = new ConstellationEngine(canvas(), donnees, base);
    expect(ecouteurs.has("window:pointermove")).toBe(false);
    tactile.destroy();
  });

  it("libère tout à la destruction", () => {
    const moteur = new ConstellationEngine(canvas(), donnees, base);
    moteur.start();
    moteur.destroy();
    expect(images.size).toBe(0);
    expect([...ecouteurs]).toEqual([]);
    moteur.start();
    expect(images.size).toBe(0);
  });
});
