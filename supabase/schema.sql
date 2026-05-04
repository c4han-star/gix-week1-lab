-- Run in Supabase SQL Editor (disable RLS on these tables for this lab, or add permissive policies).
-- Week 5 TECHIN 510 — Equipment checkouts (Component B) + Events (Component E)

create table if not exists public.equipment_checkouts (
  id uuid primary key default gen_random_uuid(),
  item_name text not null,
  borrower_name text not null,
  checked_out_at timestamptz not null default now(),
  due_at timestamptz,
  returned_at timestamptz,
  status text not null check (status in ('out', 'returned', 'overdue')),
  notes text
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  starts_at timestamptz not null,
  location text,
  created_at timestamptz default now()
);

-- Sample equipment (Maason / checkout narrative)
insert into public.equipment_checkouts (item_name, borrower_name, due_at, status, notes)
values
  ('Sony A7 body + lens kit', 'Team Aurora', now() + interval '3 days', 'out', 'Return to desk after final demo'),
  ('USB-C hub (10-port)', 'Team Bridge', now() - interval '1 day', 'overdue', 'Needs follow-up email'),
  ('Rode Wireless GO II', 'Team Nebula', now() + interval '7 days', 'out', 'Checked for podcast interview setup');

-- Sample GIX events (Component E)
insert into public.events (title, description, category, starts_at, location)
values
  ('Career panel: PM in hardware', 'Alumni from Amazon Ring', 'career', now() + interval '2 days', 'GIX Studio'),
  ('Workshop: Figma → code', 'Hands-on with design tokens', 'workshop', now() + interval '4 days', 'Lab 2'),
  ('Guest lecture: AR optics', 'Industry speaker (NVIDIA)', 'guest_lecture', now() + interval '6 days', 'Lecture hall'),
  ('Cohort social & demo prep', 'Pizza + dry run', 'social', now() + interval '1 day', 'Commons'),
  ('Resume clinic', '1:1 slots', 'career', now() + interval '5 days', 'Co-working area');
