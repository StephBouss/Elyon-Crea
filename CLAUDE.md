# CLAUDE.md — Site Elyon Créa (landing page + back-office)

## 1. Qui je suis et comment me parler

- Je suis **Steph**, fondateur d'**Elyon Créa**, agence de communication 360° à Libreville (Gabon).
- **Je ne suis pas développeur** : je pilote le projet par l'IA. Explique simplement, sans jargon non expliqué.
- Réponds **toujours en français**.
- Quand une action doit être faite **par moi** (créer un compte, copier une clé, cliquer dans une interface, valider un visuel), donne-moi les **étapes numérotées, clic par clic**, puis **attends ma confirmation** avant de continuer.
- Une seule question à la fois quand tu as besoin d'une décision. Propose des choix (A / B / C) avec ta recommandation.

---

## 2. Démarrage obligatoire (à chaque nouvelle session)

1. **Vérifie que Superpowers est disponible** (skills `brainstorming`, `writing-plans`, `executing-plans`…).
   S'il manque, arrête-toi et donne-moi ces instructions :
   - Dans Claude Code : `/plugin install superpowers@claude-plugins-official`
     (ou : `/plugin marketplace add obra/superpowers-marketplace` puis `/plugin install superpowers@superpowers-marketplace`)
   - Dans Antigravity : `agy plugin install https://github.com/obra/superpowers`
   - Puis redémarrer la session.
2. **Vérifie si le MCP Banani est connecté** (voir section 4). S'il ne l'est pas, signale-le simplement, on le branchera quand on attaquera le premier écran.
3. **Lis `TACHES.md`** (à la racine) et le dernier plan Superpowers dans `docs/`.
4. **Fais-moi un point en 5 lignes maximum** : où on en est, ce qui a été validé, la prochaine tâche, et si elle est pour toi `[Claude]` ou pour moi `[Steph]`.

Si `TACHES.md` n'existe pas encore → on démarre le projet : passe directement à la Phase 1.

---

## 3. Méthode de travail : Superpowers obligatoire

Ne jamais écrire de code sans être passé par ces phases.

### Phase 1 — Cadrage (skill `brainstorming`)
- Pose-moi les questions de la section 12 (« Décisions à confirmer »), **une par une**.
- Rédige le document de conception et fais-le moi valider.

### Phase 2 — Maquette Banani
- **Demande-moi la maquette Banani** (méthode en section 4) avant de planifier les écrans.
- Analyse-la et liste-moi les écrans et sections trouvés. Je confirme lesquels on garde.

### Phase 3 — Plan (skill `writing-plans`)
- Découpe tout le projet en **petites tâches** (quelques minutes chacune).
- Les premières tâches du plan installent les outils de test : Vitest, Playwright, et l'utilitaire anti-débordement (section 9).
- Chaque tâche qui touche un écran précise **les 3 rendus attendus** : mobile, tablette, PC (section 8).
- Crée et tiens à jour **`TACHES.md`** à la racine : c'est MA liste lisible, étape par étape.
  Format obligatoire :

  ```
  ## Phase X — Titre
  - [ ] 12. [Claude] Créer le composant Header (sticky + flou au scroll)
  - [ ] 13. [Steph] Créer le projet Supabase
        → Étapes : 1) aller sur supabase.com … 2) cliquer sur … 3) copier …
  - [x] 11. [Claude] Section Formules ✅ (build OK · Playwright 7/7 tailles · captures vérifiées)
  ```

  - `[Claude]` = tu le fais. `[Steph]` = je le fais, avec **le détail clic par clic** juste en dessous.
  - Coche une tâche seulement quand elle remplit la **définition de « terminé »** de la section 9 (tests Playwright compris).

### Phase 4 — Réalisation (skill `executing-plans` ou `subagent-driven-development`)
- Avance **par lots de 3 à 5 tâches**.
- À la fin de chaque lot, arrête-toi et donne-moi :
  1. ce qui a été fait (en 3-5 puces simples) ;
  2. le **rapport des tests Playwright** (format en section 9) ;
  3. **comment le vérifier moi-même** : adresse `http://localhost:3000/...`, quoi regarder, quoi cliquer, et comment l'ouvrir **sur mon téléphone** (section 13) ;
  4. la suite prévue → attends mon « OK ».

### Tout au long du projet
- `verification-before-completion` : ne jamais dire « c'est fini » sans avoir lancé `build`, `lint`, les tests unitaires **et les tests Playwright** (section 9), et montré le résultat.
- `systematic-debugging` pour tout bug : cause d'abord, correction ensuite.
- `test-driven-development` **obligatoire** pour tout ce qui touche à l'argent : devis, factures, taxes, paiements, écritures comptables SYSCOHADA.
- Commit Git après chaque lot validé, message en français (ex. `feat: section Formules avec cartes animées`).

---

## 4. Maquette Banani — à me demander AVANT d'implémenter chaque écran

**Règle : ne code jamais un écran ou une section sans avoir sa maquette sous les yeux.**
Avant chaque écran, demande : « Envoie-moi la maquette de l'écran _X_ ».

Lien de prévisualisation du projet (pour info) : https://app.banani.co/preview/i_q7t14Y3bZo
⚠️ Ce lien s'affiche en JavaScript : tu ne peux pas le lire directement. Utilise une des méthodes ci-dessous.

### Méthode 1 (préférée) — MCP Banani
Si le MCP Banani n'est pas connecté, guide-moi :
1. Dans Banani, barre latérale → page **MCP**.
2. Choisir **Claude Code**.
3. Générer une **clé API** (elle ne s'affiche qu'une fois : je la copie tout de suite).
4. Suivre la commande d'installation affichée par Banani, puis redémarrer Claude Code.

Ensuite, pour chaque lot d'écrans :
- Je **sélectionne les écrans dans l'éditeur Banani**, puis je te dis « c'est fait ».
- Tu récupères via le MCP : nom de l'écran, type (web/mobile), HTML/CSS simplifié, et les tokens du thème (couleurs, arrondis, police).

### Méthode 2 (secours) — copier-coller
- Dans Banani, sur l'écran : **Copier HTML/CSS**.
- Je colle le code dans `design/banani/<nom-ecran>.html` et j'ajoute une capture `design/banani/<nom-ecran>.png`.

### Comment utiliser la maquette
- Reproduis fidèlement : mise en page, espacements, hiérarchie, couleurs (selon la palette choisie, section 7).
- Transforme le HTML en **composants React propres et réutilisables**. Pas de copier-coller brut.
- **Remplace tout contenu fictif** (voir section 10).
- Les maquettes sont souvent en **1440 px de large** : c'est une **référence visuelle, pas une taille fixe**. Applique les règles responsive de la section 8.

### Écrans présents dans le fichier Banani « Atterrissage à Elyon Créa »

| Zone | Écran Banani | Route prévue |
|---|---|---|
| Public | Landing Page — version retenue : `ElyonLanding_copy1_copy1` (2 autres variantes existent) | `/` |
| Public | Audit gratuit (page formulaire) | `/audit-gratuit` |
| Public | Réalisations | `/realisations` |
| Public | Mentions légales | `/mentions-legales` |
| Public | Connexion | `/connexion` |
| Back-office | Dashboard (Aéré) | `/admin` |
| Back-office | Assistant IA | `/admin/assistant` |
| Back-office | Mode Inspecteur (conformité : papiers, impôts, CNSS, rappels) | `/admin/inspecteur` |
| Back-office | Devis + Nouveau Devis (modal) | `/admin/devis` |
| Back-office | Factures | `/admin/factures` |
| Back-office | Clients | `/admin/clients` |
| Back-office | Produits & Services | `/admin/produits` |
| Back-office | Comptabilité : Journal, Grand livre, Balance, Rapprochement bancaire | `/admin/comptabilite/...` |
| Back-office | Paramètres | `/admin/parametres` |

Le fichier contient aussi des **sections isolées et variantes** (Header V2, Hero Slideshow, Method, AI Section, Rareté & Urgence, Portfolio…) → demande-moi lesquelles retenir.
Le menu du back-office cite aussi **Bons de livraison, Avoirs, Paiements, Projets, Rapports** sans écran dédié → à confirmer avec moi.

---

## 5. Le projet

Un seul projet Next.js en deux parties :

### A. Site public (vitrine + conversion)
Landing page longue, sombre et premium, très animée. Sections dans l'ordre :

| # | Section | Animation / partie dynamique |
|---|---|---|
| 1 | En-tête (logo, menu, bouton « Audit gratuit ») | Collant en haut, devient flou et plus fin au défilement |
| 2 | Hero (colibri plein écran, titre en dégradé, 2 boutons) | Titre révélé mot par mot (SplitText), zoom lent sur l'image, diaporama possible |
| 3 | Chiffres clés | Compteurs animés à l'apparition |
| 4 | Problème → Solution « L'Envol 360° » | Apparition décalée, flèche qui se trace |
| 5 | Pile de valeur (prix barré → prix final, places limitées) | Coches une à une ; **places restantes lues dans Supabase, en temps réel** |
| 6 | Expertise : 11 cartes de services | Apparition en cascade, carte qui se soulève au survol |
| 7 | Formules (Découverte / Envol 360° « Le plus choisi » / Signature) | Bordure en dégradé animée sur la carte centrale ; **prix lus dans Supabase** |
| 8 | Réalisations (6 projets) | Zoom au survol ; **projets gérés depuis le back-office** |
| 9 | Garantie | Ligne verticale qui se dessine |
| 10 | FAQ | Accordéon animé ; **questions gérées depuis le back-office** |
| 11 | CTA final (audit gratuit) | Fond en dégradé qui bouge lentement |
| 12 | Pied de page + WhatsApp | Bouton WhatsApp flottant sur tout le site |

Formulaire « Audit gratuit » → enregistré dans Supabase + e-mail de notification + lien WhatsApp.

### B. Back-office (espace administrateur protégé)
Tableau de bord KPI, devis, factures (PDF), clients, produits & services, comptabilité SYSCOHADA, assistant IA, paramètres.
**Tout le contenu de la landing (offres, prix, places restantes, réalisations, FAQ) doit être modifiable ici**, sans redéployer le site.

---

## 6. Stack technique (ne pas changer sans mon accord)

| Rôle | Outil |
|---|---|
| Base | Next.js (App Router, dernière version stable) + TypeScript |
| Style | Tailwind CSS v4 + shadcn/ui |
| Animations d'interface | Motion (`motion`, ex-Framer Motion) |
| Animations au défilement / texte | GSAP + ScrollTrigger + SplitText (`gsap`, `@gsap/react`) |
| Défilement fluide | Lenis (`lenis`) — site public uniquement |
| Données, connexion, fichiers | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) |
| Formulaires | React Hook Form + Zod |
| Graphiques | shadcn charts (Recharts) |
| Tableaux | TanStack Table (data table shadcn) |
| PDF devis/factures | `@react-pdf/renderer` |
| E-mails | Resend |
| Assistant IA | **DeepSeek** via le SDK `openai` (API compatible OpenAI) : `baseURL: "https://api.deepseek.com"`, clé `DEEPSEEK_API_KEY`, modèle lu dans `DEEPSEEK_MODEL` (jamais écrit en dur). **Côté serveur uniquement** (`app/api/assistant`) |
| Tests logique | Vitest |
| Tests navigateur, responsive, accessibilité | Playwright (`@playwright/test`) + `@axe-core/playwright` |
| Hébergement | **Vercel Pro** (décision du 2026-11-21) — nom de domaine acheté chez Cloudflare |

### Structure des dossiers
```
app/
  (site)/          → pages publiques, pré-générées (SEO)
  (admin)/admin/   → back-office protégé (Supabase Auth)
  api/             → assistant IA, PDF, envoi de devis, webhooks
components/
  site/            → sections de la landing
  admin/           → composants du back-office
  ui/              → composants shadcn
lib/               → supabase, utilitaires, calculs (testés)
supabase/migrations/
tests/
  e2e/             → tests Playwright (un fichier par page)
  e2e/utils/       → layout.ts (détection des débordements), helpers
  screenshots/     → captures mobile / tablette / PC
playwright.config.ts
design/banani/     → maquettes exportées (méthode 2)
docs/              → conception et plans Superpowers
TACHES.md          → ma liste de tâches
```

---

## 7. Design system

- **Police** : DM Sans (dans la maquette). Titre principal 48 px gras sur desktop.
- **Palette** : ⚠️ décision à prendre en Phase 1 (section 12) :
  - **Option A — maquette Banani** : magenta `#C2147A`, or `#F9B000`, noirs `#0E0E0E` / `#161616` / `#0A0A0A`, crème `#FAF8F5`, blanc. Dégradé titre : magenta → or.
  - **Option B — charte du logo** : magenta `#A10684`, cyan `#38BFCB`, encre `#281B2A`. Titres en Quicksand, texte en Inter.
- Déclare les couleurs comme **tokens Tailwind** (`@theme`) : jamais de couleur codée en dur dans un composant.

### Règles d'animation (performance mobile au Gabon : données mobiles, téléphones moyens)
- Animer uniquement `transform` et `opacity`. Pas de 3D, pas de WebGL, pas de vidéo lourde en fond.
- Durées de 0,4 à 0,8 s, animations discrètes et élégantes.
- Respecter `prefers-reduced-motion` : animations coupées si l'utilisateur le demande.
- GSAP et Lenis chargés **seulement sur le site public**, jamais dans le back-office.
- Images en AVIF/WebP via `next/image`, chargement différé sous la ligne de flottaison.
- Objectif : Lighthouse mobile ≥ 90 en performance. Vérifie-le avant de valider la landing.

---

## 8. Responsive : mobile, tablette, PC (règle absolue)

Les maquettes Banani sont souvent en 1440 px de large. **Ce n'est pas une largeur à recopier** : chaque écran doit être impeccable sur mobile, tablette et PC.

### Largeurs à couvrir
| Appareil | Largeur testée | Préfixe Tailwind |
|---|---|---|
| Petit mobile Android (très courant au Gabon) | 360 px | (base) |
| Mobile | 390 px | (base) |
| Tablette portrait | 768 px | `md:` |
| Tablette paysage / petit PC | 1024 px | `lg:` |
| PC | 1280 px et 1440 px | `xl:` |
| Grand écran | 1920 px | `2xl:` (contenu centré, largeur max) |

### Méthode
- **Mobile d'abord** : les classes de base sont pour le mobile, puis `md:`, `lg:`, `xl:` pour agrandir.
- Ne recopie jamais les largeurs et hauteurs en px de la maquette. Utilise un conteneur (`max-w-7xl mx-auto px-4 md:px-8`), `w-full`, des grilles fluides, et `clamp()` pour les grands titres (ex. `text-[clamp(2rem,5vw,3rem)]`).
- Pas de `100vw` (ça crée un défilement horizontal) : utilise `w-full`. Pour un bloc plein écran sur mobile : `min-h-dvh` plutôt que `100vh`.
- **Avant de coder un écran**, explique-moi en 3-5 lignes comment il se réorganise sur mobile et tablette. Attends mon accord si ça s'écarte de la maquette.

### Adaptations prévues pour la landing (à valider avec moi)
| Section | PC | Tablette | Mobile |
|---|---|---|---|
| En-tête | Menu complet | Menu complet ou burger | Menu burger plein écran ; « Audit gratuit » toujours visible |
| Hero | Texte à gauche, colibri à droite | Texte pleine largeur | Texte pleine largeur, voile sombre renforcé, boutons empilés pleine largeur |
| Chiffres | 4 colonnes | 4 colonnes | 2 × 2 |
| Pile de valeur | Liste + carte prix côte à côte | Empilés | Empilés, carte prix en dessous |
| Expertise (11 cartes) | 3 colonnes | 2 colonnes | 1 colonne |
| Formules | 3 cartes côte à côte | 1 colonne | 1 colonne, « Le plus choisi » en premier |
| Réalisations | 3 colonnes | 2 colonnes | 1 colonne |
| Garantie | 2 colonnes + ligne verticale | 2 colonnes | Empilé, ligne horizontale |
| Pied de page | 4 colonnes | 2 colonnes | 1 colonne |

### Back-office
- Menu latéral → tiroir qui s'ouvre avec un bouton sur mobile et tablette.
- Tableaux (factures, journal, grand livre…) → défilement horizontal **à l'intérieur du tableau seulement**, ou affichage en cartes sur mobile. La page elle-même ne défile jamais horizontalement.
- Cartes KPI : 4 → 2 → 1 colonne. Graphiques à largeur fluide.
- Fenêtres (ex. « Nouveau devis ») → plein écran sur mobile.

### Zéro débordement, zéro élément mal placé
- Aucun défilement horizontal de la page, à aucune largeur.
- Aucun texte coupé, caché ou qui dépasse de son bloc :
  - pas de hauteur fixe sur un bloc qui contient du texte ;
  - `min-w-0` sur les enfants de `flex` et `grid` ;
  - `break-words` pour les e-mails, liens et mots longs.
- Montants : `500 000 FCFA` ne se coupe jamais sur deux lignes (`whitespace-nowrap`), mais doit tenir dans sa carte à 360 px.
- Images : `max-w-full h-auto` avec un ratio fixé, pour éviter que la page saute au chargement.
- **Interdit** de cacher un débordement avec `overflow-x-hidden` sur `body` ou `html` : trouve la cause et corrige-la.
- Le bouton WhatsApp flottant ne doit jamais cacher un bouton, un texte ou le bas d'un formulaire.
- Les animations ne doivent pas déplacer la mise en page (CLS < 0,1).

### UX / UI à respecter
- Fidélité à la maquette : hiérarchie, espacements, couleurs, ordre des éléments.
- Espacements réguliers (échelle Tailwind 4, 8, 12, 16, 24, 32…), alignements nets.
- Texte courant ≥ 16 px sur mobile ; champs de formulaire ≥ 16 px (sinon l'iPhone zoome).
- Zones cliquables ≥ 44 × 44 px, bien espacées.
- Contraste conforme WCAG AA (attention au gris sur noir et au jaune sur blanc).
- États prévus et visibles : survol, focus clavier, chargement, erreur, succès, liste vide (ex. « Aucune facture pour le moment »).
- Sur mobile, le bouton d'action principal est visible sans faire défiler.

---

## 9. Tests Playwright — à la fin de CHAQUE tâche

### Définition de « terminé »
Une tâche n'est terminée (et cochée dans `TACHES.md`) que si **tout** ceci passe :
1. `npm run build` et `npm run lint` sans erreur.
2. Tests unitaires Vitest pour la logique (obligatoires pour l'argent).
3. **Tests Playwright** des pages touchées, aux 7 largeurs de la section 8.
4. **Captures vérifiées par toi** (voir plus bas).

### Configuration
- `@playwright/test` + `@axe-core/playwright`.
- `playwright.config.ts` : un « project » Chromium par largeur (360, 390, 768, 1024, 1280, 1440, 1920) + un project WebKit à 390 px (iPhone / Safari).
- `webServer` dans la config pour que le site se lance tout seul pendant les tests.
- Tests dans `tests/e2e/`, captures dans `tests/screenshots/`.

### Ce que chaque test vérifie
- La page s'ouvre sans erreur dans la console et sans requête en échec.
- **Pas de défilement horizontal** : `document.documentElement.scrollWidth <= window.innerWidth`.
- **Aucun élément ne sort de l'écran** et **aucun texte ne déborde de son bloc** (`scrollWidth > clientWidth` sur les blocs de texte).
  → Écris ces contrôles une fois dans `tests/e2e/utils/layout.ts` et réutilise-les dans tous les tests.
- Les interactions fonctionnent : menu burger, FAQ, formulaires (avec les messages d'erreur), boutons d'action, liens WhatsApp, connexion au back-office.
- Accessibilité : aucune violation axe « critical » ou « serious ».
- **Capture pleine page** à chaque largeur. Une fois l'écran validé par moi, ajoute une comparaison visuelle (`toHaveScreenshot`) pour détecter toute régression plus tard.
- Animations : attendre leur fin avant les captures, et tester aussi avec `reducedMotion: 'reduce'`.

### Contrôle visuel par toi
- **Regarde toi-même les captures** (mobile, tablette, PC) et compare-les à la maquette Banani avant de dire que c'est bon. Un test vert ne suffit pas si le rendu est visuellement faux.
- Si le MCP Playwright est installé (`claude mcp add playwright npx @playwright/mcp@latest`), utilise-le pendant le développement pour ouvrir la page et la contrôler à différentes largeurs.
- En cas d'échec : corrige avec le skill `systematic-debugging`, relance les tests, et ne passe à la tâche suivante que quand tout est vert.

### Rapport à me donner après chaque lot
```
Tests Playwright : 42/42 ✅
360 ✅ · 390 ✅ · 768 ✅ · 1024 ✅ · 1280 ✅ · 1440 ✅ · 1920 ✅ · iPhone Safari ✅
Débordements : 0 · Accessibilité : 0 problème grave
Captures : tests/screenshots/accueil-*.png
```

---

## 10. Règles de contenu

- Dans les textes : **« Elyon Créa »** avec accent. Seul le logo s'écrit « Elyon Crea ».
- E-mail de contact : **contact@elyoncrea.com** (la maquette affiche hello@ : à remplacer).
- Téléphone et numéro WhatsApp : **à me demander**.
- Prix en FCFA avec espace : `500 000 FCFA`.
- **Ne jamais publier de chiffres ou de clients inventés.** La maquette contient du contenu fictif à remplacer :
  - chiffres (+250 projets, +80 clients, 8 ans, 98 %) ;
  - réalisations attribuées à Moov Africa, TotalEnergies, BGFI Bank, SEEG, Savane Mode, Gabon Oil Corp ;
  - téléphone +241 077 000 000, « © 2025 ».
  → Mets `[À CONFIRMER]` à la place et demande-moi les vraies valeurs.
- Clients réels : Bamboo Microfinance / Bamboo Pay, B·COM, NCE SARL, EQUACO, Atlético Camp Libreville. Demande-moi avant de citer un projet.

---

## 11. Sécurité

- Toutes les clés dans `.env.local` (jamais commité). Tenir `.env.example` à jour, sans valeurs.
- La clé `service_role` de Supabase et la clé `DEEPSEEK_API_KEY` : **jamais côté navigateur**, uniquement dans le code serveur.
- **Assistant IA (DeepSeek, fournisseur chinois) : envoyer le strict nécessaire.** Les données partent sur les serveurs de DeepSeek. Transmets des totaux, des résumés et des identifiants anonymisés (ex. « Client #12 »), jamais les fiches clients complètes (nom, téléphone, e-mail, adresse) ni les coordonnées bancaires. Si une question exige des données personnelles, demande-moi d'abord.
- Le modèle DeepSeek change souvent de nom : en cas d'erreur « model not found », vérifie la documentation officielle (https://api-docs.deepseek.com) et dis-moi quelle valeur mettre dans `DEEPSEEK_MODEL`.
- **RLS activé sur toutes les tables Supabase**, avec un rôle admin pour le back-office.
- Routes `/admin` protégées côté serveur (middleware + vérification de session).
- Valider toutes les entrées de formulaire avec Zod, côté client **et** côté serveur.

---

## 12. Décisions à confirmer avec moi (Phase 1)

Pose-les une par une, avec ta recommandation :

1. **Palette** : Option A (maquette) ou Option B (charte du logo) ? (section 7)
2. **Hébergement** :
   - A. VPS (Hostinger ou OVHcloud) + Coolify → recommandé : coût fixe, Next.js entièrement pris en charge.
   - B. Cloudflare Workers avec vinext → gratuit, mais encore en bêta.
   - (Vercel exclu : le plan gratuit interdit l'usage commercial et le plan Pro est trop cher pour moi.)
3. **Comptabilité SYSCOHADA** : réutiliser le module / le schéma de mon SaaS **Iwadu Conta** (ComptaFlash), ou brancher le back-office dessus, plutôt que de tout recoder ?
4. **Variante du Hero** : image fixe ou diaporama (Hero Slideshow) ?
5. **Sections et écrans optionnels** de la section 4 : lesquels garder ?
6. **Mode Inspecteur** : à quoi sert-il exactement ?
7. **Ordre de livraison** : je recommande landing page d'abord (mise en ligne rapide), puis back-office.

---

## 13. Commandes utiles

```
npm run dev                  → lancer le site en local (http://localhost:3000)
npm run dev -- -H 0.0.0.0    → l'ouvrir aussi sur mon téléphone (même Wi-Fi), via l'adresse « Network » affichée
npm run build                → vérifier que tout compile
npm run lint                 → vérifier la qualité du code
npm run test                 → tests unitaires (Vitest)
npm run test:e2e             → tous les tests Playwright
npx playwright test --ui     → voir les tests se dérouler en direct
npx playwright show-report   → ouvrir le dernier rapport de tests
```

---

## 14. Décisions prises (à compléter au fil du projet)

> Quand je valide une décision, ajoute-la ici avec la date. Ne supprime rien.

- **2026-11-21** — Assistant IA du back-office : **DeepSeek** (Steph a déjà un compte et des tokens), à la place de l'API Claude.
- **2026-11-21** — Palette : **Option A (maquette Banani)** — magenta `#C2147A`, or `#F9B000`, noirs `#0E0E0E` / `#161616` / `#0A0A0A`, crème `#FAF8F5`, blanc ; dégradé titre magenta → or ; police DM Sans. Objectif : rester identique à la maquette.
- **2026-11-21** — Hébergement : **Vercel Pro** (remplace la recommandation VPS/Coolify de la section 12). Le nom de domaine est acheté chez **Cloudflare** : le DNS reste chez Cloudflare et pointera vers Vercel (branchement à faire au moment de la mise en ligne).
- **2026-11-21** — Comptabilité SYSCOHADA : **Option A** — reprendre le schéma d'**Iwadu Conta** (plan comptable, structure des écritures) dans ce projet. Le back-office a sa propre comptabilité autonome, avec les 4 écrans de la maquette (Journal, Grand livre, Balance, Rapprochement bancaire). Emplacement du code Iwadu Conta : à demander à Steph au moment du plan.
- **2026-11-21** — Hero : **diaporama (Hero Slideshow)**. Garde-fous performance : 1re image chargée en priorité (AVIF/WebP), les suivantes chargées seulement après l'affichage de la page ; défilement en fondu (opacity) ; diaporama figé sur la 1re image si `prefers-reduced-motion`.
- **2026-11-21** — **Mode Inspecteur** = contrôle de conformité de l'entreprise : suivi des papiers administratifs (dates d'expiration), de la comptabilité à jour, et des échéances de paiements administratifs (impôts, CNSS, etc.), avec **rappels avant expiration**. Route prévue : `/admin/inspecteur`. Détails (liste des documents, délais et canal des rappels) à préciser lors de la conception de cet écran. Section 12 Q5 (sections/écrans optionnels) reportée à la Phase 2, avec la maquette sous les yeux.
- **2026-11-21** — Phase 2 (maquette) : landing gardée telle quelle (12 sections) ; sections Header V1, Parcours de campagne, Grille 8 services, Méthode, Témoignages et bloc Conversion **écartées**. Ajout de la page **`/audit-gratuit`** (formulaire complet avec fichiers joints) : tous les boutons « Audit gratuit » y mènent. Connexion : e-mail + mot de passe, **Google et Microsoft** (réservés aux administrateurs autorisés). Maquettes exportées dans `design/banani/`.
- **2026-11-21** — Dépôt GitHub : **`StephBouss/Elyon-Crea` = site de l'agence uniquement** (ce dossier). L'ancien projet Elyon IA (izi kit) est abandonné et son historique local supprimé.
- **2026-11-21** — Réalisation : **une IA neuve par tâche** (skill `subagent-driven-development`), relecture par Claude entre chaque tâche, arrêt et rapport à Steph à la fin de chaque lot.
- **2026-11-21** — Délai de réponse annoncé aux visiteurs : **« sous 24h ouvrables »**, partout (landing, page Audit, e-mail de confirmation).
- **2026-11-21** — **Nouvelle direction artistique « premium immersive »** (remplace le design Banani ; le **contenu** des maquettes Banani reste la référence) : style de référence « Dala » (`design/style-guide-premium.md`) — fond noir pur `#000000`, aucun cadre/ombre/carte, titres géants en graisse 400 avec interlettrage serré (-0,04 em), texte de lecture en graisse 200, un seul bouton plein par écran (pilule), GSAP + ScrollTrigger très présent (révélations, parallaxe, transitions, micro-interactions). **Couleurs = charte du logo** (remplace l'Option A) : bouton/accent principal magenta `#A10684`, accent secondaire cyan `#38BFCB` (petits titres, liens, mots mis en valeur), encre `#281B2A` (nuances). Valeurs exactes de la charte (`design/logo/charte-graphique.png`) : Orchidée `#A10684`, Prune nuit `#281B2A`, Cyan doux `#38BFCB`, Rose poudré `#EEDCE9`, Blanc rosé `#FCF8FB`. Colibri isolé pour les particules : `design/logo/colibri.png`. Titres : grands et impactants aussi sur mobile (mise en page adaptée, pas une simple réduction).
- **2026-11-21** — Hero : **constellation de particules triangulaires (magenta/cyan) plein écran**, signature visuelle du site, qui se recompose entre **3 formes : le colibri du logo, un cerveau, une ampoule (l'idée)** au rythme des 4 messages de l'ancien diaporama. Animation d'entrée : les particules se rassemblent en colibri. Remplace le diaporama photo. Canvas 2D léger (pas de WebGL), moins de particules sur mobile, figé sur le colibri si `prefers-reduced-motion`.
- **2026-11-21** — Polices = **charte du logo** : **Manrope** (titres, graisse 400, interlettrage -0,04 em sur les grandes tailles ; 600 pour libellés et menu) et **Inter** (textes, graisse **200** pour le texte de lecture 18 px, signature du style premium). Via `next/font/google`. Remplace DM Sans (et Switzer, brièvement envisagée).
- **2026-11-22** — Contact : **contact@elyoncrea.com** pour le contact et tous les autres usages. Numéro WhatsApp fourni par Steph, enregistré dans `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER`) ; à reporter dans Vercel à la mise en ligne. Le téléphone affiché est **le même numéro** (`NEXT_PUBLIC_PHONE_DISPLAY`, à reporter aussi).
- **2026-11-21** — Ordre de livraison : **landing page d'abord** (mise en ligne rapide ; contenu modifiable directement dans Supabase en attendant), **puis back-office**.
