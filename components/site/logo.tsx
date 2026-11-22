import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  priority?: boolean;
  background?: "light" | "dark";
};

export function Logo({ className, priority = false, background = "dark" }: Props) {
  const src = background === "light"
    ? "/images/logos/elyon_crea_logo_compact_fond_clair.svg"
    : "/images/logos/elyon_crea_logo_compact_fond_sombre.svg";
  return (
    <Image
      src={src}
      alt="Elyon Créa"
      width={980}
      height={310}
      preload={priority}
      className={cn("h-9 w-auto max-w-full md:h-10", className)}
    />
  );
}
