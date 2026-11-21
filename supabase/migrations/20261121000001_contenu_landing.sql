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

-- Les nouvelles bases peuvent ne pas accorder ces droits automatiquement.
grant select on public.formules, public.places, public.realisations, public.faq to anon, authenticated;
grant all on public.formules, public.places, public.realisations, public.faq to service_role;

-- Lecture publique du contenu publié uniquement. Aucune écriture publique.
create policy "formules publiées lisibles" on public.formules for select to anon, authenticated using (publie);
create policy "places lisibles" on public.places for select to anon, authenticated using (true);
create policy "réalisations publiées lisibles" on public.realisations for select to anon, authenticated using (publie);
create policy "faq publiée lisible" on public.faq for select to anon, authenticated using (publie);

-- Places restantes en temps réel.
alter publication supabase_realtime add table public.places;
