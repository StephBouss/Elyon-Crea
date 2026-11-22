"use client";

import { useRef } from "react";
import { WhatsAppIcon } from "@/components/site/icons/brand-icons";
import { gsap, useGSAP } from "@/lib/gsap";

export function WhatsAppButton({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const revealed = useRef(false);

  useGSAP(() => {
    const button = ref.current!;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (revealed.current) {
        gsap.set(button, { autoAlpha: 1 });
        return;
      }

      gsap.fromTo(button, { scale: 0.6, autoAlpha: 0 }, {
        scale: 1,
        autoAlpha: 1,
        delay: 1.5,
        duration: 0.4,
        onComplete: () => { revealed.current = true; },
      });
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      revealed.current = true;
    });

    return () => media.revert();
  }, { scope: ref });

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:invisible md:right-[max(1.5rem,env(safe-area-inset-right))] md:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
