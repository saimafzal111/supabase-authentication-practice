"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteInventory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/inventory/${id}`, {
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
