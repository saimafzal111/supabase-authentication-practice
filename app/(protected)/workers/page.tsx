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
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between px-4 pt-4 lg:px-6">
                <h1 className="text-2xl font-bold">Workers</h1>
            </div>
            <div className="px-4 lg:px-6">
                <DataTable data={workers} filterKey="name" />
            </div>
        </div>
    )
}
