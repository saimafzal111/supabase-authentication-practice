import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const { name, salary } = await request.json()

        if (!name || salary === undefined) {
            return NextResponse.json(
                { error: 'Name and salary are required' },
                { status: 400 }
            )
        }

        const { data, error } = await supabase
            .from('workers')
            .insert([{ name, salary }])
            .select()

        if (error) {
            console.error('API Error adding worker:', error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        revalidatePath('/workers')
        return NextResponse.json({ success: true, data }, { status: 201 })
    } catch (err: any) {
        console.error('API Unexpected error:', err)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('workers')
            .select('*')
            .order('created_at', { ascending: false })

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
