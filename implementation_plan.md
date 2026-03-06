# Implementation Plan - Dashboard Data Integration

Integrate real and existing mock data into the dashboard without changing its layout or formatting.

## User Review Required

> [!IMPORTANT]
> Finance and Reports data are currently mock in their respective pages. The dashboard will reflect these mock values until a real backend is implemented for those modules.
> Inventory, Workers, Products, and Customers data will be real.

## Proposed Changes

### Dashboard Component Refactoring

#### [MODIFY] [section-cards.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/section-cards.tsx)
- Update the component to accept props for its statistics: `revenue`, `customers`, `activeWorkers`, `growth`.
- Pass these props down to replace the hardcoded values.

### Dashboard Page Integration

#### [MODIFY] [page.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/dashboard/page.tsx)
- Convert to a Client Component (`"use client"`) if necessary to use existing data hooks.
- Use `useInventory`, `useWorkers`, `useProducts`, `useCustomers` hooks to fetch real data.
- Fetch Finance and Reports mock data (matching the logic in their pages).
- Calculate totals and pass them to `SectionCards`.

### Data Table Update

#### [MODIFY] [data-table.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/dashboard/data-table.tsx)
- Update the dashboard's "Recent Transactions" table to handle dynamic data.

## Verification Plan

### Manual Verification
- Navigate to the Dashboard and verify that the counts in the cards match the counts on the respective pages (Inventory, Workers, etc.).
- Verify that the "Recent Transactions" table displays data consistently.
- Ensure the layout, charts, and card styles remain unchanged.
