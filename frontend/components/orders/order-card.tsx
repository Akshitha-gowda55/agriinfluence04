import { OrderStatus as OrderStatusType } from '@/types'

type OrderStatusProps = {
  status: OrderStatusType
}

const statusStyles: Record<OrderStatusType, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  failed: 'bg-gray-200 text-gray-800',
}

export default function OrderStatus({ status }: OrderStatusProps) {
  const label = status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {label}
    </span>
  )
}