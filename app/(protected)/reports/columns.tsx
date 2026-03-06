"use client"

import { ColumnDef } from "@tanstack/react-table"
import { FileDown, Eye, Pencil, Trash2, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export type Report = {
    id: string
    title: string
    type: "Monthly" | "Quarterly" | "Annual"
    generatedAt: string
    status: "Completed" | "Processing" | "Failed"
}

type ColumnsProps = {
    onDownload: (report: Report) => void
    onView: (report: Report) => void
    onEdit: (report: Report) => void
    onDelete: (report: Report) => void
}

export const getColumns = ({ onDownload, onView, onEdit, onDelete }: ColumnsProps): ColumnDef<Report>[] => [
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
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <Badge variant="secondary">{row.getValue("type")}</Badge>,
    },
    {
        accessorKey: "generatedAt",
        header: "Generated At",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant={status === "Completed" ? "default" : status === "Processing" ? "outline" : "destructive"}>
                    {status}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center"></div>,
        cell: ({ row }) => {
            const report = row.original
            return (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                        title="Download PDF"
                        onClick={() => onDownload(report)}
                    >
                        <FileDown className="h-4 w-4" />
                        <span className="sr-only">Download PDF</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                        title="View details"
                        onClick={() => onView(report)}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                        title="Edit"
                        onClick={() => onEdit(report)}
                    >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-destructive"
                        title="Delete"
                        onClick={() => onDelete(report)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            )
        },
    },
]