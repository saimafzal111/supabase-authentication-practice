import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
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
            .from("inventory")
            .update({
                name: body.name,
                quantity: body.quantity,
                type: body.type,
                date: body.date,
            })
            .eq("id", id)
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        revalidatePath('/inventory')
        return NextResponse.json(data[0])
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
