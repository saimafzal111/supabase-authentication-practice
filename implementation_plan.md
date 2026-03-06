# Implementation Plan: Responsive Sidebar & Report Editing

## Proposed Changes

### [UI/UX]

#### [MODIFY] [layout.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/layout.tsx)
- The `SidebarProvider` and `Sidebar` components already handle "isMobile" state. I will ensure the `SidebarTrigger` is appropriately used and the sidebar is hidden/collapsed by default on mobile if it isn't already.

### [Reports Feature]

#### [NEW] [route.ts](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/api/reports/update/[id]/route.ts)
- Add PATCH handler for reports.

#### [NEW] [edit-report.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/edit-report.tsx)
- Create the edit dialog component for reports.

#### [MODIFY] [use-reports.ts](file:///d:/OneDrive/Desktop/supabase-auth-practice/hooks/reports/use-reports.ts)
- Add `useEditReport` mutation.

#### [MODIFY] [columns.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/reports/columns.tsx)
- Add the edit button to actions.

#### [MODIFY] [data-table.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/reports/data-table.tsx)
- Add state for editing and integrate `EditReport` component.

## Verification Plan

### Automated/Manual Tests
- Resize browser to check sidebar behavior.
- Edit a report and check if toast appears and table updates.
