
-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  requests TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert reservations (public form)
CREATE POLICY "Anyone can create reservations" ON public.reservations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Anyone can insert messages (public form)
CREATE POLICY "Anyone can create messages" ON public.messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only authenticated users (admin) can read reservations
CREATE POLICY "Authenticated users can read reservations" ON public.reservations
  FOR SELECT TO authenticated USING (true);

-- Only authenticated users (admin) can update reservations
CREATE POLICY "Authenticated users can update reservations" ON public.reservations
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated users (admin) can read messages
CREATE POLICY "Authenticated users can read messages" ON public.messages
  FOR SELECT TO authenticated USING (true);

-- Only authenticated users (admin) can update messages
CREATE POLICY "Authenticated users can update messages" ON public.messages
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated users (admin) can delete messages
CREATE POLICY "Authenticated users can delete messages" ON public.messages
  FOR DELETE TO authenticated USING (true);
