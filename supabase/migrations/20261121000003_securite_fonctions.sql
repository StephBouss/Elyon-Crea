-- Limite les droits de la fonction d'administration aux utilisateurs connectés.
revoke execute on function public.is_admin() from anon;

-- Empêche la résolution des noms du déclencheur de dépendre de la session.
alter function public.set_updated_at() set search_path = pg_catalog;
