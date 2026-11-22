"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number; // > 0 : anime les enfants directs un par un
  as?: "div" | "ul" | "ol" | "section";
};

export function Reveal({ children, className, y = 30, delay = 0, stagger = 0, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cibles = stagger > 0 ? Array.from(el.children) : [el];
      gsap.from(cibles, {
        y, opacity: 0, duration: 0.8, delay, stagger,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [y, delay, stagger, Tag], revertOnUpdate: true });
  return <Tag ref={(node: HTMLElement | null) => { ref.current = node; }} className={className}>{children}</Tag>;
}

