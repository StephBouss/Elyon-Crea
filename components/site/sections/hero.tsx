"use client";

import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Constellation } from "@/components/site/constellation/constellation";
import type { HeroMessage } from "@/lib/content/hero";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const ROTATION_MS = 7000;
/** Durée pendant laquelle le colibri reste formé à l’arrivée sur la page. */
const COLIBRI_MS = 3500;

const CLASSE_TITRE = "text-display lg:text-[clamp(3rem,min(5.2vw,9.2vh),5.5rem)]";
const CLASSE_SOUS_TITRE = "text-body-lg mt-5 max-w-[30rem] text-pretty text-mist md:mt-6";

const delai = (secondes: number) => ({ "--delai": `${secondes}s` }) as CSSProperties;
const mouvementReduit = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Chaque mot glisse depuis un masque. Écrit en CSS : l’entrée n’attend pas le chargement du JavaScript. */
function Mots({ texte, debut, rang }: { texte: string; debut: number; rang: number }) {
  return texte.split(" ").map((mot, i) => (
    <span key={i}>
      <span className="-mx-[0.1em] -my-[0.2em] inline-block overflow-clip px-[0.1em] py-[0.2em] align-top">
        <span data-mot className="hero-mot inline-block" style={delai(debut + (rang + i) * 0.05)}>{mot}</span>
      </span>{" "}
    </span>
  ));
}

export function Hero({ messages }: { messages: HeroMessage[] }) {
  const ref = useRef<HTMLElement>(null);
  const texte = useRef<HTMLDivElement>(null);
  const cibleRef = useRef(0);
  const sortie = useRef<gsap.core.Timeline | null>(null);
  const [affiche, setAffiche] = useState(0);
  const [cible, setCible] = useState(0);
  /** Change à chaque nouvelle entrée du texte (0 = arrivée sur la page). */
  const [passage, setPassage] = useState(0);
  const [intro, setIntro] = useState(true);
  const [enPause, setEnPause] = useState(false);
  const [survol, setSurvol] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(true);

  const message = messages[affiche];
  const premier = passage === 0;
  const suspendu = enPause || survol || focus;

  const allerA = useCallback((index: number) => {
    setIntro(false);
    if (index === cibleRef.current) return;
    cibleRef.current = index;
    setCible(index);
    const montrer = () => {
      sortie.current = null;
      setPassage((n) => n + 1);
      setAffiche(cibleRef.current);
    };
    if (mouvementReduit()) {
      sortie.current?.kill();
      montrer();
      return;
    }
    // Une sortie déjà en cours mène au dernier message demandé.
    if (sortie.current) return;
    const bloc = texte.current!;
    sortie.current = gsap.timeline({ onComplete: montrer })
      .to(bloc.querySelectorAll("[data-mot]"), { yPercent: -125, duration: 0.5, ease: "power3.in", stagger: 0.015 }, 0)
      .to(bloc.querySelectorAll("[data-fondu]"), { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0);
  }, []);

  useEffect(() => () => { sortie.current?.kill(); }, []);

  useEffect(() => {
    const id = setTimeout(() => setIntro(false), COLIBRI_MS);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const observateur = new IntersectionObserver(([entree]) => setVisible(entree.isIntersecting), { threshold: 0.3 });
    observateur.observe(ref.current!);
    return () => observateur.disconnect();
  }, []);

  useEffect(() => {
    if (suspendu || !visible) return;
    const id = setInterval(() => {
      if (document.hidden || mouvementReduit()) return;
      allerA((cibleRef.current + 1) % messages.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [suspendu, visible, cible, allerA, messages.length]);

  useGSAP(() => {
    if (passage === 0) return;
    const paragraphes = texte.current!.querySelectorAll("[data-fondu]");
    if (mouvementReduit()) {
      gsap.set(paragraphes, { clearProps: "all" });
      return;
    }
    gsap.fromTo(paragraphes, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.25, clearProps: "opacity,visibility,transform" });
  }, { scope: ref, dependencies: [passage] });

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(texte.current, {
        y: -80, opacity: 0, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titre"
      className="relative flex min-h-dvh flex-col overflow-hidden"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setSurvol(true); }}
      onPointerLeave={() => setSurvol(false)}
      onFocus={(e) => setFocus(!(e.target as HTMLElement).closest("[data-pause]"))}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false); }}
    >
      <Constellation
        forme={intro ? "colibri" : messages[cible].forme}
        variante="hero"
        dispersionAuDefilement
        enPause={enPause}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-canvas via-canvas/80 to-transparent lg:hidden" />

      <div
        ref={texte}
        className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-end px-5 pt-24 pb-24 md:px-10 lg:justify-center lg:pt-28"
      >
        <div className="grid lg:max-w-[54%]" aria-live={suspendu ? "polite" : "off"}>
          {/* Réserve la hauteur du plus long message : les boutons ne bougent jamais. */}
          {messages.map((m) => (
            <div key={m.tag} aria-hidden="true" className="invisible col-start-1 row-start-1 min-w-0">
              <p className="text-label">{m.tag}</p>
              <p className={cn(CLASSE_TITRE, "mt-4 md:mt-6")}>
                <span className="block">{m.titre}</span>
                <span className="block">{m.titreAccent}</span>
              </p>
              <p className={CLASSE_SOUS_TITRE}>{m.sousTitre}</p>
            </div>
          ))}
          {/* Seul le titre est recréé : réutiliser les paragraphes évite que chaque rotation compte comme un nouvel affichage principal (LCP). */}
          <div className="col-start-1 row-start-1 min-w-0 self-end">
            <p data-fondu className="hero-fondu text-label text-accent" style={delai(0.2)}>{message.tag}</p>
            <h1
              key={passage}
              id="hero-titre"
              aria-label={`${message.titre} ${message.titreAccent}`}
              className={cn(CLASSE_TITRE, "mt-4 text-ink md:mt-6")}
            >
              <span aria-hidden="true" className="block">
                <Mots texte={message.titre} debut={premier ? 0.35 : 0} rang={0} />
              </span>
              <span aria-hidden="true" className="block text-accent">
                <Mots texte={message.titreAccent} debut={premier ? 0.35 : 0} rang={message.titre.split(" ").length} />
              </span>
            </h1>
            <p data-fondu className={cn("hero-fondu", CLASSE_SOUS_TITRE)} style={delai(0.9)}>{message.sousTitre}</p>
          </div>
        </div>

        <div className="hero-fondu mt-7 flex flex-col items-stretch gap-2 md:mt-9 md:flex-row md:items-center md:gap-8" style={delai(1.05)}>
          <Link prefetch={false} href="/audit-gratuit" className="btn-pill">Démarrer mon projet</Link>
          <Link prefetch={false} href="/realisations" className="btn-ghost justify-center">Voir nos réalisations</Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 mx-auto flex w-full max-w-[1280px] items-center px-2.5 md:bottom-6 md:px-7.5">
        {messages.map((m, i) => (
          <button
            key={m.tag}
            type="button"
            aria-label={`Afficher le message ${i + 1}`}
            aria-current={cible === i ? "true" : undefined}
            onClick={() => allerA(i)}
            className="grid size-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
          >
            <span aria-hidden="true" className={cn("h-2 rounded-full", cible === i ? "w-6 bg-accent" : "w-2 bg-ash/70")} />
          </button>
        ))}
        <button
          type="button"
          data-pause
          aria-label={enPause ? "Reprendre le défilement des messages" : "Mettre les messages en pause"}
          onClick={() => setEnPause((valeur) => !valeur)}
          className="grid size-11 place-items-center rounded-full text-ash hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent motion-reduce:hidden"
        >
          {/* Sans pointer-events-none, Safari ne signale pas le départ de la souris quand l’icône survolée est remplacée. */}
          {enPause
            ? <Play aria-hidden size={16} className="pointer-events-none" />
            : <Pause aria-hidden size={16} className="pointer-events-none" />}
        </button>
        <span aria-hidden="true" className="text-label absolute left-1/2 hidden -translate-x-1/2 text-ash lg:block">Défiler</span>
      </div>
    </section>
  );
}
