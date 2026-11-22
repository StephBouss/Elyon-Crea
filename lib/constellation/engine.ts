export type FormeId = "colibri" | "cerveau" | "ampoule";
export type FormesJson = { n: number; palette: string[]; teintesAmbiance?: number; formes: Record<FormeId, number[]> };
export type OptionsConstellation = {
  n: number;
  ambiance: number;
  /** Centre de la forme, en fraction de la largeur et de la hauteur de la toile. */
  centre: { x: number; y: number };
  /** Demi-taille de la forme, en fraction de la plus petite dimension de la toile. */
  echelle: number;
  opacite?: number;
  interactif: boolean;
  reduit: boolean;
  entree: "convergence" | "immediate";
};

const RAYON_SOURIS = 90;
const RESSORT = 0.045;
const AMORTI = 0.86;
const IMAGE_MS = 1000 / 60;
const APPARITION_MS = 1200;
/** Triangles par tracé : mesuré sur processeur ralenti, un seul grand tracé coûte 2 à 3 fois plus cher. */
const LOT = 32;
const TIERS_DE_TOUR = (Math.PI * 2) / 3;

export class ConstellationEngine {
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private trait = 1;
  private nForme: number;
  private total: number;
  private x: Float32Array;
  private y: Float32Array;
  private vx: Float32Array;
  private vy: Float32Array;
  /** Position visée : [-1, 1] pour la forme, [0, 1] pour l’ambiance. */
  private ox: Float32Array;
  private oy: Float32Array;
  private dx: Float32Array;
  private dy: Float32Array;
  private taille: Float32Array;
  private rot: Float32Array;
  private vrot: Float32Array;
  private phase: Float32Array;
  private retard: Float32Array;
  private couleur: Uint8Array;
  /** Cible de la dernière particule calculée (évite une allocation par particule et par image). */
  private tx = 0;
  private ty = 0;
  private forme: FormeId = "colibri";
  private dispersion = 0;
  private t0: number | null = null;
  private tPrecedent: number | null = null;
  private morphT0 = 0;
  private raf = 0;
  private enCours = false;
  private demande = false;
  private detruit = false;
  private visible = true;
  private souris = { x: -1e6, y: -1e6 };
  private io?: IntersectionObserver;
  private ro: ResizeObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private donnees: FormesJson,
    private o: OptionsConstellation,
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.nForme = Math.min(o.n, donnees.n);
    this.total = this.nForme + o.ambiance;
    const tableau = () => new Float32Array(this.total);
    this.x = tableau();
    this.y = tableau();
    this.vx = tableau();
    this.vy = tableau();
    this.ox = tableau();
    this.oy = tableau();
    this.dx = tableau();
    this.dy = tableau();
    this.taille = tableau();
    this.rot = tableau();
    this.vrot = tableau();
    this.phase = tableau();
    this.retard = tableau();
    this.couleur = new Uint8Array(this.total);

    for (let i = 0; i < this.total; i++) {
      const angle = Math.random() * Math.PI * 2;
      this.dx[i] = Math.cos(angle);
      this.dy[i] = Math.sin(angle);
      this.taille[i] = 2.5 + Math.random() * 3;
      this.rot[i] = Math.random() * Math.PI * 2;
      this.vrot[i] = (Math.random() - 0.5) * 0.02;
      this.phase[i] = Math.random() * Math.PI * 2;
      if (i >= this.nForme) {
        this.ox[i] = Math.random();
        this.oy[i] = Math.random();
        this.couleur[i] = Math.floor(Math.random() * (donnees.teintesAmbiance ?? donnees.palette.length));
      }
    }
    this.appliquerForme("colibri");
    this.redimensionner();
    for (let i = 0; i < this.total; i++) {
      if (o.entree === "convergence" && !o.reduit) {
        this.x[i] = Math.random() * this.w;
        this.y[i] = Math.random() * this.h;
      } else {
        this.placerSurCible(i);
      }
    }

    this.ro = new ResizeObserver(() => {
      if (this.redimensionner() && o.reduit) this.dessinerStatique();
    });
    this.ro.observe(canvas);
    if (o.reduit) {
      this.dessinerStatique();
      return;
    }
    this.io = new IntersectionObserver((entrees) => {
      this.visible = entrees[entrees.length - 1].isIntersecting;
      this.synchroniser();
    });
    this.io.observe(canvas);
    document.addEventListener("visibilitychange", this.synchroniser);
    if (o.interactif && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", this.surSouris, { passive: true });
      document.documentElement.addEventListener("pointerleave", this.sourisPartie);
    }
  }

  morph(forme: FormeId) {
    if (this.o.reduit || forme === this.forme) return;
    this.appliquerForme(forme);
    this.morphT0 = performance.now();
    // Départs échelonnés : la recomposition paraît organique.
    for (let i = 0; i < this.nForme; i++) this.retard[i] = Math.random() * 500;
  }

  setDispersion(v: number) {
    this.dispersion = Math.max(0, Math.min(1, v));
  }

  start() {
    if (this.detruit || this.o.reduit) return;
    this.demande = true;
    this.synchroniser();
  }

  stop() {
    this.demande = false;
    this.synchroniser();
  }

  destroy() {
    this.detruit = true;
    this.stop();
    this.io?.disconnect();
    this.ro.disconnect();
    document.removeEventListener("visibilitychange", this.synchroniser);
    if (this.o.interactif) {
      window.removeEventListener("pointermove", this.surSouris);
      document.documentElement.removeEventListener("pointerleave", this.sourisPartie);
    }
  }

  /** La boucle ne tourne que si elle est demandée, à l’écran et dans l’onglet actif. */
  private synchroniser = () => {
    const doitTourner = this.demande && this.visible && !document.hidden;
    if (doitTourner === this.enCours) return;
    this.enCours = doitTourner;
    if (doitTourner) {
      this.tPrecedent = null;
      this.raf = requestAnimationFrame(this.boucle);
    } else {
      cancelAnimationFrame(this.raf);
    }
  };

  private boucle = (t: number) => {
    if (!this.enCours) return;
    this.t0 ??= t;
    // Même vitesse à 60, 90 ou 120 images par seconde ; jamais plus de 3 pas après un ralentissement.
    const pas = this.tPrecedent === null ? 1 : Math.max(0, Math.min(3, (t - this.tPrecedent) / IMAGE_MS));
    this.tPrecedent = t;
    this.mettreAJour(t, pas);
    this.dessiner(t);
    this.raf = requestAnimationFrame(this.boucle);
  };

  private appliquerForme(forme: FormeId) {
    this.forme = forme;
    const points = this.donnees.formes[forme];
    const n = points.length / 3;
    for (let i = 0; i < this.nForme; i++) {
      const k = (i % n) * 3;
      this.ox[i] = points[k];
      this.oy[i] = points[k + 1];
      this.couleur[i] = points[k + 2];
    }
  }

  /** Rend vrai si la taille a changé (changer la taille d’une toile l’efface). */
  private redimensionner(): boolean {
    this.dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
    // Sous 1024 px : trait d’un seul pixel physique, 4 fois moins coûteux à peindre sur un téléphone modeste.
    this.trait = window.innerWidth < 1024 ? 1 : this.dpr;
    const w = Math.max(1, Math.round(this.canvas.clientWidth * this.dpr));
    const h = Math.max(1, Math.round(this.canvas.clientHeight * this.dpr));
    if (w === this.w && h === this.h) return false;
    this.w = w;
    this.h = h;
    this.canvas.width = w;
    this.canvas.height = h;
    return true;
  }

  private viser(i: number, t: number) {
    if (i >= this.nForme) {
      const derive = 30 * this.dpr;
      this.tx = this.ox[i] * this.w + Math.sin(t * 0.0002 + this.phase[i]) * derive;
      this.ty = this.oy[i] * this.h + Math.cos(t * 0.00017 + this.phase[i]) * derive;
      return;
    }
    const s = Math.min(this.w, this.h) * this.o.echelle;
    const ecart = this.dispersion * 0.6 * Math.max(this.w, this.h);
    this.tx = this.o.centre.x * this.w + this.ox[i] * s + this.dx[i] * ecart;
    this.ty = this.o.centre.y * this.h + this.oy[i] * s + this.dy[i] * ecart;
  }

  private placerSurCible(i: number) {
    this.viser(i, 0);
    this.x[i] = this.tx;
    this.y[i] = this.ty;
  }

  private mettreAJour(t: number, pas: number) {
    const ecoule = t - this.morphT0;
    const rayon = RAYON_SOURIS * this.dpr;
    const amorti = Math.pow(AMORTI, pas);
    for (let i = 0; i < this.total; i++) {
      this.viser(i, t);
      const ressort = i < this.nForme && ecoule < this.retard[i] ? 0 : RESSORT * pas;
      this.vx[i] = (this.vx[i] + (this.tx - this.x[i]) * ressort) * amorti;
      this.vy[i] = (this.vy[i] + (this.ty - this.y[i]) * ressort) * amorti;
      const mx = this.x[i] - this.souris.x;
      const my = this.y[i] - this.souris.y;
      if (Math.abs(mx) < rayon && Math.abs(my) < rayon) {
        const d = Math.hypot(mx, my);
        if (d < rayon && d > 0.01) {
          const force = (1 - d / rayon) * 4 * this.dpr * pas;
          this.vx[i] += (mx / d) * force;
          this.vy[i] += (my / d) * force;
        }
      }
      this.x[i] += this.vx[i] * pas;
      this.y[i] += this.vy[i] * pas;
      this.rot[i] += this.vrot[i] * pas;
    }
  }

  private dessiner(t: number) {
    const apparition = Math.min(1, (t - this.t0!) / APPARITION_MS);
    this.peindre(apparition * (1 - 0.7 * this.dispersion), t);
  }

  private dessinerStatique() {
    for (let i = 0; i < this.total; i++) this.placerSurCible(i);
    this.peindre(1, 0);
  }

  private peindre(facteur: number, t: number) {
    const alpha = (this.o.opacite ?? 1) * facteur;
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.lineWidth = this.trait;
    this.passe(0, this.nForme, alpha, t);
    if (this.total > this.nForme) this.passe(this.nForme, this.total, alpha * 0.3, t);
  }

  /** Petits lots d’une même couleur : ni un tracé par particule, ni un tracé géant. */
  private passe(debut: number, fin: number, alpha: number, t: number) {
    const ctx = this.ctx;
    const amplitude = 1.5 * this.dpr;
    ctx.globalAlpha = alpha;
    this.donnees.palette.forEach((teinte, c) => {
      ctx.strokeStyle = teinte;
      ctx.beginPath();
      let dansLeLot = 0;
      for (let i = debut; i < fin; i++) {
        if (this.couleur[i] !== c) continue;
        const px = this.x[i] + Math.sin(t * 0.0015 + this.phase[i]) * amplitude;
        const py = this.y[i] + Math.cos(t * 0.0013 + this.phase[i]) * amplitude;
        const s = this.taille[i] * this.dpr;
        const a = this.rot[i];
        ctx.moveTo(px + Math.cos(a) * s, py + Math.sin(a) * s);
        ctx.lineTo(px + Math.cos(a + TIERS_DE_TOUR) * s, py + Math.sin(a + TIERS_DE_TOUR) * s);
        ctx.lineTo(px + Math.cos(a - TIERS_DE_TOUR) * s, py + Math.sin(a - TIERS_DE_TOUR) * s);
        ctx.closePath();
        if (++dansLeLot === LOT) {
          ctx.stroke();
          ctx.beginPath();
          dansLeLot = 0;
        }
      }
      if (dansLeLot > 0) ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  private surSouris = (e: PointerEvent) => {
    const cadre = this.canvas.getBoundingClientRect();
    this.souris.x = (e.clientX - cadre.left) * this.dpr;
    this.souris.y = (e.clientY - cadre.top) * this.dpr;
  };

  private sourisPartie = () => {
    this.souris.x = -1e6;
    this.souris.y = -1e6;
  };
}
