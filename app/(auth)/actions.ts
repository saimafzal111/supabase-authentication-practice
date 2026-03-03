'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const password = formData.get('password') as string

    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) {
        console.error(authError.message)
        return
    }

    // 2. Insert customer details into the public.customers table
    if (authData.user) {
        const { error: dbError } = await supabase
            .from('customers')
            .insert([
                {
                    id: authData.user.id, // Linking customer to auth user
                    name,
                    email,
                    phone
                }
            ])

        if (dbError) {
            console.error('Database Error:', dbError.message)
        }
    }

    redirect('/dashboard')
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error(error.message)
        return
    }

    redirect('/dashboard')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
