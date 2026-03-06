"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import { DataTable } from "./data-table"
import { useFinance } from "@/hooks/finance/use-finance"
import { Loader2 } from "lucide-react"

import { useRealtimeSync } from "@/hooks/use-realtime-sync"

export default function Page() {
    useRealtimeSync()
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch] = useDebounce(searchTerm, 500)
    const { data, isLoading } = useFinance(debouncedSearch)

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
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Finance</h1>
            <div className="px-4 lg:px-6">
                <DataTable
                    data={data || []}
                    filterKey="invoiceId"
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            </div>
        </div>
    )
}
