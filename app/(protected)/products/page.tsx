import { DataTable } from "@/components/ui/data-table"
import { columns, Payment } from "./columns"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold">Products</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}