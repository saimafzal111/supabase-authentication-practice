# Task: Responsive Sidebar & Report Editing

- [x] Make Sidebar Responsive
    - [x] Update `SidebarProvider` or CSS to hide sidebar on small screens
    - [x] Ensure `SidebarTrigger` is always accessible or visible when needed
- [x] Implement Report Editing
    - [x] Create `app/api/reports/update/[id]/route.ts`
    - [x] Create `components/edit-report.tsx`
    - [x] Update `hooks/reports/use-reports.ts` with `useEditReport`
    - [x] Update `app/(protected)/reports/columns.tsx` to include edit action
    - [x] Update `app/(protected)/reports/data-table.tsx` to handle edit state
- [ ] Verification [ ]
    - [ ] Test sidebar behavior on different screen sizes
    - [ ] Test editing a report and verifying real-time update
