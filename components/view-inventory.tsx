"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InventoryItem } from "@/hooks/inventory/use-inventory"

interface ViewInventoryProps {
    item: InventoryItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewInventory({ item, open, onOpenChange }: ViewInventoryProps) {
    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Inventory Item Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the inventory record.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Name:</span>
                        <span className="col-span-3">{item.name}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Quantity:</span>
                        <span className="col-span-3 font-medium">{item.quantity}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Type:</span>
                        <div className="col-span-3">
                            <Badge
                                variant={
                                    item.type === "in" ? "default" : item.type === "out" ? "secondary" : "destructive"
                                }
                                className="capitalize"
                            >
                                {item.type}
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Date:</span>
                        <span className="col-span-3">
                            {new Date(item.date).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">ID:</span>
                        <span className="col-span-3 text-xs text-muted-foreground font-mono">
                            {item.id}
                        </span>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
