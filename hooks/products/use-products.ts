"use client"

import { useQuery } from "@tanstack/react-query"
import { Product } from "@/app/(protected)/products/columns"

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetch("/api/products")
            if (!response.ok) {
                throw new Error("Failed to fetch products")
            }
            return response.json()
        },
    })
}
