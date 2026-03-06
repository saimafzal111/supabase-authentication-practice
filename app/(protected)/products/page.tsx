"use client"

import { DataTable } from "./data-table"
import { useProducts } from "@/hooks/products/use-products"
import { Loader2 } from "lucide-react"

import { useState } from "react"
import { useDebounce } from "use-debounce"

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearch] = useDebounce(searchTerm, 500)
    const { data, isLoading, error } = useProducts(debouncedSearch)

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-destructive">Error loading products: {error.message}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between px-4 pt-4 lg:px-6">
                <h1 className="text-2xl font-bold">Products</h1>
            </div>
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
