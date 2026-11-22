import { cn } from "@/lib/utils";
import { SplitTitle } from "@/components/site/motion/split-title";
import { Reveal } from "@/components/site/motion/reveal";

type Props = { surtitre: string; titre: string; description?: string; align?: "left" | "center"; taille?: "lg" | "md"; className?: string };

export function SectionHeading({ surtitre, titre, description, align = "left", taille = "lg", className }: Props) {
  return (
    <div className={cn("mb-12 md:mb-20", align === "center" && "mx-auto max-w-4xl text-center", className)}>
      <span className="text-label mb-5 block text-accent">{surtitre}</span>
      <SplitTitle className={cn(taille === "lg" ? "text-heading-lg" : "text-heading", "text-ink")}>{titre}</SplitTitle>
      {description && (
        <Reveal delay={0.2}>
          <p className={cn("text-body-lg mt-6 max-w-xl text-mist", align === "center" && "mx-auto")}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
