"use client"

import * as React from "react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useInventory } from "@/hooks/inventory/use-inventory"
import { useWorkers } from "@/hooks/workers/use-workers"
import { useCustomers } from "@/hooks/customers/use-customers"
import { Loader2 } from "lucide-react"

// Mock finance data for now (matches finance page)
const financeData = [
  { id: "1", invoiceId: "INV-101", amount: 1500.00, status: "Paid", date: "2024-03-01" },
  { id: "2", invoiceId: "INV-102", amount: 450.00, status: "Unpaid", date: "2024-03-02" },
  { id: "3", invoiceId: "INV-103", amount: 2300.00, status: "Overdue", date: "2024-02-15" },
]

export default function Page() {
  const { data: inventory, isLoading: invLoading } = useInventory()
  const { data: workers, isLoading: workersLoading } = useWorkers()
  const { data: customers, isLoading: customersLoading } = useCustomers()

  const isLoading = invLoading || workersLoading || customersLoading

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Calculate stats
  const totalRevenue = financeData.reduce((acc, curr) => acc + curr.amount, 0)
  const stats = {
    revenue: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalRevenue),
    newCustomers: customers?.length || 0,
    activeWorkers: workers?.length || 0,
    growthRate: "5.2%", // Static for now as per instructions to keep charts/logic mostly same
  }

  // Use finance data for transactions as it was originally
  const tableData = financeData.map(f => ({
    id: f.id,
    header: f.invoiceId,
    description: `Transaction ${f.status}`,
    amount: `$${f.amount.toFixed(2)}`,
    status: f.status,
    date: f.date
  }))

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards stats={stats} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="px-4 lg:px-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <DataTable
              columns={columns}
              data={tableData}
              filterKey="header"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
