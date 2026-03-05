## Customer Management Integration

I've implemented the "Add Customer" feature specifically using the API fetching method as requested.

### API Routes
- **Created `app/api/customers/route.ts`**:
    - `POST`: Handles customer creation and triggers `revalidatePath('/customers')`.
    - `GET`: Fetches the latest customer list from Supabase.

### Custom Hooks
- **Created `hooks/customers/use-add-customer.ts`**:
    - Uses TanStack Query `useMutation` with the native `fetch` API.
    - Specifically avoids Server Actions for this feature.

### UI Components
- **AddCustomer Dialog (`components/add-customer.tsx`)**:
    - Refactored to use `shadcn/ui` Form components and `react-hook-form`.
    - Integrated the `useAddCustomer` hook.
    - Added `router.refresh()` on success to ensure the Server Component list updates immediately.
- **DataTable (`app/(protected)/customers/data-table.tsx`)**:
    - Integrated the `AddCustomer` component as the primary action.
- **Columns (`app/(protected)/customers/columns.tsx`)**:
    - Updated to match the actual database schema (`name`, `email`, `created_at`).

## Refined Error Handling
- Updated both **Login** and **Signup** forms to use a **Global Error Message** for generic authentication failures (like "Invalid credentials").
- This prevents the UI from incorrectly highlighting valid fields (e.g., highlighting Email when only the Password was wrong).
- Specific field-level errors (e.g., "Email already registered") still appear directly under the relevant field.
