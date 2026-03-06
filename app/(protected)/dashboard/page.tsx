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
import { useRealtimeSync } from "@/hooks/use-realtime-sync"

import { useFinance } from "@/hooks/finance/use-finance"

export default function Page() {
  useRealtimeSync()
  const { data: inventory, isLoading: invLoading } = useInventory()
  const { data: workers, isLoading: workersLoading } = useWorkers()
  const { data: customers, isLoading: customersLoading } = useCustomers()
  const { data: financeRecords, isLoading: financeLoading } = useFinance()

  const isLoading = invLoading || workersLoading || customersLoading || financeLoading

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Calculate stats
  const totalRevenue = (financeRecords || []).reduce((acc, curr) => acc + curr.amount, 0)
  const stats = {
    revenue: new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" }).format(totalRevenue),
    newCustomers: customers?.length || 0,
    activeWorkers: workers?.length || 0,
    growthRate: "5.2%", // Static for now as per instructions to keep charts/logic mostly same
  }

  // Use real finance data for transactions
  const tableData = (financeRecords || []).map(f => ({
    id: f.id,
    header: f.invoiceId,
    description: `Transaction ${f.status}`,
    amount: `Rs. ${f.amount.toFixed(2)}`,
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
