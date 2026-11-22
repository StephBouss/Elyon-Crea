import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "600"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Elyon Créa — Agence de communication 360° à Libreville",
    template: "%s · Elyon Créa",
  },
  description:
    "Elyon Créa, agence de communication 360° à Libreville (Gabon) : stratégie, identité visuelle, digital, print, événementiel et production audiovisuelle.",
  openGraph: { locale: "fr_FR", type: "website", siteName: "Elyon Créa" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}

