"use client";

import { useEffect, useRef } from "react";
import { ConstellationEngine, type FormeId, type FormesJson, type OptionsConstellation } from "@/lib/constellation/engine";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Variante = "hero" | "cta";
type Reglages = Pick<OptionsConstellation, "n" | "ambiance" | "centre" | "echelle" | "opacite">;

const REGLAGES: Record<Variante, { pc: Reglages; mobile: Reglages }> = {
  hero: {
    pc: { n: 2000, ambiance: 240, centre: { x: 0.72, y: 0.52 }, echelle: 0.38, opacite: 1 },
    mobile: { n: 900, ambiance: 110, centre: { x: 0.5, y: 0.5 }, echelle: 0.38, opacite: 0.65 },
  },
  cta: {
    pc: { n: 1400, ambiance: 170, centre: { x: 0.72, y: 0.5 }, echelle: 0.38, opacite: 1 },
    mobile: { n: 700, ambiance: 85, centre: { x: 0.5, y: 0.3 }, echelle: 0.36, opacite: 0.7 },
  },
};

let formes: Promise<FormesJson> | null = null;
function chargerFormes(): Promise<FormesJson> {
  formes ??= fetch("/constellation/formes.json").then((reponse) => {
    if (!reponse.ok) throw new Error(`Formes indisponibles (${reponse.status})`);
    return reponse.json() as Promise<FormesJson>;
  }).catch((erreur) => {
    formes = null;
    throw erreur;
  });
  return formes;
}

/** Attend que la page soit affichée et le navigateur disponible. */
function quandDisponible(action: () => void): () => void {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(action, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(action, 200);
  return () => clearTimeout(id);
}

/** Sous 1024 px, le bas du Hero est couvert par le texte : inutile d’y peindre des particules. */
const TAILLE: Record<Variante, string> = { hero: "h-[62%] lg:h-full", cta: "h-full" };

type Props = {
  forme: FormeId;
  variante: Variante;
  dispersionAuDefilement?: boolean;
  enPause?: boolean;
  className?: string;
};

/** Décor : le sens est porté par le texte voisin. */
export function Constellation({ forme, variante, dispersionAuDefilement = false, enPause = false, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const moteur = useRef<ConstellationEngine | null>(null);
  const etat = useRef({ forme, enPause });

  useEffect(() => {
    const formeChangee = etat.current.forme !== forme;
    etat.current = { forme, enPause };
    const actuel = moteur.current;
    if (!actuel) return;
    actuel.morph(forme);
    if (!enPause) {
      actuel.start();
      return;
    }
    if (!formeChangee) {
      actuel.stop();
      return;
    }
    // En pause, un message choisi à la main recompose la forme puis l’animation s’arrête.
    actuel.start();
    const id = setTimeout(() => actuel.stop(), 2500);
    return () => clearTimeout(id);
  }, [forme, enPause]);

  useGSAP(() => {
    const canvas = ref.current!;
    const section = canvas.closest("section");
    const mm = gsap.matchMedia();
    let premiere = true;

    mm.add({
      pc: "(min-width: 1024px)",
      mobile: "(max-width: 1023.98px)",
      reduit: "(prefers-reduced-motion: reduce)",
    }, (contexte) => {
      const { pc, reduit } = contexte.conditions as { pc: boolean; reduit: boolean };
      let annule = false;
      let dispersion = 0;

      const creer = async () => {
        const donnees = await chargerFormes().catch(() => null);
        if (!donnees || annule) return;
        const actuel = new ConstellationEngine(canvas, donnees, {
          ...REGLAGES[variante][pc ? "pc" : "mobile"],
          interactif: true,
          reduit,
          entree: premiere ? "convergence" : "immediate",
        });
        premiere = false;
        moteur.current = actuel;
        actuel.setDispersion(dispersion);
        actuel.morph(etat.current.forme);
        actuel.start();
        if (etat.current.enPause) actuel.stop();
      };

      let annulerAttente: (() => void) | undefined;
      const demarrer = () => { annulerAttente = quandDisponible(() => void creer()); };
      if (variante === "cta" && !reduit && section) {
        ScrollTrigger.create({ trigger: section, start: "top 80%", once: true, onEnter: demarrer });
      } else {
        demarrer();
      }

      if (dispersionAuDefilement && !reduit && section) {
        ScrollTrigger.create({
          trigger: section, start: "top top", end: "bottom top", scrub: true,
          onUpdate: (self) => {
            dispersion = self.progress;
            moteur.current?.setDispersion(dispersion);
          },
        });
        if (pc) {
          gsap.to(canvas, {
            yPercent: 18, ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          });
        }
      }

      return () => {
        annule = true;
        annulerAttente?.();
        moteur.current?.destroy();
        moteur.current = null;
      };
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [variante, dispersionAuDefilement], revertOnUpdate: true });

  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 top-0 w-full", TAILLE[variante], className)} />;
}
