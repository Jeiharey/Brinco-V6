CREATE TABLE public.booking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_slug TEXT NOT NULL,
  service_title TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  due_at TIMESTAMP WITH TIME ZONE,
  due_text TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.booking_requests TO service_role;

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages booking requests"
ON public.booking_requests FOR ALL
TO service_role
USING (true) WITH CHECK (true);