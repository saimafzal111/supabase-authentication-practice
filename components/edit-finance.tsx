"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Finance } from "@/app/(protected)/finance/columns"
import { useEditFinance } from "@/hooks/finance/use-finance"

const formSchema = z.object({
    invoiceId: z.string().min(2, "Invoice ID is required"),
    amount: z.number().min(0, "Amount must be positive"),
    status: z.enum(["Paid", "Unpaid", "Overdue"]),
    date: z.string().min(1, "Date is required"),
})

type FormValues = z.infer<typeof formSchema>

interface EditFinanceProps {
    item: Finance | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditFinance({ item, open, onOpenChange }: EditFinanceProps) {
    const editMutation = useEditFinance()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoiceId: "",
            amount: 0,
            status: "Unpaid",
            date: "",
        },
    })

    useEffect(() => {
        if (item) {
            form.reset({
                invoiceId: item.invoiceId,
                amount: item.amount,
                status: item.status,
                date: item.date,
            })
        }
    }, [item, form])

    async function onSubmit(values: FormValues) {
        if (!item) return
        try {
            await editMutation.mutateAsync({ id: item.id, values })
            toast.success("Invoice updated successfully")
            onOpenChange(false)
        } catch (error: any) {
            toast.error(error.message || "Failed to update invoice")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Invoice</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="invoiceId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="INV-001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Paid">Paid</SelectItem>
                                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                                            <SelectItem value="Overdue">Overdue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={editMutation.isPending}>
                            {editMutation.isPending ? "Updating..." : "Update Invoice"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
