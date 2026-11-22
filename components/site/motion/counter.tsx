"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { formatNombre } from "@/lib/format";

type Props = {
  to: number;
  prefixe?: string;
  suffixe?: string;
  className?: string;
};

export function Counter({ to, prefixe = "", suffixe = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    const finalText = `${prefixe}${formatNombre(to)}${suffixe}`;
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const etat = { v: 0 };
      el.textContent = `${prefixe}${formatNombre(0)}${suffixe}`;
      gsap.to(etat, {
        v: to, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { el.textContent = `${prefixe}${formatNombre(etat.v)}${suffixe}`; },
      });
      return () => { el.textContent = finalText; };
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [to, prefixe, suffixe], revertOnUpdate: true });
  // Valeur finale dans le HTML (SEO, sans JavaScript, mouvement réduit).
  return (
    <span className={`tabular-nums whitespace-nowrap ${className ?? ""}`}>
      <span className="sr-only">{prefixe}{formatNombre(to)}{suffixe}</span>
      <span ref={ref} aria-hidden="true">{prefixe}{formatNombre(to)}{suffixe}</span>
    </span>
  );
}

