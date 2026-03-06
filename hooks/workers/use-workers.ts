"use client"

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { WorkerDef } from "@/app/(protected)/workers/columns"
import * as z from "zod"

export const workerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    salary: z.number().min(0, "Salary must be a positive number"),
})

export type WorkerValues = z.infer<typeof workerSchema>

export const useWorkers = (search?: string) => {
    return useQuery<WorkerDef[]>({
        queryKey: ["workers", search],
        queryFn: async () => {
            const url = search
                ? `/api/workers/read?search=${encodeURIComponent(search)}`
                : "/api/workers/read"
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Failed to fetch workers")
            }
            return response.json()
        },
        placeholderData: keepPreviousData,
    })
}

export const useAddWorker = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: WorkerValues) => {
            const response = await fetch('/api/workers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to add worker')
            }

            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workers'] })
        },
    })
}

export const useEditWorker = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, values }: { id: string; values: WorkerValues }) => {
            const response = await fetch(`/api/workers/update/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Failed to update worker')
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workers'] })
        },
    })
}

export const useDeleteWorker = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/workers/delete/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || 'Failed to delete worker')
            }
            return { success: true }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workers'] })
        },
    })
}
