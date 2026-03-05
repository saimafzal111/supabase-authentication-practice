
import { DataTable } from "./data-table"
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
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Workers</h1>
            <div className="px-4 lg:px-6">
                <DataTable columns={columns} data={data} filterKey="name" />
            </div>
        </div>
    )
}
