"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export const editCustomerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending"]),
})

export type EditCustomerValues = z.input<typeof editCustomerSchema>

export const useEditCustomer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, values }: { id: string; values: EditCustomerValues }) => {
            const response = await fetch(`/api/customers/${id}`, {
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
            const response = await fetch(`/api/customers/${id}`, {
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
