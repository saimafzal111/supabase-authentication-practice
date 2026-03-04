-- SQL to setup the customers table for the new signup fields
-- Run this in your Supabase SQL Editor

-- If the table doesn't exist, create it:
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    name TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- If you already have the table and want to ensure it matches the new signup form:
-- (Uncomment these if you need to add columns)
-- ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS name TEXT;
-- ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS email TEXT;

-- Set up Row Level Security (RLS)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view own customer data" ON public.customers
    FOR SELECT USING (auth.uid() = id);

-- Allow users to insert their own profile during signup
CREATE POLICY "Users can insert own customer data" ON public.customers
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own customer data" ON public.customers
    FOR UPDATE USING (auth.uid() = id);
