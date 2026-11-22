"use client";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Native scrolling is the default; preference changes preserve the children. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: { offset: -80 } });
      const update = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(update);
      return () => {
        gsap.ticker.remove(update);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    });
    return () => mm.revert();
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
