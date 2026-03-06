import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = await createClient()
        const body = await request.json()

        const { data, error } = await supabase
            .from('customers')
            .update(body)
            .eq('id', id)
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        revalidatePath('/customers')
        return NextResponse.json({ success: true, data })
    } catch (err: any) {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
}
