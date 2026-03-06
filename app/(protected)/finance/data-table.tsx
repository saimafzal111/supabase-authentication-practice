"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Plus, Settings2, Trash2 } from "lucide-react"
import { ViewFinance } from "@/components/view-finance"
import { Finance, getColumns } from "./columns"
import { AddFinance } from "@/components/add-finance"
import { EditFinance } from "@/components/edit-finance"
import { useEditFinance, useDeleteFinance } from "@/hooks/finance/use-finance"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps {
  data: Finance[]
  filterKey?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function DataTable({
  data,
  filterKey,
  searchValue,
  onSearchChange,
}: DataTableProps) {
  const editMutation = useEditFinance()
  const deleteMutation = useDeleteFinance()

  const [viewFinance, setViewFinance] = React.useState<Finance | null>(null)
  const [editingFinance, setEditingFinance] = React.useState<Finance | null>(null)
  const [financeToDelete, setFinanceToDelete] = React.useState<Finance | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false)

  const handleMarkAsPaid = async (finance: Finance) => {
    try {
      await editMutation.mutateAsync({
        id: finance.id,
        values: { status: "Paid" }
      })
      toast.success("Invoice marked as paid")
    } catch (error: any) {
      toast.error(error.message || "Failed to update invoice")
    }
  }

  const handleDeleteRequest = (finance: Finance) => {
    setFinanceToDelete(finance)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!financeToDelete) return
    try {
      await deleteMutation.mutateAsync(financeToDelete.id)
      toast.success("Invoice deleted successfully")
      setDeleteConfirmOpen(false)
      setFinanceToDelete(null)
    } catch (error: any) {
      toast.error(error.message || "Failed to delete invoice")
    }
  }

  const columns = getColumns({
    onView: (finance) => setViewFinance(finance),
    onMarkAsPaid: handleMarkAsPaid,
    onDelete: handleDeleteRequest,
    onEdit: (finance) => setEditingFinance(finance),
  })

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-2 flex-1">
          {filterKey && (
            <Input
              placeholder={`Filter ${filterKey}...`}
              value={searchValue ?? (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) => {
                if (onSearchChange) {
                  onSearchChange(event.target.value)
                } else {
                  table.getColumn(filterKey)?.setFilterValue(event.target.value)
                }
              }}
              className="w-full sm:max-w-sm"
            />
          )}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Settings2 className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddFinance />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <EditFinance
        item={editingFinance}
        open={!!editingFinance}
        onOpenChange={(open) => !open && setEditingFinance(null)}
      />

      <ViewFinance
        finance={viewFinance}
        open={!!viewFinance}
        onOpenChange={(open) => !open && setViewFinance(null)}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the invoice
              <span className="font-semibold text-foreground ml-1">{financeToDelete?.invoiceId}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Invoice"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
