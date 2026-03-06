import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search')

        const supabase = await createClient()
        let query = supabase
            .from('workers')
            .select('*')
            .order('created_at', { ascending: false })

        if (search) {
            query = query.ilike('name', `%${search}%`)
        }

        const { data, error } = await query

        if (error) {
            console.error('API Error fetching workers:', error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (err: any) {
        console.error('API Unexpected error:', err)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}
