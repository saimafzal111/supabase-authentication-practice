"use client"

import { useQuery } from "@tanstack/react-query"

export const useWorkers = () => {
    return useQuery({
        queryKey: ['workers'],
        queryFn: async () => {
            const response = await fetch('/api/workers')
            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.error || 'Failed to fetch workers')
            }
            return response.json()
        },
    })
}
