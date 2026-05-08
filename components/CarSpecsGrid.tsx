import type { LucideIcon } from 'lucide-react'

interface SpecItem {
  icon?: LucideIcon
  label: string
  value: string
}

interface CarSpecsGridProps {
  title: string
  items: SpecItem[]
}

export default function CarSpecsGrid({ title, items }: CarSpecsGridProps) {
  if (items.length === 0) return null

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-display font-semibold text-dark-900 sm:text-xl">
        {title}
      </h2>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-start justify-between gap-4 border-b border-gray-100 py-2 last:border-b-0 sm:border-b-0 sm:py-1"
            >
              <dt className="flex items-center gap-2 text-sm text-dark-500">
                {Icon ? <Icon className="h-4 w-4 text-primary-500" /> : null}
                <span>{item.label}</span>
              </dt>
              <dd className="text-right text-sm font-medium text-dark-900">
                {item.value}
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
