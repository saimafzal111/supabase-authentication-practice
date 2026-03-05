
import { DataTable } from "./data-table"
import { columns, Product } from "./columns"

async function getData(): Promise<Product[]> {
    return [
        { id: "1", name: "Gaming Headset", category: "Audio", price: 89.99, stock: 50 },
        { id: "2", name: "Mechanical Keyboard", category: "Peripherals", price: 129.99, stock: 30 },
        { id: "3", name: "Monitor 27-inch", category: "Display", price: 299.99, stock: 20 },
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Products</h1>
            <div className="px-4 lg:px-6">
                <DataTable columns={columns} data={data} filterKey="name" />
            </div>
        </div>
    )
}
