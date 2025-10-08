'use client'

import { motion } from 'framer-motion'
import { Calendar, Gauge, Eye } from 'lucide-react'
import Image from 'next/image'
import type { InventoryCar } from '@/lib/carms'

interface CarCardProps {
  car: InventoryCar
  viewMode: 'grid' | 'list'
  onClick: () => void
}

export default function CarCard({ car, viewMode, onClick }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('de-DE').format(mileage) + ' km'
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-80 h-64 md:h-auto">
            <Image
              src={car.image}
              alt={`${car.make} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
              <Eye className="w-5 h-5 text-primary-600" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-dark-900 mb-1">
                  {car.make} {car.model}
                </h3>
                <p className="text-lg text-primary-600 font-semibold">
                  {formatPrice(car.price)}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-dark-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{car.year}</span>
                </div>
                <div className="flex items-center space-x-2 text-dark-600">
                  <Gauge className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatMileage(car.mileage)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-dark-500 mb-1">Motor</p>
                <p className="text-sm font-medium text-dark-900">{car.engine}</p>
              </div>
              <div>
                <p className="text-sm text-dark-500 mb-1">Leistung</p>
                <p className="text-sm font-medium text-dark-900">{car.horsepower}</p>
              </div>
              <div>
                <p className="text-sm text-dark-500 mb-1">Außenfarbe</p>
                <p className="text-sm font-medium text-dark-900">{car.exteriorColor}</p>
              </div>
              <div>
                <p className="text-sm text-dark-500 mb-1">Innenfarbe</p>
                <p className="text-sm font-medium text-dark-900">{car.interiorColor}</p>
              </div>
            </div>

            <p className="text-dark-600 text-sm line-clamp-2">
              {car.description}
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={car.image}
          alt={`${car.make} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Eye className="w-5 h-5 text-primary-600" />
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-dark-900">{car.year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-display font-bold text-dark-900 mb-1">
            {car.make} {car.model}
          </h3>
          <p className="text-2xl font-bold text-primary-600 mb-2">
            {formatPrice(car.price)}
          </p>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-dark-600">
              <Gauge className="w-4 h-4" />
              <span className="text-sm font-medium">Laufleistung</span>
            </div>
            <span className="text-sm font-semibold text-dark-900">
              {formatMileage(car.mileage)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-dark-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Baujahr</span>
            </div>
            <span className="text-sm font-semibold text-dark-900">{car.year}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <span>{car.engine}</span>
            <span>{car.horsepower}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
