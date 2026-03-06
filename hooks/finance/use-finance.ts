"use client"

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { Finance } from "@/app/(protected)/finance/columns"

export const useFinance = (search?: string) => {
    return useQuery<Finance[]>({
        queryKey: ["finance", search],
        queryFn: async () => {
            const url = new URL("/api/finance/read", window.location.origin)
            if (search) url.searchParams.set("search", search)

            const response = await fetch(url.toString())
            if (!response.ok) {
                throw new Error("Failed to fetch finance records")
            }
            return response.json()
        },
        placeholderData: keepPreviousData,
    })
}

export const useAddFinance = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (values: Partial<Finance>) => {
            const response = await fetch("/api/finance/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            if (!response.ok) throw new Error("Failed to add record")
            return response.json()
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["finance"] }),
    })
}

export const useEditFinance = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, values }: { id: string; values: Partial<Finance> }) => {
            const response = await fetch(`/api/finance/update/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            if (!response.ok) throw new Error("Failed to update record")
            return response.json()
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["finance"] }),
    })
}

export const useDeleteFinance = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/finance/delete/${id}`, { method: "DELETE" })
            if (!response.ok) throw new Error("Failed to delete record")
            return response.json()
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["finance"] }),
    })
}
