# Real-Time Dashboard Implementation Plan

Enable real-time data synchronization on the dashboard using Supabase Realtime and React Query.

## Proposed Changes

### [Hooks]
- Create `hooks/use-realtime-sync.ts`: A custom hook to subscribe to table changes (`workers`, `inventory`, `customers`, `finance`) and invalidate relevant queries.

### [Dashboard]
- Update `app/(protected)/dashboard/page.tsx`: Integrate the `useRealtimeSync` hook to ensure all statistics and tables reflect changes immediately.

## Verification Plan
1. Open the dashboard.
2. Manually modify a record in the Supabase database (e.g., change a worker's salary or an inventory count).
3. Observe the dashboard updating automatically without a page refresh.
