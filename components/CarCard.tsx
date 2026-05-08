'use client'

import { motion } from 'framer-motion'
import { Calendar, Gauge, Zap, ChevronRight } from 'lucide-react'
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
          className="block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative h-64 w-full md:h-auto md:w-80 md:flex-shrink-0">
              <Image
                src={car.image}
                alt={`${car.make} ${car.model}`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {conditionLabel ? (
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-dark-900 shadow-sm backdrop-blur-sm">
                  {conditionLabel}
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-dark-900 md:text-2xl">
                      {car.make} {car.model}
                    </h3>
                    {car.modelDescription ? (
                      <p className="mt-0.5 line-clamp-1 text-sm text-dark-500">
                        {car.modelDescription}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-2xl font-bold text-primary-600 md:text-right">
                    {formatPrice(car.price)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-dark-600 sm:grid-cols-4">
                  <SpecRow icon={Calendar} label={String(car.year)} />
                  <SpecRow icon={Gauge} label={formatMileage(car.mileage)} />
                  <SpecRow icon={Zap} label={car.horsepower} />
                  {fuelLabel ? <SpecRow label={fuelLabel} /> : null}
                  {transmissionLabel ? <SpecRow label={transmissionLabel} /> : null}
                  {car.exteriorColor && car.exteriorColor !== 'Keine Angabe' ? (
                    <SpecRow label={humanLabel(car.exteriorColor) ?? car.exteriorColor} />
                  ) : null}
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
    <motion.div whileHover={{ y: -6 }} className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
      >
        <div className="relative h-56 overflow-hidden sm:h-60">
          <Image
            src={car.image}
            alt={`${car.make} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {conditionLabel ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-dark-900 shadow-sm backdrop-blur-sm">
              {conditionLabel}
            </span>
          ) : null}
          <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-dark-900 backdrop-blur-sm">
            EZ {car.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex-1">
            <h3 className="line-clamp-1 text-lg font-display font-bold text-dark-900">
              {car.make} {car.model}
            </h3>
            {car.modelDescription ? (
              <p className="mt-0.5 line-clamp-1 text-xs text-dark-500">
                {car.modelDescription}
              </p>
            ) : null}
            <p className="mt-2 text-2xl font-bold text-primary-600">{formatPrice(car.price)}</p>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-dark-600">
              <SpecRow icon={Gauge} label={formatMileage(car.mileage)} />
              <SpecRow icon={Zap} label={car.horsepower} />
              {fuelLabel ? <SpecRow label={fuelLabel} /> : null}
              {transmissionLabel ? <SpecRow label={transmissionLabel} /> : null}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-primary-600">
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
    <div className="flex items-center gap-1.5 text-dark-600">
      {Icon ? <Icon className="h-4 w-4 text-primary-500" /> : null}
      <span className="truncate">{label}</span>
    </div>
  )
}
