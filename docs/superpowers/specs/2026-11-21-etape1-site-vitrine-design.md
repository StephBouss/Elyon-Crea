# Conception — Site Elyon Créa · Étape 1 : site vitrine en ligne

- **Date** : 2026-11-21
- **Statut** : validé par Steph le 2026-11-21
- **Référence** : `CLAUDE.md` (règles du projet, stack, responsive, tests)

---

## 1. Décisions de cadrage (Phase 1)

| # | Sujet | Décision |
|---|---|---|
| 1 | Palette | ~~Option A — maquette Banani~~ → **révisé : charte du logo + direction artistique premium (section 4.0)**. |
| 2 | Hébergement | **Vercel Pro**. Nom de domaine acheté chez **Cloudflare** : le DNS reste chez Cloudflare et pointe vers Vercel. |
| 3 | Comptabilité SYSCOHADA | **Reprendre le schéma d'Iwadu Conta** dans ce projet (comptabilité autonome, 4 écrans de la maquette). Concerne l'étape 4. |
| 4 | Hero | ~~Diaporama photo~~ → **révisé : constellation de particules colibri / cerveau / ampoule (section 4.0)**. |
| 5 | Sections / écrans optionnels | **Reporté à la Phase 2**, avec la maquette Banani sous les yeux. |
| 6 | Mode Inspecteur | **Contrôle de conformité** : papiers administratifs, comptabilité à jour, échéances (impôts, CNSS…), rappels avant expiration. Concerne l'étape 5. |
| 7 | Ordre de livraison | **Site vitrine d'abord**, puis back-office. |

---

## 2. Découpage du projet en 6 étapes

Chaque étape a sa propre conception, son plan et sa validation.

| # | Étape | Contenu |
|---|---|---|
| **1** | **Site vitrine en ligne** (ce document) | Landing complète, pages Réalisations / Mentions légales / Connexion, formulaire « Audit gratuit », WhatsApp, mise en ligne |
| 2 | Socle du back-office | Connexion admin, menu, tableau de bord, édition du contenu de la landing, demandes d'audit, paramètres |
| 3 | Commercial | Clients, produits & services, devis et factures PDF, envoi par e-mail, paiements |
| 4 | Comptabilité SYSCOHADA | Plan comptable Iwadu Conta, écritures automatiques depuis factures/paiements, journal, grand livre, balance, rapprochement bancaire |
| 5 | Mode Inspecteur | Suivi de conformité et rappels |
| 6 | Assistant IA (DeepSeek) | Questions sur les chiffres, données anonymisées uniquement |

Ordre justifié par les dépendances : la comptabilité a besoin des factures, l'assistant a besoin des données.

---

## 3. Périmètre de l'étape 1

### 3.1 Pages publiques

| Page | Route | Contenu |
|---|---|---|
| Accueil | `/` | Les 12 sections de `CLAUDE.md` §5.A, dans l'ordre (maquette `ElyonLanding_copy1_copy1`) |
| Audit gratuit | `/audit-gratuit` | Page dédiée au formulaire (maquette `ElyonAuditGratuit` + `ElyonAuditForm`) |
| Réalisations | `/realisations` | Tous les projets publiés, filtre par catégorie (maquette `ElyonRealisations`) |
| Mentions légales | `/mentions-legales` | Texte légal (infos entreprise fournies par Steph) |
| Connexion | `/connexion` | Connexion Supabase Auth fonctionnelle (e-mail + mot de passe, Google, Microsoft) → page protégée « Back-office en construction » (`/admin`) |

**Maquettes** : exportées depuis Banani dans `design/banani/` (écrans dans `screens/`, sections dans `components/`). **Depuis la révision du 2026-11-21, elles servent de référence pour le CONTENU uniquement** (textes, sections, ordre, champs) ; le design suit la section 4.0 et `design/style-guide-premium.md`. Le thème `style.css` de Banani n'est plus utilisé.

**Décisions de la Phase 2 (2026-11-21)** :
- Landing gardée **telle quelle** (12 sections). Sections non retenues : Header V1, Parcours de campagne, Grille de 8 services, Méthode, Témoignages, bloc Conversion.
- **Tous les boutons « Audit gratuit » / « Recevoir mon audit gratuit » / « Démarrer mon projet »** mènent à `/audit-gratuit`.
- **En-tête V2 sur toutes les pages publiques** (la maquette Réalisations utilise l'en-tête V1 : harmonisé).
- E-mail affiché partout : `contact@elyoncrea.com` (la maquette Mentions légales affiche `.ga`).
- **Délai de réponse annoncé partout : « sous 24h ouvrables »** (CTA final, page Audit, e-mail de confirmation) — la maquette affichait « 48h » dans le CTA final.
- Bouton « Microsoft » de la Connexion : la maquette utilise une icône Facebook par erreur → vrai logo Microsoft.

### 3.2 Hors périmètre de l'étape 1

Tout le back-office fonctionnel (édition du contenu, devis, factures, comptabilité, Inspecteur, assistant IA). En attendant l'étape 2, le contenu se modifie directement dans l'éditeur de tables de Supabase.

---

## 4. Conception

### 4.0 Direction artistique premium (révision validée par Steph le 2026-11-21)

**Référence** : `design/style-guide-premium.md` (style « Dala ») pour la composition, la typographie, les espacements et l'esprit ; **charte du logo** (`design/logo/charte-graphique.png`) pour les couleurs et les polices ; **maquettes Banani** pour le contenu.

**Tokens**

| Rôle | Valeur |
|---|---|
| Fond de toutes les sections | Noir pur `#000000` — aucun panneau gris, aucune carte, aucune ombre, aucune bordure |
| Texte principal et titres | Blanc rosé `#FCF8FB` |
| Texte secondaire | `#9a9a9a` · tertiaire `#bdbdbd` · touches douces : Rose poudré `#EEDCE9` |
| Bouton plein (un seul par écran, pilule 24 px) | Orchidée `#A10684`, texte blanc, 14 px majuscules graisse 600, interlettrage 0,025 em |
| Accent (petits titres, liens, mots mis en valeur) | Cyan doux `#38BFCB` |
| Profondeur (halos, dégradé du logo) | Prune nuit `#281B2A` |
| Interdit | Orchidée en texte sur fond noir (contraste insuffisant) ; dégradés sur les composants d'interface (uniquement dans le logo et les particules) |

**Typographie** : **Manrope** pour les titres (graisse 400, jamais gras ; -0,04 em dès 42 px ; échelle 24 · 27 · 36 · 42 · 48 · 78 · 113 px) ; **Inter** pour les textes (18 px graisse **200**, interligne 1,5) ; libellés et menu en Manrope 14 px graisse 600 majuscules. Sur mobile, les titres restent grands et percutants (mise en page pensée pour l'écran, retours à la ligne choisis, `clamp()` avec un minimum élevé), jamais une simple miniature du PC.

**Espacements** : base 6 px (6 · 12 · 18 · 24 · 30 · 36 · 60 · 96 · 120), largeur max 1280 px, 60 à 120 px entre sections, une ou deux idées par écran.

**Hero — constellation** : canvas 2D plein écran, petits triangles au contour fin (1–2 px) en Orchidée, Cyan doux et nuances (Rose poudré, Prune nuit éclaircie), + particules d'ambiance dispersées à faible opacité (inspirées du « motif digital » de la charte). Trois formes : **colibri** (échantillonné depuis `design/logo/colibri.png`), **cerveau**, **ampoule** (silhouettes SVG dessinées). Entrée : les particules convergent pour former le colibri, puis le titre se révèle mot par mot (glissement sans masquer le texte). Les 4 messages se succèdent : Stratégie & Campagnes → cerveau · Création & Design → ampoule · Digital & Web → colibri · Intelligence Artificielle → cerveau. Au défilement, la constellation se disperse (parallaxe). Sur PC, les particules s'écartent autour du curseur. ~2 500 particules sur PC, ~900 sur mobile ; pause hors écran et onglet caché ; `prefers-reduced-motion` → colibri fixe, messages sans animation. PC : titre à gauche, constellation à droite ; mobile : constellation derrière le texte.

**Sections de la landing** (contenu Banani, rendu premium) :

| # | Section | Rendu | Animation | Mobile |
|---|---|---|---|---|
| 1 | En-tête | Transparent, logo, liens 14 px majuscules gris → blanc au survol, pilule « Audit gratuit » | Se masque en descendant, réapparaît en remontant | Burger → menu plein écran, liens géants en cascade |
| 2 | Hero | Voir ci-dessus | Voir ci-dessus | Voir ci-dessus |
| 3 | Chiffres clés | 4 nombres géants, libellés cyan | Compteurs | 2 × 2 |
| 4 | Problème → Solution | Deux grands blocs de texte, trait Orchidée → Cyan | Trait qui se dessine au défilement, la solution remplace le problème | Empilés, trait horizontal |
| 5 | Pile de valeur | 6 lignes typographiques avec valeurs, total barré, prix final géant, points de places restantes (temps réel) | Lignes allumées une à une, rature animée, prix révélé | Empilé |
| 6 | Expertise | Liste numérotée 01 → 11 de grands titres, chaque pôle se déplie (prestations + descriptions) | Cascade, particules d'ambiance | Pleine largeur, déplier au toucher |
| 7 | Formules | 3 colonnes séparées par l'espace seul, prix géants, Envol 360° au centre (« Le plus choisi » en cyan + seul bouton plein) | Profondeur au défilement | Empilées, Envol 360° en premier |
| 8 | Réalisations | Grandes images 24 px de rayon, défilement horizontal piloté par le défilement de la page (6 projets) | Défilement horizontal + parallaxe interne | Carrousel tactile + points |
| 9 | Garantie | Titre géant + engagement + offre du 1er mois en cyan | Ligne verticale qui se dessine | Empilé, ligne horizontale |
| 10 | FAQ | Questions en grandes lignes, + / −, sans boîtes | Ouverture fluide | Identique |
| 11 | CTA final | Plein écran, « Prêt à faire décoller votre marque ? », colibri reformé | Particules qui reviennent | Colibri derrière le texte |
| 12 | Pied de page | Liens + contact, puis « Elyon Créa » en lettres immenses | Révélation au défilement | 1 colonne |

**Écarts assumés** : bouton WhatsApp flottant en vert officiel (reconnaissance) ; formules en 3 colonnes sur PC (comparaison des prix).

**Animations** : GSAP + ScrollTrigger (révélations, parallaxe, épinglages, transitions) + Lenis ; uniquement `transform` et `opacity` dans les animations ; épinglages et défilement horizontal **désactivés sous 1024 px** (remplacés par des révélations simples) ; tout est coupé si `prefers-reduced-motion`.

**Autres pages** (Audit gratuit, Réalisations, Mentions légales, Connexion) : même direction artistique, conçues après la landing.

### 4.1 Contenu modifiable (Supabase)

| Table | Champs principaux | Accès public |
|---|---|---|
| `formules` | nom, prix_barre, prix, avantages (liste), mise_en_avant (« Le plus choisi »), ordre, publie | lecture des lignes publiées |
| `places` | places_total, places_restantes (une seule ligne) | lecture |
| `realisations` | titre, client, categorie, image (Supabase Storage), description, ordre, publie | lecture des lignes publiées |
| `faq` | question, reponse, ordre, publie | lecture des lignes publiées |
| `demandes_audit` | champs du formulaire, date, statut, envoi des e-mails (ok / échec) | **aucun** (écriture par le serveur uniquement) |

- Montants stockés en **entiers FCFA** et affichés au format `500 000 FCFA`.
- **RLS activé sur toutes les tables.** Le rôle admin (étape 2) aura les droits d'écriture.
- Images des réalisations dans un bucket Supabase Storage public en lecture.

### 4.2 Affichage et mise à jour

- Pages **pré-générées** (rapides, bon référencement), **rafraîchies automatiquement toutes les 60 secondes** au plus quand le contenu change. Aucun redéploiement nécessaire.
- **Places restantes en temps réel** : abonnement Supabase Realtime côté navigateur, sur cette seule donnée.
- **Hero** : constellation en canvas 2D (voir section 4.0), démarrée après le premier affichage ; le titre (texte serveur) est l'élément LCP et reste visible dès le chargement.
- Contenu fictif de la maquette remplacé par `[À CONFIRMER]` (chiffres, faux clients, faux téléphone, « © 2025 »), selon `CLAUDE.md` §10.

### 4.3 Formulaire « Audit gratuit »

**Champs** (maquette `ElyonAuditForm`) :

| Champ | Type | Obligatoire |
|---|---|---|
| Nom | texte | oui |
| Adresse e-mail | e-mail | oui |
| Nom de l'entreprise | texte | oui |
| Secteur d'activité | liste déroulante (liste à confirmer par Steph) | oui |
| Téléphone | téléphone (format gabonais accepté, ex. +241 …) | oui |
| Budget annuel (XAF) | liste : moins de 500 000 · 500 000 – 2 000 000 · plus de 2 000 000 | oui |
| Besoin principal | cases à cocher multiples (6 choix de la maquette) | au moins 1 |
| Parlez-nous de votre projet | texte long | non |
| Documents à auditer | fichiers (PNG, JPG, WebP, PDF) + liens web | non |
| Politique de confidentialité | case à cocher | **oui** |
| Recevoir les conseils d'Elyon Créa par e-mail | case à cocher | **non** (séparée de la précédente : le consentement marketing doit rester libre) |

**Fichiers joints** : 5 fichiers maximum, 10 Mo chacun, stockés dans un bucket Supabase Storage **privé** (`audit-fichiers`), jamais lisible publiquement. Jusqu'à 3 liens web. L'e-mail de notification contient des liens de téléchargement temporaires.

**Parcours** :
1. Validation Zod dans le navigateur, avec les erreurs en français sous chaque champ.
2. Envoi à une route serveur, **nouvelle validation Zod** côté serveur.
3. Enregistrement dans `demandes_audit`.
4. E-mail de **notification à `contact@elyoncrea.com`** (Resend), avec le détail de la demande.
5. E-mail de **confirmation au visiteur**, aux couleurs d'Elyon Créa (Resend).
6. Écran de succès avec un bouton **« Continuer sur WhatsApp »** (message pré-rempli).

**Gestion des pannes** :
- Échec d'un e-mail → la demande reste enregistrée, l'échec est noté dans `demandes_audit`, et le visiteur voit quand même le succès.
- Échec de l'enregistrement → message d'erreur clair et bouton WhatsApp de secours.

**Anti-spam** : champ piège invisible (honeypot) et limite de quelques envois par heure depuis une même adresse IP.

### 4.4 Sécurité

- Clés dans `.env.local` (non commité). `.env.example` tenu à jour, sans valeurs.
- Clé `service_role` Supabase et clé Resend utilisées **uniquement côté serveur**.
- `/admin` protégé côté serveur (middleware + vérification de session).
- **Connexion Google / Microsoft** (Supabase Auth, fournisseurs Google et Azure) : seuls les comptes dont l'e-mail figure dans une **liste d'administrateurs autorisés** accèdent à `/admin`. Toute autre personne est déconnectée avec un message « Accès non autorisé ». Configuration des comptes Google Cloud et Microsoft Azure : tâches `[Steph]` guidées clic par clic.

### 4.5 Performance

- Animations : `transform` et `opacity` uniquement, durées de 0,4 à 0,8 s, `prefers-reduced-motion` respecté.
- GSAP et Lenis chargés seulement sur les pages publiques.
- Images en AVIF/WebP, chargement différé sous la ligne de flottaison, ratio fixé (CLS < 0,1).
- **Objectif : Lighthouse mobile ≥ 90 en performance**, vérifié avant la mise en ligne.

### 4.6 Tests

Selon `CLAUDE.md` §9 :
- Vitest pour la logique : formatage des montants FCFA, schémas Zod du formulaire, construction du lien WhatsApp.
- Playwright à 7 largeurs Chromium (360, 390, 768, 1024, 1280, 1440, 1920) + WebKit 390 : pas de défilement horizontal, pas de texte qui déborde, interactions (menu burger, FAQ, formulaire et ses erreurs, WhatsApp, connexion), axe sans violation grave, captures pleine page, test en `reducedMotion: 'reduce'`.
- Contrôle visuel des captures par Claude, comparées à la maquette Banani.

### 4.7 Mise en ligne

1. Déploiement sur **Vercel Pro** (variables d'environnement configurées dans Vercel).
2. Domaine **Cloudflare** relié à Vercel (enregistrements DNS chez Cloudflare).
3. Domaine **vérifié chez Resend** (enregistrements DNS chez Cloudflare) pour envoyer depuis `contact@elyoncrea.com`.

Chaque action manuelle sera décrite clic par clic dans `TACHES.md` (tâches `[Steph]`).

---

## 5. Informations à fournir par Steph avant la mise en ligne

- Numéro de téléphone et numéro WhatsApp.
- Vrais chiffres clés (projets, clients, années, satisfaction).
- Réalisations à afficher (avec l'accord des clients) : textes et images.
- Mentions légales : raison sociale, RCCM, NIF, adresse, responsable de publication.
- Textes et prix définitifs des formules, nombre de places.
- Liste des secteurs d'activité du formulaire.
- ~~Vrai fichier du logo~~ ✅ charte reçue (`design/logo/`). Idéalement un export SVG ou PNG haute définition du logo complet pour l'en-tête.
- Images des 6 réalisations (en attendant : images libres Unsplash/Pexels marquées `[À CONFIRMER]`).

---

## 6. Prochaines étapes

1. ~~**Phase 2** : lecture de la maquette Banani via le MCP, liste des écrans et sections, choix des variantes (décision n° 5).~~ ✅ 2026-11-21
2. **Phase 3** : plan détaillé de l'étape 1 et création de `TACHES.md`.
