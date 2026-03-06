# Task Checklist

- [ ] Remove "Actions" header text and add View icon [/]
    - [ ] `workers/columns.tsx`
    - [ ] `inventory/columns.tsx`
    - [ ] `products/columns.tsx`
    - [ ] `customers/columns.tsx`
    - [ ] `finance/columns.tsx`
    - [ ] `reports/columns.tsx`
- [ ] Create View Dialog Components [/]
    - [ ] `ViewWorker`
    - [ ] `ViewInventory`
    - [ ] `ViewProduct`
    - [ ] `ViewCustomer`
    - [ ] `ViewFinance`
    - [ ] `ViewReport`
- [ ] Integrate View Dialogs into DataTables [/]
    - [ ] Update `DataTable` components to handle View state
- [ ] Verify Fixes
    - [ ] Run `npx tsc --noEmit`
