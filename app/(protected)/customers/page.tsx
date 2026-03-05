
import { createClient } from "@/lib/supabase/server"
import { DataTable } from "./data-table"
import { Customer } from "./columns"

async function getData(): Promise<Customer[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching customers:', error.message)
        return []
    }

    return data ?? []
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Customers</h1>
            <div className="px-4 lg:px-6">
                <DataTable data={data} filterKey="name" />
            </div>
        </div>
    )
}
