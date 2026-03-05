-- Create products table
create table if not exists public.products (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    volume text not null,
    price numeric not null
);

-- Set up Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policy to allow all actions for authenticated users (for simplicity in this practice app)
create policy "Allow all actions for authenticated users"
on public.products
for all
to authenticated
using (true)
with check (true);
