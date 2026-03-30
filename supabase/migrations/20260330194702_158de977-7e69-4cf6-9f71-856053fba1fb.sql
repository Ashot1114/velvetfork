
-- 1. Protect user_roles from privilege escalation
CREATE POLICY "Only admins can insert user_roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update user_roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete user_roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Restrict messages INSERT to only allow 'new' status
DROP POLICY IF EXISTS "Anyone can create messages" ON public.messages;
CREATE POLICY "Anyone can create messages"
ON public.messages FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new');

-- 3. Restrict reservations INSERT to only allow 'new' status
DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;
CREATE POLICY "Anyone can create reservations"
ON public.reservations FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new');
