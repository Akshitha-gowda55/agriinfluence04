import { AdminOrdersTable } from '@/components/admin/admin-orders-table'

export default function AdminOrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review orders and update delivery progress.
        </p>
      </div>

      <AdminOrdersTable />
    </div>
  )
}