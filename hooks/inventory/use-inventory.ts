"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"

export type InventoryType = 'in' | 'out' | 'damage';

export type InventoryItem = {
    id: string
    name: string
    quantity: number
    type: InventoryType
    date: string
    created_at: string
}

export const useInventory = (search?: string) => {
    return useQuery<InventoryItem[]>({
        queryKey: ["inventory", search],
        queryFn: async () => {
            const url = search
                ? `/api/inventory?search=${encodeURIComponent(search)}`
                : "/api/inventory"
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Failed to fetch inventory")
            }
            return response.json()
        },
        placeholderData: keepPreviousData,
    })
}
