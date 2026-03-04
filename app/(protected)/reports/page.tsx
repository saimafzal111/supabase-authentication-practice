"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns, Report } from "./columns"

async function getData(): Promise<Report[]> {
    return [
        { id: "1", title: "Sales Analysis 2024", type: "Monthly", generatedAt: "2024-03-01", status: "Completed" },
        { id: "2", title: "Inventory Report Q1", type: "Quarterly", generatedAt: "2024-04-01", status: "Processing" },
        { id: "3", title: "Annual Audit 2023", type: "Annual", generatedAt: "2024-01-15", status: "Failed" },
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold">Reports</h1>
            <div className="rounded-md bg-white p-4 shadow-sm">
                <DataTable columns={columns} data={data} filterKey="title" />
            </div>
        </div>
    )
}