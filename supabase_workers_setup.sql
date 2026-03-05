-- Create a table for workers
create table public.workers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  salary numeric not null
);

-- Turn on Row Level Security (RLS)
alter table public.workers enable row level security;

-- Create a policy that allows anyone to read/write for now (testing)
create policy "Allow public full access" on public.workers
  for all using (true) with check (true);
