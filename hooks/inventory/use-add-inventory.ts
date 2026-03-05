"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export const addInventorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    type: z.enum(["in", "out", "damage"]),
    date: z.string().min(1, "Date is required"),
})

export type AddInventoryValues = z.infer<typeof addInventorySchema>

export const useAddInventory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: AddInventoryValues) => {
            const response = await fetch("/api/inventory", {
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
