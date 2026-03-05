
import { DataTable } from "./data-table"
import { columns, Customer } from "./columns"

async function getData(): Promise<Customer[]> {
    return [
        { id: "1", name: "Saim Afzal", email: "saim@example.com", role: "Admin", status: "Active" },
        { id: "2", name: "John Doe", email: "john@example.com", role: "Member", status: "Active" },
        { id: "3", name: "Jane Smith", email: "jane@example.com", role: "Guest", status: "Inactive" },
        { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Member", status: "Pending" },
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Customers</h1>
            <div className="px-4 lg:px-6">
                <DataTable columns={columns} data={data} filterKey="name" />
            </div>
        </div>
    )
}
