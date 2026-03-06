import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search')

        const supabase = await createClient()
        let query = supabase
            .from("inventory")
            .select("*")
            .order("created_at", { ascending: false })

        if (search) {
            query = query.ilike('name', `%${search}%`)
        }

        const { data, error } = await query

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

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

        return NextResponse.json(data[0])
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
