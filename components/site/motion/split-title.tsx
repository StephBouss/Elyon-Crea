"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = { as?: "h1" | "h2"; className?: string; children: React.ReactNode; delay?: number; auDefilement?: boolean };

/** Les mots glissent depuis un masque. Pas d'opacité : le texte compte tout de suite pour le LCP. */
export function SplitTitle({ as: Tag = "h2", className, children, delay = 0, auDefilement = true }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(ref.current!, { type: "words", mask: "words" });
      gsap.from(split.words, {
        yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.05, delay,
        scrollTrigger: auDefilement ? { trigger: ref.current!, start: "top 85%", once: true } : undefined,
      });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [children, delay, auDefilement], revertOnUpdate: true });
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

