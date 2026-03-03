import { createClient } from '@/lib/supabase/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-4 text-red-500">Error loading customers: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Customer List</CardTitle>
          <div className="text-sm text-slate-500">
            Total Customers: {customers?.length || 0}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-xs uppercase tracking-wider pl-6">ID</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider">Email</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider">Phone</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers && customers.length > 0 ? (
                customers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-mono text-[10px] text-slate-400 pl-6 max-w-[100px] truncate">
                      {customer.id}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{customer.name}</TableCell>
                    <TableCell className="text-slate-600">{customer.email}</TableCell>
                    <TableCell className="text-slate-600">{customer.phone || 'N/A'}</TableCell>
                    <TableCell className="text-slate-500 whitespace-nowrap">
                      {new Date(customer.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-slate-500">
                    No customers found in the database.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}