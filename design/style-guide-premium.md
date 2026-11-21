# Style guide de référence — direction artistique premium

> Fourni par Steph le 2026-11-21. Référence principale pour la direction artistique, les espacements, la typographie et la composition.
> **Adaptations Elyon Créa** (décisions dans `CLAUDE.md` §14) :
> - Couleurs = **charte du logo** : `#8052ff` (Electric Iris) → **magenta `#A10684`** ; `#ffb829` (Saffron Spark) → **cyan `#38BFCB`** ; `#15846e` (Deep Verdant) → **encre `#281B2A`**.
> - Constellation du Hero : **colibri du logo, cerveau, ampoule** (au lieu du cerveau seul).
> - Contenu : celui de la maquette Banani (`design/banani/`), pas celui de Dala.
> - Police : PP Neue Montreal est payante → choix du remplaçant à faire avec Steph.

---

# Your workplace has the answer. Just ask Dala for it. — Style Reference
> constellation floating on black velvet

**Theme:** dark

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Dala operates as a dark-stage environment where black voids meet a single vivid violet accent, punctuated by amber sparks. Typography is monolithic and weightless — PPNeueMontreal at weight 400 dominates every heading at outsized scales (78–113px) with aggressive negative tracking, so headlines feel sculptural rather than informational. The visual centerpiece is a constellation of tiny multicolored triangular particles forming an organic brain shape, which acts as the brand's signature gesture: knowledge visualized as distributed intelligence rather than hierarchical data. Layout follows a spacious two-column rhythm — oversized left-aligned headlines paired with generous body copy, floating on pure black with no panels, borders, or cards. Components are intentionally reduced to their most essential form: one violet pill button, ghost text links, and large-format text blocks.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#000000` | `--color-void` | Page canvas, section backgrounds, negative space — pure black is the dominant surface, not dark gray |
| Bone White | `#ffffff` | `--color-bone-white` | Headlines, body text, icon fills, nav active state |
| Ash Gray | `#9a9a9a` | `--color-ash-gray` | Muted nav text, ghost link color, secondary labels |
| Silver Mist | `#bdbdbd` | `--color-silver-mist` | Tertiary body text, caption-level information |
| Electric Iris | `#8052ff` | `--color-electric-iris` | Primary action buttons, logo mark, brand accents (→ Elyon : magenta `#A10684`) |
| Saffron Spark | `#ffb829` | `--color-saffron-spark` | Highlight emphasis text, accent links, attention punctuation (→ Elyon : cyan `#38BFCB`) |
| Deep Verdant | `#15846e` | `--color-deep-verdant` | Secondary surface tint, logo gradient stop (→ Elyon : encre `#281B2A`) |

## Tokens — Typography

**PPNeueMontreal** — single typeface across all UI contexts. Substitute: Inter.
- Weights: 200, 400, 600, 700 · OpenType `"ss01" on`
- Display sizes (78–113px) at weight 400 with -0.04em tracking. Weight 200 for 18px body copy (signature). Weight 600 at 14px, uppercase, 0.025em tracking for nav and small labels. Hierarchy by scale, not weight.

| Role | Size | Line height | Letter spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 12px | 1.5 | — | `--text-caption` |
| nav-label | 14px | 1.2 | 0.35px | `--text-nav-label` |
| body | 18px | 1.5 | — | `--text-body` |
| heading-2xs | 24px | 1.25 | -0.48px | `--text-heading-2xs` |
| heading-xs | 27px | 1 | — | `--text-heading-xs` |
| subheading | 36px | 1.2 | — | `--text-subheading` |
| heading-sm | 42px | 1.2 | -1.68px | `--text-heading-sm` |
| heading | 48px | 1.1 | -1.68px | `--text-heading` |
| heading-lg | 78px | 1.1 | -3.12px | `--text-heading-lg` |
| display | 113px | 1.1 | -4.52px | `--text-display` |

## Tokens — Spacing & Shapes

- Base unit 6px · density comfortable · scale 6, 12, 18, 24, 30, 36, 60, 96, 120px
- Radius : nav 24px, tags 9999px, cards 24px, buttons 24px
- Page max-width 1280px · section gap 60–120px · card padding 24–38px · element gap 6–18px

## Components

- **Primary Action Button** — filled pill (accent color), white text, ~22.5px radius, 14.4px × 16px padding, 14px uppercase weight 600, 0.025em tracking. The sole interactive CTA.
- **Ghost Text Button** — no background, no border, `#ffffff` or `#9a9a9a`, 14px weight 400. Nav items and inline links.
- **Logo Lockup** — brand mark + wordmark in header.
- **Team Member Card** — no background/border/shadow; rounded portrait (24px), role label 12px uppercase in accent, name 27px white.
- **Carousel Navigation Dot** — ~8px filled circle in accent for active state.
- **Hero Constellation Visualization** — thousands of tiny outlined triangular glyphs (1–2px stroke) in vivid colors forming an organic shape against pure black, with ambient scattered particles. Animated field of point-lights, the site's defining visual.
- **Section Headline Block** — two-column asymmetric layout: headline 78–113px weight 400, -0.04em, left half; body 18px weight 200; small uppercase label in the secondary accent above the body. No boxes, no borders.
- **Navigation Bar** — transparent on black; logo left, links 14px uppercase weight 600, 0.025em (`#9a9a9a` inactive, white active/hover); filled pill CTA on the right. No border, no backdrop blur.
- **Ambient Particle Field** — small outlined triangles in brand colors scattered at low opacity across the background.

## Do's and Don'ts

**Do**
- Use the primary accent exclusively for filled action buttons.
- Set every headline at weight 400, never bold — hierarchy through scale and tracking.
- Use weight 200 for 18px body text.
- Keep pure `#000000` as every section background — no dark gray panels or card surfaces.
- Apply -0.04em letter-spacing on all display sizes 42px and above.
- Use 24px border-radius for buttons, cards and nav elements.
- Let the particle constellation be the only hero imagery.

**Don't**
- No filled accent color for large background blocks or full sections.
- No body text at weight 400.
- No card containers with borders, shadows or background fills.
- No default browser link blue; links in white or the secondary accent.
- No gradients on UI components — gradients only in the logo and the particle visualization.
- No multiple filled buttons close together — one primary action per view.

## Surfaces & elevation

Level 0 void canvas `#000000` · level 1 deep tint (logo gradient, subtle washes) · level 2 accent (filled buttons only). No shadows, no elevation: hierarchy by scale, color contrast and whitespace.

## Imagery

Entirely procedural and abstract: the particle system IS the visual brand. Ambient particles drift at lower density across the page. Triangles outlined, saturated colors, never grayscale. Portraits (if any) as large 24px-radius crops without frames. No product screenshots, no lifestyle photography, no 3D renders in the hero.

## Layout

Full-bleed sections on pure black, max content width ~1280px centered. Hero: two-column asymmetric split — oversized left headline with body and CTA, particle visualization on the right at massive scale. Following sections alternate visual-left/text-right then text-left/visual-right (zigzag). Section gaps 60–120px. No card grids, no pricing tables, no multi-column feature blocks. Minimal transparent top nav. Extremely spacious: one or two elements per viewport.

## Similar brands

Linear, Vercel, Anthropic, Runway — dark void, oversized weight-400 display type, one saturated accent reserved for action, generative visuals.

## Tailwind v4 (référence d'origine, couleurs Dala)

```css
@theme {
  --color-void: #000000;
  --color-bone-white: #ffffff;
  --color-ash-gray: #9a9a9a;
  --color-silver-mist: #bdbdbd;
  --color-electric-iris: #8052ff;
  --color-saffron-spark: #ffb829;
  --color-deep-verdant: #15846e;
  --font-ppneuemontreal: 'PPNeueMontreal', ui-sans-serif, system-ui, sans-serif;
  --text-caption: 12px;      --leading-caption: 1.5;
  --text-nav-label: 14px;    --leading-nav-label: 1.2;   --tracking-nav-label: 0.35px;
  --text-body: 18px;         --leading-body: 1.5;
  --text-heading-2xs: 24px;  --leading-heading-2xs: 1.25; --tracking-heading-2xs: -0.48px;
  --text-heading-xs: 27px;   --leading-heading-xs: 1;
  --text-subheading: 36px;   --leading-subheading: 1.2;
  --text-heading-sm: 42px;   --leading-heading-sm: 1.2;  --tracking-heading-sm: -1.68px;
  --text-heading: 48px;      --leading-heading: 1.1;     --tracking-heading: -1.68px;
  --text-heading-lg: 78px;   --leading-heading-lg: 1.1;  --tracking-heading-lg: -3.12px;
  --text-display: 113px;     --leading-display: 1.1;     --tracking-display: -4.52px;
  --spacing-6: 6px; --spacing-12: 12px; --spacing-18: 18px; --spacing-24: 24px; --spacing-30: 30px;
  --spacing-36: 36px; --spacing-60: 60px; --spacing-96: 96px; --spacing-120: 120px;
  --radius-3xl: 24px;
  --radius-full: 9999px;
}
```
