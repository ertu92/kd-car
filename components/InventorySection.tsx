'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react'
import CarCard from './CarCard'
import type { InventoryCar, DataSource } from '@/lib/carms'

type ViewMode = 'grid' | 'list'

type CarsResponse = {
  cars: InventoryCar[]
  source: DataSource
  error?: string
}

export default function InventorySection() {
  const [cars, setCars] = useState<InventoryCar[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterYear, setFilterYear] = useState('all')
  const [filterMake, setFilterMake] = useState('all')
  const [filtersOpen, setFiltersOpen] = useState(false)
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
  const activeFilterCount = (filterMake !== 'all' ? 1 : 0) + (filterYear !== 'all' ? 1 : 0)

  const resetFilters = () => {
    setFilterMake('all')
    setFilterYear('all')
  }

  return (
    <section className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center sm:mb-12"
        >
          <h1 className="mb-2 text-2xl font-display font-bold leading-tight text-dark-900 sm:mb-4 sm:text-4xl md:text-5xl">
            Unser{' '}
            <span className="bg-gradient-to-r from-blue-500 via-primary-500 to-blue-600 bg-clip-text text-transparent">
              Fahrzeugbestand
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-gray-600 sm:text-xl">
            Entdecken Sie unsere exklusive Sammlung von Premium-Fahrzeugen.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-4 rounded-2xl bg-white p-3 shadow-md sm:mb-8 sm:p-6 sm:shadow-lg"
        >
          {/* Mobile: search + filter button row */}
          <div className="flex items-stretch gap-2 lg:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Marke, Modell ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className={`relative flex items-center gap-1.5 rounded-xl border px-3.5 py-3 text-sm font-medium transition ${
                filtersOpen || activeFilterCount > 0
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-dark-900'
              }`}
              aria-label="Filter ein- und ausblenden"
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: collapsible filters */}
          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                key="mobile-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                  <select
                    value={filterMake}
                    onChange={(e) => setFilterMake(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-primary-500"
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
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Alle Jahre</option>
                    {uniqueYears.map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    Filter zurücksetzen
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop: inline search + filters */}
          <div className="hidden flex-row items-center gap-4 lg:flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Fahrzeug suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-base transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <select
              value={filterMake}
              onChange={(e) => setFilterMake(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary-500"
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
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Alle Jahre</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>

            <div className="flex rounded-xl bg-gray-100 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label="Kachelansicht"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label="Listenansicht"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {(error || showFallbackNotice) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 space-y-2 sm:mb-8 sm:space-y-3"
          >
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {showFallbackNotice && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 sm:text-sm">
                Hinweis: Fahrzeuge werden aktuell aus lokalen Beispieldaten angezeigt. Bitte CARMS-Konfiguration pruefen.
              </div>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-3 sm:mb-6"
        >
          <p className="text-xs text-gray-600 sm:text-sm">
            {loading
              ? 'Fahrzeuge werden geladen...'
              : `${filteredCars.length} Fahrzeug${filteredCars.length !== 1 ? 'e' : ''} gefunden`}
          </p>
        </motion.div>

        {/* Car Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`grid gap-3 sm:gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
            >
              <CarCard car={car} viewMode={viewMode} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {!loading && filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-12 text-center"
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 sm:h-24 sm:w-24">
              <Search className="h-10 w-10 text-gray-400 sm:h-12 sm:w-12" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-dark-900 sm:text-xl">
              Keine Fahrzeuge gefunden
            </h3>
            <p className="text-sm text-gray-600">
              Versuchen Sie andere Suchbegriffe oder Filter zu verwenden.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
