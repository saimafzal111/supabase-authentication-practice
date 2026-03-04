"use client"

import { DataTable } from "@/components/ui/data-table"
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
            <h1 className="text-2xl font-bold">Customers</h1>
            <div className="rounded-md bg-white p-4 shadow-sm">
                <DataTable columns={columns} data={data} filterKey="name" />
            </div>
        </div>
    )
}