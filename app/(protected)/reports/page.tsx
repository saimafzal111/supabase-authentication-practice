
"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import { DataTable } from "./data-table"
import { useReports } from "@/hooks/reports/use-reports"
import { useRealtimeSync } from "@/hooks/use-realtime-sync"
import { Loader2 } from "lucide-react"

export default function Page() {
    useRealtimeSync()
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch] = useDebounce(searchTerm, 500)
    const { data, isLoading } = useReports(debouncedSearch)

    const isActualLoading = isLoading && !data

    if (isActualLoading) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Reports</h1>
            <div className="px-4 lg:px-6">
                <DataTable
                    data={data || []}
                    filterKey="title"
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            </div>
        </div>
    )
}
