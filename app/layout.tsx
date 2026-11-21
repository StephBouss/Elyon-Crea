import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

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
    <html lang="fr" className={dmSans.variable}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
