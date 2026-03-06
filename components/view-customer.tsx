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
import { Customer } from "@/app/(protected)/customers/columns"

interface ViewCustomerProps {
    customer: Customer | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewCustomer({ customer, open, onOpenChange }: ViewCustomerProps) {
    if (!customer) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Customer Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the customer.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Name:</span>
                        <span className="col-span-3">{customer.name}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Phone:</span>
                        <span className="col-span-3">{customer.phone || "—"}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Address:</span>
                        <span className="col-span-3">{customer.address || "—"}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Status:</span>
                        <div className="col-span-3">
                            <Badge variant={customer.status === "Active" ? "default" : customer.status === "Pending" ? "secondary" : "outline"}>
                                {customer.status}
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">ID:</span>
                        <span className="col-span-3 text-xs text-muted-foreground font-mono">
                            {customer.id}
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
