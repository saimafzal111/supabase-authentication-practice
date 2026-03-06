import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const { name, phone, address, status } = await request.json()

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        const { data, error } = await supabase
            .from('customers')
            .insert([{ name, phone, address, status }])
            .select()

        if (error) {
            console.error('API Error adding customer:', error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        revalidatePath('/customers')
        return NextResponse.json({ success: true, data }, { status: 201 })
    } catch (err: any) {
        console.error('API Unexpected error:', err)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}
