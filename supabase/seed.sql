begin;

-- Sérialise les initialisations pour éviter les doublons lors de relances simultanées.
select pg_advisory_xact_lock(hashtext('elyon-crea-seed'));

insert into public.formules (slug, nom, prix, prix_mention, prix_note, accroche, description, avantages, mise_en_avant, cta, ordre, publie) values
('envol-decouverte', 'Envol Découverte', 150000, null, null,
 'La porte d''entrée.',
 'Logo relooké + charte simplifiée + carte de visite.',
 array['Logo relooké', 'Charte graphique simplifiée', 'Carte de visite'],
 false, 'Démarrer', 1, false),
('envol-360', 'Envol 360°', 500000, null, null,
 'La marque complète, clé en main.',
 'Logo + charte, site vitrine, 5 templates réseaux + calendrier, kit papeterie, pack goodies, 1 support grand format.',
 array['Logo + charte graphique complète', 'Site vitrine mobile-first', '5 templates réseaux + calendrier 1 mois', 'Kit papeterie complet', 'Pack goodies personnalisés', '1 support grand format prêt à imprimer'],
 true, 'Je veux L''Envol 360°', 2, false),
('envol-signature', 'Envol Signature', null, 'Sur devis', 'dès 1 000 000 FCFA',
 'Pour les marques qui visent l''excellence.',
 'Tout L''Envol 360° + community management 3 mois + shooting + gestion de votre campagne publicitaire.',
 array['Tout L''Envol 360°', 'Community management 3 mois', 'Shooting photo / vidéo', 'Gestion campagne publicitaire'],
 false, 'Demander un devis', 3, false)
on conflict (slug) do nothing;

-- Le nombre de places sera renseigné après confirmation par Steph.

insert into public.faq (question, reponse, ordre, publie)
select initial.question, initial.reponse, initial.ordre, false
from (values
('C''est trop cher pour moi.', 'Commencez par l''Envol Découverte à 150 000 FCFA, puis montez en puissance quand votre marque génère des clients.', 1, false),
('J''ai déjà un logo.', 'Parfait. On le relooke et on construit tout le reste autour pour une image cohérente.', 2, false),
('Combien de temps ?', '30 jours pour L''Envol 360°, avec un calendrier partagé dès le départ.', 3, false),
('Et si je ne suis pas satisfait ?', 'On retravaille jusqu''à votre validation. Vous ne payez pas pour une image que vous n''assumez pas.', 4, false),
('Vous faites aussi l''impression et les goodies ?', 'Oui. Print tous formats et objets publicitaires personnalisés font partie de l''offre.', 5, false)
) as initial(question, reponse, ordre, publie)
where not exists (select 1 from public.faq where question = initial.question);

-- Réalisations : AUCUN client inventé. 6 emplacements à remplacer par les vrais projets fournis par Steph.
-- Le contenu initial reste masqué jusqu'à validation des textes et des prix.
insert into public.realisations (titre, client, categorie, resultat, description, ordre, publie)
select initial.titre, initial.client, initial.categorie, initial.resultat, initial.description, initial.ordre, false
from (values
('[À CONFIRMER] Projet branding', '[À CONFIRMER]', 'Branding & Print', '[À CONFIRMER]', '[À CONFIRMER]', 1, false),
('[À CONFIRMER] Projet digital', '[À CONFIRMER]', 'Marketing Digital', '[À CONFIRMER]', '[À CONFIRMER]', 2, false),
('[À CONFIRMER] Projet web', '[À CONFIRMER]', 'Web & Développement', '[À CONFIRMER]', '[À CONFIRMER]', 3, false),
('[À CONFIRMER] Projet activation', '[À CONFIRMER]', 'BTL & Activation', '[À CONFIRMER]', '[À CONFIRMER]', 4, false),
('[À CONFIRMER] Projet vidéo', '[À CONFIRMER]', 'Production Vidéo', '[À CONFIRMER]', '[À CONFIRMER]', 5, false),
('[À CONFIRMER] Projet stratégie', '[À CONFIRMER]', 'Stratégie & Conseil', '[À CONFIRMER]', '[À CONFIRMER]', 6, false)
) as initial(titre, client, categorie, resultat, description, ordre, publie)
where not exists (select 1 from public.realisations where titre = initial.titre and client = initial.client);

commit;
