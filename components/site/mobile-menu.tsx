"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { gsap, useGSAP } from "@/lib/gsap";
import { NAV_LINKS } from "@/lib/navigation";

export function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  // Mount the animation with the portalled content, after Sheet opens it.
  useEffect(() => {
    const desktop = matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) onOpenChange(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden" aria-label="Ouvrir le menu">
        <Menu aria-hidden="true" size={24} />
      </SheetTrigger>
      <SheetContent side="top" showCloseButton={false} aria-describedby={undefined} className="h-dvh! w-full gap-0 overflow-y-auto border-none bg-canvas p-6 text-ink shadow-none duration-0 data-open:animate-none data-closed:animate-none md:p-10">
        <div className="flex shrink-0 items-center justify-between">
        <SheetTitle className="text-label font-semibold text-ash">Navigation</SheetTitle>
        <SheetClose className="flex size-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-accent" aria-label="Fermer le menu">
          <X aria-hidden="true" size={26} />
        </SheetClose>
        </div>
        <MenuLinks onClose={() => onOpenChange(false)} />
        <Link prefetch={false} href="/audit-gratuit" onClick={() => onOpenChange(false)} className="btn-pill mt-auto w-full shrink-0">Audit gratuit</Link>
      </SheetContent>
    </Sheet>
  );
}

function MenuLinks({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current!.querySelectorAll("li"), { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 });
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <nav ref={ref} aria-label="Navigation mobile" className="my-auto py-8">
      <ol className="flex flex-col gap-5 md:gap-8">
        {NAV_LINKS.map(({ href, label }, index) => (
          <li key={href}>
            <Link prefetch={false} href={href} onClick={onClose} className="flex min-h-11 items-center gap-5 text-heading hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <span aria-hidden="true" className="text-label text-accent">{String(index + 1).padStart(2, "0")}</span>{label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
