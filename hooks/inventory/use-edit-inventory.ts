"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"
import { addInventorySchema } from "./use-add-inventory"

export type EditInventoryValues = z.infer<typeof addInventorySchema>

export const useEditInventory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, values }: { id: string, values: EditInventoryValues }) => {
            const response = await fetch(`/api/inventory/${id}`, {
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
