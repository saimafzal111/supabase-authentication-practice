"use client"

import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

export const useRealtimeSync = () => {
    const queryClient = useQueryClient()
    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel('db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                },
                (payload) => {
                    console.log('Realtime change received:', payload)

                    // Invalidate specific queries based on the table that changed
                    const table = payload.table
                    if (table === 'workers') {
                        queryClient.invalidateQueries({ queryKey: ['workers'] })
                    } else if (table === 'inventory') {
                        queryClient.invalidateQueries({ queryKey: ['inventory'] })
                    } else if (table === 'customers') {
                        queryClient.invalidateQueries({ queryKey: ['customers'] })
                    } else if (table === 'products') {
                        queryClient.invalidateQueries({ queryKey: ['products'] })
                    } else if (table === 'finance') {
                        queryClient.invalidateQueries({ queryKey: ['finance'] })
                    } else if (table === 'reports') {
                        queryClient.invalidateQueries({ queryKey: ['reports'] })
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [queryClient, supabase])
}
