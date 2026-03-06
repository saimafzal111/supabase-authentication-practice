"use client"

import * as React from "react"
import {
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
import { Settings2 } from "lucide-react"
import { AddWorker } from "@/components/add-worker"
import { EditWorker } from "@/components/edit-worker"
import { ViewWorker } from "@/components/view-worker"
import { getColumns, WorkerDef } from "./columns"
import { useDeleteWorker } from "@/hooks/workers/use-workers"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

interface DataTableProps {
  data: WorkerDef[]
  filterKey?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function DataTable({ data, filterKey, searchValue, onSearchChange }: DataTableProps) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [viewWorker, setViewWorker] = React.useState<WorkerDef | null>(null)
  const [editWorker, setEditWorker] = React.useState<WorkerDef | null>(null)
  const [deleteWorker, setDeleteWorker] = React.useState<WorkerDef | null>(null)

  const deleteMutation = useDeleteWorker()

  const handleDelete = async () => {
    if (!deleteWorker) return
    try {
      await deleteMutation.mutateAsync(deleteWorker.id)
      toast.success("Worker deleted successfully!")
      setDeleteWorker(null)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete worker")
    }
  }

  const columns = getColumns({
    onView: (worker) => setViewWorker(worker),
    onEdit: (worker) => setEditWorker(worker),
    onDelete: (worker) => setDeleteWorker(worker),
  })

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
              placeholder={`Search ${filterKey}...`}
              value={searchValue !== undefined ? searchValue : (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) => {
                const value = event.target.value
                if (onSearchChange) {
                  onSearchChange(value)
                } else {
                  table.getColumn(filterKey)?.setFilterValue(value)
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
                .map((column) => (
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
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddWorker />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
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

      {/* View Dialog */}
      <ViewWorker
        worker={viewWorker}
        open={!!viewWorker}
        onOpenChange={(open) => !open && setViewWorker(null)}
      />

      {/* Edit Dialog */}
      <EditWorker
        worker={editWorker}
        open={!!editWorker}
        onOpenChange={(open) => !open && setEditWorker(null)}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteWorker} onOpenChange={(open) => !open && setDeleteWorker(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{deleteWorker?.name}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
