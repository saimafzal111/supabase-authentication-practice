import { DataTable } from "@/components/ui/data-table"
import { columns, Payment } from "./columns"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 316.00,
            status: "success",
            email: "ken99@example.com",
        },
        {
            id: "489e1d42",
            amount: 242.00,
            status: "success",
            email: "abe45@example.com",
        },
        {
            id: "d3f1e9a2",
            amount: 837.00,
            status: "processing",
            email: "monserrat44@example.com",
        },
        {
            id: "e501b9d4",
            amount: 874.00,
            status: "success",
            email: "silas22@example.com",
        },
        {
            id: "b9c2d1e3",
            amount: 721.00,
            status: "failed",
            email: "carmella@example.com",
        },
    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Customers</h1>
            </div>
            <div className="rounded-md bg-white p-4 shadow-sm">
                <DataTable columns={columns} data={data} filterKey="email" />
            </div>
        </div>
    )
}