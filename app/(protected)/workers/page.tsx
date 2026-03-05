"use client"

import { DataTable } from "./data-table"
import { useWorkers } from "@/hooks/workers/use-workers"
import { Loader2 } from "lucide-react"

export default function WorkersPage() {
    const { data: workers, isLoading, error } = useWorkers()

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-destructive">Error loading workers: {(error as any).message}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between px-4 pt-4 lg:px-6">
                <h1 className="text-2xl font-bold">Workers</h1>
            </div>
            <div className="px-4 lg:px-6">
                {isLoading ? (
                    <div className="flex h-24 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <DataTable data={workers || []} filterKey="name" />
                )}
            </div>
        </div>
    )
}
