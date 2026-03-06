"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Check, Trash2, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export type Finance = {
    id: string
    invoiceId: string
    amount: number
    status: "Paid" | "Unpaid" | "Overdue"
    date: string
}

type ColumnsProps = {
    onView: (finance: Finance) => void
    onMarkAsPaid: (finance: Finance) => void
    onDelete: (finance: Finance) => void
}

export const getColumns = ({ onView, onMarkAsPaid, onDelete }: ColumnsProps): ColumnDef<Finance>[] => [
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
        accessorKey: "invoiceId",
        header: "Invoice ID",
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant={status === "Paid" ? "default" : status === "Unpaid" ? "outline" : "destructive"}>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        id: "actions",
        header: () => <div className="text-center"></div>,
        cell: ({ row }) => {
            const finance = row.original
            return (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                        title="View invoice"
                        onClick={() => onView(finance)}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View invoice</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-green-600"
                        title="Mark as paid"
                        onClick={() => onMarkAsPaid(finance)}
                    >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as paid</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-destructive"
                        title="Delete"
                        onClick={() => onDelete(finance)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            )
        },
    },
]