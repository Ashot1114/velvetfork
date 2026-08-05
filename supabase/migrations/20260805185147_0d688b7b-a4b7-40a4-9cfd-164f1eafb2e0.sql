DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anyone can create messages" ON public.messages;

REVOKE INSERT ON public.reservations FROM anon, authenticated;
REVOKE INSERT ON public.messages FROM anon, authenticated;
GRANT ALL ON public.reservations TO service_role;
GRANT ALL ON public.messages TO service_role;

ALTER POLICY "Admins can read user_roles" ON public.user_roles RENAME TO "Users can read their own roles";

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.get_users() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_users() TO service_role;