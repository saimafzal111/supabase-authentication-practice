
import { DataTable } from "./data-table"
import { columns, Finance } from "./columns"

async function getData(): Promise<Finance[]> {
    return [
        { id: "1", invoiceId: "INV-101", amount: 1500.00, status: "Paid", date: "2024-03-01" },
        { id: "2", invoiceId: "INV-102", amount: 450.00, status: "Unpaid", date: "2024-03-02" },
        { id: "3", invoiceId: "INV-103", amount: 2300.00, status: "Overdue", date: "2024-02-15" },
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Finance</h1>
            <div className="px-4 lg:px-6">
                <DataTable columns={columns} data={data} filterKey="invoiceId" />
            </div>
        </div>
    )
}
