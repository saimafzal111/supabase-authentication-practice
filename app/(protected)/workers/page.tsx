"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns, Worker } from "./columns"

async function getData(): Promise<Worker[]> {
    return [
        { id: "1", name: "Alice Johnson", department: "Engineering", role: "Software Engineer", joiningDate: "2023-01-15" },
        { id: "2", name: "Bob Wilson", department: "HR", role: "HR Manager", joiningDate: "2022-06-10" },
        { id: "3", name: "Charlie Davis", department: "Design", role: "UI Designer", joiningDate: "2023-11-20" },
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold">Workers</h1>
            <div className="rounded-md bg-white p-4 shadow-sm">
                <DataTable columns={columns} data={data} filterKey="name" />
            </div>
        </div>
    )
}