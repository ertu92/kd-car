'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Users, 
  Award, 
  Clock,
  Star,
  Shield,
  Zap
} from 'lucide-react'

const stats = [
  { icon: Users, value: '500+', label: 'Zufriedene Kunden' },
  { icon: Award, value: '15+', label: 'Jahre Erfahrung' },
  { icon: Clock, value: '24/7', label: 'Service verfügbar' },
  { icon: Star, value: '4.9', label: 'Kundenbewertung' }
]

const features = [
  {
    icon: Shield,
    title: 'Garantierte Qualität',
    description: 'Alle unsere Arbeiten werden mit höchster Sorgfalt und Qualität ausgeführt.'
  },
  {
    icon: Zap,
    title: 'Schneller Service',
    description: 'Wir arbeiten effizient und liefern pünktlich - Ihre Zeit ist uns wichtig.'
  },
  {
    icon: Star,
    title: 'Premium Ausführung',
    description: 'Verwenden nur hochwertige Materialien und moderne Techniken.'
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-6"
              >
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Über uns</span>
              </motion.div>
              
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-dark-900 mb-6">
                Wir sind ein <span className="bg-gradient-to-r from-blue-500 via-primary-500 to-blue-600 bg-clip-text text-transparent">Autoaufbereiter</span> mit dem gewissen Extra
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                <strong>Ihr Auto. Unser Handwerk. Ihre Zufriedenheit.</strong>
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Von der professionellen Fahrzeugaufbereitung über Smart Repair und Beulendoktor bis hin zu 
                Folierung, Scheibentönung und Autoglas-Reparatur – wir bieten Ihnen das komplette 
                Rundum-sorglos-Paket. Auch beim An- und Verkauf sowie der Inzahlungnahme sind wir Ihr 
                zuverlässiger Partner – kompetent, transparent und mit einem Auge fürs Detail.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>


          </motion.div>

          {/* Right Column - Stats & Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-dark-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="KD-CAR Team bei der Arbeit"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent rounded-2xl" />
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-dark-900">
                    Wir sind für Sie da!
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-primary-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-display font-bold text-dark-900 mb-4">
              Warum KD-CAR wählen?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Wir kombinieren jahrelange Erfahrung mit modernster Technik und höchster Qualität. 
              Ihr Fahrzeug verdient die beste Behandlung - und das bekommen Sie bei uns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Zertifizierte Techniker</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Hochwertige Materialien</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Garantie auf alle Arbeiten</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Transparente Preise</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
