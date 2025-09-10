'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid, List } from 'lucide-react'
import CarCard from './CarCard'
import CarDetailModal from './CarDetailModal'

interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage: number
  image: string
  images: string[]
  engine: string
  horsepower: string
  transmission: string
  exteriorColor: string
  interiorColor: string
  features: string[]
  description: string
}

// Sample car data - in a real app, this would come from an API
const sampleCars = [
  {
    id: 1,
    make: 'Mercedes-Benz',
    model: 'G63 AMG',
    year: 2025,
    price: 185000,
    mileage: 100,
    image: '/images/body.jpg',
    images: ['/images/body.jpg', '/images/carwrap.jpg', '/images/interior.jpg', '/images/reifen.jpg'],
    engine: '5.0L V8',
    horsepower: '585 PS',
    transmission: 'Automatic',
    exteriorColor: 'Black',
    interiorColor: 'Tan',
    features: [
      'AMG Performance Package',
      'Premium Sound System',
      'Heated Seats',
      'Navigation System',
      'Blind Spot Assist',
      'Adaptive Cruise Control'
    ],
    description: 'Ein außergewöhnlicher Mercedes-Benz G63 AMG mit nur 100 km Laufleistung. Dieses Fahrzeug bietet die perfekte Kombination aus Luxus und Performance.'
  },
  {
    id: 2,
    make: 'BMW',
    model: 'M8 Competition',
    year: 2024,
    price: 165000,
    mileage: 2500,
    image: '/images/carwrap.jpg',
    images: ['/images/carwrap.jpg', '/images/body.jpg', '/images/interior.jpg'],
    engine: '4.4L V8 Twin-Turbo',
    horsepower: '625 PS',
    transmission: 'Automatic',
    exteriorColor: 'Alpine White',
    interiorColor: 'Black',
    features: [
      'M Competition Package',
      'Carbon Fiber Trim',
      'Harman Kardon Sound',
      'Heated & Ventilated Seats',
      'Laser Headlights',
      'M Sport Differential'
    ],
    description: 'Der BMW M8 Competition ist ein Meisterwerk der Ingenieurskunst. Mit 625 PS und nur 2.500 km Laufleistung ist dieses Fahrzeug ein Traum für jeden Autoliebhaber.'
  },
  {
    id: 3,
    make: 'Audi',
    model: 'RS6 Avant',
    year: 2023,
    price: 145000,
    mileage: 8500,
    image: '/images/interior.jpg',
    images: ['/images/interior.jpg', '/images/body.jpg', '/images/carwrap.jpg'],
    engine: '4.0L V8 Twin-Turbo',
    horsepower: '600 PS',
    transmission: 'Automatic',
    exteriorColor: 'Nardo Gray',
    interiorColor: 'Black/Red',
    features: [
      'RS Sport Package',
      'Audi Virtual Cockpit',
      'Bang & Olufsen Sound',
      'Massage Seats',
      'Matrix LED Headlights',
      'Quattro All-Wheel Drive'
    ],
    description: 'Der Audi RS6 Avant kombiniert praktische Alltagstauglichkeit mit sportlicher Performance. Ein perfektes Familienauto mit 600 PS.'
  },
  {
    id: 4,
    make: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price: 220000,
    mileage: 1200,
    image: '/images/reifen.jpg',
    images: ['/images/reifen.jpg', '/images/body.jpg', '/images/interior.jpg', '/images/carwrap.jpg'],
    engine: '3.8L H6 Twin-Turbo',
    horsepower: '650 PS',
    transmission: 'PDK Automatic',
    exteriorColor: 'Guards Red',
    interiorColor: 'Black',
    features: [
      'Porsche Ceramic Brakes',
      'Sport Chrono Package',
      'BOSE Sound System',
      'Sport Seats Plus',
      'LED Matrix Headlights',
      'Porsche Traction Management'
    ],
    description: 'Der Porsche 911 Turbo S ist die Krönung der 911-Serie. Mit 650 PS und nur 1.200 km Laufleistung ist dieses Fahrzeug ein absolutes Sammlerstück.'
  }
]

export default function InventorySection() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterYear, setFilterYear] = useState('all')
  const [filterMake, setFilterMake] = useState('all')

  const filteredCars = sampleCars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = filterYear === 'all' || car.year.toString() === filterYear
    const matchesMake = filterMake === 'all' || car.make === filterMake
    
    return matchesSearch && matchesYear && matchesMake
  })

  const uniqueMakes = Array.from(new Set(sampleCars.map(car => car.make)))
  const uniqueYears = Array.from(new Set(sampleCars.map(car => car.year))).sort((a, b) => b - a)

  // Force grid view on mobile devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && viewMode === 'list') {
        setViewMode('grid')
      }
    }

    // Check on mount
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [viewMode])

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
                {uniqueMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>

              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">Alle Jahre</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle - Hidden on mobile */}
            <div className="hidden md:flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-primary-600' 
                    : 'text-dark-400 hover:text-dark-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-primary-600' 
                    : 'text-dark-400 hover:text-dark-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-dark-600">
            {filteredCars.length} Fahrzeug{filteredCars.length !== 1 ? 'e' : ''} gefunden
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
              <CarCard 
                car={car} 
                viewMode={viewMode}
                onClick={() => setSelectedCar(car)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">
              Keine Fahrzeuge gefunden
            </h3>
            <p className="text-dark-600">
              Versuchen Sie andere Suchbegriffe oder Filter zu verwenden.
            </p>
          </motion.div>
        )}
      </div>

      {/* Car Detail Modal */}
      {selectedCar && (
        <CarDetailModal 
          car={selectedCar} 
          onClose={() => setSelectedCar(null)} 
        />
      )}
    </section>
  )
}
