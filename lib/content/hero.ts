import type { FormeId } from "@/lib/constellation/engine";

export type HeroMessage = {
  tag: string;
  titre: string;
  titreAccent: string;
  sousTitre: string;
  forme: FormeId;
};

/** Textes de la maquette (design/banani/components/ElyonHero.jsx). */
export const HERO_MESSAGES: HeroMessage[] = [
  {
    tag: "Stratégie & Campagnes",
    titre: "De la stratégie au déploiement —",
    titreAccent: "votre communication 360°",
    sousTitre: "Elyon Créa conçoit et exécute des stratégies de communication globales pour faire rayonner votre marque.",
    forme: "cerveau",
  },
  {
    tag: "Création & Design",
    titre: "Des visuels qui captivent,",
    titreAccent: "une identité qui marque les esprits",
    sousTitre: "Branding, print, motion design — nous créons des univers visuels cohérents et mémorables.",
    forme: "ampoule",
  },
  {
    tag: "Digital & Web",
    titre: "Votre présence digitale,",
    titreAccent: "amplifiée et optimisée",
    sousTitre: "Sites web, SEO, social media et publicité en ligne — une empreinte digitale forte et mesurable.",
    forme: "colibri",
  },
  {
    tag: "Intelligence Artificielle",
    titre: "L'IA au service",
    titreAccent: "de votre communication",
    sousTitre: "Contenus générés par IA, chatbots, automatisation — intégrez le futur dans votre stratégie dès aujourd'hui.",
    forme: "cerveau",
  },
];
