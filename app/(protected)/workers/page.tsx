import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DataTable } from "./data-table"
import { WorkerDef } from "./columns"

export default async function WorkersPage() {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        redirect('/login')
    }

    // Fetch workers initially on the server
    const { data, error } = await supabase
        .from('workers')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching workers serverside:", error.message)
    }

    const workers: WorkerDef[] = data || []

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Workers</h1>
                <p className="text-muted-foreground">
                    Manage your employees and their salaries.
                </p>
            </div>
            <DataTable data={workers} filterKey="name" />
        </div>
    )
}
