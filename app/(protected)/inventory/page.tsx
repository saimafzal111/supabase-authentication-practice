
import { DataTable } from "./data-table"
import { columns, InventoryItem } from "./columns"

async function getData(): Promise<InventoryItem[]> {
    return [
        { id: "1", productName: "Laptop Pro 14", sku: "LP-14-B", stock: 15, price: 1299.99 },
        { id: "2", productName: "Wireless Mouse", sku: "WM-01-W", stock: 120, price: 29.99 },
        { id: "3", productName: "USB-C Hub", sku: "UCH-V5", stock: 45, price: 49.99 },
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Inventory</h1>
            <div className="px-4 lg:px-6">
                <DataTable columns={columns} data={data} filterKey="productName" />
            </div>
        </div>
    )
}
