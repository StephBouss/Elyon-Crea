export const A_CONFIRMER = "[À CONFIRMER]";

export const siteConfig = {
  nom: "Elyon Créa",
  email: "contact@elyoncrea.com",
  telephoneAffiche: process.env.NEXT_PUBLIC_PHONE_DISPLAY || A_CONFIRMER,
  whatsappNumero: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  delaiReponse: "sous 24h ouvrables",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ville: "Libreville · Gabon",
  messageWhatsAppDefaut: "Bonjour Elyon Créa, je souhaite échanger sur un projet de communication.",
  reseaux: {
    facebook: null as string | null, // [À CONFIRMER] URL fournie par Steph
    linkedin: null as string | null, // [À CONFIRMER] URL fournie par Steph
  },
} as const;
