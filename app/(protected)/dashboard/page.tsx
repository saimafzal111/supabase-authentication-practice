
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { DataTable } from "./data-table"
import { columns } from "./columns"

import data from "./data.json"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="px-4 lg:px-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <DataTable
              columns={columns}
              data={data}
              filterKey="header"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

