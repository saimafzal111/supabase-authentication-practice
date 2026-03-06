"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export type Customer = {
    id: string
    name: string
    phone: string | null
    address: string | null
    status: "Active" | "Inactive" | "Pending"
    created_at: string
}

type ColumnsProps = {
    onView: (customer: Customer) => void
    onEdit: (customer: Customer) => void
    onDelete: (customer: Customer) => void
}

export function getColumns({ onView, onEdit, onDelete }: ColumnsProps): ColumnDef<Customer>[] {
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
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => row.getValue("phone") || <span className="text-muted-foreground text-xs">—</span>,
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => row.getValue("address") || <span className="text-muted-foreground text-xs">—</span>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                const variant =
                    status === "Active" ? "default" :
                        status === "Pending" ? "secondary" : "outline"
                return <Badge variant={variant}>{status}</Badge>
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center"></div>,
            cell: ({ row }) => {
                const customer = row.original
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                            onClick={() => onView(customer)}
                        >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                            onClick={() => onEdit(customer)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-destructive"
                            onClick={() => onDelete(customer)}
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
