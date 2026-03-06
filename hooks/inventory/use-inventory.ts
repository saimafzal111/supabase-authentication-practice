"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export type InventoryType = 'in' | 'out' | 'damage';

export type InventoryItem = {
    id: string
    name: string
    quantity: number
    type: InventoryType
    date: string
    created_at: string
}

export const inventorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    type: z.enum(["in", "out", "damage"]),
    date: z.string().min(1, "Date is required"),
})

export type InventoryValues = z.infer<typeof inventorySchema>

export const useInventory = () => {
    return useQuery<InventoryItem[]>({
        queryKey: ["inventory"],
        queryFn: async () => {
            const response = await fetch("/api/inventory/read")
            if (!response.ok) {
                throw new Error("Failed to fetch inventory")
            }
            return response.json()
        },
    })
}

export const useAddInventory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: InventoryValues) => {
            const response = await fetch("/api/inventory/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || "Failed to add inventory item")
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventory"] })
        },
    })
}

export const useEditInventory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, values }: { id: string, values: InventoryValues }) => {
            const response = await fetch(`/api/inventory/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || "Failed to edit inventory item")
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventory"] })
        },
    })
}

export const useDeleteInventory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/inventory/delete/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || "Failed to delete inventory item")
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventory"] })
        },
    })
}
