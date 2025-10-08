'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid, List } from 'lucide-react'
import CarCard from './CarCard'
import CarDetailModal from './CarDetailModal'
import type { InventoryCar, DataSource } from '@/lib/carms'

type ViewMode = 'grid' | 'list'

type CarsResponse = {
  cars: InventoryCar[]
  source: DataSource
  error?: string
}

export default function InventorySection() {
  const [cars, setCars] = useState<InventoryCar[]>([])
  const [selectedCar, setSelectedCar] = useState<InventoryCar | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterYear, setFilterYear] = useState('all')
  const [filterMake, setFilterMake] = useState('all')
  const [dataSource, setDataSource] = useState<DataSource>('local')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadCars() {
      setLoading(true)

      try {
        const response = await fetch('/api/cars', { cache: 'no-store' })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload: CarsResponse = await response.json()
        if (cancelled) return

        const normalizedError =
          typeof payload.error === 'string' && payload.error.trim().length > 0
            ? payload.error.trim()
            : null

        setCars(payload.cars ?? [])
        setDataSource(payload.source ?? 'local')
        setError(normalizedError)
      } catch (err) {
        if (cancelled) return
        console.error('Failed to load cars:', err)
        setCars([])
        setDataSource('local')
        setError('Fahrzeuge konnten nicht geladen werden. Bitte spaeter erneut versuchen.')
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadCars()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 768 && viewMode === 'list') {
        setViewMode('grid')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [viewMode])

  const uniqueMakes = useMemo(
    () => Array.from(new Set(cars.map((car) => car.make))).sort((a, b) => a.localeCompare(b)),
    [cars]
  )

  const uniqueYears = useMemo(
    () =>
      Array.from(new Set(cars.map((car) => car.year)))
        .filter((year): year is number => Number.isFinite(year))
        .sort((a, b) => b - a),
    [cars]
  )

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesYear = filterYear === 'all' || car.year.toString() === filterYear
      const matchesMake = filterMake === 'all' || car.make === filterMake

      return matchesSearch && matchesYear && matchesMake
    })
  }, [cars, searchTerm, filterYear, filterMake])

  const showFallbackNotice = dataSource === 'local' && !loading && !error

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 mb-4">
            Unser <span className="bg-gradient-to-r from-blue-500 via-primary-500 to-blue-600 bg-clip-text text-transparent">Fahrzeugbestand</span>
          </h1>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Entdecken Sie unsere exklusive Sammlung von Premium-Fahrzeugen. 
            Jedes Auto wird sorgfältig ausgewählt und in höchster Qualität präsentiert.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Fahrzeug suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterMake}
                onChange={(e) => setFilterMake(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">Alle Marken</option>
                {uniqueMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>

              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">Alle Jahre</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle - Hidden on mobile */}
            <div className="hidden md:flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-dark-400 hover:text-dark-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-dark-400 hover:text-dark-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {(error || showFallbackNotice) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 space-y-3"
          >
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {showFallbackNotice && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Hinweis: Fahrzeuge werden aktuell aus lokalen Beispieldaten angezeigt. Bitte CARMS-Konfiguration pruefen.
              </div>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-dark-600">
            {loading
              ? 'Fahrzeuge werden geladen...'
              : `${filteredCars.length} Fahrzeug${filteredCars.length !== 1 ? 'e' : ''} gefunden`}
          </p>
        </motion.div>

        {/* Car Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CarCard car={car} viewMode={viewMode} onClick={() => setSelectedCar(car)} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {!loading && filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">Keine Fahrzeuge gefunden</h3>
            <p className="text-dark-600">Versuchen Sie andere Suchbegriffe oder Filter zu verwenden.</p>
          </motion.div>
        )}
      </div>

      {/* Car Detail Modal */}
      {selectedCar && <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </section>
  )
}
