'use client'

type StatsChartItem = {
  label: string
  value: number
}

type StatsChartProps = {
  title?: string
  data: StatsChartItem[]
}

export default function StatsChart({
  title = 'Monthly Performance',
  data,
}: StatsChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1)

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <div className="mt-6 space-y-4">
        {data.map((item) => {
          const width = (item.value / maxValue) * 100

          return (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-500">{item.value}</span>
              </div>

              <div className="h-3 w-full rounded-full bg-gray-100">
                <div
                  className="h-3 rounded-full bg-green-600 transition-all"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}