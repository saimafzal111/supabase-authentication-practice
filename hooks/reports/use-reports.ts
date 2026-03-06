"use client"

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { Report } from "@/app/(protected)/reports/columns"

export const useReports = (search?: string) => {
    return useQuery<Report[]>({
        queryKey: ["reports", search],
        queryFn: async () => {
            const url = new URL("/api/reports/read", window.location.origin)
            if (search) url.searchParams.set("search", search)

            const response = await fetch(url.toString())
            if (!response.ok) {
                throw new Error("Failed to fetch reports")
            }
            return response.json()
        },
        placeholderData: keepPreviousData,
    })
}

export const useAddReport = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (values: Partial<Report>) => {
            const response = await fetch("/api/reports/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            if (!response.ok) throw new Error("Failed to add report")
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] })
        },
    })
}
