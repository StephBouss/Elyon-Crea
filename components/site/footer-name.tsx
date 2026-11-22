"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function FooterName({ name }: { name: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const revealed = useRef(false);

  useGSAP(() => {
    const element = ref.current!;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (revealed.current) return;

      const split = SplitText.create(element, { type: "chars", mask: "chars" });
      // Le dessin des lettres dépasse leur boîte (jambe du « y », bords resserrés) :
      // on agrandit chaque masque, et la marge négative garde la mise en page intacte.
      for (const mask of split.masks as HTMLElement[]) {
        mask.style.padding = "0.2em 0.1em";
        mask.style.margin = "-0.2em -0.1em";
      }
      gsap.from(split.chars, {
        // 100 % + la marge du masque (20 %), pour que la lettre parte bien cachée.
        yPercent: 125,
        ease: "none",
        stagger: 0.03,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          once: true,
          onLeave: () => { revealed.current = true; },
        },
      });
      return () => split.revert();
    });

    return () => media.revert();
  }, { scope: ref });

  return (
    <p ref={ref} aria-hidden="true" className="whitespace-nowrap font-display text-[clamp(2.75rem,14vw,13rem)] leading-none font-normal tracking-[-0.05em] text-ink">
      {name}
    </p>
  );
}
