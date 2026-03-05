"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export const editWorkerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    salary: z.coerce.number().min(0, "Salary must be a positive number"),
})

export type EditWorkerValues = z.input<typeof editWorkerSchema>

export const useEditWorker = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, values }: { id: string; values: EditWorkerValues }) => {
            const response = await fetch(`/api/workers/${id}`, {
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
            const response = await fetch(`/api/workers/${id}`, {
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
