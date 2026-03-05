# Implementation Plan - Update Products and Project Name

Change the project name to "Water Inventory Management" and update the `products` table to track water bottle inventory with specific columns: `name`, `volume`, and `price`.

## Proposed Changes

### Project Identity
- **[DONE] [package.json](file:///d:/OneDrive/Desktop/supabase-auth-practice/package.json)**: Updated the name to `water-inventory-management`.
- **[DONE] [app-sidebar.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/app-sidebar.tsx)**: Updated logo title to "Water Inventory Management".
- **[DONE] [layout.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/layout.tsx)**: Updated metadata title.

### Database (Supabase)
- **[DONE] [supabase_products_setup.sql](file:///d:/OneDrive/Desktop/supabase-auth-practice/supabase_products_setup.sql)**: SQL script to create the `products` table with columns: `id`, `name`, `volume`, `price`, `created_at`.

### API Layer
- **[NEW] [app/api/products/route.ts](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/api/products/route.ts)**: GET and POST handlers for products.
- **[NEW] [app/api/products/[id]/route.ts](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/api/products/[id]/route.ts)**: PATCH and DELETE handlers for products.

### Frontend
- **[MODIFY] [columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/products/columns.tsx)**: Update product type and table columns (`name`, `volume`, `price`).
- **[MODIFY] [page.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/products/page.tsx)**: Fetch real data using hooks.
- **[NEW] [hooks/products/](file:///d:/OneDrive/Desktop/supabase-auth-practice/hooks/products/)**: Add data fetching and mutation hooks (`use-products.ts`, `use-add-product.ts`, `use-edit-product.ts`).
- **[NEW] [components/add-product.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/add-product.tsx)**: Form to add product.
- **[NEW] [components/edit-product.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/edit-product.tsx)**: Form to edit product.

## Verification Plan
1. User runs `supabase_products_setup.sql` in Supabase SQL Editor.
2. Verify sidebar and project metadata update in the browser.
3. Test adding a new product: Name, Volume, Price.
4. Test editing a product.
5. Test deleting a product.
