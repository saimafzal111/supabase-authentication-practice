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
import { Finance } from "@/app/(protected)/finance/columns"

interface ViewFinanceProps {
    finance: Finance | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewFinance({ finance, open, onOpenChange }: ViewFinanceProps) {
    if (!finance) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Finance Record Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the invoice/finance record.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Invoice ID:</span>
                        <span className="col-span-3 font-mono">{finance.invoiceId}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Amount:</span>
                        <span className="col-span-3 font-medium">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(finance.amount)}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Status:</span>
                        <div className="col-span-3">
                            <Badge variant={finance.status === "Paid" ? "default" : finance.status === "Unpaid" ? "outline" : "destructive"}>
                                {finance.status}
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Date:</span>
                        <span className="col-span-3">
                            {new Date(finance.date).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">ID:</span>
                        <span className="col-span-3 text-xs text-muted-foreground font-mono">
                            {finance.id}
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
