# Goal Description

Add a new "Workers" management feature to the application, allowing the user to view, add, edit, and delete workers. This will function similarly to the existing Customers feature but will track `name` and `salary`.

## Proposed Changes

### Database Schema (Supabase)

We need to create a new `workers` table in Supabase. I will provide the user with the SQL query to run in the Supabase SQL Editor.

*   `id`: UUID (Primary Key)
*   `created_at`: Timestamp
*   `name`: Text (Required)
*   `salary`: Numeric/Text (Required)

### Backend API Routes

We will create a new set of API routes to handle CRUD operations for workers.

#### [NEW] app/api/workers/route.ts
*   `GET`: Fetch all workers from the `workers` table, ordered by `created_at`.
*   `POST`: Insert a new worker (`name`, `salary`) into the `workers` table.

#### [NEW] app/api/workers/[id]/route.ts
*   `PATCH`: Update an existing worker's details (`name`, `salary`).
*   `DELETE`: Delete a worker by `id`.

### Frontend Data Hooks (React Query)

We will create custom hooks to interact with our new API routes, handling caching and revalidation automatically.

#### [NEW] hooks/workers/use-workers.ts
*   `useGetWorkers`: Fetch workers data.

#### [NEW] hooks/workers/use-add-worker.ts
*   `useAddWorker`: Mutation to add a new worker, including Zod schema validation.

#### [NEW] hooks/workers/use-edit-worker.ts
*   `useEditWorker`: Mutation to update an existing worker, including Zod schema validation.
*   `useDeleteWorker`: Mutation to delete a worker.

### Frontend UI Components

We will build the UI components for the Workers page, reusing the design language from the Customers page.

#### [NEW] components/add-worker.tsx
*   A Dialog component containing a `react-hook-form` to add a new worker (Name, Salary).

#### [NEW] components/edit-worker.tsx
*   A Dialog component to edit an existing worker's details.

#### [NEW] app/(protected)/workers/columns.tsx
*   Defines the data table columns: Name, Salary, and Actions (Edit/Delete).
*   Includes the DropdownMenu for Edit and Delete actions.

#### [NEW] app/(protected)/workers/data-table.tsx
*   The reusable data table component specifically typed for Workers.

#### [NEW] app/(protected)/workers/page.tsx
*   The main page component that fetches data and renders the `DataTable` and `AddWorker` button.

### Navigation

#### [MODIFY] components/layout/sidebar.tsx (or equivalent navigation file)
*   Add a link to `/workers` in the main application navigation menu.

## Verification Plan

### Manual Verification
1.  **Database:** User runs the provided SQL query in Supabase.
2.  **UI Navigation:** Click the new "Workers" link in the sidebar to load the `/workers` page.
3.  **Create:** Click "Add Worker", fill out the form (Name, Salary), and submit. Verify the worker appears in the table.
4.  **Read:** Verify the list of workers correctly displays on page load.
5.  **Update:** Click the "Edit" action on a worker, change the salary, and save. Verify the table updates.
6.  **Delete:** Click the "Delete" action on a worker and confirm. Verify the worker is removed from the table.
