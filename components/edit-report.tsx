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
import { Report } from "@/app/(protected)/reports/columns"
import { useEditReport } from "@/hooks/reports/use-reports"

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    type: z.enum(["Monthly", "Quarterly", "Annual"]),
    status: z.enum(["Completed", "Processing", "Failed"]),
})

type FormValues = z.infer<typeof formSchema>

interface EditReportProps {
    item: Report | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditReport({ item, open, onOpenChange }: EditReportProps) {
    const editMutation = useEditReport()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            type: "Monthly",
            status: "Completed",
        },
    })

    useEffect(() => {
        if (item) {
            form.reset({
                title: item.title,
                type: item.type,
                status: item.status,
            })
        }
    }, [item, form])

    async function onSubmit(values: FormValues) {
        if (!item) return
        try {
            await editMutation.mutateAsync({ id: item.id, values })
            toast.success("Report updated successfully")
            onOpenChange(false)
        } catch (error: any) {
            toast.error(error.message || "Failed to update report")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Report</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sales Analysis 2024" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                            <SelectItem value="Quarterly">Quarterly</SelectItem>
                                            <SelectItem value="Annual">Annual</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="Processing">Processing</SelectItem>
                                            <SelectItem value="Failed">Failed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={editMutation.isPending}>
                            {editMutation.isPending ? "Updating..." : "Update Report"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
