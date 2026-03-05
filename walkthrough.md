# Walkthrough - Water Inventory Management Refactor

I have completed the update to "Water Inventory Management" and refactored the products feature to be consistent with the Workers and Customers implementation.

## Key Update
As requested, I have integrated the **Add Product** interaction into the existing button position within the data table. No new buttons were added to the layout; instead, the existing button was made functional.

## Changes Made

### 1. Branding
- Project renamed to **Water Inventory Management**.
- Updated `package.json`, browser metadata, and sidebar title.

### 2. Database (Supabase)
- **Table**: `products` updated with columns: `name`, `volume`, and `price`.
- **Script**: [supabase_products_setup.sql](file:///d:/OneDrive/Desktop/supabase-auth-practice/supabase_products_setup.sql) provides the necessary schema changes.

### 3. Backend API
- Standardized API routes at `/api/products` and `/api/products/[id]` for CRUD operations.

### 4. Frontend Refactor (Consistency)
- **Standardized Columns**: `columns.tsx` now follows the `getColumns` pattern for better state management.
- **Unified DataTable**: `data-table.tsx` now handles Add, Edit, and Delete logic locally, providing a smoother user experience with Dialogs and AlertDialogs.
- **Reusable Hooks**: Data management is powered by React Query via centralized hooks in `hooks/products/`.

## Verification Instructions

1. **Database**: Run the SQL script below in your Supabase SQL Editor if you haven't already.
2. **Branding**: Verify the sidebar shows "Water Inventory Management".
3. **Inventory Management**:
    - Go to the **Products** page.
    - Click the **Add Product** button (in its original location).
    - Test adding, editing, and deleting water bottle types.

```sql
-- Create/Update products table
create table if not exists public.products (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    volume text not null,
    price numeric not null
);

-- Set up Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policy
create policy "Allow all actions for authenticated users"
on public.products
for all
to authenticated
using (true)
with check (true);
```
