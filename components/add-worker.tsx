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
    DialogTrigger,
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
import { Loader2, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAddWorker, addWorkerSchema, AddWorkerValues } from "@/hooks/workers/use-add-worker"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AddWorker() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const addWorkerMutation = useAddWorker()

    const form = useForm<AddWorkerValues>({
        resolver: zodResolver(addWorkerSchema),
        defaultValues: {
            name: "",
            salary: 0,
        },
    })

    const onSubmit = async (values: AddWorkerValues) => {
        try {
            const result = await addWorkerMutation.mutateAsync(values)
            if (result.success) {
                toast.success("Worker added successfully!")
                form.reset()
                setOpen(false)
                router.refresh()
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to add worker")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Worker
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Worker</DialogTitle>
                    <DialogDescription>
                        Create a new worker record here.
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
                            <Button type="submit" disabled={addWorkerMutation.isPending}>
                                {addWorkerMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : "Add Worker"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
