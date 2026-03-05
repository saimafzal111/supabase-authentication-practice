"use client"

import { useMutation } from "@tanstack/react-query"
import { login } from "@/app/(auth)/actions"
import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const useLogin = () => {
    return useMutation({
        mutationFn: async (values: LoginFormValues) => {
            console.log("useLogin Hook: mutationFn starting for", values.email)
            const formData = new FormData()
            formData.append("email", values.email)
            formData.append("password", values.password)
            const result = await login(formData)
            console.log("useLogin Hook: result from action:", result)
            return result
        },
        onError: (error: any) => {
            console.error("useLogin Hook: OnError caught:", error)
        },
    })
}
