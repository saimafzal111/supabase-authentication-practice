"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Product } from "@/app/(protected)/products/columns"
import * as z from "zod"

export const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    volume: z.string().min(1, "Volume is required"),
    price: z.number().min(0, "Price must be a positive number"),
})

export type ProductValues = z.infer<typeof productSchema>

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetch("/api/products/read")
            if (!response.ok) {
                throw new Error("Failed to fetch products")
            }
            return response.json()
        },
    })
}

export const useAddProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: ProductValues) => {
            const response = await fetch("/api/products/create", {
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

export const useEditProduct = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: ProductValues) => {
            const response = await fetch(`/api/products/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || "Failed to edit product")
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/products/delete/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || "Failed to delete product")
            }

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
    })
}
