"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type Product = {
    id: string
    name: string
    volume: string
    price: number
    created_at?: string
}

type ColumnsProps = {
    onView: (product: Product) => void
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export function getColumns({ onView, onEdit, onDelete }: ColumnsProps): ColumnDef<Product>[] {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "volume",
            header: "Volume",
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right pr-4">Price</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("en-US").format(amount)
                return <div className="text-right font-medium pr-4">{formatted}</div>
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center"></div>,
            cell: ({ row }) => {
                const product = row.original
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                            onClick={() => onView(product)}
                        >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                            onClick={() => onEdit(product)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-destructive"
                            onClick={() => onDelete(product)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                )
            },
        },
    ]
}