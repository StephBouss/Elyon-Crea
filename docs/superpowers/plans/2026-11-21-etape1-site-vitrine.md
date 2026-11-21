# Étape 1 — Site vitrine Elyon Créa · Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mettre en ligne le site public d'Elyon Créa (landing 12 sections, `/audit-gratuit`, `/realisations`, `/mentions-legales`, `/connexion` + `/admin` protégé), avec contenu modifiable dans Supabase et formulaire d'audit complet.

**Architecture:** Un seul projet Next.js (App Router, TypeScript) à la racine du dépôt. Pages publiques pré-générées et rafraîchies toutes les 60 s (ISR) à partir de Supabase (client anonyme **sans cookies**, sinon la page devient dynamique). Logique métier isolée dans `lib/` (fonctions pures testées avec Vitest), interface dans `components/site/`, routes serveur dans `app/api/`. Les maquettes Banani (`design/banani/`) sont la référence visuelle.

**Tech Stack:** Next.js (dernière stable) · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion · GSAP (ScrollTrigger, SplitText) + `@gsap/react` · Lenis · Supabase (`@supabase/ssr`, `@supabase/supabase-js`) · React Hook Form + Zod · Resend + `@react-email/components` · lucide-react · Vitest · Playwright + `@axe-core/playwright`.

**Spec de référence :** `docs/superpowers/specs/2026-11-21-etape1-site-vitrine-design.md` · Règles projet : `CLAUDE.md`.

## Global Constraints

- Langue de l'interface : **français**. Marque écrite **« Elyon Créa »** (accent) partout sauf dans le logo.
- E-mail affiché : **`contact@elyoncrea.com`** (jamais `hello@…` ni `….ga`).
- Délai annoncé partout : **« sous 24h ouvrables »** (landing, page Audit, e-mail de confirmation).
- Montants : entiers FCFA, affichés `500 000 FCFA` via `formatFCFA()` (espaces insécables U+00A0, ne se coupe jamais).
- **Contenu fictif interdit** : chiffres clés, réalisations, clients, téléphone, réseaux sociaux non fournis → afficher `[À CONFIRMER]`. Ne jamais citer Moov Africa, TotalEnergies, BGFI Bank, SEEG, Savane Mode, Gabon Oil Corp, Olam, Sobraga.
- Couleurs : **uniquement des tokens Tailwind** déclarés dans `app/globals.css` (`@theme`). Aucune couleur hexadécimale dans un composant.
- Palette (Option A Banani) : magenta `#C2147A`, or `#F9B000`, noirs `#0E0E0E` / `#161616` / `#0A0A0A`, crème `#FAF8F5`. Police **DM Sans**.
- Responsive : mobile d'abord ; largeurs testées **360, 390, 768, 1024, 1280, 1440, 1920** + WebKit 390. Conteneur `max-w-7xl mx-auto px-4 md:px-8`. Jamais `100vw`, jamais de largeur/hauteur en px recopiée de la maquette, `min-h-dvh` plutôt que `100vh`. **Interdit** : `overflow-x-hidden` sur `html`/`body`.
- Texte : `min-w-0` sur les enfants flex/grid, `break-words` sur e-mails/liens, pas de hauteur fixe sur un bloc de texte. Texte courant ≥ 16 px sur mobile, champs de formulaire ≥ 16 px. Zones cliquables ≥ 44 × 44 px.
- Animations : uniquement `transform` et `opacity`, durées 0,4–0,8 s, `prefers-reduced-motion` respecté. GSAP et Lenis **uniquement** dans `app/(site)`. CLS < 0,1.
- Accessibilité : 0 violation axe `critical`/`serious`. Si axe signale un contraste insuffisant sur un token gris, **éclaircir le token** (le plus petit écart qui passe AA) et le noter dans le commit.
- Secrets : `.env.local` jamais commité ; `.env.example` à jour sans valeurs. `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `IP_HASH_SALT` : **code serveur uniquement** (fichiers qui importent `server-only`).
- Toutes les entrées de formulaire validées par Zod **côté client et côté serveur**.
- Définition de « terminé » (chaque tâche `[Claude]`) : `npm run build` ✅ · `npm run lint` ✅ · `npm run test` ✅ · `npm run test:e2e` ✅ pour les pages touchées · captures `tests/screenshots/` **regardées** et comparées à la maquette. Puis cocher la tâche dans `TACHES.md` avec le résumé `(build OK · Playwright X/X · captures vérifiées)`.
- Commits : message en français, préfixe conventionnel (`feat:`, `test:`, `chore:`, `docs:`, `fix:`), terminé par `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Avant d'écrire du code Next.js : lire la doc embarquée de la version installée (`node_modules/next/dist/docs/` si présente) pour les conventions qui ont changé (`proxy.ts` vs `middleware.ts`, `preload` vs `priority` sur `next/image`, config ISR).

---

## Règles de conversion Banani → React (s'appliquent à toutes les tâches d'interface)

Les fichiers `design/banani/**/*.jsx` sont des **maquettes**, pas du code de production :

| Dans la maquette | Dans le code |
|---|---|
| `t('Texte')` | `"Texte"` (chaîne simple, sauf contenu Supabase) |
| `<Icon i="check" size={11} />` | `import { Check } from "lucide-react"` → `<Check size={11} aria-hidden />` (nom en PascalCase). Icônes de marques (Facebook, LinkedIn, WhatsApp, Google, Microsoft) → `components/site/icons/brand-icons.tsx` (SVG inline) |
| `<Image prompt="…" ar="16:9" />` | `next/image` avec un vrai fichier de `public/images/…` (placeholder tant que Steph n'a pas fourni l'image), `sizes` renseigné, ratio fixé par `aspect-[16/9]` |
| `style={{ color: '#f0f0f0' }}` | classe de token (`text-ink-100`) — voir tableau des tokens, tâche 1 |
| `px-24`, `px-16`, `w-80`, `height: '760px'` | conteneur fluide `max-w-7xl mx-auto px-4 md:px-8`, largeurs en grille/flex, hauteurs `min-h-*` |
| `grid-cols-3` | `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` (selon tableau responsive de `CLAUDE.md` §8) |
| `<div>` cliquable / `<button>` qui navigue | `<Link href="…">` (navigation) ou `<button type="button">` (action) |
| `<h1>` en double dans le Hero | un seul `<h1>` contenant deux `<span className="block">` |
| Dégradés `linear-gradient(...)` en style inline | utilitaires `@utility` déclarés dans `app/globals.css` (tâche 1) |

**Tokens gris de la maquette → classes :**
`#f0f0f0`→`ink-100` · `#c0c0c0`→`ink-200` · `#aaaaaa`→`ink-300` · `#9a9a9a`→`ink-400` (= `muted-foreground`) · `#7a7a7a`→`ink-500` · `#6E6E6E`→`ink-600` (= `muted`) · `#555555`→`ink-700` · `#222222`→`line` · `#1e1e1e`→`line-soft` · `#111111`→`surface` · `#1a1a1a`→`surface-2` (= `input`) · `#1a1200`→`gold-deep` · `#1f1800`→`gold-deep-2` · `#1a0a12`→`plum` · `#0d0d0d`→`ink-black`.

---

## Structure des fichiers

```
app/
  layout.tsx                         racine : <html lang="fr">, police DM Sans, métadonnées par défaut
  globals.css                        Tailwind v4 + tokens @theme + utilitaires dégradés
  (site)/
    layout.tsx                       Header, Footer, WhatsAppButton, SmoothScroll (Lenis), MotionConfig
    page.tsx                         landing (12 sections), revalidate 60
    audit-gratuit/page.tsx           page formulaire
    realisations/page.tsx            portfolio complet + filtre
    mentions-legales/page.tsx        texte légal
  (auth)/
    layout.tsx                       layout minimal (sans en-tête du site)
    connexion/page.tsx               formulaire de connexion
  (admin)/layout.tsx · (admin)/admin/page.tsx   « Back-office en construction » (protégé)
  auth/deconnexion/route.ts          déconnexion
  auth/callback/route.ts             retour OAuth Google / Microsoft
  api/audit/route.ts                 POST : enregistre une demande d'audit
  api/audit/upload-urls/route.ts     POST : URLs signées pour les fichiers joints
  sitemap.ts · robots.ts             SEO
proxy.ts (ou middleware.ts)          rafraîchit la session Supabase, protège /admin
components/
  ui/                                composants shadcn (générés)
  site/
    header.tsx · mobile-menu.tsx · footer.tsx · whatsapp-button.tsx · logo.tsx
    icons/brand-icons.tsx
    motion/reveal.tsx · motion/counter.tsx · motion/smooth-scroll.tsx · motion/split-title.tsx
    sections/hero-slideshow.tsx · stats.tsx · problem-solution.tsx · stack-valeur.tsx
             places-restantes.tsx · services.tsx · formules.tsx · portfolio.tsx
             garantie.tsx · faq.tsx · cta-final.tsx · section-heading.tsx
    realisations/realisations-grid.tsx · realisation-card.tsx
    audit/audit-form.tsx · file-picker.tsx · links-input.tsx · audit-success.tsx
    connexion/login-form.tsx
  admin/logout-button.tsx
emails/
  notification-audit.tsx · confirmation-audit.tsx
lib/
  format.ts · whatsapp.ts · site-config.ts · gsap.ts
  supabase/public.ts · server.ts · browser.ts · admin.ts · types.ts
  content/types.ts · mappers.ts · queries.ts · static.ts · stack.ts
  audit/schema.ts · submit.ts · deps.ts · ip.ts
  auth/admin.ts
  email/send.ts
supabase/migrations/20261121000001_contenu_landing.sql
supabase/migrations/20261121000002_audit_admins_storage.sql
supabase/seed.sql
scripts/generate-placeholders.mjs
public/images/hero/slide-{1..4}.jpg · public/images/placeholders/realisation.jpg · public/images/logo-elyon-crea.png
tests/
  unit/*.test.ts                     Vitest
  e2e/utils/layout.ts                contrôles débordement, axe, captures
  e2e/accueil.spec.ts · audit-gratuit.spec.ts · realisations.spec.ts
  e2e/mentions-legales.spec.ts · connexion.spec.ts
  screenshots/                       captures (générées, ignorées par git sauf validées)
playwright.config.ts · vitest.config.ts · .env.example · TACHES.md
```

---

## Lot 1 — Fondations

### Task 1: [Claude] Créer le projet Next.js, les tokens et `TACHES.md`

**Files:**
- Create: tout le squelette Next.js à la racine, `app/globals.css`, `app/layout.tsx`, `app/(site)/page.tsx` (temporaire), `.env.example`, `TACHES.md`
- Modify: `.gitignore`

**Interfaces:**
- Produces : classes Tailwind de tokens (`bg-dark`, `bg-dark-card`, `bg-light`, `bg-light-card`, `text-secondary`, `text-accent-magenta`, `text-ink-100`…`text-ink-700`, `border-line`, `bg-surface`, `bg-gold-deep`…), utilitaires `text-gradient-brand`, `bg-gradient-cta`, `bg-gradient-gold-card`, `bg-gradient-formules`, alias `@/*` vers la racine.

- [ ] **Step 1: Générer le squelette dans un dossier temporaire** (le dossier contient déjà `CLAUDE.md`, `design/`, `docs/`, que `create-next-app` refuse)

```bash
npx create-next-app@latest .tmp-scaffold --ts --eslint --tailwind --app --no-src-dir --import-alias "@/*" --use-npm --yes
```
Si une question s'affiche malgré `--yes` : accepter les valeurs par défaut, **sauf** « src directory » → No.

- [ ] **Step 2: Remonter le squelette à la racine et supprimer le dossier temporaire**

```bash
rm -rf .tmp-scaffold/.git
cp -r .tmp-scaffold/. .
rm -rf .tmp-scaffold
ls
```
Expected : `app/ public/ package.json next.config.* tsconfig.json eslint.config.* postcss.config.* CLAUDE.md design/ docs/`.

- [ ] **Step 3: Installer les dépendances**

```bash
npm i motion gsap @gsap/react lenis @supabase/ssr @supabase/supabase-js react-hook-form @hookform/resolvers zod resend @react-email/components lucide-react server-only
npm i -D vitest vite-tsconfig-paths @playwright/test @axe-core/playwright supabase
```

- [ ] **Step 4: Initialiser shadcn/ui et ajouter les composants utilisés**

```bash
npx shadcn@latest init -d
npx shadcn@latest add button input textarea checkbox label select accordion sheet sonner
```
`shadcn init` réécrit `app/globals.css` : il sera remplacé à l'étape suivante.

- [ ] **Step 5: Écrire `app/globals.css` (tokens Banani + variables shadcn)**

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  /* Polices : variable posée par next/font dans app/layout.tsx */
  --font-body: var(--font-dm-sans), system-ui, sans-serif;
  --font-headings: var(--font-dm-sans), system-ui, sans-serif;
  --font-sans: var(--font-dm-sans), system-ui, sans-serif;

  /* Tokens Banani (design/banani/style.css) — ne pas renommer */
  --color-background: #ffffff;
  --color-foreground: #0e0e0e;
  --color-border: #2a2a2a;
  --color-input: #1a1a1a;
  --color-primary: #c2147a;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f9b000;
  --color-secondary-foreground: #0e0e0e;
  --color-muted: #6e6e6e;
  --color-muted-foreground: #9a9a9a;
  --color-dark: #0e0e0e;
  --color-dark-card: #161616;
  --color-darkest: #0a0a0a;
  --color-light: #faf8f5;
  --color-light-card: #f2efe9;
  --color-accent-gold: #f9b000;
  --color-accent-magenta: #c2147a;

  /* Gris et surfaces utilisés en style inline dans la maquette */
  --color-ink-100: #f0f0f0;
  --color-ink-200: #c0c0c0;
  --color-ink-300: #aaaaaa;
  --color-ink-400: #9a9a9a;
  --color-ink-500: #7a7a7a;
  --color-ink-600: #6e6e6e;
  --color-ink-700: #555555;
  --color-ink-black: #0d0d0d;
  --color-line: #222222;
  --color-line-soft: #1e1e1e;
  --color-surface: #111111;
  --color-surface-2: #1a1a1a;
  --color-gold-deep: #1a1200;
  --color-gold-deep-2: #1f1800;
  --color-plum: #1a0a12;
  --color-whatsapp: #25d366;

  /* Variables attendues par les composants shadcn */
  --color-card: #161616;
  --color-card-foreground: #f0f0f0;
  --color-popover: #161616;
  --color-popover-foreground: #f0f0f0;
  --color-accent: #1a1a1a;
  --color-accent-foreground: #f0f0f0;
  --color-destructive: #ef4444;
  --color-ring: #f9b000;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 32px;
  --radius: var(--radius-sm);

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  --text-6xl: 64px;
}

@utility text-gradient-brand {
  background-image: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
@utility bg-gradient-cta {
  background-image: linear-gradient(135deg, var(--color-dark) 60%, var(--color-plum) 100%);
}
@utility bg-gradient-gold-card {
  background-image: linear-gradient(145deg, var(--color-gold-deep) 0%, var(--color-gold-deep-2) 100%);
}
@utility bg-gradient-formules {
  background-image: linear-gradient(160deg, #0d0010 0%, #0a0a0a 35%, #100800 65%, #0d0010 100%);
}

html {
  scroll-padding-top: 5rem; /* ancres sous l'en-tête collant */
}
body {
  background-color: var(--color-dark);
  color: var(--color-ink-100);
  font-family: var(--font-body);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Note : `bg-gradient-formules` est le seul dégradé avec des couleurs littérales (mélanges de lueurs propres à cette section) ; il reste confiné ici, pas dans un composant.

- [ ] **Step 6: Écrire `app/layout.tsx`**

```tsx
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
```

- [ ] **Step 7: Page d'accueil temporaire** — supprimer `app/page.tsx` généré et créer `app/(site)/page.tsx` :

```tsx
export default function AccueilPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <h1 className="font-headings text-[clamp(2rem,5vw,3rem)] font-bold text-gradient-brand">
        Elyon Créa
      </h1>
      <p className="mt-4 text-base text-ink-400">Site en construction.</p>
    </main>
  );
}
```

- [ ] **Step 8: `.env.example`**

```bash
# URL publique du site (sans / final)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Supabase (Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
# Resend (e-mails)
RESEND_API_KEY=
RESEND_FROM="Elyon Créa <contact@elyoncrea.com>"
AUDIT_NOTIFICATION_TO=contact@elyoncrea.com
# Sel pour anonymiser les adresses IP (anti-spam) — chaîne aléatoire longue
IP_HASH_SALT=
# Coordonnées (format international sans + ni espaces pour WhatsApp, ex. 24177000000)
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_PHONE_DISPLAY=
```

- [ ] **Step 9: Compléter `.gitignore`** — ajouter à la fin :

```
# Elyon Créa
.env*.local
!.env.example
/tests/screenshots/*.png
!/tests/screenshots/.gitkeep
/test-results/
/playwright-report/
/playwright/.cache/
```

- [ ] **Step 10: Créer `TACHES.md`** à partir de la section « Contenu initial de TACHES.md » en fin de ce plan (copie exacte).

- [ ] **Step 11: Vérifier**

```bash
npm run build && npm run lint
```
Expected : build réussi, 0 erreur lint.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: squelette Next.js, tokens Banani et liste des tâches"
```

---

### Task 2: [Claude] Vitest + formatage FCFA + lien WhatsApp + configuration du site

**Files:**
- Create: `vitest.config.ts`, `lib/format.ts`, `lib/whatsapp.ts`, `lib/site-config.ts`, `tests/unit/format.test.ts`, `tests/unit/whatsapp.test.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces :
  - `formatNombre(n: number): string` → `"500 000"` (séparateur U+00A0)
  - `formatFCFA(n: number): string` → `"500 000 FCFA"` (U+00A0 partout)
  - `buildWhatsAppLink(numero: string, message?: string): string | null` → `https://wa.me/24177000000?text=…` ; `null` si le numéro a moins de 8 chiffres
  - `siteConfig` : `{ nom, email, telephoneAffiche, whatsappNumero, delaiReponse, url, messageWhatsAppDefaut, reseaux: { facebook: string | null, linkedin: string | null } }`

- [ ] **Step 1: Scripts `package.json`** — ajouter/modifier dans `"scripts"` :

```json
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test"
```

- [ ] **Step 2: `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: Écrire les tests qui échouent** — `tests/unit/format.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { formatFCFA, formatNombre } from "@/lib/format";

const NBSP = " ";

describe("formatNombre", () => {
  it("groupe les milliers avec des espaces insécables", () => {
    expect(formatNombre(500000)).toBe(`500${NBSP}000`);
    expect(formatNombre(1000000)).toBe(`1${NBSP}000${NBSP}000`);
  });
  it("laisse les petits nombres intacts", () => {
    expect(formatNombre(0)).toBe("0");
    expect(formatNombre(999)).toBe("999");
  });
  it("arrondit à l'entier", () => {
    expect(formatNombre(1500.6)).toBe(`1${NBSP}501`);
  });
  it("gère les négatifs", () => {
    expect(formatNombre(-25000)).toBe(`-25${NBSP}000`);
  });
});

describe("formatFCFA", () => {
  it("ajoute FCFA avec un espace insécable", () => {
    expect(formatFCFA(500000)).toBe(`500${NBSP}000${NBSP}FCFA`);
    expect(formatFCFA(150000)).toBe(`150${NBSP}000${NBSP}FCFA`);
  });
  it("ne contient aucun espace sécable", () => {
    expect(formatFCFA(990000)).not.toMatch(/ /);
  });
});
```

`tests/unit/whatsapp.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { buildWhatsAppLink } from "@/lib/whatsapp";

describe("buildWhatsAppLink", () => {
  it("construit un lien wa.me avec le message encodé", () => {
    expect(buildWhatsAppLink("24177000000", "Bonjour Elyon Créa !")).toBe(
      "https://wa.me/24177000000?text=Bonjour%20Elyon%20Cr%C3%A9a%20!",
    );
  });
  it("nettoie +, espaces et tirets", () => {
    expect(buildWhatsAppLink("+241 77-00-00-00")).toBe("https://wa.me/24177000000");
  });
  it("retourne null si le numéro est vide ou trop court", () => {
    expect(buildWhatsAppLink("")).toBeNull();
    expect(buildWhatsAppLink("1234")).toBeNull();
  });
});
```

- [ ] **Step 4: Lancer — doit échouer**

Run: `npm run test`
Expected : FAIL (`Cannot find module '@/lib/format'`).

- [ ] **Step 5: Implémenter** — `lib/format.ts`

```ts
const NBSP = " ";

/** 500000 → "500 000" (espaces insécables, jamais coupé). */
export function formatNombre(n: number): string {
  const entier = Math.round(n);
  const signe = entier < 0 ? "-" : "";
  const chiffres = Math.abs(entier).toString();
  return signe + chiffres.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** 500000 → "500 000 FCFA". */
export function formatFCFA(n: number): string {
  return `${formatNombre(n)}${NBSP}FCFA`;
}
```

`lib/whatsapp.ts`

```ts
/** Lien wa.me ; null si le numéro n'est pas exploitable (bouton masqué). */
export function buildWhatsAppLink(numero: string, message?: string): string | null {
  const chiffres = numero.replace(/\D/g, "");
  if (chiffres.length < 8) return null;
  const base = `https://wa.me/${chiffres}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

`lib/site-config.ts`

```ts
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
```

- [ ] **Step 6: Lancer — doit passer**

Run: `npm run test`
Expected : PASS (2 fichiers, 9 tests).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "test: Vitest, formatage FCFA et lien WhatsApp"
```

---

### Task 3: [Claude] Playwright à 8 tailles + contrôles anti-débordement

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/utils/layout.ts`, `tests/e2e/accueil.spec.ts`, `tests/screenshots/.gitkeep`

**Interfaces:**
- Produces (dans `tests/e2e/utils/layout.ts`) :
  - `trackErrors(page: Page): { errors: string[] }` — erreurs console + requêtes en échec (≥ 400) + exceptions
  - `settle(page: Page): Promise<void>` — polices chargées, animations terminées, réseau calme
  - `expectNoHorizontalScroll(page: Page): Promise<void>`
  - `expectNoOverflow(page: Page, root?: string): Promise<void>` — aucun élément hors écran, aucun texte qui déborde ; ignore les descendants de `[data-allow-overflow]`
  - `expectNoSeriousA11yViolations(page: Page): Promise<void>`
  - `fullPageScreenshot(page: Page, name: string, testInfo: TestInfo): Promise<void>` → `tests/screenshots/<name>-<projet>.png`
  - `checkPage(page, testInfo, name)` — enchaîne les 4 contrôles + capture (à appeler dans chaque spec)

- [ ] **Step 1: `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const largeurs = [360, 390, 768, 1024, 1280, 1440, 1920];

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    locale: "fr-FR",
  },
  projects: [
    ...largeurs.map((width) => ({
      name: `chromium-${width}`,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width, height: width < 768 ? 800 : 900 },
        isMobile: width < 768,
        hasTouch: width < 1024,
      },
    })),
    { name: "webkit-390", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
```
Note : avec `reuseExistingServer`, un `npm run dev` déjà lancé est réutilisé (itérations rapides). La validation finale d'une tâche se fait **sans** serveur lancé, pour tester le build de production.

- [ ] **Step 2: Installer les navigateurs**

```bash
npx playwright install chromium webkit
```

- [ ] **Step 3: `tests/e2e/utils/layout.ts`**

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, type TestInfo } from "@playwright/test";

export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`exception: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400) errors.push(`http ${res.status()}: ${res.url()}`);
  });
  page.on("requestfailed", (req) => {
    const failure = req.failure()?.errorText ?? "";
    // Les navigations interrompues (ex. préchargement annulé) ne sont pas des erreurs.
    if (!failure.includes("ERR_ABORTED")) errors.push(`échec: ${req.url()} ${failure}`);
  });
  return { errors };
}

export async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Fait défiler toute la page pour déclencher les animations « à l'apparition ».
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      document.getAnimations().map((a) =>
        a.effect?.getTiming().iterations === Infinity ? Promise.resolve() : a.finished.catch(() => undefined),
      ),
    );
  });
  await page.waitForTimeout(900); // GSAP / Motion (durées ≤ 0,8 s)
}

export async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(scrollWidth, "la page défile horizontalement").toBeLessThanOrEqual(innerWidth);
}

export async function expectNoOverflow(page: Page, root = "body") {
  const problemes = await page.evaluate((rootSelector) => {
    const out: string[] = [];
    const vw = document.documentElement.clientWidth;
    const rootEl = document.querySelector(rootSelector);
    if (!rootEl) return [`racine introuvable: ${rootSelector}`];
    const describe = (el: Element) => {
      const id = el.id ? `#${el.id}` : "";
      const cls = typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}` : "";
      const txt = (el.textContent ?? "").trim().slice(0, 40);
      return `<${el.tagName.toLowerCase()}${id}${cls}> « ${txt} »`;
    };
    for (const el of Array.from(rootEl.querySelectorAll<HTMLElement>("*"))) {
      if (el.closest("[data-allow-overflow]")) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || style.position === "fixed") continue;
      if (el.closest("[aria-hidden='true'], [inert]")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > vw + 1 || rect.left < -1) out.push(`hors écran: ${describe(el)}`);
      const hasText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim() !== "");
      if (hasText && style.display !== "inline" && el.scrollWidth > el.clientWidth + 1) {
        const clips = style.overflowX !== "visible" || style.textOverflow === "ellipsis";
        out.push(`${clips ? "texte coupé" : "texte qui déborde"}: ${describe(el)}`);
      }
    }
    return out.slice(0, 15);
  }, root);
  expect(problemes, problemes.join("\n")).toEqual([]);
}

export async function expectNoSeriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const graves = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  const resume = graves.map((v) => `${v.id} (${v.impact}) : ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
  expect(graves, resume.join("\n")).toEqual([]);
}

export async function fullPageScreenshot(page: Page, name: string, testInfo: TestInfo) {
  await page.screenshot({
    path: `tests/screenshots/${name}-${testInfo.project.name}.png`,
    fullPage: true,
    animations: "disabled",
  });
}

/** Contrôles communs à toutes les pages. */
export async function checkPage(page: Page, testInfo: TestInfo, name: string, errors: string[]) {
  await settle(page);
  await expectNoHorizontalScroll(page);
  await expectNoOverflow(page);
  await expectNoSeriousA11yViolations(page);
  await fullPageScreenshot(page, name, testInfo);
  expect(errors, errors.join("\n")).toEqual([]);
}
```

- [ ] **Step 4: Premier test** — `tests/e2e/accueil.spec.ts`

```ts
import { expect, test } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

test.describe("Accueil", () => {
  test("s'affiche sans erreur ni débordement", async ({ page }, testInfo) => {
    const { errors } = trackErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await checkPage(page, testInfo, "accueil", errors);
  });

  test("respecte prefers-reduced-motion", async ({ browser }, testInfo) => {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: testInfo.project.use.viewport ?? undefined });
    const page = await context.newPage();
    const { errors } = trackErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await checkPage(page, testInfo, "accueil-reduced", errors);
    await context.close();
  });
});
```

- [ ] **Step 5: Vérifier que le contrôle détecte bien un débordement** (test du test) — ajouter **temporairement** dans `app/(site)/page.tsx` sous le `<p>` : `<div style={{ width: 2000 }}>trop large</div>`, puis :

Run: `npx playwright test --project=chromium-360`
Expected : FAIL avec « la page défile horizontalement ». **Retirer la ligne**, relancer :

Run: `npx playwright test`
Expected : PASS — 16 tests (2 × 8 projets).

- [ ] **Step 6: Commit**

```bash
touch tests/screenshots/.gitkeep
git add -A
git commit -m "test: Playwright à 8 tailles et contrôles anti-débordement"
```

---

## Lot 2 — Supabase et e-mails

### Task 4: [Steph] Créer le projet Supabase

Aucune ligne de code. Étapes à donner à Steph **clic par clic**, puis attendre sa confirmation :

1. Aller sur https://supabase.com → **Start your project** → se connecter (GitHub ou e-mail).
2. **New project** → Organization : la tienne → Name : `elyon-crea-site` → Database Password : cliquer **Generate a password** et le **copier dans un endroit sûr** (gestionnaire de mots de passe) → Region : **West EU (Paris)** (la plus proche du Gabon) → **Create new project**. Attendre ~2 minutes.
3. Menu de gauche → **Project Settings** (roue dentée) → **API** (ou **Data API** / **API Keys**).
4. Copier **Project URL**, la clé **anon / publishable** et la clé **service_role / secret** (bouton *Reveal*).
5. À la racine du projet, créer le fichier `.env.local` (copie de `.env.example`) et coller :
   `NEXT_PUBLIC_SUPABASE_URL=` (Project URL), `NEXT_PUBLIC_SUPABASE_ANON_KEY=` (anon), `SUPABASE_SERVICE_ROLE_KEY=` (service_role).
   Ou bien : envoyer **uniquement l'URL du projet** à Claude, qui passera par le connecteur Supabase ; **ne jamais coller la clé service_role dans la conversation**.
6. Répondre « Supabase c'est fait ».

Côté Claude après confirmation : vérifier que `.env.local` existe et contient les 3 variables **sans en afficher les valeurs** (`grep -c "SUPABASE" .env.local` → 3).

---

### Task 5: [Claude] Tables, sécurité (RLS), stockage et données de départ

**Files:**
- Create: `supabase/migrations/20261121000001_contenu_landing.sql`, `supabase/migrations/20261121000002_audit_admins_storage.sql`, `supabase/seed.sql`, `lib/supabase/types.ts` (généré)

**Interfaces:**
- Produces (base de données) :
  - `formules(id uuid, slug text unique, nom text, prix integer null, prix_mention text null, prix_note text null, prix_barre integer null, accroche text, description text, avantages text[], mise_en_avant boolean, cta text, ordre integer, publie boolean, created_at, updated_at)`
  - `places(id smallint = 1, total integer, restantes integer, updated_at)` — une seule ligne, publiée en Realtime
  - `realisations(id uuid, titre text, client text, categorie text, resultat text, description text, image_path text null, ordre integer, publie boolean, created_at, updated_at)`
  - `faq(id uuid, question text, reponse text, ordre integer, publie boolean, created_at, updated_at)`
  - `demandes_audit(id uuid, created_at, nom, email, entreprise, secteur, telephone, budget, besoins text[], message text null, liens text[], fichiers text[], consent_confidentialite boolean, consent_marketing boolean, ip_hash text, statut text, email_notification_ok boolean null, email_confirmation_ok boolean null)`
  - `admins(email text primary key, created_at)`
  - fonction `public.is_admin() returns boolean`
  - buckets Storage : `realisations` (public), `audit-fichiers` (privé, 10 Mo, PNG/JPG/WebP/PDF)
  - type TypeScript `Database` dans `lib/supabase/types.ts`

- [ ] **Step 1: `supabase/migrations/20261121000001_contenu_landing.sql`**

```sql
-- Contenu de la landing, modifiable sans redéployer le site.

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create table public.formules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nom text not null,
  prix integer check (prix is null or prix >= 0),          -- FCFA, null si « Sur devis »
  prix_mention text,                                         -- ex. « Sur devis »
  prix_note text,                                            -- ex. « dès 1 000 000 FCFA »
  prix_barre integer check (prix_barre is null or prix_barre >= 0),
  accroche text not null default '',
  description text not null default '',
  avantages text[] not null default '{}',
  mise_en_avant boolean not null default false,              -- carte « Le plus choisi »
  cta text not null default 'Démarrer',
  ordre integer not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint formules_prix_ou_mention check (prix is not null or prix_mention is not null)
);

create table public.places (
  id smallint primary key default 1 check (id = 1),          -- une seule ligne
  total integer not null check (total >= 0),
  restantes integer not null check (restantes >= 0),
  updated_at timestamptz not null default now(),
  constraint places_coherentes check (restantes <= total)
);

create table public.realisations (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  client text not null,
  categorie text not null,
  resultat text not null default '',
  description text not null default '',
  image_path text,                                           -- chemin dans le bucket « realisations »
  ordre integer not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  reponse text not null,
  ordre integer not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger formules_updated_at before update on public.formules for each row execute function public.set_updated_at();
create trigger places_updated_at before update on public.places for each row execute function public.set_updated_at();
create trigger realisations_updated_at before update on public.realisations for each row execute function public.set_updated_at();
create trigger faq_updated_at before update on public.faq for each row execute function public.set_updated_at();

alter table public.formules enable row level security;
alter table public.places enable row level security;
alter table public.realisations enable row level security;
alter table public.faq enable row level security;

-- Lecture publique du contenu publié uniquement. Aucune écriture publique.
create policy "formules publiées lisibles" on public.formules for select to anon, authenticated using (publie);
create policy "places lisibles" on public.places for select to anon, authenticated using (true);
create policy "réalisations publiées lisibles" on public.realisations for select to anon, authenticated using (publie);
create policy "faq publiée lisible" on public.faq for select to anon, authenticated using (publie);

-- Places restantes en temps réel.
alter publication supabase_realtime add table public.places;
```

- [ ] **Step 2: `supabase/migrations/20261121000002_audit_admins_storage.sql`**

```sql
-- Demandes d'audit (écrites uniquement par le serveur avec la clé service_role).
create table public.demandes_audit (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null,
  email text not null,
  entreprise text not null,
  secteur text not null,
  telephone text not null,
  budget text not null,
  besoins text[] not null,
  message text,
  liens text[] not null default '{}',
  fichiers text[] not null default '{}',                     -- chemins dans le bucket « audit-fichiers »
  consent_confidentialite boolean not null check (consent_confidentialite),
  consent_marketing boolean not null default false,
  ip_hash text not null,
  statut text not null default 'nouvelle' check (statut in ('nouvelle', 'en_cours', 'traitee', 'archivee')),
  email_notification_ok boolean,
  email_confirmation_ok boolean
);
create index demandes_audit_ip_recent on public.demandes_audit (ip_hash, created_at desc);
alter table public.demandes_audit enable row level security;
-- Aucune policy : ni anon ni authenticated n'y ont accès. Le back-office (étape 2) ajoutera une policy admin.

-- Administrateurs autorisés au back-office.
create table public.admins (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Stockage des fichiers.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('realisations', 'realisations', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('audit-fichiers', 'audit-fichiers', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;
-- « realisations » : lecture publique via l'URL publique du bucket (pas de policy d'écriture publique).
-- « audit-fichiers » : aucune policy → dépôt uniquement via URL signée créée par le serveur, lecture via URL signée.
```

- [ ] **Step 3: `supabase/seed.sql`** (contenu de départ, textes de la maquette ; tout ce qui est fictif est marqué)

```sql
insert into public.formules (slug, nom, prix, prix_mention, prix_note, accroche, description, avantages, mise_en_avant, cta, ordre) values
('envol-decouverte', 'Envol Découverte', 150000, null, null,
 'La porte d''entrée.',
 'Logo relooké + charte simplifiée + carte de visite.',
 array['Logo relooké', 'Charte graphique simplifiée', 'Carte de visite'],
 false, 'Démarrer', 1),
('envol-360', 'Envol 360°', 500000, null, null,
 'La marque complète, clé en main.',
 'Logo + charte, site vitrine, 5 templates réseaux + calendrier, kit papeterie, pack goodies, 1 support grand format.',
 array['Logo + charte graphique complète', 'Site vitrine mobile-first', '5 templates réseaux + calendrier 1 mois', 'Kit papeterie complet', 'Pack goodies personnalisés', '1 support grand format prêt à imprimer'],
 true, 'Je veux L''Envol 360°', 2),
('envol-signature', 'Envol Signature', null, 'Sur devis', 'dès 1 000 000 FCFA',
 'Pour les marques qui visent l''excellence.',
 'Tout L''Envol 360° + community management 3 mois + shooting + gestion de votre campagne publicitaire.',
 array['Tout L''Envol 360°', 'Community management 3 mois', 'Shooting photo / vidéo', 'Gestion campagne publicitaire'],
 false, 'Demander un devis', 3)
on conflict (slug) do nothing;

insert into public.places (id, total, restantes) values (1, 5, 4) on conflict (id) do nothing;

insert into public.faq (question, reponse, ordre) values
('C''est trop cher pour moi.', 'Commencez par l''Envol Découverte à 150 000 FCFA, puis montez en puissance quand votre marque génère des clients.', 1),
('J''ai déjà un logo.', 'Parfait. On le relooke et on construit tout le reste autour pour une image cohérente.', 2),
('Combien de temps ?', '30 jours pour L''Envol 360°, avec un calendrier partagé dès le départ.', 3),
('Et si je ne suis pas satisfait ?', 'On retravaille jusqu''à votre validation. Vous ne payez pas pour une image que vous n''assumez pas.', 4),
('Vous faites aussi l''impression et les goodies ?', 'Oui. Print tous formats et objets publicitaires personnalisés font partie de l''offre.', 5);

-- Réalisations : AUCUN client inventé. 6 emplacements à remplacer par les vrais projets fournis par Steph.
insert into public.realisations (titre, client, categorie, resultat, description, ordre) values
('[À CONFIRMER] Projet branding', '[À CONFIRMER]', 'Branding & Print', '[À CONFIRMER]', '[À CONFIRMER]', 1),
('[À CONFIRMER] Projet digital', '[À CONFIRMER]', 'Marketing Digital', '[À CONFIRMER]', '[À CONFIRMER]', 2),
('[À CONFIRMER] Projet web', '[À CONFIRMER]', 'Web & Développement', '[À CONFIRMER]', '[À CONFIRMER]', 3),
('[À CONFIRMER] Projet activation', '[À CONFIRMER]', 'BTL & Activation', '[À CONFIRMER]', '[À CONFIRMER]', 4),
('[À CONFIRMER] Projet vidéo', '[À CONFIRMER]', 'Production Vidéo', '[À CONFIRMER]', '[À CONFIRMER]', 5),
('[À CONFIRMER] Projet stratégie', '[À CONFIRMER]', 'Stratégie & Conseil', '[À CONFIRMER]', '[À CONFIRMER]', 6);
```

- [ ] **Step 4: Appliquer sur le projet Supabase de Steph** — via le connecteur MCP Supabase (`mcp__claude_ai_Supabase__list_projects` pour trouver le projet `elyon-crea-site`, puis `apply_migration` pour chaque fichier, dans l'ordre, avec le nom du fichier sans extension ; puis `execute_sql` avec le contenu de `seed.sql`). Si le connecteur n'est pas disponible : donner à Steph les étapes **SQL Editor → New query → coller → Run** pour chacun des 3 fichiers, dans l'ordre.

- [ ] **Step 5: Vérifier la sécurité**

Via `execute_sql` :
```sql
select tablename, rowsecurity from pg_tables where schemaname = 'public' order by tablename;
```
Expected : 6 lignes (`admins`, `demandes_audit`, `faq`, `formules`, `places`, `realisations`), toutes `rowsecurity = true`.
Puis `get_advisors` (type `security`) → aucune alerte de niveau ERROR sur ces tables.

- [ ] **Step 6: Générer les types TypeScript**

Via `generate_typescript_types` → enregistrer le résultat dans `lib/supabase/types.ts` (fichier généré, ne pas modifier à la main).

- [ ] **Step 7: Commit**

```bash
git add supabase lib/supabase/types.ts
git commit -m "feat: tables Supabase du contenu, demandes d'audit, admins et stockage"
```

---

### Task 6: [Claude] Clients Supabase et lecture du contenu

**Files:**
- Create: `lib/supabase/public.ts`, `lib/supabase/server.ts`, `lib/supabase/browser.ts`, `lib/supabase/admin.ts`, `lib/content/types.ts`, `lib/content/mappers.ts`, `lib/content/queries.ts`, `lib/content/static.ts`, `lib/content/stack.ts`, `tests/unit/mappers.test.ts`, `tests/unit/stack.test.ts`

**Interfaces:**
- Consumes : `Database` (`lib/supabase/types.ts`), `formatFCFA` (`lib/format.ts`)
- Produces :
  - `createSupabasePublicClient()` — anon, **sans cookies** (pages ISR)
  - `createSupabaseServerClient(): Promise<SupabaseClient<Database>>` — avec cookies (auth, `/admin`)
  - `createSupabaseBrowserClient()` — navigateur (Realtime, upload signé, connexion)
  - `createSupabaseAdminClient()` — service_role, `server-only`
  - Types : `Formule`, `Places`, `Realisation`, `FaqItem`, `Chiffre`, `StackItem`
  - `getFormules(): Promise<Formule[]>`, `getPlaces(): Promise<Places>`, `getRealisations(limit?: number): Promise<Realisation[]>`, `getFaq(): Promise<FaqItem[]>`
  - `mapFormule(row)`, `mapRealisation(row, publicImageUrl: (path: string) => string)`, `mapFaq(row)`, `mapPlaces(row | null)`
  - `prixAffiche(f: Formule): string` (« 500 000 FCFA » ou « Sur devis »)
  - `STACK_ITEMS: StackItem[]`, `valeurTotaleStack(items): number`
  - `CHIFFRES: Chiffre[]` ; `REALISATION_PLACEHOLDER = "/images/placeholders/realisation.jpg"`

- [ ] **Step 1: Clients Supabase**

`lib/supabase/public.ts`
```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/** Lecture publique sans cookies : garde les pages statiques (ISR). */
export function createSupabasePublicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
```

`lib/supabase/server.ts`
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Appelé depuis un Server Component : le proxy rafraîchit la session.
          }
        },
      },
    },
  );
}
```

`lib/supabase/browser.ts`
```ts
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

`lib/supabase/admin.ts`
```ts
import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/** Clé service_role : contourne RLS. Uniquement côté serveur. */
export function createSupabaseAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
```

- [ ] **Step 2: Types** — `lib/content/types.ts`

```ts
export type Formule = {
  id: string;
  slug: string;
  nom: string;
  prix: number | null;
  prixMention: string | null;
  prixNote: string | null;
  prixBarre: number | null;
  accroche: string;
  description: string;
  avantages: string[];
  miseEnAvant: boolean;
  cta: string;
};

export type Places = { total: number; restantes: number };

export type Realisation = {
  id: string;
  titre: string;
  client: string;
  categorie: string;
  resultat: string;
  description: string;
  imageUrl: string;
};

export type FaqItem = { id: string; question: string; reponse: string };

/** valeur null → affiche « [À CONFIRMER] » sans animation. */
export type Chiffre = { valeur: number | null; prefixe: string; suffixe: string; label: string };

export type StackItem = { label: string; valeur: number };
```

- [ ] **Step 3: Tests qui échouent** — `tests/unit/mappers.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { mapFaq, mapFormule, mapPlaces, mapRealisation, prixAffiche } from "@/lib/content/mappers";
import { REALISATION_PLACEHOLDER } from "@/lib/content/static";

const NBSP = " ";

const formuleRow = {
  id: "1", slug: "envol-360", nom: "Envol 360°", prix: 500000, prix_mention: null, prix_note: null,
  prix_barre: null, accroche: "a", description: "d", avantages: ["x", "y"], mise_en_avant: true,
  cta: "Go", ordre: 2, publie: true, created_at: "", updated_at: "",
};

describe("mapFormule / prixAffiche", () => {
  it("convertit une ligne en Formule", () => {
    const f = mapFormule(formuleRow);
    expect(f).toMatchObject({ slug: "envol-360", prix: 500000, miseEnAvant: true, avantages: ["x", "y"] });
  });
  it("affiche le prix en FCFA", () => {
    expect(prixAffiche(mapFormule(formuleRow))).toBe(`500${NBSP}000${NBSP}FCFA`);
  });
  it("affiche la mention quand il n'y a pas de prix", () => {
    const f = mapFormule({ ...formuleRow, prix: null, prix_mention: "Sur devis" });
    expect(prixAffiche(f)).toBe("Sur devis");
  });
});

describe("mapPlaces", () => {
  it("retourne la ligne", () => {
    expect(mapPlaces({ id: 1, total: 5, restantes: 4, updated_at: "" })).toEqual({ total: 5, restantes: 4 });
  });
  it("borne restantes entre 0 et total", () => {
    expect(mapPlaces({ id: 1, total: 5, restantes: 9, updated_at: "" })).toEqual({ total: 5, restantes: 5 });
  });
  it("retourne 0/0 si la ligne manque", () => {
    expect(mapPlaces(null)).toEqual({ total: 0, restantes: 0 });
  });
});

describe("mapRealisation", () => {
  const row = {
    id: "r1", titre: "T", client: "C", categorie: "Branding & Print", resultat: "R", description: "D",
    image_path: "projet-1.jpg", ordre: 1, publie: true, created_at: "", updated_at: "",
  };
  it("construit l'URL publique de l'image", () => {
    const r = mapRealisation(row, (p) => `https://cdn/${p}`);
    expect(r.imageUrl).toBe("https://cdn/projet-1.jpg");
  });
  it("utilise l'image provisoire si aucune image", () => {
    const r = mapRealisation({ ...row, image_path: null }, (p) => p);
    expect(r.imageUrl).toBe(REALISATION_PLACEHOLDER);
  });
});

describe("mapFaq", () => {
  it("convertit une ligne", () => {
    expect(mapFaq({ id: "f", question: "Q", reponse: "R", ordre: 1, publie: true, created_at: "", updated_at: "" }))
      .toEqual({ id: "f", question: "Q", reponse: "R" });
  });
});
```

`tests/unit/stack.test.ts`
```ts
import { describe, expect, it } from "vitest";
import { STACK_ITEMS, valeurTotaleStack } from "@/lib/content/stack";

describe("stack de valeur", () => {
  it("contient les 6 éléments de la maquette", () => {
    expect(STACK_ITEMS).toHaveLength(6);
  });
  it("additionne les valeurs (990 000 FCFA)", () => {
    expect(valeurTotaleStack(STACK_ITEMS)).toBe(990000);
  });
  it("vaut 0 pour une liste vide", () => {
    expect(valeurTotaleStack([])).toBe(0);
  });
});
```

Run: `npm run test` → Expected : FAIL (modules introuvables).

- [ ] **Step 4: Implémenter**

`lib/content/static.ts`
```ts
import type { Chiffre } from "./types";

export const REALISATION_PLACEHOLDER = "/images/placeholders/realisation.jpg";

/** Chiffres clés : valeurs à fournir par Steph (null = « [À CONFIRMER] »). */
export const CHIFFRES: Chiffre[] = [
  { valeur: null, prefixe: "+", suffixe: "", label: "Projets livrés" },
  { valeur: null, prefixe: "+", suffixe: "", label: "Clients satisfaits" },
  { valeur: null, prefixe: "", suffixe: "", label: "Années d'expérience" },
  { valeur: null, prefixe: "", suffixe: " %", label: "Taux de satisfaction" },
];
```

`lib/content/stack.ts`
```ts
import type { StackItem } from "./types";

/** Contenu de L'Envol 360° et valeur de chaque élément pris séparément (maquette). */
export const STACK_ITEMS: StackItem[] = [
  { label: "Logo relooké + charte graphique complète", valeur: 200000 },
  { label: "Site vitrine / landing page mobile-first", valeur: 350000 },
  { label: "5 templates réseaux + calendrier 1 mois", valeur: 150000 },
  { label: "Kit papeterie (carte, flyer, en-tête, signature mail)", valeur: 120000 },
  { label: "Pack goodies personnalisés", valeur: 80000 },
  { label: "1 support grand format prêt à imprimer", valeur: 90000 },
];

export function valeurTotaleStack(items: StackItem[]): number {
  return items.reduce((total, item) => total + item.valeur, 0);
}
```

`lib/content/mappers.ts`
```ts
import { formatFCFA } from "@/lib/format";
import type { Database } from "@/lib/supabase/types";
import { REALISATION_PLACEHOLDER } from "./static";
import type { FaqItem, Formule, Places, Realisation } from "./types";

type Row<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

export function mapFormule(row: Row<"formules">): Formule {
  return {
    id: row.id,
    slug: row.slug,
    nom: row.nom,
    prix: row.prix,
    prixMention: row.prix_mention,
    prixNote: row.prix_note,
    prixBarre: row.prix_barre,
    accroche: row.accroche,
    description: row.description,
    avantages: row.avantages,
    miseEnAvant: row.mise_en_avant,
    cta: row.cta,
  };
}

export function prixAffiche(f: Formule): string {
  return f.prix !== null ? formatFCFA(f.prix) : (f.prixMention ?? "Sur devis");
}

export function mapPlaces(row: Row<"places"> | null): Places {
  if (!row) return { total: 0, restantes: 0 };
  const total = Math.max(0, row.total);
  return { total, restantes: Math.min(Math.max(0, row.restantes), total) };
}

export function mapRealisation(row: Row<"realisations">, publicImageUrl: (path: string) => string): Realisation {
  return {
    id: row.id,
    titre: row.titre,
    client: row.client,
    categorie: row.categorie,
    resultat: row.resultat,
    description: row.description,
    imageUrl: row.image_path ? publicImageUrl(row.image_path) : REALISATION_PLACEHOLDER,
  };
}

export function mapFaq(row: Row<"faq">): FaqItem {
  return { id: row.id, question: row.question, reponse: row.reponse };
}
```

`lib/content/queries.ts`
```ts
import "server-only";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { mapFaq, mapFormule, mapPlaces, mapRealisation } from "./mappers";
import type { FaqItem, Formule, Places, Realisation } from "./types";

// En cas d'erreur Supabase, on lève : le build échoue (jamais de page vide publiée)
// et, en ISR, Next.js garde la dernière version valide.

export async function getFormules(): Promise<Formule[]> {
  const { data, error } = await createSupabasePublicClient()
    .from("formules").select("*").eq("publie", true).order("ordre");
  if (error) throw new Error(`formules: ${error.message}`);
  return data.map(mapFormule);
}

export async function getPlaces(): Promise<Places> {
  const { data, error } = await createSupabasePublicClient()
    .from("places").select("*").eq("id", 1).maybeSingle();
  if (error) throw new Error(`places: ${error.message}`);
  return mapPlaces(data);
}

export async function getRealisations(limit?: number): Promise<Realisation[]> {
  const supabase = createSupabasePublicClient();
  let query = supabase.from("realisations").select("*").eq("publie", true).order("ordre");
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw new Error(`realisations: ${error.message}`);
  const publicUrl = (path: string) => supabase.storage.from("realisations").getPublicUrl(path).data.publicUrl;
  return data.map((row) => mapRealisation(row, publicUrl));
}

export async function getFaq(): Promise<FaqItem[]> {
  const { data, error } = await createSupabasePublicClient()
    .from("faq").select("*").eq("publie", true).order("ordre");
  if (error) throw new Error(`faq: ${error.message}`);
  return data.map(mapFaq);
}
```

- [ ] **Step 5: Tests** — Run: `npm run test` → Expected : PASS.

- [ ] **Step 6: Autoriser les images Supabase dans `next.config.ts`** — ajouter :

```ts
images: {
  formats: ["image/avif", "image/webp"],
  remotePatterns: [
    { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
  ],
},
```

- [ ] **Step 7: Vérifier et commit**

```bash
npm run build && npm run lint && npm run test
git add -A
git commit -m "feat: clients Supabase et lecture du contenu de la landing"
```

---

### Task 7: [Steph] Créer le compte Resend (e-mails)

Étapes clic par clic, puis attendre la confirmation :

1. Aller sur https://resend.com → **Get started** → créer un compte avec **contact@elyoncrea.com** (important : tant que le domaine n'est pas vérifié, Resend n'envoie qu'à l'adresse du compte).
2. Menu **API Keys** → **Create API Key** → Name : `elyon-crea-site` → Permission : **Sending access** → **Add**.
3. Copier la clé (elle ne s'affiche qu'une fois) et la coller dans `.env.local` : `RESEND_API_KEY=…`.
4. Dans `.env.local`, mettre provisoirement : `RESEND_FROM="Elyon Créa <onboarding@resend.dev>"` (adresse de test Resend ; on passera à `contact@elyoncrea.com` à la mise en ligne, tâche 33).
5. Dans `.env.local`, ajouter `IP_HASH_SALT=` suivi d'une longue suite de caractères au hasard (Claude peut la générer : `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
6. Répondre « Resend c'est fait ».

---

## Lot 3 — Cadre du site public

### Task 8: [Claude] Outils d'animation, logo, images provisoires et layout du site

**Files:**
- Create: `lib/gsap.ts`, `components/site/motion/smooth-scroll.tsx`, `components/site/motion/reveal.tsx`, `components/site/motion/counter.tsx`, `components/site/motion/split-title.tsx`, `components/site/logo.tsx`, `components/site/icons/brand-icons.tsx`, `components/site/sections/section-heading.tsx`, `scripts/generate-placeholders.mjs`, `app/(site)/layout.tsx`
- Create (générés) : `public/images/hero/slide-{1,2,3,4}.jpg`, `public/images/placeholders/realisation.jpg`, `public/images/logo-elyon-crea.png`

**Interfaces:**
- Produces :
  - `gsap`, `ScrollTrigger`, `SplitText`, `useGSAP` réexportés par `lib/gsap.ts` (plugins enregistrés une fois)
  - `<SmoothScroll>{children}</SmoothScroll>` — Lenis, désactivé si `prefers-reduced-motion`
  - `<Reveal as?="div" delay?={0} y?={24} className?>` — fondu + montée à l'apparition (Motion)
  - `<RevealGroup stagger?={0.08}>` + `<RevealItem>` — apparition en cascade
  - `<Counter to={250} prefixe="+" suffixe="" />` — compteur animé à l'apparition
  - `<SplitTitle as="h1|h2" className>{texte}</SplitTitle>` — mots révélés un par un (GSAP SplitText)
  - `<Logo className? priority? />` — `next/image` du logo, `alt="Elyon Créa"`
  - `FacebookIcon`, `LinkedinIcon`, `WhatsAppIcon`, `GoogleIcon`, `MicrosoftIcon` (props `SVGProps<SVGSVGElement>`)
  - `<SectionHeading surtitre titre description? align?="center"|"left" tone?="dark"|"light" />`

- [ ] **Step 1: Images provisoires** — `scripts/generate-placeholders.mjs`

```js
// Génère des images sombres aux couleurs Elyon Créa, en attendant les vraies images de Steph.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const svg = (w, h, a, b, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="g1" cx="75%" cy="40%" r="60%"><stop offset="0" stop-color="${a}" stop-opacity="0.55"/><stop offset="1" stop-color="#0E0E0E" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="90%" cy="85%" r="45%"><stop offset="0" stop-color="${b}" stop-opacity="0.35"/><stop offset="1" stop-color="#0E0E0E" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0E0E0E"/>
  <rect width="100%" height="100%" fill="url(#g1)"/>
  <rect width="100%" height="100%" fill="url(#g2)"/>
  <text x="96%" y="94%" text-anchor="end" font-family="sans-serif" font-size="${Math.round(h / 40)}" fill="#ffffff" fill-opacity="0.25">${label}</text>
</svg>`;

const jobs = [
  ["public/images/hero/slide-1.jpg", 1920, 1080, "#C2147A", "#F9B000", "Image provisoire — Stratégie"],
  ["public/images/hero/slide-2.jpg", 1920, 1080, "#F9B000", "#C2147A", "Image provisoire — Création"],
  ["public/images/hero/slide-3.jpg", 1920, 1080, "#C2147A", "#7828C8", "Image provisoire — Digital"],
  ["public/images/hero/slide-4.jpg", 1920, 1080, "#7828C8", "#F9B000", "Image provisoire — IA"],
  ["public/images/placeholders/realisation.jpg", 1200, 900, "#C2147A", "#F9B000", "Image à fournir"],
];

await mkdir("public/images/hero", { recursive: true });
await mkdir("public/images/placeholders", { recursive: true });
for (const [out, w, h, a, b, label] of jobs) {
  await sharp(Buffer.from(svg(w, h, a, b, label))).jpeg({ quality: 70, mozjpeg: true }).toFile(out);
  console.log("✓", out);
}
```

Run: `node scripts/generate-placeholders.mjs` → Expected : 5 lignes `✓`.

- [ ] **Step 2: Logo** — télécharger le logo de la maquette (provisoire, en attendant le fichier source de Steph) :

```bash
curl -L -o public/images/logo-elyon-crea.png "https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2Fe1b20d7b-1888-489e-8690-4cf5f67247d8?alt=media&token=d175f110-6643-4e8c-b323-42ba1f471660"
node -e "require('sharp')('public/images/logo-elyon-crea.png').metadata().then(m=>console.log(m.format,m.width,m.height))"
```
Expected : `png <largeur> <hauteur>` (noter les dimensions pour `components/site/logo.tsx`). Si le format n'est pas PNG, enregistrer avec la bonne extension et adapter le chemin.

`components/site/logo.tsx` (remplacer `LARGEUR`/`HAUTEUR` par les valeurs mesurées)
```tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

const LARGEUR = 0; // ← largeur mesurée
const HAUTEUR = 0; // ← hauteur mesurée

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo-elyon-crea.png"
      alt="Elyon Créa"
      width={LARGEUR}
      height={HAUTEUR}
      priority={priority}
      className={cn("h-10 w-auto md:h-12", className)}
    />
  );
}
```
(Si la version de Next.js installée a remplacé `priority` par `preload`, utiliser `preload`.)

- [ ] **Step 3: `lib/gsap.ts`**

```ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
```

- [ ] **Step 4: Défilement fluide** — `components/site/motion/smooth-scroll.tsx`

```tsx
"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.12, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 5: Apparitions** — `components/site/motion/reveal.tsx`

```tsx
"use client";
import { motion, type HTMLMotionProps } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ stagger = 0.08, children, ...rest }: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Compteur** — `components/site/motion/counter.tsx`

```tsx
"use client";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNombre } from "@/lib/format";

export function Counter({ to, prefixe = "", suffixe = "" }: { to: number; prefixe?: string; suffixe?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [valeur, setValeur] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setValeur(to);
      return;
    }
    const controls = animate(0, to, { duration: 0.8, ease: "easeOut", onUpdate: (v) => setValeur(v) });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className="tabular-nums whitespace-nowrap">
      {prefixe}
      {formatNombre(valeur)}
      {suffixe}
    </span>
  );
}
```
Note : un compteur met à jour du texte (pas `transform`) ; c'est accepté car la largeur est stabilisée par `tabular-nums` et la valeur finale est déjà réservée par `min-w` du parent (tâche 12) → pas de CLS.

- [ ] **Step 7: Titre révélé mot par mot** — `components/site/motion/split-title.tsx`

```tsx
"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = { as?: "h1" | "h2"; className?: string; children: React.ReactNode; delay?: number };

export function SplitTitle({ as: Tag = "h2", className, children, delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(ref.current!, { type: "words", mask: "words" });
        gsap.from(split.words, { yPercent: 110, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, delay });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
```
Note : SplitText découpe le texte des enfants. Les enfants peuvent contenir des `<span className="block">` (ex. titre en deux lignes, la 2ᵉ en dégradé) — vérifier visuellement que le dégradé reste appliqué après découpage ; sinon appliquer `text-gradient-brand` sur chaque mot via `wordsClass`.

- [ ] **Step 8: Icônes de marques** — `components/site/icons/brand-icons.tsx`

```tsx
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z" />
  </svg>
);

export const LinkedinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.44-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.46 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.5C5.79.5.69 5.6.69 11.86c0 2 .52 3.96 1.52 5.68L.6 23.5l6.1-1.6a11.33 11.33 0 0 0 5.35 1.36h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.33-8.03z" />
  </svg>
);

export const GoogleIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const MicrosoftIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path d="M1 1h10.5v10.5H1z" fill="#F25022" />
    <path d="M12.5 1H23v10.5H12.5z" fill="#7FBA00" />
    <path d="M1 12.5h10.5V23H1z" fill="#00A4EF" />
    <path d="M12.5 12.5H23V23H12.5z" fill="#FFB900" />
  </svg>
);
```
Note : les couleurs officielles des logos Google/Microsoft sont une exception assumée à la règle « tokens uniquement » (chartes de marques tierces).

- [ ] **Step 9: En-tête de section réutilisable** — `components/site/sections/section-heading.tsx`

```tsx
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/motion/reveal";

type Props = {
  surtitre: string;
  titre: string;
  description?: string;
  align?: "center" | "left";
  tone?: "dark" | "light"; // fond de la section
  surtitreClassName?: string;
  className?: string;
};

export function SectionHeading({ surtitre, titre, description, align = "center", tone = "dark", surtitreClassName, className }: Props) {
  return (
    <Reveal className={cn("mb-10 md:mb-14", align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <span className={cn("mb-3 block text-xs font-semibold uppercase tracking-widest", surtitreClassName ?? "text-accent-magenta")}>
        {surtitre}
      </span>
      <h2 className={cn("font-headings text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-tight", tone === "dark" ? "text-ink-100" : "text-foreground")}>
        {titre}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base", tone === "dark" ? "text-ink-500" : "text-muted", align === "center" && "mx-auto max-w-lg")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
```

- [ ] **Step 10: Layout du site** — `app/(site)/layout.tsx` (Header, Footer et WhatsAppButton sont créés aux tâches 9 et 10 : pour cette tâche, layout minimal ; les imports sont ajoutés aux tâches suivantes)

```tsx
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "@/components/site/motion/smooth-scroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="flex min-h-dvh flex-col bg-dark">
          <div className="flex-1">{children}</div>
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}
```
`MotionConfig` étant un composant client, si le build signale une erreur de frontière serveur/client, l'envelopper dans un petit `components/site/motion/motion-provider.tsx` marqué `"use client"`.

- [ ] **Step 11: Vérifier et commit**

```bash
npm run build && npm run lint && npm run test && npx playwright test
git add -A
git commit -m "feat: outils d'animation, logo, images provisoires et layout du site"
```

---

### Task 9: [Claude] En-tête (collant, flou au défilement, menu burger plein écran)

**Maquette :** `design/banani/components/ElyonHeaderV2.jsx`

**Files:**
- Create: `components/site/header.tsx`, `components/site/mobile-menu.tsx`, `lib/navigation.ts`
- Modify: `app/(site)/layout.tsx`, `tests/e2e/accueil.spec.ts`

**Interfaces:**
- Consumes : `Logo`, composant shadcn `Sheet`
- Produces : `NAV_LINKS: { label: string; href: string }[]` ; `<Header />`

**Comportement attendu :**

| | Mobile (< 768) | Tablette (768–1023) | PC (≥ 1024) |
|---|---|---|---|
| Liens Services · Offre · Réalisations · Contact | dans le menu burger | dans le menu burger | visibles, `gap-10` |
| Bouton « Audit gratuit » | **toujours visible** (petit, `px-4 py-2.5`, ≥ 44 px de haut) | visible | visible |
| Menu burger | bouton 44×44 `aria-label="Ouvrir le menu"`, ouvre un `Sheet` plein écran (`side="right"`, `w-full`), liens en `text-2xl`, fermeture au clic sur un lien | idem | absent |

- Collant : `sticky top-0 z-50`. Au défilement (> 24 px) : fond `bg-dark/75 backdrop-blur-md`, padding vertical réduit (`py-4` → `py-2.5`), logo `h-12` → `h-10`. Transition `transition-[padding,background-color] duration-300` (padding OK ici car l'en-tête est sticky et sa hauteur ne pousse pas le contenu : réserver la hauteur max via un wrapper `h-16 md:h-20` pour éviter tout CLS).
- Liens : `text-sm font-medium tracking-wide text-muted-foreground hover:text-ink-100 focus-visible:outline-2 focus-visible:outline-secondary`.
- Bouton : `bg-secondary text-secondary-foreground rounded-md font-semibold` → `<Link href="/audit-gratuit">`.

- [ ] **Step 1: Test e2e qui échoue** — ajouter dans `tests/e2e/accueil.spec.ts` :

```ts
test("en-tête : bouton Audit gratuit toujours visible et menu burger sur mobile", async ({ page }, testInfo) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  await expect(header.getByRole("link", { name: "Audit gratuit" })).toBeVisible();
  const width = testInfo.project.use.viewport?.width ?? 1280;
  if (width < 1024) {
    await header.getByRole("button", { name: "Ouvrir le menu" }).click();
    const menu = page.getByRole("dialog");
    await expect(menu.getByRole("link", { name: "Réalisations" })).toBeVisible();
    await menu.getByRole("link", { name: "Réalisations" }).click();
    await expect(page).toHaveURL(/\/realisations/);
  } else {
    await expect(header.getByRole("link", { name: "Services" })).toBeVisible();
  }
});
```
Run: `npx playwright test -g "en-tête"` → Expected : FAIL.

- [ ] **Step 2: `lib/navigation.ts`**

```ts
export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Offre", href: "/#formules" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Contact", href: "/#contact" },
] as const;
```
(`/#contact` cible le pied de page, qui porte `id="contact"`.)

- [ ] **Step 3: `components/site/header.tsx`**

```tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/site/logo";
import { MobileMenu } from "@/components/site/mobile-menu";
import { NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border transition-[padding,background-color] duration-300",
        scrolled ? "bg-dark/75 py-2.5 backdrop-blur-md" : "bg-dark py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" aria-label="Elyon Créa — accueil" className="shrink-0">
          <Logo priority className={cn("transition-[height] duration-300", scrolled ? "h-9 md:h-10" : "h-10 md:h-12")} />
        </Link>
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-ink-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/audit-gratuit"
            className="inline-flex min-h-11 items-center rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90 md:px-6"
          >
            Audit gratuit
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
```
Note CLS : la hauteur de l'en-tête varie au défilement, mais il est `sticky` et la variation ne survient qu'après un défilement utilisateur (exclu du CLS). Si Lighthouse signale un décalage, figer la hauteur (`h-16 md:h-20`) et n'animer que le logo via `scale`.

- [ ] **Step 4: `components/site/mobile-menu.tsx`**

```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type="button" aria-label="Ouvrir le menu" className="inline-flex size-11 items-center justify-center rounded-md text-ink-100 lg:hidden">
          <Menu size={24} aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-none bg-dark sm:max-w-none">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Navigation mobile" className="mt-20 px-6">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-2xl font-semibold text-ink-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/audit-gratuit"
            onClick={() => setOpen(false)}
            className="mt-8 flex min-h-12 w-full items-center justify-center rounded-md bg-secondary text-base font-semibold text-secondary-foreground"
          >
            Audit gratuit
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```
Vérifier que le bouton de fermeture du `Sheet` shadcn a un `aria-label` en français (« Fermer le menu ») ; sinon le modifier dans `components/ui/sheet.tsx` (le texte `sr-only` « Close » → « Fermer »).

- [ ] **Step 5: Brancher dans `app/(site)/layout.tsx`** — ajouter `import { Header } from "@/components/site/header";` et `<Header />` juste avant `<div className="flex-1">`.

- [ ] **Step 6: Tests** — Run : `npx playwright test` → Expected : PASS. **Regarder** `tests/screenshots/accueil-chromium-360.png` et `…-1440.png` et comparer avec la maquette (logo à gauche, bouton or à droite).

- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat: en-tête collant avec flou au défilement et menu burger"`

---

### Task 10: [Claude] Pied de page et bouton WhatsApp flottant

**Maquette :** `design/banani/components/ElyonFooter.jsx`

**Files:**
- Create: `components/site/footer.tsx`, `components/site/whatsapp-button.tsx`
- Modify: `app/(site)/layout.tsx`, `tests/e2e/accueil.spec.ts`

**Interfaces:**
- Consumes : `siteConfig`, `buildWhatsAppLink`, `Logo`, icônes de marques, `NAV_LINKS`
- Produces : `<Footer />` (porte `id="contact"`), `<WhatsAppButton />`

**Contenu (repris de la maquette, corrigé) :** logo + « Communication visuelle & digitale » + icônes Facebook/LinkedIn (affichées **seulement si** `siteConfig.reseaux.*` n'est pas null) · colonne **Navigation** (`NAV_LINKS` + « Audit gratuit ») · colonne **Contact** : `siteConfig.ville`, `siteConfig.telephoneAffiche` (lien `tel:` seulement si ce n'est pas `[À CONFIRMER]`), `contact@elyoncrea.com` (lien `mailto:`, `break-words`) · colonne **WhatsApp** : bouton « Écrire sur WhatsApp » + « Réponse rapide garantie » · bas de page : `© {année courante} Elyon Créa` (année calculée : `new Date().getFullYear()`) · lien « Mentions légales ».

**Responsive :** PC 4 colonnes (`lg:grid-cols-4`) · tablette 2 colonnes (`md:grid-cols-2`) · mobile 1 colonne. Bas de page : `flex-col md:flex-row`. Ajouter `pb-24` sur mobile pour que le bouton WhatsApp flottant ne cache pas le lien « Mentions légales » (`pb-24 md:pb-8`).

**Bouton WhatsApp flottant :** `fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6`, rond 56×56 (`size-14`), fond `bg-whatsapp`, icône blanche 28 px, `aria-label="Nous écrire sur WhatsApp"`, `target="_blank" rel="noopener noreferrer"`, lien `buildWhatsAppLink(siteConfig.whatsappNumero, siteConfig.messageWhatsAppDefaut)` ; **non rendu** si le lien est `null`. Apparition : fondu Motion après 1 s. Le bouton reste sur toutes les pages publiques, mais sur `/audit-gratuit` ajouter `pb-24` au bas du formulaire pour qu'il ne cache jamais le bouton d'envoi (tâche 25).

- [ ] **Step 1: Configurer le numéro pour les tests** — dans `playwright.config.ts`, `webServer` : ajouter
```ts
env: { NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "24100000000" },
```

- [ ] **Step 2: Test e2e qui échoue** — ajouter dans `tests/e2e/accueil.spec.ts` :

```ts
test("pied de page et bouton WhatsApp", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "contact@elyoncrea.com" })).toHaveAttribute("href", "mailto:contact@elyoncrea.com");
  await expect(footer.getByRole("link", { name: "Mentions légales" })).toHaveAttribute("href", "/mentions-legales");
  await expect(footer).toContainText(`© ${new Date().getFullYear()} Elyon Créa`);
  await expect(footer).not.toContainText("hello@");
  const wa = page.getByRole("link", { name: "Nous écrire sur WhatsApp" });
  await expect(wa).toBeVisible();
  await expect(wa).toHaveAttribute("href", /^https:\/\/wa\.me\/\d{8,}/);
  // Le bouton flottant ne doit pas recouvrir le lien « Mentions légales » en bas de page.
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(400);
  const a = await wa.boundingBox();
  const b = await footer.getByRole("link", { name: "Mentions légales" }).boundingBox();
  const chevauche = a && b && a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  expect(chevauche).toBeFalsy();
});
```
Run → FAIL.

- [ ] **Step 3: Implémenter** `components/site/footer.tsx` (Server Component) et `components/site/whatsapp-button.tsx` (`"use client"` pour l'apparition Motion) selon le contenu et les règles ci-dessus, en convertissant la maquette avec les règles Banani → React. Brancher `<Footer />` après `<div className="flex-1">…</div>` et `<WhatsAppButton />` à la fin du layout.

- [ ] **Step 4: Tests** — `npx playwright test` → PASS. Regarder les captures 360 / 768 / 1440 (bas de page).

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: pied de page et bouton WhatsApp flottant"`

---

## Lot 4 — Les sections de la landing

Pour **chaque** tâche de ce lot :
- Ouvrir la maquette indiquée et la convertir avec les **Règles de conversion Banani → React**.
- Ajouter la section dans `app/(site)/page.tsx` **à sa place** (ordre : Hero, Stats, ProblemSolution, StackValeur, Services, Formules, Portfolio, Garantie, FAQ, CtaFinal).
- Ajouter le test e2e indiqué dans `tests/e2e/accueil.spec.ts`, le voir échouer, implémenter, le voir passer, puis lancer **toute** la suite Playwright.
- **Regarder** les captures `accueil-chromium-{360,768,1440}.png` et les comparer à la maquette (ordre, hiérarchie, espacements, couleurs).
- Chaque section est un `<section aria-labelledby="<id>-titre">` dont le `<h2 id="<id>-titre">` porte le titre visible (les tests la retrouvent avec `getByRole("region", { name: <titre> })`) ; exception : Chiffres clés (`aria-label="Chiffres clés"`, pas de titre visible).
- Commit : `feat: section <nom>`.

`app/(site)/page.tsx` devient (à compléter section par section) :

```tsx
import { getFaq, getFormules, getPlaces, getRealisations } from "@/lib/content/queries";
// imports des sections au fur et à mesure

export const revalidate = 60;

export default async function AccueilPage() {
  const [formules, places, realisations, faq] = await Promise.all([
    getFormules(), getPlaces(), getRealisations(6), getFaq(),
  ]);
  return (
    <main id="contenu">
      {/* sections dans l'ordre */}
    </main>
  );
}
```

### Task 11: [Claude] Hero — diaporama

**Maquette :** `design/banani/components/ElyonHero.jsx` (4 diapositives : tag, titre, titre en dégradé, sous-titre)

**Files:** Create `lib/content/hero.ts`, `components/site/sections/hero-slideshow.tsx` · Modify `app/(site)/page.tsx`, `tests/e2e/accueil.spec.ts`

**Interfaces:** Produces `HERO_SLIDES: { tag: string; titre: string; titreAccent: string; sousTitre: string; image: string; alt: string }[]` (textes exacts de la maquette, images `/images/hero/slide-{1..4}.jpg`) ; `<HeroSlideshow slides={HERO_SLIDES} />`.

**Comportement :**
- Défilement automatique toutes les **6 s**, transition **fondu** (`opacity`, 0,8 s) entre images empilées (`absolute inset-0`). Pause au survol et quand le focus clavier est dans le Hero. **Aucun défilement automatique** si `prefers-reduced-motion` (reste sur la diapositive 1, flèches utilisables).
- Image 1 : `next/image` `fill` `priority` (ou `preload`) `sizes="100vw"` `className="object-cover"`. Images 2–4 : montées **seulement** après `window.load` + `requestIdleCallback` (état `imagesSuivantesPretes`), `loading="lazy"`.
- Zoom lent sur l'image active : `scale` 1 → 1.06 sur 6 s (Motion, `transform` uniquement), désactivé en mouvement réduit.
- Un **seul `<h1>`** : `<span className="block text-light">{titre}</span><span className="block text-gradient-brand">{titreAccent}</span>`. Révélation mot par mot (`SplitTitle as="h1"`) **seulement au premier affichage** ; changements de diapositive suivants → fondu simple du bloc texte.
- Voile : mobile `bg-dark/85` uniforme (texte lisible), ≥ `lg` dégradé de la maquette `bg-gradient-to-r from-dark/90 via-dark/90 to-dark/50`.
- Colibri en filigrane (SVG de la maquette) : `hidden lg:block`, `aria-hidden`, dégradé via `stop-color` = `var(--color-primary)` / `var(--color-secondary)`.
- Boutons : « Démarrer mon projet » → `/audit-gratuit` (or, plein) ; « Voir nos réalisations » → `/realisations` (bordure claire). Mobile : `flex-col w-full`, chaque bouton `w-full min-h-12` ; ≥ `sm` : en ligne.
- Contrôles : indicateurs = `<button aria-label="Aller à la diapositive N">` 44×44 (pastille visuelle 8 px dans une zone de 44 px) ; flèches précédent/suivant `aria-label` « Diapositive précédente » / « Diapositive suivante », 44×44. Conteneur `role="region" aria-roledescription="carrousel" aria-label="Nos expertises"` ; diapositive active `aria-live="polite"` seulement quand le défilement auto est en pause.
- Hauteur : `min-h-[calc(100dvh-4rem)] lg:min-h-[760px]`, contenu `max-w-3xl`, conteneur `max-w-7xl mx-auto px-4 md:px-8`, `py-20`.
- Titre : `text-[clamp(2rem,6vw,3rem)] font-bold leading-tight`.

**Test e2e :**
```ts
test("hero : diaporama accessible et boutons", async ({ page }) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Nos expertises" });
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("votre communication 360°");
  await expect(hero.getByRole("link", { name: "Démarrer mon projet" })).toHaveAttribute("href", "/audit-gratuit");
  await expect(hero.getByRole("link", { name: "Voir nos réalisations" })).toHaveAttribute("href", "/realisations");
  await hero.getByRole("button", { name: "Diapositive suivante" }).click();
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("une identité qui marque les esprits");
  await hero.getByRole("button", { name: "Aller à la diapositive 4" }).click();
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("de votre communication");
  expect(await page.locator("h1").count()).toBe(1);
});
```

---

### Task 12: [Claude] Chiffres clés — compteurs animés

**Maquette :** `design/banani/components/ElyonStats.jsx` · **Files:** Create `components/site/sections/stats.tsx` · Modify page, test

- Données : `CHIFFRES` (`lib/content/static.ts`). `valeur === null` → afficher `[À CONFIRMER]` en `text-base` (pas de compteur) ; sinon `<Counter to={valeur} prefixe suffixe />` en `text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-secondary`.
- Grille : `grid grid-cols-2 lg:grid-cols-4` (mobile 2×2 comme prévu dans `CLAUDE.md` §8 ; tablette : 2×2 aussi si 4 colonnes débordent à 768 — vérifier la capture, sinon `md:grid-cols-4`). Séparateurs : `border-border` à droite/en bas selon la position (pas de bordure sur le dernier de chaque ligne).
- Fond `bg-dark-card border-y border-border`, cellules `py-8 md:py-10`, libellés `text-sm text-muted-foreground`, `min-w-0 text-center`.

**Test e2e :**
```ts
test("chiffres clés : 4 indicateurs, aucun chiffre inventé", async ({ page }) => {
  await page.goto("/");
  const stats = page.getByRole("region", { name: "Chiffres clés" });
  for (const label of ["Projets livrés", "Clients satisfaits", "Années d'expérience", "Taux de satisfaction"]) {
    await expect(stats.getByText(label)).toBeVisible();
  }
  await expect(stats).not.toContainText("+250");
  await expect(stats).not.toContainText("98");
});
```
(La section est un `<section aria-label="Chiffres clés">`.)

---

### Task 13: [Claude] Problème → Solution « L'Envol 360° »

**Maquette :** `design/banani/components/ElyonProblemSolutionV2.jsx` · **Files:** Create `components/site/sections/problem-solution.tsx` · Modify page, test

- Reprendre **tous** les textes de la maquette (« Le problème », « Une image qui fait « amateur » fait fuir vos clients avant même de vous parler. », « Un seul interlocuteur », « Cohérent partout », « Du logo au goodie, la même identité forte. », bouton « Réserve ton offre » → `/#formules`, etc.).
- Animation : colonne Problème puis colonne Solution en **apparition décalée** (`RevealGroup` stagger 0,15) ; **flèche qui se trace** entre les deux : SVG `path` avec `pathLength={1}` animé par Motion `initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}` (0,8 s) — horizontale ≥ `lg`, verticale (rotation 90°) en dessous.
- Responsive : ≥ `lg` 2 colonnes + flèche au centre ; < `lg` empilé.
- `<section id="probleme" aria-labelledby="probleme-titre">`.

**Test e2e :**
```ts
test("problème → solution", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Une image qui fait « amateur »")).toBeVisible();
  await expect(page.getByRole("link", { name: "Réserve ton offre" })).toHaveAttribute("href", "/#formules");
});
```

---

### Task 14: [Claude] Pile de valeur + places restantes en temps réel

**Maquette :** `design/banani/components/ElyonStackValeur.jsx` · **Files:** Create `components/site/sections/stack-valeur.tsx`, `components/site/sections/places-restantes.tsx` · Modify page, test

**Interfaces:** Consumes `STACK_ITEMS`, `valeurTotaleStack`, `formatFCFA`, `Formule` (celle avec `slug === "envol-360"` ; à défaut celle `miseEnAvant`), `Places`, `createSupabaseBrowserClient`. Produces `<StackValeur formule={Formule | undefined} places={Places} />`, `<PlacesRestantes initial={Places} />`.

- Liste : chaque ligne = coche (icône `Check` dans pastille `bg-secondary/15`) + libellé (`min-w-0`) + valeur `formatFCFA` en `text-secondary whitespace-nowrap`. **Coches qui apparaissent une à une** (`RevealGroup` stagger 0,1).
- Phrase d'intro : « Pris séparément, cet ensemble vaut près de {formatFCFA(valeurTotaleStack(STACK_ITEMS))}. »
- Carte prix : « Valeur totale » barrée (`line-through text-ink-700`) = total calculé ; « Votre prix » = `formule.prix` formaté en deux lignes comme la maquette (« 500 000 » / « FCFA ») ; bouton « Je veux L'Envol 360° » → `/audit-gratuit`. Fond `bg-gradient-gold-card border border-secondary/40 rounded-2xl`.
- Responsive : ≥ `lg` liste + carte côte à côte (`lg:grid-cols-[1fr_20rem]`) ; < `lg` empilés, carte en dessous, `w-full`.
- **PlacesRestantes** (`"use client"`) : affiche `total` pastilles (pleines = restantes, vides = prises), texte « {restantes} places disponibles sur {total} » (« 1 place disponible » au singulier ; « Complet ce mois-ci » si 0). Abonnement Realtime :

```tsx
"use client";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { mapPlaces } from "@/lib/content/mappers";
import type { Places } from "@/lib/content/types";

export function usePlacesTempsReel(initial: Places): Places {
  const [places, setPlaces] = useState(initial);
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("places-restantes")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "places", filter: "id=eq.1" },
        (payload) => setPlaces(mapPlaces(payload.new as Parameters<typeof mapPlaces>[0])))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);
  return places;
}
```
Le texte des places est dans un `aria-live="polite"`. Si `formule` est `undefined` (aucune formule publiée), masquer la carte prix mais garder la liste.

**Test e2e :**
```ts
test("pile de valeur : total calculé et places restantes", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: /tout ce que contient L'Envol 360°/ });
  await expect(section).toContainText("990 000 FCFA");
  await expect(section.getByText(/places? disponibles? sur \d+|Complet ce mois-ci/)).toBeVisible();
  await expect(section.getByRole("link", { name: "Je veux L'Envol 360°" })).toHaveAttribute("href", "/audit-gratuit");
});
```
**Vérification manuelle du temps réel** (à faire une fois et à noter dans le rapport) : page ouverte, exécuter via MCP `execute_sql` `update places set restantes = 3 where id = 1;` → le chiffre change sans recharger ; remettre `restantes = 4`.

---

### Task 15: [Claude] Expertise — 11 pôles de services

**Maquette :** `design/banani/components/ElyonServicesDetailed.jsx` · **Files:** Create `lib/content/services.ts`, `components/site/sections/services.tsx` · Modify page, test · `npx shadcn@latest add popover`

**Interfaces:** Produces `POLES: { icone: LucideIcon; couleur: "magenta" | "gold"; titre: string; sousTitre?: string; prestations: { label: string; description: string }[] }[]` — **recopier exactement** les 11 pôles, sous-titres, prestations et descriptions de la maquette (`#C2147A` → `"magenta"`, `#F9B000` → `"gold"`, icônes Lucide correspondantes : `Lightbulb`, `PenTool`, `Monitor`, …).

- `<section id="services">`, fond `bg-light`, `SectionHeading tone="light"` : « Notre expertise » / « Une agence 360°, un seul partenaire. » / « De la stratégie à la mesure des résultats, nous couvrons l'intégralité de votre communication. »
- Cartes : `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5` ; carte blanche `bg-background border border-light-card rounded-xl p-6`, numéro `01…11` en haut à droite, icône dans pastille teintée (`bg-primary/10 text-primary` ou `bg-secondary/10 text-secondary`), trait coloré, liste des prestations.
- **Infobulles accessibles** (remplacent le survol CSS de la maquette, inutilisable au doigt) : chaque prestation est un `<button type="button">` (zone ≥ 44 px de haut via `py-2.5`) qui ouvre un `Popover` shadcn (`side="top"`, `collisionPadding={16}`, largeur `w-[min(270px,calc(100vw-2rem))]`) au clic/tap/Entrée ; sur PC il s'ouvre aussi au survol (`onMouseEnter`/`onMouseLeave` contrôlant `open`, uniquement si `matchMedia("(hover: hover)")`). Contenu : trait coloré, libellé en gras, description. Fond `bg-dark text-ink-200`.
- Animation : **apparition en cascade** (`RevealGroup` / `RevealItem`) ; **carte qui se soulève au survol** : `transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`.

**Test e2e :**
```ts
test("expertise : 11 pôles et infobulle au clic", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#services");
  await expect(section.getByRole("heading", { level: 3 })).toHaveCount(11);
  await section.getByRole("button", { name: "Audit de marque" }).click();
  await expect(page.getByRole("dialog")).toContainText("Analyse complète de votre image");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
```

---

### Task 16: [Claude] Formules (prix lus dans Supabase)

**Maquette :** `design/banani/components/ElyonFormules.jsx` · **Files:** Create `components/site/sections/formules.tsx` · Modify page, test

**Interfaces:** Consumes `Formule[]`, `prixAffiche`. Produces `<Formules formules={Formule[]} />`.

- `<section id="formules">`, fond `bg-gradient-formules`, lueurs décoratives de la maquette en `absolute pointer-events-none aria-hidden` avec `max-w-full` (elles ne doivent **jamais** élargir la page : conteneur `relative overflow-hidden` sur la **section**, pas sur `body`).
- Cartes : ≥ `xl` 3 colonnes `items-start` ; < `xl` 1 colonne `max-w-md mx-auto`, **la carte `miseEnAvant` en premier** (`order-first xl:order-none`).
- Carte mise en avant : badge « Le plus choisi » (icône `Star`) centré en haut, fond `bg-gradient-gold-card`, **bordure en dégradé animée** : pseudo-élément avec `conic-gradient` qui tourne (rotation `transform` d'un calque `absolute inset-[-1px]` derrière la carte, `animation: spin 6s linear infinite`, coupée en mouvement réduit par la règle globale).
- Prix : `prixAffiche(f)` en `text-3xl font-bold whitespace-nowrap` ; `prixNote` dessous ; `accroche`, `description`, trait, liste des `avantages` avec coches, bouton `cta` → `/audit-gratuit` (plein or pour la carte mise en avant, contour sinon).
- Liste vide (aucune formule publiée) → ne pas rendre la section.

**Test e2e :**
```ts
test("formules : 3 cartes depuis Supabase, carte mise en avant", async ({ page }, testInfo) => {
  await page.goto("/");
  const section = page.locator("#formules");
  await expect(section.getByRole("heading", { level: 3 })).toHaveCount(3);
  await expect(section.getByText("Le plus choisi")).toBeVisible();
  await expect(section).toContainText("500 000 FCFA");
  await expect(section).toContainText("Sur devis");
  const width = testInfo.project.use.viewport?.width ?? 1280;
  if (width < 1280) {
    const premiere = section.getByRole("heading", { level: 3 }).first();
    await expect(premiere).toHaveText("Envol 360°");
  }
});
```

---

### Task 17: [Claude] Réalisations (aperçu, 6 projets)

**Maquette :** `design/banani/components/ElyonPortfolio.jsx` · **Files:** Create `components/site/realisations/realisation-card.tsx`, `components/site/sections/portfolio.tsx` · Modify page, test

**Interfaces:** Produces `<RealisationCard realisation={Realisation} priority?={false} avecDescription?={false} />` (rendue dans un `<article>` ; `avecDescription` affiche `realisation.description` sous le titre — utilisé tâche 26), `<Portfolio realisations={Realisation[]} />`.

- Fond `bg-light`, `SectionHeading tone="light"` : « Réalisations » / « Des résultats qui parlent d'eux-mêmes » / « Découvrez une sélection de projets livrés pour des marques gabonaises et panafricaines. »
- Grille `grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`. Carte : image `aspect-[4/3]` `next/image` `fill` `sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"`, **zoom au survol** (`group-hover:scale-105 transition-transform duration-500` dans un conteneur `overflow-hidden`), badge résultat or en bas à gauche, catégorie magenta, titre `h3`.
- Bouton « Voir tous nos projets » → `/realisations`.
- Liste vide → ne pas rendre la section.

**Test e2e :**
```ts
test("réalisations : 6 projets, aucun client inventé", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Des résultats qui parlent d'eux-mêmes" });
  await expect(section.getByRole("heading", { level: 3 })).toHaveCount(6);
  for (const faux of ["Moov Africa", "TotalEnergies", "Total Energies", "BGFI", "SEEG", "Savane Mode", "Gabon Oil"]) {
    await expect(section).not.toContainText(faux);
  }
  await expect(section.getByRole("link", { name: "Voir tous nos projets" })).toHaveAttribute("href", "/realisations");
});
```

---

### Task 18: [Claude] Garantie

**Maquette :** `design/banani/components/ElyonGarantie.jsx` · **Files:** Create `components/site/sections/garantie.tsx` · Modify page, test

- Textes exacts de la maquette (« Notre engagement », « Garantie », « Satisfaction garantie », « Délai garanti », « Vous ne validez que si vous êtes fier de votre image. », …).
- **Ligne qui se dessine** : ≥ `md` ligne **verticale** entre les 2 colonnes, `scaleY` 0 → 1 (`origin-top`, Motion `whileInView`, 0,8 s) ; < `md` blocs empilés et ligne **horizontale** `scaleX` 0 → 1 (`origin-left`).
- `<section aria-labelledby="garantie-titre">`.

**Test e2e :**
```ts
test("garantie", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Satisfaction garantie")).toBeVisible();
  await expect(page.getByText("Délai garanti")).toBeVisible();
});
```

---

### Task 19: [Claude] FAQ (questions lues dans Supabase)

**Maquette :** `design/banani/components/ElyonFAQ.jsx` · **Files:** Create `components/site/sections/faq.tsx` · Modify page, test

- Composant shadcn `Accordion type="single" collapsible defaultValue={première question}`. Style de la maquette : fond `bg-light`, items `rounded-lg border bg-background p-6`, item ouvert `border-accent-magenta`, pastille ronde `+`/`−` (icônes `Plus`/`Minus`, ouverte = `bg-accent-magenta text-white`). Animation d'ouverture : celle de shadcn (`data-[state=open]:animate-accordion-down`) — elle anime la hauteur ; acceptable car le contenu en dessous se déplace suite à une action de l'utilisateur (pas de CLS).
- Questions en `h3` dans le déclencheur (`AccordionTrigger` contient un `<h3>` ou utiliser l'option `asChild` selon la version shadcn) — vérifier qu'axe ne signale rien.
- Données structurées SEO : ajouter un `<script type="application/ld+json">` `FAQPage` généré à partir de `faq`.
- Liste vide → ne pas rendre la section.

**Test e2e :**
```ts
test("FAQ : accordéon", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Questions fréquentes" });
  const q2 = section.getByRole("button", { name: "J'ai déjà un logo." });
  await q2.click();
  await expect(section.getByText("Parfait. On le relooke")).toBeVisible();
  await expect(q2).toHaveAttribute("aria-expanded", "true");
});
```

---

### Task 20: [Claude] CTA final (audit gratuit)

**Maquette :** `design/banani/components/ElyonCTAFinal.jsx` · **Files:** Create `components/site/sections/cta-final.tsx` · Modify page, test

- Textes de la maquette **corrigés** : réassurance « Sans engagement · Réponse sous 24h ouvrables » (au lieu de 48h) ; paragraphe « … En 48h, on vous montre … » → **demander à Steph s'il garde « En 48h » pour la livraison de l'audit** (ce n'est pas le délai de réponse) ; en attendant écrire « Rapidement, on vous montre ce qui vous fait perdre des clients — et comment le corriger. »
- Boutons : « Recevoir mon audit gratuit » → `/audit-gratuit` (or) ; « Découvrir L'Envol 360° » → `/#formules` (contour magenta). Mobile : empilés pleine largeur.
- **Fond en dégradé qui bouge lentement** : calque `absolute inset-0` portant le dégradé `bg-gradient-cta` + un second calque radial magenta qui se translate lentement (`transform: translate`, 20 s, `ease-in-out`, aller-retour infini, coupé en mouvement réduit). Section `relative overflow-hidden`.

**Test e2e :**
```ts
test("CTA final : délai harmonisé", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("region", { name: "Prêt à faire décoller votre marque ?" });
  await expect(cta).toContainText("Réponse sous 24h ouvrables");
  await expect(cta).not.toContainText("Réponse sous 48h");
  await expect(cta.getByRole("link", { name: "Recevoir mon audit gratuit" })).toHaveAttribute("href", "/audit-gratuit");
});
```

---

### Task 21: [Claude] Finitions de la landing : SEO, performance mobile ≥ 90

**Files:** Create `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.jpg` (copie de `public/images/hero/slide-1.jpg` redimensionnée 1200×630 avec sharp) · Modify `app/(site)/page.tsx` (métadonnées), `tests/e2e/accueil.spec.ts`

- [ ] **Step 1:** `app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/audit-gratuit", "/realisations", "/mentions-legales"];
  return pages.map((p) => ({ url: `${siteConfig.url}${p}`, lastModified: new Date(), changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
```
`app/robots.ts`
```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/connexion", "/api/"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 2:** Données structurées `ProfessionalService` (nom, ville Libreville, pays GA, e-mail, url) dans `app/(site)/page.tsx` via `<script type="application/ld+json">`.

- [ ] **Step 3: Mesure Lighthouse mobile**

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,seo --output=json --output-path=./test-results/lighthouse-accueil.json --chrome-flags="--headless=new" --quiet
node -e "const r=require('./test-results/lighthouse-accueil.json');for(const[k,v]of Object.entries(r.categories))console.log(k,Math.round(v.score*100));console.log('LCP',r.audits['largest-contentful-paint'].displayValue,'CLS',r.audits['cumulative-layout-shift'].displayValue)"
```
Expected : performance ≥ 90, CLS < 0,1. Sinon : utiliser le skill `chrome-devtools-mcp:debug-optimize-lcp` (trace + analyse LCP), corriger (image du Hero en priorité, JS GSAP chargé trop tôt, polices…), remesurer. Arrêter le serveur ensuite.

- [ ] **Step 4:** Suite complète `npm run build && npm run lint && npm run test && npx playwright test` → PASS. Regarder **toutes** les captures de l'accueil (7 largeurs + iPhone + mouvement réduit).

- [ ] **Step 5:** Commit `feat: SEO et performance de la landing` — inscrire le score Lighthouse dans `TACHES.md`.

---

## Lot 5 — Formulaire « Audit gratuit »

### Task 22: [Claude] Règles du formulaire (Zod) — TDD

**Files:** Create `lib/audit/schema.ts`, `tests/unit/audit-schema.test.ts`

**Interfaces:**
- Produces :
  - `SECTEURS` (tuple de libellés), `BUDGETS` / `BESOINS` (`{ value, label }[]`), `libelleBudget(v)`, `libelleBesoin(v)`
  - `FICHIERS_MAX = 5`, `FICHIER_TAILLE_MAX = 10 * 1024 * 1024`, `TYPES_FICHIERS`, `LIENS_MAX = 3`
  - `auditFormSchema` / `AuditFormValues` (navigateur + serveur)
  - `fichierMetaSchema`, `uploadRequestSchema` / `UploadRequest`
  - `auditSubmissionSchema` / `AuditSubmission` (= formulaire + `uploadId: string | null` + `fichiers: string[]`)
  - `cheminFichier(uploadId: string, index: number, nom: string): string`

- [ ] **Step 1: Tests qui échouent** — `tests/unit/audit-schema.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  auditFormSchema, auditSubmissionSchema, cheminFichier, uploadRequestSchema, FICHIER_TAILLE_MAX,
} from "@/lib/audit/schema";

const valide = {
  nom: "Awa Ndong",
  email: "awa@exemple.ga",
  entreprise: "Boutique Awa",
  secteur: "Commerce & Distribution",
  telephone: "+241 77 12 34 56",
  budget: "500k-2m",
  besoins: ["identite"],
  message: "",
  liens: [],
  consentConfidentialite: true,
  consentMarketing: false,
  website: "",
};

const erreurs = (r: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }) =>
  Object.fromEntries((r.error?.issues ?? []).map((i) => [i.path.join("."), i.message]));

describe("auditFormSchema", () => {
  it("accepte une demande complète", () => {
    expect(auditFormSchema.safeParse(valide).success).toBe(true);
  });
  it("exige la politique de confidentialité", () => {
    const r = auditFormSchema.safeParse({ ...valide, consentConfidentialite: false });
    expect(erreurs(r).consentConfidentialite).toBe("Vous devez accepter la politique de confidentialité.");
  });
  it("le consentement marketing reste facultatif", () => {
    expect(auditFormSchema.safeParse({ ...valide, consentMarketing: true }).success).toBe(true);
  });
  it("refuse un e-mail invalide", () => {
    expect(erreurs(auditFormSchema.safeParse({ ...valide, email: "awa@" })).email).toBe("Adresse e-mail invalide.");
  });
  it("refuse un téléphone trop court ou avec des lettres", () => {
    expect(erreurs(auditFormSchema.safeParse({ ...valide, telephone: "1234" })).telephone).toBe("Numéro de téléphone invalide.");
    expect(erreurs(auditFormSchema.safeParse({ ...valide, telephone: "07 AB 12 34" })).telephone).toBe("Numéro de téléphone invalide.");
  });
  it("accepte les formats gabonais courants", () => {
    for (const telephone of ["077123456", "+24177123456", "00241 77 12 34 56", "06-12-34-56-78"]) {
      expect(auditFormSchema.safeParse({ ...valide, telephone }).success, telephone).toBe(true);
    }
  });
  it("exige au moins un besoin", () => {
    expect(erreurs(auditFormSchema.safeParse({ ...valide, besoins: [] })).besoins).toBe("Cochez au moins un besoin.");
  });
  it("refuse un secteur inconnu", () => {
    expect(auditFormSchema.safeParse({ ...valide, secteur: "Pirate" }).success).toBe(false);
  });
  it("limite les liens à 3 et exige des URL", () => {
    expect(auditFormSchema.safeParse({ ...valide, liens: ["https://a.ga", "https://b.ga", "https://c.ga", "https://d.ga"] }).success).toBe(false);
    expect(erreurs(auditFormSchema.safeParse({ ...valide, liens: ["pas un lien"] }))["liens.0"]).toBe("Lien invalide (il doit commencer par https://).");
  });
  it("limite le message à 2 000 caractères", () => {
    expect(auditFormSchema.safeParse({ ...valide, message: "a".repeat(2001) }).success).toBe(false);
  });
});

describe("uploadRequestSchema", () => {
  const fichier = { nom: "logo.png", taille: 1000, type: "image/png" };
  it("accepte jusqu'à 5 fichiers valides", () => {
    expect(uploadRequestSchema.safeParse({ fichiers: Array(5).fill(fichier) }).success).toBe(true);
  });
  it("refuse 6 fichiers", () => {
    expect(uploadRequestSchema.safeParse({ fichiers: Array(6).fill(fichier) }).success).toBe(false);
  });
  it("refuse un fichier de plus de 10 Mo", () => {
    expect(uploadRequestSchema.safeParse({ fichiers: [{ ...fichier, taille: FICHIER_TAILLE_MAX + 1 }] }).success).toBe(false);
  });
  it("refuse un type non autorisé", () => {
    expect(uploadRequestSchema.safeParse({ fichiers: [{ ...fichier, type: "application/zip" }] }).success).toBe(false);
  });
});

describe("auditSubmissionSchema", () => {
  const uploadId = "3f1c2b9e-8a4d-4c7b-9f0e-1a2b3c4d5e6f";
  it("accepte des fichiers rangés dans le dossier de l'envoi", () => {
    expect(auditSubmissionSchema.safeParse({ ...valide, uploadId, fichiers: [`${uploadId}/1-logo.png`] }).success).toBe(true);
  });
  it("accepte une demande sans fichier", () => {
    expect(auditSubmissionSchema.safeParse({ ...valide, uploadId: null, fichiers: [] }).success).toBe(true);
  });
  it("refuse un chemin hors du dossier de l'envoi", () => {
    expect(auditSubmissionSchema.safeParse({ ...valide, uploadId, fichiers: ["autre/1-logo.png"] }).success).toBe(false);
    expect(auditSubmissionSchema.safeParse({ ...valide, uploadId, fichiers: [`${uploadId}/../x.png`] }).success).toBe(false);
  });
  it("refuse des fichiers sans uploadId", () => {
    expect(auditSubmissionSchema.safeParse({ ...valide, uploadId: null, fichiers: ["x/1.png"] }).success).toBe(false);
  });
});

describe("cheminFichier", () => {
  it("nettoie le nom (accents, espaces, majuscules)", () => {
    expect(cheminFichier("abc", 0, "Mon Logo Été.PNG")).toBe("abc/1-mon-logo-ete.png");
  });
  it("gère les noms sans extension ou vides", () => {
    expect(cheminFichier("abc", 2, "document")).toBe("abc/3-document");
    expect(cheminFichier("abc", 0, "###.pdf")).toBe("abc/1-fichier.pdf");
  });
});
```
Run: `npm run test` → FAIL.

- [ ] **Step 2: Implémenter** — `lib/audit/schema.ts`

```ts
import { z } from "zod";

/** Liste provisoire — à valider par Steph (tâche 30). */
export const SECTEURS = [
  "Banque & Finance",
  "Télécoms & Technologies",
  "Énergie, Mines & Industrie",
  "Commerce & Distribution",
  "Mode, Beauté & Bien-être",
  "Restauration & Hôtellerie",
  "Santé",
  "Éducation & Formation",
  "BTP & Immobilier",
  "Institution publique",
  "ONG & Association",
  "Autre",
] as const;

export const BUDGETS = [
  { value: "moins-500k", label: "Moins de 500 000 FCFA" },
  { value: "500k-2m", label: "500 000 – 2 000 000 FCFA" },
  { value: "plus-2m", label: "Plus de 2 000 000 FCFA" },
] as const;

export const BESOINS = [
  { value: "identite", label: "Refondre mon identité visuelle" },
  { value: "visibilite", label: "Augmenter ma visibilité en ligne (SEO/réseaux)" },
  { value: "ecommerce", label: "Créer un site e-commerce" },
  { value: "video", label: "Produire des vidéos / contenu" },
  { value: "audit-marketing", label: "Auditer ma stratégie marketing" },
  { value: "evenement", label: "Organiser un événement / activation" },
] as const;

export const FICHIERS_MAX = 5;
export const FICHIER_TAILLE_MAX = 10 * 1024 * 1024;
export const TYPES_FICHIERS = ["image/png", "image/jpeg", "image/webp", "application/pdf"] as const;
export const LIENS_MAX = 3;

const BUDGET_VALUES = BUDGETS.map((b) => b.value) as [string, ...string[]];
const BESOIN_VALUES = BESOINS.map((b) => b.value) as [string, ...string[]];

export const libelleBudget = (v: string) => BUDGETS.find((b) => b.value === v)?.label ?? v;
export const libelleBesoin = (v: string) => BESOINS.find((b) => b.value === v)?.label ?? v;

function telephoneValide(v: string): boolean {
  if (!/^\+?[\d\s().-]+$/.test(v)) return false;
  const chiffres = v.replace(/\D/g, "").length;
  return chiffres >= 8 && chiffres <= 15;
}

export const auditFormSchema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(100, "100 caractères maximum."),
  email: z.string().trim().email("Adresse e-mail invalide.").max(200),
  entreprise: z.string().trim().min(2, "Indiquez le nom de votre entreprise.").max(120, "120 caractères maximum."),
  secteur: z.enum(SECTEURS, { message: "Choisissez un secteur." }),
  telephone: z.string().trim().refine(telephoneValide, "Numéro de téléphone invalide."),
  budget: z.enum(BUDGET_VALUES, { message: "Choisissez une tranche de budget." }),
  besoins: z.array(z.enum(BESOIN_VALUES)).min(1, "Cochez au moins un besoin."),
  message: z.string().trim().max(2000, "2 000 caractères maximum."),
  liens: z
    .array(z.string().trim().url("Lien invalide (il doit commencer par https://)."))
    .max(LIENS_MAX, `${LIENS_MAX} liens maximum.`),
  consentConfidentialite: z.literal(true, { message: "Vous devez accepter la politique de confidentialité." }),
  consentMarketing: z.boolean(),
  /** Piège à robots : champ invisible qui doit rester vide. */
  website: z.string().max(200).optional(),
});
export type AuditFormValues = z.infer<typeof auditFormSchema>;

export const fichierMetaSchema = z.object({
  nom: z.string().min(1).max(200),
  taille: z.number().int().positive().max(FICHIER_TAILLE_MAX, "10 Mo maximum par fichier."),
  type: z.enum(TYPES_FICHIERS, { message: "Formats acceptés : PNG, JPG, WebP ou PDF." }),
});
export const uploadRequestSchema = z.object({
  fichiers: z.array(fichierMetaSchema).min(1).max(FICHIERS_MAX, `${FICHIERS_MAX} fichiers maximum.`),
});
export type UploadRequest = z.infer<typeof uploadRequestSchema>;

export const auditSubmissionSchema = auditFormSchema
  .extend({
    uploadId: z.string().uuid().nullable(),
    fichiers: z.array(z.string().max(300)).max(FICHIERS_MAX),
  })
  .superRefine((v, ctx) => {
    const invalide = v.fichiers.some(
      (p) => !v.uploadId || !p.startsWith(`${v.uploadId}/`) || p.includes(".."),
    );
    if (invalide) ctx.addIssue({ code: "custom", path: ["fichiers"], message: "Fichiers invalides." });
  });
export type AuditSubmission = z.infer<typeof auditSubmissionSchema>;

export function cheminFichier(uploadId: string, index: number, nom: string): string {
  const match = nom.match(/\.([A-Za-z0-9]{1,8})$/);
  const ext = match ? `.${match[1].toLowerCase()}` : "";
  const base =
    nom
      .replace(/\.[^.]+$/, "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "fichier";
  return `${uploadId}/${index + 1}-${base}${ext}`;
}
```
Si la version de Zod installée (v4) signale `z.string().email()` / `.url()` / `.uuid()` comme dépréciés, les remplacer par `z.email()`, `z.url()`, `z.uuid()` avec le même message (`{ message: "…" }`) — le comportement attendu par les tests ne change pas.

- [ ] **Step 3:** `npm run test` → PASS. Commit `feat: règles de validation du formulaire d'audit`.

---

### Task 23: [Claude] Traitement d'une demande (anti-spam, enregistrement, e-mails) — TDD

**Files:** Create `lib/audit/ip.ts`, `lib/audit/submit.ts`, `tests/unit/audit-ip.test.ts`, `tests/unit/audit-submit.test.ts`

**Interfaces:**
- Consumes : `AuditSubmission`
- Produces :
  - `hashIp(ip: string, sel: string): string` (SHA-256 hex) ; `ipDepuisEnTetes(headers: Headers): string`
  - `LIMITE_DEMANDES_PAR_HEURE = 5`
  - `type NouvelleDemande`, `type DemandeEmail = NouvelleDemande & { id: string; liensTelechargement: string[] }`
  - `type AuditDeps = { maintenant(): Date; compterDemandesRecentes(ipHash: string, depuis: Date): Promise<number>; enregistrer(d: NouvelleDemande): Promise<{ id: string }>; liensFichiers(chemins: string[]): Promise<string[]>; envoyerNotification(d: DemandeEmail): Promise<void>; envoyerConfirmation(d: DemandeEmail): Promise<void>; noterEnvois(id: string, s: { notification: boolean; confirmation: boolean }): Promise<void> }`
  - `type ResultatAudit = { ok: true; id: string } | { ok: false; code: "trop_de_demandes" | "enregistrement_impossible" }`
  - `soumettreAudit(data: AuditSubmission, ipHash: string, deps: AuditDeps): Promise<ResultatAudit>`

- [ ] **Step 1: Tests qui échouent**

`tests/unit/audit-ip.test.ts`
```ts
import { describe, expect, it } from "vitest";
import { hashIp, ipDepuisEnTetes } from "@/lib/audit/ip";

describe("hashIp", () => {
  it("est stable et ne contient pas l'IP", () => {
    const h = hashIp("41.158.1.2", "sel");
    expect(h).toBe(hashIp("41.158.1.2", "sel"));
    expect(h).toMatch(/^[a-f0-9]{64}$/);
    expect(h).not.toContain("41.158");
  });
  it("change avec le sel", () => {
    expect(hashIp("1.1.1.1", "a")).not.toBe(hashIp("1.1.1.1", "b"));
  });
});

describe("ipDepuisEnTetes", () => {
  it("prend la première IP de x-forwarded-for", () => {
    expect(ipDepuisEnTetes(new Headers({ "x-forwarded-for": "41.158.1.2, 10.0.0.1" }))).toBe("41.158.1.2");
  });
  it("se replie sur x-real-ip puis « inconnue »", () => {
    expect(ipDepuisEnTetes(new Headers({ "x-real-ip": "5.6.7.8" }))).toBe("5.6.7.8");
    expect(ipDepuisEnTetes(new Headers())).toBe("inconnue");
  });
});
```

`tests/unit/audit-submit.test.ts`
```ts
import { describe, expect, it, vi } from "vitest";
import { LIMITE_DEMANDES_PAR_HEURE, soumettreAudit, type AuditDeps } from "@/lib/audit/submit";
import type { AuditSubmission } from "@/lib/audit/schema";

const data: AuditSubmission = {
  nom: "Awa", email: "awa@exemple.ga", entreprise: "Boutique Awa", secteur: "Commerce & Distribution",
  telephone: "077123456", budget: "500k-2m", besoins: ["identite"], message: "", liens: [],
  consentConfidentialite: true, consentMarketing: true, website: "", uploadId: null, fichiers: [],
};

function deps(over: Partial<AuditDeps> = {}): AuditDeps {
  return {
    maintenant: () => new Date("2026-11-21T10:00:00Z"),
    compterDemandesRecentes: vi.fn().mockResolvedValue(0),
    enregistrer: vi.fn().mockResolvedValue({ id: "d1" }),
    liensFichiers: vi.fn().mockResolvedValue([]),
    envoyerNotification: vi.fn().mockResolvedValue(undefined),
    envoyerConfirmation: vi.fn().mockResolvedValue(undefined),
    noterEnvois: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

describe("soumettreAudit", () => {
  it("enregistre, envoie les 2 e-mails et note le succès", async () => {
    const d = deps();
    expect(await soumettreAudit(data, "h", d)).toEqual({ ok: true, id: "d1" });
    expect(d.enregistrer).toHaveBeenCalledWith(expect.objectContaining({ email: "awa@exemple.ga", ipHash: "h", message: null }));
    expect(d.envoyerNotification).toHaveBeenCalledOnce();
    expect(d.envoyerConfirmation).toHaveBeenCalledOnce();
    expect(d.noterEnvois).toHaveBeenCalledWith("d1", { notification: true, confirmation: true });
  });

  it("compte les demandes de la dernière heure", async () => {
    const d = deps();
    await soumettreAudit(data, "h", d);
    expect(d.compterDemandesRecentes).toHaveBeenCalledWith("h", new Date("2026-11-21T09:00:00Z"));
  });

  it("bloque au-delà de la limite horaire sans rien enregistrer", async () => {
    const d = deps({ compterDemandesRecentes: vi.fn().mockResolvedValue(LIMITE_DEMANDES_PAR_HEURE) });
    expect(await soumettreAudit(data, "h", d)).toEqual({ ok: false, code: "trop_de_demandes" });
    expect(d.enregistrer).not.toHaveBeenCalled();
  });

  it("signale l'échec d'enregistrement sans envoyer d'e-mail", async () => {
    const d = deps({ enregistrer: vi.fn().mockRejectedValue(new Error("db down")) });
    expect(await soumettreAudit(data, "h", d)).toEqual({ ok: false, code: "enregistrement_impossible" });
    expect(d.envoyerNotification).not.toHaveBeenCalled();
  });

  it("signale l'échec si le comptage anti-spam est impossible", async () => {
    const d = deps({ compterDemandesRecentes: vi.fn().mockRejectedValue(new Error("db down")) });
    expect(await soumettreAudit(data, "h", d)).toEqual({ ok: false, code: "enregistrement_impossible" });
  });

  it("reste un succès si un e-mail échoue, et le note", async () => {
    const d = deps({ envoyerConfirmation: vi.fn().mockRejectedValue(new Error("resend")) });
    expect(await soumettreAudit(data, "h", d)).toEqual({ ok: true, id: "d1" });
    expect(d.noterEnvois).toHaveBeenCalledWith("d1", { notification: true, confirmation: false });
  });

  it("joint les liens de téléchargement des fichiers à la notification", async () => {
    const d = deps({ liensFichiers: vi.fn().mockResolvedValue(["https://signe/1"]) });
    const avecFichiers = { ...data, uploadId: "u", fichiers: ["u/1-logo.png"] };
    await soumettreAudit(avecFichiers, "h", d);
    expect(d.liensFichiers).toHaveBeenCalledWith(["u/1-logo.png"]);
    expect(d.envoyerNotification).toHaveBeenCalledWith(expect.objectContaining({ liensTelechargement: ["https://signe/1"] }));
  });

  it("envoie quand même la notification si les liens signés échouent", async () => {
    const d = deps({ liensFichiers: vi.fn().mockRejectedValue(new Error("storage")) });
    const avecFichiers = { ...data, uploadId: "u", fichiers: ["u/1-logo.png"] };
    expect(await soumettreAudit(avecFichiers, "h", d)).toEqual({ ok: true, id: "d1" });
    expect(d.envoyerNotification).toHaveBeenCalledWith(expect.objectContaining({ liensTelechargement: [] }));
  });
});
```
Run → FAIL.

- [ ] **Step 2: Implémenter**

`lib/audit/ip.ts`
```ts
import { createHash } from "node:crypto";

/** IP anonymisée (on ne stocke jamais l'adresse en clair). */
export function hashIp(ip: string, sel: string): string {
  return createHash("sha256").update(`${sel}:${ip}`).digest("hex");
}

export function ipDepuisEnTetes(headers: Headers): string {
  const premiere = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return premiere || headers.get("x-real-ip")?.trim() || "inconnue";
}
```

`lib/audit/submit.ts`
```ts
import type { AuditSubmission } from "./schema";

export const LIMITE_DEMANDES_PAR_HEURE = 5;

export type NouvelleDemande = {
  nom: string;
  email: string;
  entreprise: string;
  secteur: string;
  telephone: string;
  budget: string;
  besoins: string[];
  message: string | null;
  liens: string[];
  fichiers: string[];
  consentConfidentialite: true;
  consentMarketing: boolean;
  ipHash: string;
};

export type DemandeEmail = NouvelleDemande & { id: string; liensTelechargement: string[] };

export type AuditDeps = {
  maintenant(): Date;
  compterDemandesRecentes(ipHash: string, depuis: Date): Promise<number>;
  enregistrer(d: NouvelleDemande): Promise<{ id: string }>;
  liensFichiers(chemins: string[]): Promise<string[]>;
  envoyerNotification(d: DemandeEmail): Promise<void>;
  envoyerConfirmation(d: DemandeEmail): Promise<void>;
  noterEnvois(id: string, s: { notification: boolean; confirmation: boolean }): Promise<void>;
};

export type ResultatAudit =
  | { ok: true; id: string }
  | { ok: false; code: "trop_de_demandes" | "enregistrement_impossible" };

export async function soumettreAudit(data: AuditSubmission, ipHash: string, deps: AuditDeps): Promise<ResultatAudit> {
  const depuis = new Date(deps.maintenant().getTime() - 60 * 60 * 1000);

  let recentes: number;
  try {
    recentes = await deps.compterDemandesRecentes(ipHash, depuis);
  } catch (e) {
    console.error("[audit] comptage impossible", e);
    return { ok: false, code: "enregistrement_impossible" };
  }
  if (recentes >= LIMITE_DEMANDES_PAR_HEURE) return { ok: false, code: "trop_de_demandes" };

  const demande: NouvelleDemande = {
    nom: data.nom,
    email: data.email,
    entreprise: data.entreprise,
    secteur: data.secteur,
    telephone: data.telephone,
    budget: data.budget,
    besoins: data.besoins,
    message: data.message.trim() === "" ? null : data.message,
    liens: data.liens,
    fichiers: data.fichiers,
    consentConfidentialite: true,
    consentMarketing: data.consentMarketing,
    ipHash,
  };

  let id: string;
  try {
    ({ id } = await deps.enregistrer(demande));
  } catch (e) {
    console.error("[audit] enregistrement impossible", e);
    return { ok: false, code: "enregistrement_impossible" };
  }

  const liensTelechargement =
    demande.fichiers.length > 0 ? await deps.liensFichiers(demande.fichiers).catch(() => [] as string[]) : [];
  const email: DemandeEmail = { ...demande, id, liensTelechargement };

  const [notification, confirmation] = await Promise.allSettled([
    deps.envoyerNotification(email),
    deps.envoyerConfirmation(email),
  ]);
  const statut = { notification: notification.status === "fulfilled", confirmation: confirmation.status === "fulfilled" };
  if (!statut.notification || !statut.confirmation) console.error("[audit] envoi d'e-mail en échec", id, statut);
  await deps.noterEnvois(id, statut).catch((e) => console.error("[audit] statut e-mails non noté", e));

  return { ok: true, id };
}
```

- [ ] **Step 3:** `npm run test` → PASS. Commit `feat: traitement d'une demande d'audit (anti-spam, enregistrement, e-mails)`.

---

### Task 24: [Claude] E-mails et routes serveur de l'audit

**Files:** Create `emails/notification-audit.tsx`, `emails/confirmation-audit.tsx`, `lib/audit/deps.ts`, `app/api/audit/route.ts`, `app/api/audit/upload-urls/route.ts`

**Interfaces:**
- Consumes : `soumettreAudit`, `AuditDeps`, `DemandeEmail`, `hashIp`, `ipDepuisEnTetes`, `auditSubmissionSchema`, `uploadRequestSchema`, `cheminFichier`, `createSupabaseAdminClient`, `siteConfig`, `buildWhatsAppLink`, `libelleBudget`, `libelleBesoin`
- Produces :
  - `POST /api/audit/upload-urls` — corps `{ fichiers: { nom, taille, type }[] }` → `200 { uploadId: string, uploads: { path: string, token: string }[] }` · `400 { erreur }` · `429 { erreur }`
  - `POST /api/audit` — corps `AuditSubmission` → `200 { ok: true, id }` · `400 { ok: false, erreur }` · `429 { ok: false, code: "trop_de_demandes" }` · `500 { ok: false, code: "enregistrement_impossible" }`
  - `NotificationAudit({ demande: DemandeEmail })`, `ConfirmationAudit({ nom: string; delai: string; whatsapp: string | null })`

- [ ] **Step 1: E-mails** (`@react-email/components` ; les e-mails ne supportent pas les variables CSS : couleurs en hex **autorisées ici uniquement**, reprises de la palette).

`emails/confirmation-audit.tsx`
```tsx
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

type Props = { nom: string; delai: string; whatsapp: string | null };

export function ConfirmationAudit({ nom, delai, whatsapp }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nous avons bien reçu votre demande d'audit gratuit.</Preview>
      <Body style={{ backgroundColor: "#FAF8F5", fontFamily: "'DM Sans', Arial, sans-serif", margin: 0, padding: "24px 0" }}>
        <Container style={{ backgroundColor: "#0E0E0E", borderRadius: 16, padding: 32, maxWidth: 560 }}>
          <Text style={{ color: "#F9B000", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Audit gratuit</Text>
          <Heading as="h1" style={{ color: "#f0f0f0", fontSize: 26, margin: "12px 0 16px" }}>Merci {nom} !</Heading>
          <Text style={{ color: "#c0c0c0", fontSize: 16, lineHeight: "24px" }}>
            Votre demande d'audit gratuit est bien reçue. L'équipe Elyon Créa l'étudie et vous répond {delai}.
          </Text>
          {whatsapp && (
            <Section style={{ margin: "24px 0" }}>
              <Button href={whatsapp} style={{ backgroundColor: "#F9B000", color: "#0d0d0d", borderRadius: 8, padding: "14px 24px", fontWeight: 700, fontSize: 15 }}>
                Continuer sur WhatsApp
              </Button>
            </Section>
          )}
          <Hr style={{ borderColor: "#222222", margin: "24px 0" }} />
          <Text style={{ color: "#9a9a9a", fontSize: 13, lineHeight: "20px", margin: 0 }}>
            Elyon Créa · Agence de communication 360° · Libreville, Gabon · contact@elyoncrea.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

`emails/notification-audit.tsx`
```tsx
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import type { DemandeEmail } from "@/lib/audit/submit";
import { libelleBesoin, libelleBudget } from "@/lib/audit/schema";

const ligne = (label: string, valeur: string) => (
  <Text style={{ margin: "0 0 8px", fontSize: 15, color: "#0E0E0E" }}>
    <strong>{label} :</strong> {valeur}
  </Text>
);

export function NotificationAudit({ demande: d }: { demande: DemandeEmail }) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouvelle demande d'audit — {d.entreprise}</Preview>
      <Body style={{ backgroundColor: "#FAF8F5", fontFamily: "Arial, sans-serif", padding: "24px 0" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: 28, maxWidth: 600, border: "1px solid #F2EFE9" }}>
          <Heading as="h1" style={{ fontSize: 22, color: "#C2147A", margin: "0 0 16px" }}>Nouvelle demande d'audit gratuit</Heading>
          {ligne("Nom", d.nom)}
          {ligne("Entreprise", d.entreprise)}
          {ligne("E-mail", d.email)}
          {ligne("Téléphone", d.telephone)}
          {ligne("Secteur", d.secteur)}
          {ligne("Budget annuel", libelleBudget(d.budget))}
          {ligne("Besoins", d.besoins.map(libelleBesoin).join(" · "))}
          {ligne("Accepte les conseils par e-mail", d.consentMarketing ? "Oui" : "Non")}
          {d.message && (
            <Section style={{ margin: "16px 0" }}>
              <Text style={{ margin: "0 0 4px", fontWeight: 700 }}>Message</Text>
              <Text style={{ margin: 0, whiteSpace: "pre-wrap" }}>{d.message}</Text>
            </Section>
          )}
          {d.liens.length > 0 && (
            <Section>
              <Text style={{ margin: "0 0 4px", fontWeight: 700 }}>Liens</Text>
              {d.liens.map((l) => (<Text key={l} style={{ margin: "0 0 4px" }}><Link href={l}>{l}</Link></Text>))}
            </Section>
          )}
          {d.fichiers.length > 0 && (
            <Section>
              <Text style={{ margin: "12px 0 4px", fontWeight: 700 }}>Fichiers joints ({d.fichiers.length}) — liens valables 7 jours</Text>
              {d.liensTelechargement.length > 0
                ? d.liensTelechargement.map((l, i) => (<Text key={l} style={{ margin: "0 0 4px" }}><Link href={l}>Télécharger le fichier {i + 1}</Link></Text>))
                : <Text>Liens indisponibles : fichiers consultables dans Supabase (Storage → audit-fichiers).</Text>}
            </Section>
          )}
          <Hr style={{ borderColor: "#F2EFE9", margin: "20px 0" }} />
          <Text style={{ fontSize: 12, color: "#6E6E6E", margin: 0 }}>Référence : {d.id}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 2: Dépendances réelles** — `lib/audit/deps.ts`

```ts
import "server-only";
import { Resend } from "resend";
import { ConfirmationAudit } from "@/emails/confirmation-audit";
import { NotificationAudit } from "@/emails/notification-audit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { AuditDeps } from "./submit";

const SEPT_JOURS = 60 * 60 * 24 * 7;

export function creerDepsAudit(): AuditDeps {
  const supabase = createSupabaseAdminClient();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM ?? `Elyon Créa <${siteConfig.email}>`;
  const equipe = process.env.AUDIT_NOTIFICATION_TO ?? siteConfig.email;

  return {
    maintenant: () => new Date(),

    async compterDemandesRecentes(ipHash, depuis) {
      const { count, error } = await supabase
        .from("demandes_audit")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", depuis.toISOString());
      if (error) throw new Error(error.message);
      return count ?? 0;
    },

    async enregistrer(d) {
      const { data, error } = await supabase
        .from("demandes_audit")
        .insert({
          nom: d.nom, email: d.email, entreprise: d.entreprise, secteur: d.secteur, telephone: d.telephone,
          budget: d.budget, besoins: d.besoins, message: d.message, liens: d.liens, fichiers: d.fichiers,
          consent_confidentialite: d.consentConfidentialite, consent_marketing: d.consentMarketing, ip_hash: d.ipHash,
        })
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

    async liensFichiers(chemins) {
      const { data, error } = await supabase.storage.from("audit-fichiers").createSignedUrls(chemins, SEPT_JOURS);
      if (error) throw new Error(error.message);
      return data.flatMap((f) => (f.signedUrl ? [f.signedUrl] : []));
    },

    async envoyerNotification(d) {
      const { error } = await resend.emails.send({
        from, to: equipe, replyTo: d.email,
        subject: `Nouvelle demande d'audit — ${d.entreprise}`,
        react: NotificationAudit({ demande: d }),
      });
      if (error) throw new Error(error.message);
    },

    async envoyerConfirmation(d) {
      const whatsapp = buildWhatsAppLink(
        siteConfig.whatsappNumero,
        `Bonjour Elyon Créa, je viens de demander un audit gratuit pour ${d.entreprise}.`,
      );
      const { error } = await resend.emails.send({
        from, to: d.email, replyTo: equipe,
        subject: "Votre demande d'audit gratuit — Elyon Créa",
        react: ConfirmationAudit({ nom: d.nom, delai: siteConfig.delaiReponse, whatsapp }),
      });
      if (error) throw new Error(error.message);
    },

    async noterEnvois(id, s) {
      const { error } = await supabase
        .from("demandes_audit")
        .update({ email_notification_ok: s.notification, email_confirmation_ok: s.confirmation })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
  };
}
```

- [ ] **Step 3: Routes**

`app/api/audit/upload-urls/route.ts`
```ts
import { NextResponse } from "next/server";
import { cheminFichier, uploadRequestSchema } from "@/lib/audit/schema";
import { hashIp, ipDepuisEnTetes } from "@/lib/audit/ip";
import { LIMITE_DEMANDES_PAR_HEURE } from "@/lib/audit/submit";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const parsed = uploadRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ erreur: parsed.error.issues[0]?.message ?? "Fichiers invalides." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const ipHash = hashIp(ipDepuisEnTetes(request.headers), process.env.IP_HASH_SALT ?? "");
  const { count } = await supabase
    .from("demandes_audit")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", new Date(Date.now() - 3_600_000).toISOString());
  if ((count ?? 0) >= LIMITE_DEMANDES_PAR_HEURE) {
    return NextResponse.json({ erreur: "Trop de demandes. Réessayez dans une heure ou écrivez-nous sur WhatsApp." }, { status: 429 });
  }

  const uploadId = crypto.randomUUID();
  const uploads: { path: string; token: string }[] = [];
  for (const [i, f] of parsed.data.fichiers.entries()) {
    const path = cheminFichier(uploadId, i, f.nom);
    const { data, error } = await supabase.storage.from("audit-fichiers").createSignedUploadUrl(path);
    if (error) {
      console.error("[audit] URL d'envoi impossible", error.message);
      return NextResponse.json({ erreur: "Envoi des fichiers impossible pour le moment." }, { status: 500 });
    }
    uploads.push({ path, token: data.token });
  }
  return NextResponse.json({ uploadId, uploads });
}
```

`app/api/audit/route.ts`
```ts
import { NextResponse } from "next/server";
import { auditSubmissionSchema } from "@/lib/audit/schema";
import { creerDepsAudit } from "@/lib/audit/deps";
import { hashIp, ipDepuisEnTetes } from "@/lib/audit/ip";
import { soumettreAudit } from "@/lib/audit/submit";

export async function POST(request: Request) {
  const parsed = auditSubmissionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, erreur: "Certaines informations sont invalides.", champs: parsed.error.issues.map((i) => ({ champ: i.path.join("."), message: i.message })) },
      { status: 400 },
    );
  }
  // Piège à robots rempli : on répond « succès » sans rien enregistrer.
  if (parsed.data.website) return NextResponse.json({ ok: true, id: "ok" });

  const ipHash = hashIp(ipDepuisEnTetes(request.headers), process.env.IP_HASH_SALT ?? "");
  const resultat = await soumettreAudit(parsed.data, ipHash, creerDepsAudit());
  if (resultat.ok) return NextResponse.json(resultat);
  return NextResponse.json(resultat, { status: resultat.code === "trop_de_demandes" ? 429 : 500 });
}
```

- [ ] **Step 4: Vérification réelle** (serveur de dev lancé, `.env.local` complet) :

```bash
curl -s -X POST http://localhost:3000/api/audit -H "content-type: application/json" -d '{"nom":"Test Claude","email":"contact@elyoncrea.com","entreprise":"Test","secteur":"Autre","telephone":"077123456","budget":"moins-500k","besoins":["identite"],"message":"Test technique — à supprimer","liens":[],"consentConfidentialite":true,"consentMarketing":false,"website":"","uploadId":null,"fichiers":[]}'
```
Expected : `{"ok":true,"id":"…"}` ; la ligne apparaît dans `demandes_audit` (`execute_sql` : `select nom, email_notification_ok, email_confirmation_ok from demandes_audit order by created_at desc limit 1;` → `true, true`) ; Steph reçoit les 2 e-mails sur contact@elyoncrea.com (mode test Resend). Supprimer ensuite la ligne de test (`delete from demandes_audit where nom = 'Test Claude';`). Mauvais corps → `400`.

- [ ] **Step 5:** `npm run build && npm run lint && npm run test` → OK. Commit `feat: routes serveur et e-mails de l'audit gratuit`.

---

### Task 25: [Claude] Page « Audit gratuit » (formulaire, fichiers, succès)

**Maquettes :** `design/banani/screens/ElyonAuditGratuit.jsx`, `design/banani/components/ElyonAuditForm.jsx`

**Files:** Create `app/(site)/audit-gratuit/page.tsx`, `components/site/audit/audit-form.tsx`, `components/site/audit/file-picker.tsx`, `components/site/audit/links-input.tsx`, `components/site/audit/audit-success.tsx`, `lib/audit/client.ts`, `tests/e2e/audit-gratuit.spec.ts`

**Interfaces:**
- Consumes : `auditFormSchema`, `AuditFormValues`, `SECTEURS`, `BUDGETS`, `BESOINS`, `FICHIERS_MAX`, `FICHIER_TAILLE_MAX`, `TYPES_FICHIERS`, `LIENS_MAX`, `createSupabaseBrowserClient`, `buildWhatsAppLink`, `siteConfig`
- Produces : `envoyerDemandeAudit(values: AuditFormValues, fichiers: File[]): Promise<{ ok: true } | { ok: false; message: string }>` dans `lib/audit/client.ts`

- [ ] **Step 1: `lib/audit/client.ts`** (orchestration navigateur)

```ts
"use client";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { AuditFormValues } from "./schema";

const MESSAGE_GENERIQUE = "L'envoi a échoué. Réessayez dans un instant ou écrivez-nous directement sur WhatsApp.";

export async function envoyerDemandeAudit(
  values: AuditFormValues,
  fichiers: File[],
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    let uploadId: string | null = null;
    let chemins: string[] = [];

    if (fichiers.length > 0) {
      const res = await fetch("/api/audit/upload-urls", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fichiers: fichiers.map((f) => ({ nom: f.name, taille: f.size, type: f.type })) }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, message: json.erreur ?? MESSAGE_GENERIQUE };

      const supabase = createSupabaseBrowserClient();
      const envois = await Promise.all(
        (json.uploads as { path: string; token: string }[]).map((u, i) =>
          supabase.storage.from("audit-fichiers").uploadToSignedUrl(u.path, u.token, fichiers[i], { contentType: fichiers[i].type }),
        ),
      );
      if (envois.some((e) => e.error)) return { ok: false, message: "Un fichier n'a pas pu être envoyé. Vérifiez sa taille (10 Mo max) et réessayez." };
      uploadId = json.uploadId;
      chemins = json.uploads.map((u: { path: string }) => u.path);
    }

    const res = await fetch("/api/audit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...values, uploadId, fichiers: chemins }),
    });
    if (res.status === 429) return { ok: false, message: "Vous avez déjà envoyé plusieurs demandes. Réessayez dans une heure ou écrivez-nous sur WhatsApp." };
    if (!res.ok) return { ok: false, message: MESSAGE_GENERIQUE };
    return { ok: true };
  } catch {
    return { ok: false, message: MESSAGE_GENERIQUE };
  }
}
```

- [ ] **Step 2: Tests e2e qui échouent** — `tests/e2e/audit-gratuit.spec.ts`

```ts
import { expect, test, type Page } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

async function remplir(page: Page) {
  await page.getByLabel("Votre nom").fill("Awa Ndong");
  await page.getByLabel("Adresse e-mail").fill("awa@exemple.ga");
  await page.getByLabel("Nom de l'entreprise").fill("Boutique Awa");
  await page.getByLabel("Secteur d'activité").selectOption("Commerce & Distribution");
  await page.getByLabel("Téléphone").fill("+241 77 12 34 56");
  await page.getByLabel("Budget annuel (XAF)").selectOption("500k-2m");
  await page.getByLabel("Refondre mon identité visuelle").check();
  await page.getByLabel(/J'accepte la politique de confidentialité/).check();
}

test.describe("Audit gratuit", () => {
  test("s'affiche sans erreur ni débordement", async ({ page }, testInfo) => {
    const { errors } = trackErrors(page);
    await page.goto("/audit-gratuit");
    await expect(page.getByRole("heading", { level: 1, name: "Prêt à décupler votre impact ?" })).toBeVisible();
    await checkPage(page, testInfo, "audit-gratuit", errors);
  });

  test("affiche les erreurs en français sous les champs", async ({ page }) => {
    await page.goto("/audit-gratuit");
    await page.getByRole("button", { name: "Recevoir mon audit gratuit" }).click();
    await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
    await expect(page.getByText("Adresse e-mail invalide.")).toBeVisible();
    await expect(page.getByText("Cochez au moins un besoin.")).toBeVisible();
    await expect(page.getByText("Vous devez accepter la politique de confidentialité.")).toBeVisible();
    await expect(page.getByLabel("Votre nom")).toHaveAttribute("aria-invalid", "true");
  });

  test("téléphone invalide", async ({ page }) => {
    await page.goto("/audit-gratuit");
    await page.getByLabel("Téléphone").fill("12");
    await page.getByLabel("Téléphone").blur();
    await expect(page.getByText("Numéro de téléphone invalide.")).toBeVisible();
  });

  test("envoi réussi avec un fichier joint → écran de succès + WhatsApp", async ({ page }) => {
    let corps: Record<string, unknown> | null = null;
    await page.route("**/api/audit/upload-urls", (r) =>
      r.fulfill({ json: { uploadId: "3f1c2b9e-8a4d-4c7b-9f0e-1a2b3c4d5e6f", uploads: [{ path: "3f1c2b9e-8a4d-4c7b-9f0e-1a2b3c4d5e6f/1-logo.png", token: "t" }] } }));
    await page.route("**/storage/v1/object/upload/sign/**", (r) => r.fulfill({ json: { Key: "audit-fichiers/x" } }));
    await page.route("**/api/audit", async (r) => { corps = r.request().postDataJSON(); await r.fulfill({ json: { ok: true, id: "d1" } }); });

    await page.goto("/audit-gratuit");
    await remplir(page);
    await page.locator('input[type="file"]').first().setInputFiles({ name: "logo.png", mimeType: "image/png", buffer: Buffer.from([137, 80, 78, 71]) });
    await expect(page.getByText("logo.png")).toBeVisible();
    await page.getByRole("button", { name: "Recevoir mon audit gratuit" }).click();

    await expect(page.getByRole("heading", { name: /Merci Awa Ndong/ })).toBeVisible();
    await expect(page.getByText("sous 24h ouvrables")).toBeVisible();
    await expect(page.getByRole("link", { name: "Continuer sur WhatsApp" })).toHaveAttribute("href", /wa\.me/);
    expect(corps).toMatchObject({ uploadId: "3f1c2b9e-8a4d-4c7b-9f0e-1a2b3c4d5e6f", fichiers: ["3f1c2b9e-8a4d-4c7b-9f0e-1a2b3c4d5e6f/1-logo.png"], consentMarketing: false });
  });

  test("refuse un fichier trop lourd sans l'envoyer", async ({ page }) => {
    await page.goto("/audit-gratuit");
    await page.locator('input[type="file"]').first().setInputFiles({ name: "gros.pdf", mimeType: "application/pdf", buffer: Buffer.alloc(10 * 1024 * 1024 + 1) });
    await expect(page.getByText("10 Mo maximum par fichier.")).toBeVisible();
    await expect(page.getByText("gros.pdf")).toHaveCount(0);
  });

  test("erreur serveur → message clair et WhatsApp de secours", async ({ page }) => {
    await page.route("**/api/audit", (r) => r.fulfill({ status: 500, json: { ok: false, code: "enregistrement_impossible" } }));
    await page.goto("/audit-gratuit");
    await remplir(page);
    await page.getByRole("button", { name: "Recevoir mon audit gratuit" }).click();
    await expect(page.getByRole("alert")).toContainText("L'envoi a échoué");
    await expect(page.getByRole("alert").getByRole("link", { name: "Écrire sur WhatsApp" })).toBeVisible();
  });

  test("le bouton WhatsApp flottant ne cache pas le bouton d'envoi", async ({ page }) => {
    await page.goto("/audit-gratuit");
    const envoyer = page.getByRole("button", { name: "Recevoir mon audit gratuit" });
    await envoyer.scrollIntoViewIfNeeded();
    const a = await envoyer.boundingBox();
    const b = await page.getByRole("link", { name: "Nous écrire sur WhatsApp" }).boundingBox();
    const chevauche = a && b && a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    expect(chevauche).toBeFalsy();
  });
});
```
Run → FAIL.

- [ ] **Step 3: Implémenter la page et le formulaire** selon ces règles :
  - `app/(site)/audit-gratuit/page.tsx` : Server Component, `export const metadata = { title: "Audit gratuit", description: "Demandez votre audit de communication gratuit : réponse sous 24h ouvrables." }`, section `bg-light py-12 md:py-20`, conteneur `max-w-2xl mx-auto px-4`, en-tête de la maquette (surtitre « Audit gratuit », `<h1>` « Prêt à décupler votre impact ? », texte), puis `<AuditForm />`, puis les 3 blocs de réassurance (`grid-cols-1 sm:grid-cols-3`, textes « Données sécurisées / Aucun spam, juste nos conseils. », « Réponse rapide / Sous 24h ouvrables. », « Audit gratuit / Aucune obligation d'achat. »), `pb-24 md:pb-20` pour le bouton WhatsApp.
  - `AuditForm` (`"use client"`) : `useForm<AuditFormValues>({ resolver: zodResolver(auditFormSchema), mode: "onTouched", defaultValues: { nom: "", email: "", entreprise: "", telephone: "", message: "", liens: [], besoins: [], consentMarketing: false, website: "" } })`. États : `formulaire` → `envoi` → `succes` | `erreur`.
  - Champs : `<label htmlFor>` visible (style de la maquette : `text-xs font-semibold uppercase tracking-widest`), icône Lucide à gauche (`aria-hidden`), **taille de texte des champs 16 px** (`text-base`, pas les 14 px de la maquette). Chaque erreur : `<p id="<champ>-erreur" className="mt-1 text-sm text-destructive">` + `aria-invalid` + `aria-describedby`. Grilles `grid-cols-1 md:grid-cols-2 gap-6`.
  - Secteur et budget : `<select>` **natifs** stylés (meilleure ergonomie mobile), première option vide « Sélectionner un secteur » / « Sélectionner une tranche ».
  - Besoins : 6 cases natives stylées (zone cliquable = toute la ligne, ≥ 44 px, icônes de la maquette `Palette`, `TrendingUp`, `ShoppingCart`, `Video`, `BarChart2`, `Megaphone`), dans un `<fieldset>` avec `<legend>` « Quel est votre besoin principal ? (cochez toutes les cases pertinentes) ».
  - `FilePicker` : zone glisser-déposer (`onDragOver`/`onDrop`) + `<input type="file" multiple accept="image/png,image/jpeg,image/webp,application/pdf" className="sr-only">` + boutons « Ajouter une image » (ouvre l'input avec `accept="image/*"`) et « Ajouter un document » (`accept="application/pdf"`). Contrôle **avant** ajout : type, taille ≤ 10 Mo (message « 10 Mo maximum par fichier. »), total ≤ 5 (« 5 fichiers maximum. »). Liste des fichiers choisis (nom `break-all`, taille en Ko/Mo, bouton « Retirer <nom> »).
  - `LinksInput` : bouton « Coller un lien web » qui ajoute un champ URL (max 3), chacun avec bouton « Retirer ce lien » ; branché sur `useFieldArray` n'est pas possible pour un tableau de chaînes → utiliser `setValue("liens", …)` + `watch("liens")`.
  - Consentements : **deux** cases séparées — « J'accepte la [politique de confidentialité](/mentions-legales#donnees-personnelles). » (obligatoire) et « Je souhaite recevoir les conseils d'Elyon Créa par e-mail. » (facultative).
  - Piège à robots : `<input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px]" {...register("website")} />` dans un `div` `aria-hidden`.
  - Bouton « Recevoir mon audit gratuit » (`bg-primary text-white w-full min-h-12`), `disabled` + texte « Envoi en cours… » pendant l'envoi, puis phrase « Nous vous répondrons sous 24h ouvrables. »
  - Erreur : `<div role="alert">` avec le message + lien « Écrire sur WhatsApp » (si numéro configuré).
  - Succès : remplacer le formulaire par `AuditSuccess` : `<h2 tabIndex={-1}>` « Merci {nom} ! » qui reçoit le focus, « Votre demande est bien reçue. Nous vous répondons sous 24h ouvrables. Un e-mail de confirmation vient de vous être envoyé. », bouton « Continuer sur WhatsApp » (`buildWhatsAppLink(siteConfig.whatsappNumero, "Bonjour Elyon Créa, je viens de demander un audit gratuit pour <entreprise>.")`, masqué si `null`), lien « Retour à l'accueil ».

- [ ] **Step 4:** `npx playwright test` → PASS (toutes pages). Regarder `audit-gratuit-chromium-{360,768,1440}.png` vs maquette.

- [ ] **Step 5: Test réel de bout en bout** (dev, une fois) : remplir le vrai formulaire avec un PNG et un PDF → ligne dans `demandes_audit`, 2 fichiers dans le bucket `audit-fichiers`, 2 e-mails reçus avec liens de téléchargement qui fonctionnent. Supprimer ensuite la ligne et les fichiers de test.

- [ ] **Step 6:** Commit `feat: page Audit gratuit avec fichiers joints et écran de succès`.

---

## Lot 6 — Autres pages et connexion

### Task 26: [Claude] Page Réalisations (filtre par catégorie)

**Maquettes :** `design/banani/screens/ElyonRealisations.jsx`, `design/banani/components/ElyonRealisationsPage.jsx`

**Files:** Create `app/(site)/realisations/page.tsx`, `components/site/realisations/realisations-grid.tsx`, `lib/content/categories.ts`, `tests/unit/categories.test.ts`, `tests/e2e/realisations.spec.ts`

**Interfaces:**
- Consumes : `getRealisations()`, `RealisationCard`
- Produces : `categoriesDe(realisations: Realisation[]): string[]` (catégories distinctes, ordre de première apparition) ; `filtrer(realisations, categorie: string | null): Realisation[]` ; `<RealisationsGrid realisations />` (client)

- [ ] **Step 1: Test unitaire qui échoue** — `tests/unit/categories.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { categoriesDe, filtrer } from "@/lib/content/categories";
import type { Realisation } from "@/lib/content/types";

const r = (id: string, categorie: string): Realisation =>
  ({ id, categorie, titre: id, client: "", resultat: "", description: "", imageUrl: "" });
const liste = [r("a", "Branding & Print"), r("b", "Production Vidéo"), r("c", "Branding & Print")];

describe("catégories", () => {
  it("liste les catégories distinctes dans l'ordre", () => {
    expect(categoriesDe(liste)).toEqual(["Branding & Print", "Production Vidéo"]);
  });
  it("filtre par catégorie, ou tout si null", () => {
    expect(filtrer(liste, "Branding & Print").map((x) => x.id)).toEqual(["a", "c"]);
    expect(filtrer(liste, null)).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Implémenter** `lib/content/categories.ts`

```ts
import type { Realisation } from "./types";

export function categoriesDe(realisations: Realisation[]): string[] {
  return [...new Set(realisations.map((r) => r.categorie))];
}

export function filtrer(realisations: Realisation[], categorie: string | null): Realisation[] {
  return categorie ? realisations.filter((r) => r.categorie === categorie) : realisations;
}
```
`npm run test` → PASS.

- [ ] **Step 3: Test e2e** — `tests/e2e/realisations.spec.ts`

```ts
import { expect, test } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

test.describe("Réalisations", () => {
  test("s'affiche sans erreur ni débordement", async ({ page }, testInfo) => {
    const { errors } = trackErrors(page);
    await page.goto("/realisations");
    await expect(page.getByRole("heading", { level: 1, name: "Des projets qui font la différence" })).toBeVisible();
    await checkPage(page, testInfo, "realisations", errors);
  });

  test("filtre par catégorie", async ({ page }) => {
    await page.goto("/realisations");
    const cartes = page.getByRole("article");
    const total = await cartes.count();
    await page.getByRole("button", { name: "Production Vidéo" }).click();
    await expect(page.getByRole("button", { name: "Production Vidéo" })).toHaveAttribute("aria-pressed", "true");
    expect(await cartes.count()).toBeLessThan(total);
    await page.getByRole("button", { name: "Tous" }).click();
    await expect(cartes).toHaveCount(total);
  });

  test("aucun client inventé", async ({ page }) => {
    await page.goto("/realisations");
    for (const faux of ["Moov Africa", "Total Energies", "BGFI", "SEEG", "Savane Mode", "Gabon Oil", "Olam", "Sobraga"]) {
      await expect(page.locator("main")).not.toContainText(faux);
    }
  });
});
```

- [ ] **Step 4: Implémenter la page** : `export const revalidate = 60;` + `metadata` (titre « Réalisations »). **En-tête V2** (celui du layout ; ignorer `ElyonHeader` de la maquette). Bandeau titre de la maquette (fil d'Ariane « Accueil › Réalisations » en `<nav aria-label="Fil d'Ariane">`, surtitre « Notre portfolio », `<h1>` « Des projets qui font la différence », texte) avec le logo en filigrane `hidden md:block`. `RealisationsGrid` : boutons de filtre « Tous » + `categoriesDe(...)` (`aria-pressed`, ≥ 44 px, ligne qui passe à la ligne `flex-wrap` — **pas** de défilement horizontal), grille `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`, cartes `RealisationCard` dans des `<article>` avec la description en plus (prop `avecDescription`). Changement de filtre animé avec Motion `layout` + `AnimatePresence` (opacité). Liste vide → « Aucune réalisation publiée pour le moment. »

- [ ] **Step 5:** Suite complète + captures `realisations-*`. Commit `feat: page Réalisations avec filtre par catégorie`.

---

### Task 27: [Claude] Page Mentions légales (et politique de confidentialité)

**Maquette :** `design/banani/screens/new_screen1.jsx` · **Files:** Create `app/(site)/mentions-legales/page.tsx`, `tests/e2e/mentions-legales.spec.ts`

- Reprendre la structure en 8 sections de la maquette, **corrigée** :
  - E-mail : `contact@elyoncrea.com` partout (la maquette affiche `.ga`) ; téléphone : `siteConfig.telephoneAffiche` (« [À CONFIRMER] » tant que non fourni).
  - 1. Éditeur : raison sociale « Elyon Créa », forme juridique, **RCCM**, **NIF**, siège social → `[À CONFIRMER]` pour chaque valeur non fournie (tâche 30).
  - 2. Directeur de la publication : `[À CONFIRMER]`.
  - 3. Hébergement : **Vercel Inc.**, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com. Données : **Supabase** (sous-traitant, région UE).
  - 5. Protection des données personnelles : `id="donnees-personnelles"` (cible du lien du formulaire). Préciser : données du formulaire d'audit (identité, coordonnées, entreprise, besoins, fichiers joints) utilisées uniquement pour répondre à la demande ; envoi de conseils par e-mail **seulement** si la case dédiée est cochée ; adresse IP enregistrée sous forme **anonymisée** (empreinte) pour lutter contre le spam ; fichiers stockés dans un espace privé ; droit d'accès, de rectification et de suppression : écrire à contact@elyoncrea.com. Durée de conservation : `[À CONFIRMER]` (proposition : 3 ans après le dernier contact).
  - 6. Cookies : seuls des cookies techniques sont utilisés (connexion au back-office) ; aucun cookie publicitaire.
  - « Dernière mise à jour : novembre 2026 ».
- Titres `h1` + `h2` numérotés, sommaire d'ancres sur ≥ `lg` (colonne de gauche collante) et en haut de page sur mobile ; texte `max-w-3xl`, `break-words`.

**Test e2e :**
```ts
import { expect, test } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

test.describe("Mentions légales", () => {
  test("s'affiche sans erreur ni débordement", async ({ page }, testInfo) => {
    const { errors } = trackErrors(page);
    await page.goto("/mentions-legales");
    await expect(page.getByRole("heading", { level: 1, name: "Mentions légales" })).toBeVisible();
    await checkPage(page, testInfo, "mentions-legales", errors);
  });
  test("bon e-mail et ancre données personnelles", async ({ page }) => {
    await page.goto("/mentions-legales#donnees-personnelles");
    await expect(page.locator("main")).toContainText("contact@elyoncrea.com");
    await expect(page.locator("main")).not.toContainText("elyoncrea.ga");
    await expect(page.locator("#donnees-personnelles")).toBeVisible();
  });
});
```
Commit `feat: mentions légales et politique de confidentialité`.

---

### Task 28: [Claude] Connexion (e-mail, Google, Microsoft) et `/admin` protégé

**Maquette :** `design/banani/screens/new_screen3.jsx`

**Files:** Create `app/(auth)/layout.tsx` (layout minimal : `<div className="min-h-dvh bg-dark">`, sans Header/Footer ni Lenis, comme la maquette qui est une page autonome), `app/(auth)/connexion/page.tsx`, `components/site/connexion/login-form.tsx`, `app/auth/callback/route.ts`, `app/auth/deconnexion/route.ts`, `proxy.ts` (ou `middleware.ts` selon la version de Next.js), `lib/auth/redirect.ts`, `lib/auth/admin.ts`, `app/(admin)/admin/page.tsx`, `app/(admin)/layout.tsx`, `components/admin/logout-button.tsx`, `tests/unit/auth-redirect.test.ts`, `tests/e2e/connexion.spec.ts`

**Interfaces:**
- Produces : `cheminSuiteSur(suite: string | null | undefined): string` (chemin interne sûr, défaut `/admin`) ; `normaliserEmail(e: string | null | undefined): string` ; `estAdmin(email: string | null | undefined): Promise<boolean>` (`server-only`, table `admins`) ; routes `GET /auth/callback?code&suite`, `POST|GET /auth/deconnexion?erreur`

**Adaptations de la maquette (contenu fictif / hors périmètre) :**
- Panneau marketing : garder le visuel et le titre « Pilotez votre activité. Sereinement. » ; **retirer** le faux témoignage (« Designer, Libreville »), « Pas encore client ? », « Accéder à la démo » et « Découvrir Elyon Créa » (le back-office est réservé à l'équipe). Liste de fonctionnalités : garder « Génération de devis en 30 secondes », « Alertes de renouvellement de documents » ; **retirer** « Conformité fiscale ISL automatique » tant que ce n'est pas construit. → À montrer à Steph au rapport de lot.
- « Rester connecté » : retiré (la session Supabase reste active par défaut).
- « Mot de passe oublié ? » : **masqué à l'étape 1** (réinitialisation possible depuis le tableau de bord Supabase) ; ajouté à l'étape 2.
- Bouton « Microsoft » : vrai logo (`MicrosoftIcon`).
- Panneau marketing `hidden lg:flex` ; formulaire seul et centré sur mobile/tablette.

- [ ] **Step 1: Tests unitaires qui échouent** — `tests/unit/auth-redirect.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { cheminSuiteSur } from "@/lib/auth/redirect";
import { normaliserEmail } from "@/lib/auth/admin-email";

describe("cheminSuiteSur", () => {
  it("accepte un chemin interne", () => {
    expect(cheminSuiteSur("/admin/devis")).toBe("/admin/devis");
  });
  it("refuse les redirections externes", () => {
    expect(cheminSuiteSur("https://pirate.com")).toBe("/admin");
    expect(cheminSuiteSur("//pirate.com")).toBe("/admin");
    expect(cheminSuiteSur("/\\pirate.com")).toBe("/admin");
  });
  it("vaut /admin par défaut", () => {
    expect(cheminSuiteSur(null)).toBe("/admin");
    expect(cheminSuiteSur("")).toBe("/admin");
  });
});

describe("normaliserEmail", () => {
  it("met en minuscules et retire les espaces", () => {
    expect(normaliserEmail("  Steph@ElyonCrea.com ")).toBe("steph@elyoncrea.com");
    expect(normaliserEmail(undefined)).toBe("");
  });
});
```
(`normaliserEmail` vit dans `lib/auth/admin-email.ts`, sans `server-only`, pour être testable ; `lib/auth/admin.ts` l'importe.)

- [ ] **Step 2: Implémenter**

`lib/auth/redirect.ts`
```ts
export function cheminSuiteSur(suite: string | null | undefined): string {
  if (!suite || !suite.startsWith("/") || suite.startsWith("//") || suite.startsWith("/\\")) return "/admin";
  return suite;
}
```

`lib/auth/admin-email.ts`
```ts
export function normaliserEmail(e: string | null | undefined): string {
  return (e ?? "").trim().toLowerCase();
}
```

`lib/auth/admin.ts`
```ts
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { normaliserEmail } from "./admin-email";

export async function estAdmin(email: string | null | undefined): Promise<boolean> {
  const e = normaliserEmail(email);
  if (!e) return false;
  const { data, error } = await createSupabaseAdminClient().from("admins").select("email").eq("email", e).maybeSingle();
  if (error) throw new Error(error.message);
  return data !== null;
}
```

`proxy.ts` (Next.js ≥ 16 ; pour une version antérieure : fichier `middleware.ts` et fonction nommée `middleware`)
```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    url.search = `?suite=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }
  return response;
}

// Uniquement les routes concernées : les pages publiques restent statiques et rapides.
export const config = { matcher: ["/admin/:path*", "/connexion", "/auth/:path*"] };
```

`app/auth/callback/route.ts`
```ts
import { NextResponse } from "next/server";
import { cheminSuiteSur } from "@/lib/auth/redirect";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const suite = cheminSuiteSur(searchParams.get("suite"));
  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${suite}`);
  }
  return NextResponse.redirect(`${origin}/connexion?erreur=oauth`);
}
```

`app/auth/deconnexion/route.ts`
```ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function deconnecter(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  const erreur = searchParams.get("erreur") === "non-autorise" ? "?erreur=non-autorise" : "";
  return NextResponse.redirect(`${origin}/connexion${erreur}`, { status: 303 });
}

export const GET = deconnecter;
export const POST = deconnecter;
```

`app/(admin)/admin/page.tsx`
```tsx
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/logout-button";
import { estAdmin } from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Back-office", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion?suite=/admin");
  if (!(await estAdmin(user.email))) redirect("/auth/deconnexion?erreur=non-autorise");

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Back-office</span>
      <h1 className="font-headings text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-ink-100">Back-office en construction</h1>
      <p className="text-base text-ink-400 break-words">Connecté en tant que {user.email}. Les outils de gestion arrivent à l'étape 2.</p>
      <LogoutButton />
    </main>
  );
}
```

`components/admin/logout-button.tsx`
```tsx
export function LogoutButton() {
  return (
    <form action="/auth/deconnexion" method="post">
      <button type="submit" className="min-h-11 rounded-md border border-border px-6 text-sm font-semibold text-ink-100 hover:bg-surface-2">
        Se déconnecter
      </button>
    </form>
  );
}
```

`app/(admin)/layout.tsx` : `<div className="min-h-dvh bg-dark text-ink-100">{children}</div>` — **sans** GSAP ni Lenis, sans Header/Footer du site.

`components/site/connexion/login-form.tsx` (`"use client"`) :
- Champs « Adresse e-mail » / « Mot de passe » (RHF + Zod : e-mail valide, mot de passe non vide), `text-base`.
- Envoi : `supabase.auth.signInWithPassword` → succès : `router.replace(cheminSuiteSur(suite))` + `router.refresh()` ; échec : `role="alert"` « E-mail ou mot de passe incorrect. ».
- Google : `supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: \`${location.origin}/auth/callback?suite=${encodeURIComponent(suite)}\` } })`.
- Microsoft : idem avec `provider: "azure", options: { scopes: "email", redirectTo: … }`.
- Messages selon `?erreur=` : `non-autorise` → « Accès non autorisé : ce compte n'est pas administrateur. » ; `oauth` → « La connexion a échoué. Réessayez. »
- La page `app/(auth)/connexion/page.tsx` est **dynamique** (lit `searchParams`), `robots: noindex`, contient le logo (lien vers l'accueil) et un `<h1>` « Connexion ». Le formulaire est enveloppé dans `<main>`.

- [ ] **Step 3: Test e2e** — `tests/e2e/connexion.spec.ts`

```ts
import { expect, test } from "@playwright/test";
import { checkPage, trackErrors } from "./utils/layout";

test.describe("Connexion", () => {
  test("s'affiche sans erreur ni débordement", async ({ page }, testInfo) => {
    const { errors } = trackErrors(page);
    await page.goto("/connexion");
    await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Microsoft" })).toBeVisible();
    await expect(page.locator("main")).not.toContainText("Designer, Libreville");
    await checkPage(page, testInfo, "connexion", errors);
  });

  test("/admin redirige vers /connexion sans session", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/connexion\?suite=%2Fadmin/);
  });

  test("identifiants incorrects → message d'erreur", async ({ page }) => {
    await page.goto("/connexion");
    await page.getByLabel("Adresse e-mail").fill("inconnu@exemple.ga");
    await page.getByLabel("Mot de passe").fill("mauvais-mot-de-passe");
    await page.getByRole("button", { name: "Se connecter" }).click();
    await expect(page.getByRole("alert")).toContainText("E-mail ou mot de passe incorrect.");
  });

  test("message accès non autorisé", async ({ page }) => {
    await page.goto("/connexion?erreur=non-autorise");
    await expect(page.getByRole("alert")).toContainText("Accès non autorisé");
  });
});
```
Note : le test « identifiants incorrects » appelle le vrai Supabase de dev ; la réponse 400 de Supabase sera captée par `trackErrors` → ce test n'appelle **pas** `checkPage`.

- [ ] **Step 4:** Suite complète + captures `connexion-*`. Commit `feat: connexion e-mail, Google, Microsoft et /admin protégé`.

---

### Task 29: [Steph] Activer Google et Microsoft, créer le compte administrateur

Étapes clic par clic (Claude les donne au moment voulu, une plateforme à la fois, et attend la confirmation après chacune) :

**A. Compte administrateur (5 min)**
1. Supabase → **Authentication** → **Users** → **Add user** → **Create new user** → e-mail : ton adresse de connexion → mot de passe fort → cocher **Auto Confirm User** → **Create user**.
2. Dire à Claude l'adresse utilisée : Claude l'ajoute dans la table `admins` (`insert into admins (email) values ('…');` en minuscules). Répéter pour chaque personne de l'équipe autorisée.

**B. Google (15 min)**
1. https://console.cloud.google.com → créer un projet `Elyon Crea Site`.
2. **APIs & Services → OAuth consent screen** : type **External**, nom « Elyon Créa », e-mail de support contact@elyoncrea.com, domaine autorisé `elyoncrea.com` → enregistrer.
3. **Credentials → Create credentials → OAuth client ID** → type **Web application** → **Authorized redirect URIs** : coller l'URL de rappel affichée dans Supabase (**Authentication → Sign In / Providers → Google**, champ *Callback URL*, de la forme `https://<projet>.supabase.co/auth/v1/callback`) → **Create**.
4. Copier **Client ID** et **Client secret** → dans Supabase, **Google** → activer → coller les deux → **Save**.

**C. Microsoft (15 min)**
1. https://portal.azure.com → **Microsoft Entra ID** → **App registrations** → **New registration** → nom `Elyon Créa Site` → type de comptes : **comptes dans n'importe quel annuaire et comptes Microsoft personnels** → Redirect URI (Web) : la même URL de rappel Supabase → **Register**.
2. Copier **Application (client) ID**. **Certificates & secrets → New client secret** → copier la **Value** (affichée une seule fois).
3. Supabase → **Authentication → Sign In / Providers → Azure** → activer → coller *Client ID* et *Secret* → *Azure Tenant URL* : `https://login.microsoftonline.com/common` → **Save**.

**D. Adresses autorisées**
Supabase → **Authentication → URL Configuration** → *Site URL* : `http://localhost:3000` (sera changé à la mise en ligne) → *Redirect URLs* : ajouter `http://localhost:3000/auth/callback`.

Côté Claude après confirmation : tester les 3 modes de connexion avec Steph (un compte non listé dans `admins` doit voir « Accès non autorisé »).

---

## Lot 7 — Vrai contenu et mise en ligne

### Task 30: [Steph] Fournir le vrai contenu

Liste à envoyer à Steph (il peut répondre en plusieurs fois) :
1. Téléphone affiché et numéro WhatsApp.
2. Liens Facebook et LinkedIn (ou « pas de réseau »).
3. Les 4 chiffres clés réels (projets livrés, clients, années d'expérience, taux de satisfaction) — ou retirer un chiffre s'il n'existe pas.
4. Jusqu'à 6 réalisations (minimum conseillé : 3) : titre, client (avec son accord), catégorie, résultat chiffré **réel**, description, 1 image (≥ 1600 px de large).
5. Mentions légales : forme juridique, RCCM, NIF, adresse du siège, directeur de la publication, durée de conservation des données.
6. Prix, textes et avantages définitifs des 3 formules ; nombre de places par mois.
7. Liste des secteurs du formulaire (validation de la liste proposée).
8. Le fichier source du logo (SVG ou PNG haute définition) et 4 images pour le diaporama (Stratégie, Création, Digital, IA) — photos ou visuels maison, ≥ 1920 px de large.
9. Phrase du CTA final : garder « En 48h, on vous montre… » (délai de livraison de l'audit) ou non ?

### Task 31: [Claude] Intégrer le contenu réel

- Remplacer les `[À CONFIRMER]` : `lib/content/static.ts` (chiffres), `lib/site-config.ts` (réseaux), `.env.local` + variables Vercel (téléphone, WhatsApp), mentions légales, `SECTEURS`.
- Supabase : mettre à jour `formules`, `places`, `realisations` (images envoyées dans le bucket `realisations` via `execute_sql`/Storage, chemins dans `image_path`).
- Images : convertir les fichiers de Steph (`sharp` : largeur max 1920, JPEG qualité 75) dans `public/images/hero/` et `public/images/logo-elyon-crea.*` ; supprimer les images provisoires inutilisées.
- Vérifier : `grep -rn "À CONFIRMER" app components lib` → uniquement les éléments que Steph a explicitement laissés en attente (listés dans le rapport).
- Suite complète + **Lighthouse mobile ≥ 90** remesuré (les vraies images sont plus lourdes). Commit `feat: contenu réel du site`.

### Task 32: [Steph] Créer le projet Vercel

1. https://vercel.com → se connecter avec **GitHub** (compte StephBouss) → vérifier que l'abonnement **Pro** est actif.
2. **Add New… → Project** → importer le dépôt `StephBouss/Elyon-Crea` (⚠️ voir la note sur le dépôt dans le rapport de Claude) → Framework : Next.js (détecté) → ne pas cliquer *Deploy* tout de suite.
3. **Environment Variables** : ajouter une par une les variables de `.env.local` (Claude fournit la liste des **noms** ; Steph copie les **valeurs** depuis son `.env.local`) avec `NEXT_PUBLIC_SITE_URL=https://elyoncrea.com` et `RESEND_FROM="Elyon Créa <contact@elyoncrea.com>"`.
4. **Deploy** → attendre « Congratulations » → ouvrir l'adresse `….vercel.app` et la donner à Claude.

Côté Claude : vérifier le déploiement (connecteur Vercel : `list_deployments`, `get_deployment`, `get_runtime_errors`) et lancer les tests Playwright contre l'URL Vercel (`PLAYWRIGHT_BASE_URL`, voir tâche 34).

### Task 33: [Steph] Relier le nom de domaine Cloudflare et vérifier le domaine e-mail

**A. Domaine → Vercel**
1. Vercel → projet → **Settings → Domains** → ajouter `elyoncrea.com` puis `www.elyoncrea.com` (choisir la redirection de `www` vers `elyoncrea.com`).
2. Vercel affiche les enregistrements DNS à créer (en général un **A** pour `@` et un **CNAME** pour `www`) : **garder cette page ouverte**.
3. https://dash.cloudflare.com → domaine `elyoncrea.com` → **DNS → Records** → pour chaque enregistrement affiché par Vercel : **Add record** → type, nom et valeur **exactement** comme Vercel → **Proxy status : DNS only (nuage gris)** → **Save**. Supprimer les anciens enregistrements `@`/`www` qui entreraient en conflit (Claude vérifie la liste avec Steph avant toute suppression).
4. Revenir sur Vercel : les deux domaines passent en **Valid Configuration** (jusqu'à 1 h).

**B. E-mails depuis contact@elyoncrea.com**
1. Resend → **Domains → Add domain** → `elyoncrea.com` → région la plus proche proposée.
2. Resend affiche des enregistrements (MX et TXT sur le sous-domaine `send`, TXT DKIM `resend._domainkey`) → les créer **à l'identique** dans Cloudflare DNS (**DNS only**). Ils ne touchent pas la boîte mail actuelle de contact@elyoncrea.com.
3. Resend → **Verify DNS Records** → statut **Verified**.

**C. Supabase**
Authentication → URL Configuration → *Site URL* : `https://elyoncrea.com` ; *Redirect URLs* : ajouter `https://elyoncrea.com/auth/callback` (garder celle de localhost).

### Task 34: [Claude] Vérification de la mise en ligne

- [ ] **Step 1:** Permettre de tester une URL distante — dans `playwright.config.ts` :
```ts
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
// use.baseURL = baseURL ; et webServer seulement si PLAYWRIGHT_BASE_URL n'est pas défini :
webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { …config existante… },
```
- [ ] **Step 2:** `PLAYWRIGHT_BASE_URL=https://elyoncrea.com npx playwright test` → PASS (les tests qui interceptent `/api/audit` restent valides).
- [ ] **Step 3:** Envoi **réel** d'une demande d'audit en production (avec Steph) → ligne en base, 2 e-mails reçus depuis `contact@elyoncrea.com` (pas dans les spams), fichiers téléchargeables. Supprimer la demande de test.
- [ ] **Step 4:** Lighthouse mobile sur `https://elyoncrea.com` ≥ 90 ; `https://elyoncrea.com/sitemap.xml` et `/robots.txt` répondent ; `/admin` exige la connexion ; connexion Google/Microsoft fonctionnelle avec l'URL de production.
- [ ] **Step 5:** Vercel `get_runtime_errors` sur 24 h → aucune erreur.
- [ ] **Step 6:** Rapport final à Steph + commit `docs: étape 1 en ligne` (cocher la phase dans `TACHES.md`, ajouter la date de mise en ligne dans `CLAUDE.md` §14).

---

## Contenu initial de `TACHES.md`

```markdown
# Tâches — Site Elyon Créa

Légende : `[Claude]` = Claude le fait · `[Steph]` = tu le fais (étapes détaillées données au moment venu).
Une tâche est cochée seulement quand build, lint, tests et tests Playwright passent et que les captures ont été vérifiées.

## Phase 1 — Cadrage ✅
- [x] 1. [Steph] Répondre aux 7 décisions de cadrage ✅ (2026-11-21)
- [x] 2. [Claude] Document de conception de l'étape 1 ✅ (docs/superpowers/specs/)

## Phase 2 — Maquette ✅
- [x] 3. [Steph] Sélectionner les maquettes dans Banani ✅
- [x] 4. [Claude] Exporter et analyser les maquettes ✅ (design/banani/)

## Étape 1 · Lot 1 — Fondations
- [ ] 5. [Claude] Créer le projet Next.js, les couleurs et cette liste (plan : tâche 1)
- [ ] 6. [Claude] Tests de calcul : montants FCFA et lien WhatsApp (tâche 2)
- [ ] 7. [Claude] Tests automatiques sur 8 tailles d'écran (tâche 3)

## Étape 1 · Lot 2 — Base de données et e-mails
- [ ] 8. [Steph] Créer le projet Supabase (tâche 4)
- [ ] 9. [Claude] Créer les tables, la sécurité et le contenu de départ (tâche 5)
- [ ] 10. [Claude] Lire le contenu depuis Supabase (tâche 6)
- [ ] 11. [Steph] Créer le compte Resend (tâche 7)

## Étape 1 · Lot 3 — Cadre du site
- [ ] 12. [Claude] Animations, logo, images provisoires (tâche 8)
- [ ] 13. [Claude] En-tête collant + menu burger (tâche 9)
- [ ] 14. [Claude] Pied de page + bouton WhatsApp (tâche 10)

## Étape 1 · Lot 4a — Landing (haut de page)
- [ ] 15. [Claude] Diaporama du Hero (tâche 11)
- [ ] 16. [Claude] Chiffres clés animés (tâche 12)
- [ ] 17. [Claude] Problème → Solution (tâche 13)
- [ ] 18. [Claude] Pile de valeur + places en temps réel (tâche 14)

## Étape 1 · Lot 4b — Landing (offre)
- [ ] 19. [Claude] 11 pôles d'expertise (tâche 15)
- [ ] 20. [Claude] Formules (tâche 16)
- [ ] 21. [Claude] Réalisations (aperçu) (tâche 17)

## Étape 1 · Lot 4c — Landing (bas de page)
- [ ] 22. [Claude] Garantie (tâche 18)
- [ ] 23. [Claude] FAQ (tâche 19)
- [ ] 24. [Claude] Appel à l'action final (tâche 20)
- [ ] 25. [Claude] Référencement Google + vitesse mobile ≥ 90 (tâche 21)

## Étape 1 · Lot 5 — Audit gratuit
- [ ] 26. [Claude] Règles du formulaire (tâche 22)
- [ ] 27. [Claude] Anti-spam, enregistrement, e-mails (tâche 23)
- [ ] 28. [Claude] E-mails et routes serveur (tâche 24)
- [ ] 29. [Claude] Page Audit gratuit (tâche 25)

## Étape 1 · Lot 6 — Autres pages
- [ ] 30. [Claude] Page Réalisations (tâche 26)
- [ ] 31. [Claude] Mentions légales (tâche 27)
- [ ] 32. [Claude] Connexion + back-office protégé (tâche 28)
- [ ] 33. [Steph] Activer Google, Microsoft et ton compte admin (tâche 29)

## Étape 1 · Lot 7 — Mise en ligne
- [ ] 34. [Steph] Envoyer le vrai contenu (chiffres, réalisations, mentions légales, images…) (tâche 30)
- [ ] 35. [Claude] Intégrer le vrai contenu (tâche 31)
- [ ] 36. [Steph] Créer le projet Vercel (tâche 32)
- [ ] 37. [Steph] Relier elyoncrea.com et les e-mails (tâche 33)
- [ ] 38. [Claude] Vérifier le site en ligne (tâche 34)
```

