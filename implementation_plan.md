# Implement View Dialogs and Clean Action Headers

The user wants to remove the "Actions" header text from all tables and add a "View" icon that opens a dialog with details for that entity.

## Proposed Changes

### [Components]

#### [NEW] [view-worker.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/view-worker.tsx)
#### [NEW] [view-inventory.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/view-inventory.tsx)
#### [NEW] [view-product.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/view-product.tsx)
#### [NEW] [view-customer.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/view-customer.tsx)
#### [NEW] [view-finance.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/view-finance.tsx)
#### [NEW] [view-report.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/view-report.tsx)

Each component will show entity details in a read-only Dialog.

### [Workers]
#### [MODIFY] [columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/workers/columns.tsx)
- Add `onView` to `ColumnsProps`.
- Add `Eye` icon button.
- Clear "Actions" header text.
#### [MODIFY] [data-table.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/workers/data-table.tsx)
- Add `viewWorker` state.
- Render `<ViewWorker />`.

### [Inventory]
#### [MODIFY] [columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/inventory/columns.tsx)
- Add `onView` callback.
- Add `Eye` icon button.
- Clear "Actions" header text.
#### [MODIFY] [data-table.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/inventory/data-table.tsx)
- Add `viewItem` state.
- Render `<ViewInventory />`.

*(Similar changes for Products, Customers, Finance, and Reports)*

## Verification Plan

### Automated Tests
- Run `npx tsc --noEmit` to verify type safety after adding `onView` callbacks.

### Manual Verification
- Click the "Eye" icon on each table to verify dialog opens with correct data.
- Confirm "Actions" header is empty but column remains.
