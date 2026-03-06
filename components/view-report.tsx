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
import { Report } from "@/app/(protected)/reports/columns"

interface ViewReportProps {
    report: Report | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewReport({ report, open, onOpenChange }: ViewReportProps) {
    if (!report) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Report Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the generated report.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Title:</span>
                        <span className="col-span-3">{report.title}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Type:</span>
                        <div className="col-span-3">
                            <Badge variant="secondary">{report.type}</Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Status:</span>
                        <div className="col-span-3">
                            <Badge variant={report.status === "Completed" ? "default" : report.status === "Processing" ? "outline" : "destructive"}>
                                {report.status}
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">Generated:</span>
                        <span className="col-span-3">
                            {new Date(report.generatedAt).toLocaleString()}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold">ID:</span>
                        <span className="col-span-3 text-xs text-muted-foreground font-mono">
                            {report.id}
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
