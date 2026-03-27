import { CheckCircle2, Circle, Truck, PackageCheck, ClipboardList } from 'lucide-react'

type OrderTimelineProps = {
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'failed'
}

const steps = [
  { key: 'pending', label: 'Order Placed', icon: ClipboardList },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', icon: Circle },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: PackageCheck },
]

const orderProgress: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  if (status === 'cancelled' || status === 'failed') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <h3 className="text-base font-semibold text-red-700">Order {status}</h3>
        <p className="mt-1 text-sm text-red-600">
          This order could not be completed successfully.
        </p>
      </div>
    )
  }

  const currentStep = orderProgress[status] ?? 0

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Order Timeline</h3>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => {
          const Icon = step.icon
          const completed = index <= currentStep

          return (
            <div key={step.key} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-5 hidden h-0.5 w-full md:block">
                  <div
                    className={`h-full ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}`}
                  />
                </div>
              )}

              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                  completed ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <p
                className={`mt-3 text-sm font-medium ${
                  completed ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}