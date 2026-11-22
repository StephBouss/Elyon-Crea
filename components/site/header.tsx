"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Logo } from "@/components/site/logo";
import { MobileMenu } from "@/components/site/mobile-menu";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { NAV_LINKS } from "@/lib/navigation";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const reveal = () => {
    gsap.killTweensOf(ref.current);
    gsap.set(ref.current, { yPercent: 0 });
  };
  useGSAP(() => {
    const header = ref.current!;
    const updateBackground = () => {
      header.classList.toggle("bg-canvas", window.scrollY > 80);
    };
    updateBackground();
    window.addEventListener("scroll", updateBackground, { passive: true });
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 120 && !open && !header.contains(document.activeElement);
          gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.4, ease: "power2.out", overwrite: true });
        },
      });
      return () => { gsap.killTweensOf(header); gsap.set(header, { yPercent: 0 }); };
    });
    if (open) gsap.set(header, { yPercent: 0 });
    return () => { mm.revert(); window.removeEventListener("scroll", updateBackground); };
  }, { scope: ref, dependencies: [open], revertOnUpdate: true });

  return (
    <header ref={ref} onFocusCapture={reveal} className="fixed inset-x-0 top-0 z-50 h-18 md:h-20">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-4 md:gap-6 md:px-8">
        <Link href="/" aria-label="Elyon Créa — accueil" className="flex min-h-11 min-w-0 shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <Logo priority className="h-auto w-28 md:h-auto md:w-36" />
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map(({ href, label }) => <Link prefetch={false} key={href} href={href} className="text-label flex min-h-11 items-center text-ash hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-1 md:gap-4">
          <Link prefetch={false} href="/audit-gratuit" className="btn-pill px-4">Audit gratuit</Link>
          <MobileMenu open={open} onOpenChange={setOpen} />
        </div>
      </div>
    </header>
  );
}
