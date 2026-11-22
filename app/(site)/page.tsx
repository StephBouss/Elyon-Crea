import { Hero } from "@/components/site/sections/hero";
import { HERO_MESSAGES } from "@/lib/content/hero";

export default function AccueilPage() {
  return (
    <main id="contenu">
      <Hero messages={HERO_MESSAGES} />
    </main>
  );
}
