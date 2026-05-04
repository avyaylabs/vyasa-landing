-- Run this in Supabase: SQL Editor → New query → Run
-- Table where waitlist emails are stored (view/export in Table Editor)

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_key unique (email)
);

comment on table public.waitlist_signups is 'Vyasa landing waitlist signups';

-- Optional: tighten privileges (service role bypasses RLS; anon has no access by default)
alter table public.waitlist_signups enable row level security;
