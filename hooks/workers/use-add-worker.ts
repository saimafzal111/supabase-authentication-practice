"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export const addWorkerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    salary: z.coerce.number().min(0, "Salary must be a positive number"),
})

export type AddWorkerValues = z.input<typeof addWorkerSchema>

export const useAddWorker = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: AddWorkerValues) => {
            const response = await fetch('/api/workers', {
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
