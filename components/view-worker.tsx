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
import { WorkerDef } from "@/app/(protected)/workers/columns"

interface ViewWorkerProps {
    worker: WorkerDef | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewWorker({ worker, open, onOpenChange }: ViewWorkerProps) {
    if (!worker) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Worker Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the worker.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Name:</span>
                        <span className="col-span-3">{worker.name}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Salary:</span>
                        <span className="col-span-3">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(worker.salary)}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Joined:</span>
                        <span className="col-span-3">
                            {new Date(worker.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">ID:</span>
                        <span className="col-span-3 text-xs text-muted-foreground font-mono">
                            {worker.id}
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
