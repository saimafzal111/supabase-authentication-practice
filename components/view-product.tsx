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
import { Product } from "@/app/(protected)/products/columns"

interface ViewProductProps {
    product: Product | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewProduct({ product, open, onOpenChange }: ViewProductProps) {
    if (!product) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the product.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Name:</span>
                        <span className="col-span-3">{product.name}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Volume:</span>
                        <span className="col-span-3">{product.volume}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Price:</span>
                        <span className="col-span-3">
                            <div className="font-medium">{new Intl.NumberFormat("en-PK", {
                                style: "currency",
                                currency: "PKR",
                            }).format(product.price)}</div>
                        </span>
                    </div>
                    {product.created_at && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-semibold">Created:</span>
                            <span className="col-span-3">
                                {new Date(product.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">ID:</span>
                        <span className="col-span-3 text-xs text-muted-foreground font-mono">
                            {product.id}
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
