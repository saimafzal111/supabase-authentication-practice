"use client"

import { useQuery } from "@tanstack/react-query"

export type InventoryType = 'in' | 'out' | 'damage';

export type InventoryItem = {
    id: string
    name: string
    quantity: number
    type: InventoryType
    date: string
    created_at: string
}

export const useInventory = () => {
    return useQuery<InventoryItem[]>({
        queryKey: ["inventory"],
        queryFn: async () => {
            const response = await fetch("/api/inventory")
            if (!response.ok) {
                throw new Error("Failed to fetch inventory")
            }
            return response.json()
        },
    })
}
