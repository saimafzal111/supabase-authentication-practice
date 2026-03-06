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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addInventorySchema, AddInventoryValues } from "@/hooks/inventory/use-add-inventory"
import { useEditInventory } from "@/hooks/inventory/use-edit-inventory"
import { toast } from "sonner"
import { useEffect } from "react"
import { InventoryItem } from "@/hooks/inventory/use-inventory"
import { DatePickerInput } from "./date-picker-input"

interface EditInventoryProps {
    item: InventoryItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditInventory({ item, open, onOpenChange }: EditInventoryProps) {
    const editMutation = useEditInventory()

    const form = useForm<AddInventoryValues>({
        resolver: zodResolver(addInventorySchema),
        defaultValues: {
            name: "",
            quantity: 0,
            type: "in",
            date: "",
        },
    })

    useEffect(() => {
        if (item) {
            form.reset({
                name: item.name,
                quantity: item.quantity,
                type: item.type,
                date: item.date || new Date().toISOString(),
            })
        }
    }, [item, form])

    const onSubmit = async (values: AddInventoryValues) => {
        if (!item) return
        try {
            await editMutation.mutateAsync({ id: item.id, values })
            toast.success("Inventory item updated successfully!")
            onOpenChange(false)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update inventory item"
            toast.error(message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Inventory Item</DialogTitle>
                    <DialogDescription>
                        Update the inventory record details.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                {...field}
                                                onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                                            />
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
                                        <FormLabel>Transaction Type</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="in">Stock In</SelectItem>
                                                <SelectItem value="out">Stock Out</SelectItem>
                                                <SelectItem value="damage">Damage</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Transaction Date</FormLabel>
                                    <FormControl>
                                        <DatePickerInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select transaction date"
                                        />
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
                                        Updating...
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
