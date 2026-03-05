"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEditWorker, editWorkerSchema, EditWorkerValues } from "@/hooks/workers/use-edit-worker"
import { WorkerDef } from "@/app/(protected)/workers/columns"
import { toast } from "sonner"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface EditWorkerProps {
    worker: WorkerDef | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditWorker({ worker, open, onOpenChange }: EditWorkerProps) {
    const router = useRouter()
    const editMutation = useEditWorker()

    const form = useForm<EditWorkerValues>({
        resolver: zodResolver(editWorkerSchema),
        defaultValues: {
            name: "",
            salary: 0,
        },
    })

    useEffect(() => {
        if (worker) {
            form.reset({
                name: worker.name,
                salary: worker.salary,
            })
        }
    }, [worker, form])

    const onSubmit = async (values: EditWorkerValues) => {
        if (!worker) return
        try {
            await editMutation.mutateAsync({ id: worker.id, values })
            toast.success("Worker updated successfully!")
            onOpenChange(false)
            router.refresh()
        } catch (error: any) {
            toast.error(error.message || "Failed to update worker")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Worker</DialogTitle>
                    <DialogDescription>
                        Update worker details below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="50000" {...field} value={field.value as string | number} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={editMutation.isPending}>
                                {editMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
