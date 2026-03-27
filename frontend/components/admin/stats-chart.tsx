const monthlyStats = [
  { month: 'Jan', orders: 20 },
  { month: 'Feb', orders: 35 },
  { month: 'Mar', orders: 28 },
  { month: 'Apr', orders: 45 },
  { month: 'May', orders: 40 },
  { month: 'Jun', orders: 52 },
]

export function StatsChart() {
  const maxOrders = Math.max(...monthlyStats.map((item) => item.orders))

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Monthly Orders
      </h2>

      <div className="flex h-72 items-end gap-4">
        {monthlyStats.map((item) => (
          <div key={item.month} className="flex flex-1 flex-col items-center">
            <div className="mb-2 text-sm font-medium text-gray-700">
              {item.orders}
            </div>

            <div className="flex h-56 items-end">
              <div
                className="w-10 rounded-t-xl bg-green-600"
                style={{
                  height: `${(item.orders / maxOrders) * 100}%`,
                }}
              />
            </div>

            <div className="mt-3 text-sm text-gray-500">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  )
}