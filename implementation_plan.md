# Dashboard & Auth Implementation Plan

Implement a dashboard with a sidebar, customer table, and auth pages (login/signup) using Next.js 16, Supabase, and Shadcn UI.

## User Review Required

> [!IMPORTANT]
> The user needs to setup the Supabase project first. I am providing the instructions for this.

## Proposed Changes

### [Supabase Integration]
- [x] Configure `.env.local`.
- [x] Correct `lib/supabase/client.ts` and `lib/supabase/server.ts`.
- [x] Setup `middleware.ts` for auth (Replacing `proxy.ts`).

### [UI Components]
- Install Shadcn components: `card`, `input`, `label`, `form`.

### [Authentication Pages]
#### [NEW] [login/page.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(auth)/login/page.tsx)
#### [NEW] [signup/page.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(auth)/signup/page.tsx)

### [Dashboard Layout]
#### [NEW] [components/app-sidebar.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/app-sidebar.tsx)
#### [MODIFY] [app/layout.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/layout.tsx) - Add Sidebar documentation.

### [Customers Page]
#### [NEW] [app/(protected)/dashboard/page.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/dashboard/page.tsx)

### [Customer CRUD]
- Setup Supabase Policies (SQL Editor).
- [NEW] [components/create-customer-modal.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/create-customer-modal.tsx)
- [NEW] [components/edit-customer-modal.tsx](file:///d:/OneDrive/Desktop/supabase-auth-practice/components/edit-customer-modal.tsx)
- [MODIFY] [app/(protected)/dashboard/actions.ts](file:///d:/OneDrive/Desktop/supabase-auth-practice/app/(protected)/dashboard/actions.ts) - Implement CRUD server actions.

## Verification Plan

### Manual Verification
1. Test signup with a new user.
2. Test login with the created user.
3. Verify sidebar navigation.
4. Verify customer table display.
