import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

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

        return NextResponse.json(data[0])
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = await createClient()
        const { error } = await supabase
            .from("inventory")
            .delete()
            .eq("id", id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ message: "Inventory item deleted successfully" })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
