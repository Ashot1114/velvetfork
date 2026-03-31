-- Allow authenticated users to read their own reservations by matching email
CREATE POLICY "Users can read own reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (email = (SELECT auth.jwt() ->> 'email'));