import { AdminProductsTable } from '@/components/admin/admin-products-table'

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add new products and manage existing inventory.
        </p>
      </div>

      <AdminProductsTable />
    </div>
  )
}