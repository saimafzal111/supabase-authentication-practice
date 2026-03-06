"use client"

import { DataTable } from "./data-table"
import { getColumns } from "./columns"
import { useInventory, InventoryItem, useDeleteInventory } from "@/hooks/inventory/use-inventory"
import { useState } from "react"
import { EditInventory } from "@/components/edit-inventory"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function Page() {
    const { data, isLoading } = useInventory()
    const deleteMutation = useDeleteInventory()
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
    const [editOpen, setEditOpen] = useState(false)

    const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

    const handleEdit = (item: InventoryItem) => {
        setEditingItem(item)
        setEditOpen(true)
    }

    const handleDeleteRequest = (item: InventoryItem) => {
        setItemToDelete(item)
        setDeleteConfirmOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return
        try {
            await deleteMutation.mutateAsync(itemToDelete.id)
            toast.success("Inventory item deleted successfully")
            setDeleteConfirmOpen(false)
            setItemToDelete(null)
        } catch (error: any) {
            toast.error(error.message || "Failed to delete item")
        }
    }

    const columns = getColumns(handleEdit, handleDeleteRequest)

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6 text-foreground">Inventory Management</h1>
            <div className="px-4 lg:px-6">
                <DataTable
                    columns={columns}
                    data={data || []}
                    filterKey="name"
                    onEdit={handleEdit}
                />
            </div>

            <EditInventory
                item={editingItem}
                open={editOpen}
                onOpenChange={setEditOpen}
            />

            <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the inventory record for
                            <span className="font-semibold text-foreground"> "{itemToDelete?.name}"</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete Item"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
