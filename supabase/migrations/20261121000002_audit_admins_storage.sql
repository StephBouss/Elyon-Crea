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
grant all on public.demandes_audit, public.admins to service_role;

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
