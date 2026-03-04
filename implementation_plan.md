# Professional Data Tables Implementation Plan

This plan describes how to implement professional data tables for all protected pages using a scalable and reusable approach inspired by shadcn/ui.

## Proposed Folder Structure

We will follow the **Colocation Pattern** for feature-specific table configuration:

```text
components/
  ui/
    data-table.tsx (NEW: Generic shadcn-style wrapper)
app/
  (protected)/
    [feature]/
      page.tsx (Page logic + data fetching)
      columns.tsx (Column definitions for this feature)
```

## Proposed Changes

### [Core UI Component]
- [NEW] [components/ui/data-table.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/ui/data-table.tsx): A clean, reusable TanStack Table wrapper that handles pagination, sorting, and filtering.

### [Feature Pages]

For each of the following routes, we will create `columns.tsx` and update `page.tsx`:
- **Customers**: Name, Email, Role, Status.
- **Finance**: Invoice ID, Amount, Status, Date.
- **Inventory**: Product Name, SKU, Stock, Price.
- **Products**: Name, Category, Price, Stock.
- **Reports**: Title, Type, Generated At, Status.
- **Workers**: Employee Name, Department, Role, Joining Date.

Each `page.tsx` will:
1. Define (or fetch) the data array.
2. Render the generic `<DataTable columns={columns} data={data} />`.

## Verification Plan

### Manual Verification
1.  **Sidebar Check**: Ensure clicking any sidebar item (e.g., Inventory) shows a professional table.
2.  **Responsiveness**: Verify the tables look good on mobile and desktop.
3.  **Navigation**: Ensure the persistent sidebar remains active while browsing different tables.
