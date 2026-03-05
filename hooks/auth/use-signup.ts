"use client"

import { useMutation } from "@tanstack/react-query"
import { signup } from "@/app/(auth)/actions"
import * as z from "zod"

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type SignupFormValues = z.infer<typeof signupSchema>

export const useSignup = () => {
    return useMutation({
        mutationFn: async (values: SignupFormValues) => {
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("email", values.email)
            formData.append("password", values.password)
            return await signup(formData)
        },
        onError: (error: any) => {
            console.error("Signup error:", error)
        },
    })
}
