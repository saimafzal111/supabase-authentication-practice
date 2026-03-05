"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export const addProductSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    volume: z.string().min(1, "Volume is required"),
    price: z.number().min(0, "Price must be a positive number"),
})

export type AddProductValues = z.infer<typeof addProductSchema>

export const useAddProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: AddProductValues) => {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || "Failed to add product")
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })
}
