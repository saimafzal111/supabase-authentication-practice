"use client"

import { useQuery } from "@tanstack/react-query"
import { WorkerDef } from "@/app/(protected)/workers/columns"

export const useWorkers = () => {
    return useQuery<WorkerDef[]>({
        queryKey: ["workers"],
        queryFn: async () => {
            const response = await fetch("/api/workers")
            if (!response.ok) {
                throw new Error("Failed to fetch workers")
            }
            return response.json()
        },
    })
}
