"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { InventoryItem } from "@/hooks/inventory/use-inventory"

export const getColumns = (
    onView: (item: InventoryItem) => void,
    onEdit: (item: InventoryItem) => void,
    onDelete: (item: InventoryItem) => void
): ColumnDef<InventoryItem>[] => [
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
            accessorKey: "quantity",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-4"
                    >
                        Quantity
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div className="font-medium pl-2">{row.getValue("quantity")}</div>
            },
        },
        {
            accessorKey: "type",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-4"
                    >
                        Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const type = row.getValue("type") as string
                return (
                    <div className="pl-2">
                        <Badge
                            variant={
                                type === "in" ? "default" : type === "out" ? "secondary" : "destructive"
                            }
                            className="capitalize"
                        >
                            {type}
                        </Badge>
                    </div>
                )
            },
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-4"
                    >
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("date"))
                return <div className="pl-2">{date.toLocaleDateString()}</div>
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center"></div>,
            cell: ({ row }) => {
                const item = row.original

                return (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                            onClick={() => onView(item)}
                        >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-primary"
                            onClick={() => onEdit(item)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-input text-muted-foreground hover:text-destructive"
                            onClick={() => onDelete(item)}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                )
            },
        },
    ]