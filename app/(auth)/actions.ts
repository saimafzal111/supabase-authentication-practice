'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
    console.log("Signup action triggered for:", formData.get('email'))
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) {
        console.log("Signup error:", authError.message)
        return { error: authError.message }
    }

    if (authData.user) {
        const { error: dbError } = await supabase
            .from('customers')
            .insert([
                {
                    user_id: authData.user.id,
                    name,
                    email,
                }
            ])

        if (dbError) {
            console.error('Database Error:', dbError.message)
        }
    }

    redirect('/dashboard')
}

export async function login(formData: FormData) {
    console.log("Login action triggered for:", formData.get('email'))
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.log("Login error:", error.message)
        return { error: error.message }
    }

    console.log("Login successful, redirecting...")
    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
