"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"
import { WorkerDef } from "@/app/(protected)/workers/columns"

export const workerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    salary: z.coerce.number().min(0, "Salary must be a positive number"),
})

export type WorkerValues = z.input<typeof workerSchema>

export const useWorkers = () => {
    return useQuery<WorkerDef[]>({
        queryKey: ["workers"],
        queryFn: async () => {
            const response = await fetch("/api/workers/read")
            if (!response.ok) {
                throw new Error("Failed to fetch workers")
            }
            return response.json()
        },
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
