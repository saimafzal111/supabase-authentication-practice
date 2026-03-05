"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as z from "zod"

export const addCustomerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(["Active", "Inactive", "Pending"]),
})

export type AddCustomerValues = z.input<typeof addCustomerSchema>

export const useAddCustomer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: AddCustomerValues) => {
            console.log("useAddCustomer Hook: Submitting via fetch API...", values.name)
            const response = await fetch('/api/customers', {
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
            // Invalidate and refetch customers list
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
        onError: (error: any) => {
            console.error("useAddCustomer Hook: OnError caught:", error.message)
        },
    })
}
