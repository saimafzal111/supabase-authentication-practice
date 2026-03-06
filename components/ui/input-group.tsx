"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputGroupVariants = cva(
    "group/input-group relative flex w-full items-stretch rounded-md border border-input bg-background shadow-xs ring-offset-background transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
    {
        variants: {
            size: {
                default: "h-10",
                sm: "h-9",
                lg: "h-11",
                xs: "h-8",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

const InputGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof inputGroupVariants>
>(({ className, size, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(inputGroupVariants({ size }), className)}
        {...props}
    />
))
InputGroup.displayName = "InputGroup"

const InputGroupInput = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <input
        ref={ref}
        data-slot="input-group-control"
        className={cn(
            "flex-1 border-0 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    />
))
InputGroupInput.displayName = "InputGroupInput"

const InputGroupAddon = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { align?: "inline-start" | "inline-end" }
>(({ className, align = "inline-start", ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-center px-3 text-muted-foreground",
            align === "inline-start" ? "border-r" : "border-l",
            className
        )}
        {...props}
    />
))
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            ref={ref}
            className={cn(
                "flex h-full items-center justify-center px-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
})
InputGroupButton.displayName = "InputGroupButton"

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton }
