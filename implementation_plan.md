# Sidebar Simplification and Logout Plan

This plan outlines the steps to streamline the sidebar navigation, implement a working logout button, and ensure the dashboard remains simple while having a functional navigation system.

## Proposed Changes

### [Sidebar Simplification]
- [MODIFY] [components/app-sidebar.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/app-sidebar.tsx):
    - Remove `navDocuments` and `navSecondary` from the data and the rendering.
    - Update `navMain` to contain: Dashboard, Customers, Finance, Inventory, Products, Reports, and Workers with their correct icons and URLs.

### [Logout Functionality]
- [MODIFY] [components/nav-user.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/nav-user.tsx):
    - Import the `logout` server action.
    - Wrap the "Log out" dropdown item with a form or a button that calls the logout action.

### [Dashboard Cleanup]
- [MODIFY] [app/(protected)/dashboard/page.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/dashboard/page.tsx):
    - Remove the complex UI (charts, tables) and revert to a simple "Welcome to Dashboard" message.

### [Navigation Improvements]
- [MODIFY] [components/nav-main.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/nav-main.tsx):
    - Ensure `SidebarMenuButton` uses `Link` from `next/link` with `asChild` so navigation happens without full page reloads.

## Verification Plan

### Manual Verification
1.  **Sidebar**: Check that only the main navigation and user profile are visible.
2.  **Navigation**: Click through all items and verify they open the correct pages.
3.  **Logout**: Click the user profile, then "Log out", and verify you are redirected to the login page.
4.  **Dashboard**: Verify the dashboard is now simple text again.
