# Implementation Plan - Cross-Page Action Button Updates

Update action buttons across all protected tables to use direct icon buttons with a refined style (white background, light border).

## Proposed Changes

### Refined Button Style
- **Edit Button**: `variant="outline"`, `bg-white`, `border-input`, `hover:bg-accent`, `hover:text-primary`.
- **Delete Button**: `variant="outline"`, `bg-white`, `border-input`, `hover:bg-accent`, `hover:text-destructive`.
- **Gap**: `gap-2` between buttons.

### Component Updates

#### [MODIFY] Multiple `columns.tsx` files
Apply the following pattern to `actions` column:
1. Replace `DropdownMenu` with a `div` containing two `Button` components.
2. Clean up unused `lucide-react` and `DropdownMenu` imports.
3. Use the refined styling mentioned above.

Target Files:
- [app/(protected)/customers/columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/customers/columns.tsx)
- [app/(protected)/inventory/columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/inventory/columns.tsx)
- [app/(protected)/products/columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/products/columns.tsx)
- [app/(protected)/workers/columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/workers/columns.tsx)
- [app/(protected)/finance/columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/finance/columns.tsx)
- [app/(protected)/reports/columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/reports/columns.tsx)

## Verification Plan

### Automated Verification
- Check for lint errors after mass edits.

### Manual Verification
- Verify each page: Customers, Inventory, Products, Workers, Finance, Reports.
- Ensure Edit/Delete buttons are visible, correctly styled, and functional.
