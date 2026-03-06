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
import { useEditProduct, productSchema, ProductValues } from "@/hooks/products/use-products"
import { Product } from "@/app/(protected)/products/columns"
import { toast } from "sonner"
import { useEffect } from "react"

interface EditProductProps {
    product: Product | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditProduct({ product, open, onOpenChange }: EditProductProps) {
    const editMutation = useEditProduct(product?.id || "")

    const form = useForm<ProductValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            volume: "",
            price: 0,
        },
    })

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                volume: product.volume,
                price: product.price,
            })
        }
    }, [product, form])

    const onSubmit = async (values: ProductValues) => {
        if (!product) return
        try {
            await editMutation.mutateAsync(values)
            toast.success("Product updated successfully!")
            onOpenChange(false)
        } catch (error: any) {
            toast.error(error.message || "Failed to update product")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        Update water bottle product details below.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Bottle</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Aquafina 500ml" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="volume"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Volume of Bottle</FormLabel>
                                    <FormControl>
                                        <Input placeholder="500ml / 1.5L" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price of Bottle</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="50"
                                            {...field}
                                            onChange={e => field.onChange(e.target.valueAsNumber || 0)}
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
