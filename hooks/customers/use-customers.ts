"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export const customerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending"]),
})

export type CustomerValues = z.input<typeof customerSchema>

export const useAddCustomer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: CustomerValues) => {
            console.log("useAddCustomer Hook: Submitting via fetch API...", values.name)
            const response = await fetch('/api/customers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const result = await response.json()

            if (!response.ok) {
                console.error("useAddCustomer Hook: API Error:", result.error)
                throw new Error(result.error || 'Failed to add customer')
            }

            console.log("useAddCustomer Hook: Success:", result)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
        onError: (error: any) => {
            console.error("useAddCustomer Hook: OnError caught:", error.message)
        },
    })
}

export const useEditCustomer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, values }: { id: string; values: CustomerValues }) => {
            const response = await fetch(`/api/customers/update/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Failed to update customer')
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
    })
}

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/customers/delete/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || 'Failed to delete customer')
            }
            return { success: true }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
    })
}
