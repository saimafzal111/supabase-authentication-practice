-- Create inventory type enum
CREATE TYPE inventory_type AS ENUM ('in', 'out', 'damage');

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    type inventory_type NOT NULL DEFAULT 'in',
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all for authenticated users" ON inventory
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
