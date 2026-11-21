# Conception — Site Elyon Créa · Étape 1 : site vitrine en ligne

- **Date** : 2026-11-21
- **Statut** : validé par Steph le 2026-11-21
- **Référence** : `CLAUDE.md` (règles du projet, stack, responsive, tests)

---

## 1. Décisions de cadrage (Phase 1)

| # | Sujet | Décision |
|---|---|---|
| 1 | Palette | **Option A — maquette Banani** : magenta `#C2147A`, or `#F9B000`, noirs `#0E0E0E` / `#161616` / `#0A0A0A`, crème `#FAF8F5`, blanc. Dégradé titre magenta → or. Police DM Sans. Rester identique à la maquette. |
| 2 | Hébergement | **Vercel Pro**. Nom de domaine acheté chez **Cloudflare** : le DNS reste chez Cloudflare et pointe vers Vercel. |
| 3 | Comptabilité SYSCOHADA | **Reprendre le schéma d'Iwadu Conta** dans ce projet (comptabilité autonome, 4 écrans de la maquette). Concerne l'étape 4. |
| 4 | Hero | **Diaporama (Hero Slideshow)**, avec garde-fous de performance (section 4.2). |
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

**Maquettes** : exportées depuis Banani dans `design/banani/` (écrans dans `screens/`, sections dans `components/`, thème dans `style.css`).

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
- **Diaporama du Hero** : 1re image chargée en priorité (AVIF/WebP via `next/image`), images suivantes chargées après l'affichage de la page, transition en fondu (`opacity`), diaporama figé sur la 1re image si `prefers-reduced-motion`.
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
- Vrai fichier du logo et 4 images pour le diaporama (Stratégie, Création, Digital, IA).

---

## 6. Prochaines étapes

1. ~~**Phase 2** : lecture de la maquette Banani via le MCP, liste des écrans et sections, choix des variantes (décision n° 5).~~ ✅ 2026-11-21
2. **Phase 3** : plan détaillé de l'étape 1 et création de `TACHES.md`.
