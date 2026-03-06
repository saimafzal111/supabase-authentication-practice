import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const body = await request.json()
        const { data, error } = await supabase
            .from("inventory")
            .insert([
                {
                    name: body.name,
                    quantity: body.quantity,
                    type: body.type,
                    date: body.date,
                },
            ])
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
