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
    <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-3 text-base font-display font-semibold text-dark-900 sm:mb-4 sm:text-xl">
        {title}
      </h2>
      <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-start justify-between gap-3 border-b border-gray-100 py-2.5 last:border-b-0 sm:py-2"
            >
              <dt className="flex min-w-0 flex-shrink-0 items-center gap-2 text-xs text-gray-500 sm:text-sm">
                {Icon ? <Icon className="h-4 w-4 flex-shrink-0 text-primary-500" /> : null}
                <span className="truncate">{item.label}</span>
              </dt>
              <dd className="break-words text-right text-xs font-medium text-dark-900 sm:text-sm">
                {item.value}
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
