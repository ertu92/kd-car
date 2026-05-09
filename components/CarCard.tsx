'use client'

import { motion } from 'framer-motion'
import { Calendar, Gauge, Zap, ChevronRight, Fuel, Settings2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { InventoryCar } from '@/lib/carms'
import { formatMileage, formatPrice, humanLabel } from '@/lib/format'

interface CarCardProps {
  car: InventoryCar
  viewMode: 'grid' | 'list'
}

export default function CarCard({ car, viewMode }: CarCardProps) {
  const href = `/fahrzeuge/${car.slug}`
  const fuelLabel = humanLabel(car.fuelType)
  const transmissionLabel = humanLabel(car.transmission) ?? car.transmission
  const conditionLabel = humanLabel(car.condition) ?? humanLabel(car.usageType)

  if (viewMode === 'list') {
    return (
      <motion.div whileHover={{ y: -2 }} className="group">
        <Link
          href={href}
          className="block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative h-56 w-full md:h-auto md:w-80 md:flex-shrink-0">
              <Image
                src={car.image}
                alt={`${car.make} ${car.model}`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {conditionLabel ? (
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-dark-900 shadow-sm backdrop-blur-sm">
                  {conditionLabel}
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
              <div>
                <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-4">
                  <div>
                    <h3 className="text-lg font-display font-bold text-dark-900 md:text-2xl">
                      {car.make} {car.model}
                    </h3>
                    {car.modelDescription ? (
                      <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 md:text-sm">
                        {car.modelDescription}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-2xl font-bold text-primary-600 md:text-right">
                    {formatPrice(car.price)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 sm:grid-cols-4">
                  <SpecRow icon={Calendar} label={String(car.year)} />
                  <SpecRow icon={Gauge} label={formatMileage(car.mileage)} />
                  <SpecRow icon={Zap} label={car.horsepower} />
                  {fuelLabel ? <SpecRow icon={Fuel} label={fuelLabel} /> : null}
                  {transmissionLabel ? <SpecRow icon={Settings2} label={transmissionLabel} /> : null}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-primary-600">
                <span>Details ansehen</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ y: -4 }} className="group h-full">
      <Link
        href={href}
        className="flex h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl sm:flex-col"
      >
        {/* Image — square + small on mobile, hero up top on tablet+ */}
        <div className="relative aspect-[4/3] w-36 flex-shrink-0 overflow-hidden sm:h-56 sm:w-full sm:aspect-auto lg:h-60">
          <Image
            src={car.image}
            alt={`${car.make} ${car.model}`}
            fill
            sizes="(max-width: 640px) 144px, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-black/40 via-transparent to-transparent sm:block" />
          {conditionLabel ? (
            <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-dark-900 shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
              {conditionLabel}
            </span>
          ) : null}
          <span className="absolute bottom-2 right-2 hidden rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-dark-900 backdrop-blur-sm sm:inline-block sm:bottom-3 sm:right-3">
            EZ {car.year}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-3 sm:p-5">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-sm font-display font-bold text-dark-900 sm:text-lg">
              {car.make} {car.model}
            </h3>
            {car.modelDescription ? (
              <p className="mt-0.5 line-clamp-1 text-[11px] text-gray-500 sm:text-xs">
                {car.modelDescription}
              </p>
            ) : null}
            <p className="mt-1.5 text-base font-bold text-primary-600 sm:mt-2 sm:text-2xl">
              {formatPrice(car.price)}
            </p>

            <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-gray-600 sm:mt-4 sm:gap-y-2 sm:text-xs">
              <SpecRow icon={Calendar} label={String(car.year)} />
              <SpecRow icon={Gauge} label={formatMileage(car.mileage)} />
              <SpecRow icon={Zap} label={car.horsepower} />
              {fuelLabel ? <SpecRow icon={Fuel} label={fuelLabel} /> : null}
            </div>
          </div>

          <div className="mt-3 hidden items-center justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-primary-600 sm:flex sm:pt-4">
            <span>Details</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SpecRow({
  icon: Icon,
  label,
}: {
  icon?: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-1 text-gray-600 sm:gap-1.5">
      {Icon ? <Icon className="h-3 w-3 flex-shrink-0 text-primary-500 sm:h-4 sm:w-4" /> : null}
      <span className="truncate">{label}</span>
    </div>
  )
}
