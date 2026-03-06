"use client"

import { DataTable } from "./data-table"
import { useCustomers } from "@/hooks/customers/use-customers"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { Loader2 } from "lucide-react"

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch] = useDebounce(searchTerm, 500)
    const { data, isLoading } = useCustomers(debouncedSearch)

    return (
        <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold px-4 pt-4 lg:px-6">Customers</h1>
            <div className="px-4 lg:px-6">
                {isLoading && !data ? (
                    <div className="flex h-24 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <DataTable
                        data={data || []}
                        filterKey="name"
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                )}
            </div>
        </div>
    )
}
