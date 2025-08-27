'use client'

import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ArrowUp
} from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  services: [
    { name: 'Fahrzeugaufbereitung', href: '#services' },
    { name: 'Beulendoktor', href: '#services' },
    { name: 'Autofolierung', href: '#services' },
    { name: 'Autoglas-Reparatur', href: '#services' },
    { name: 'Smart Repair', href: '#services' },
    { name: 'Tuning', href: '#services' }
  ],
  company: [
    { name: 'Über uns', href: '#about' }
  ],
  support: [
    { name: 'Kontakt', href: '#contact' },
    { name: 'FAQ', href: '#contact' },
    { name: 'Support', href: '#contact' },
    { name: 'Garantie', href: '#contact' },
    { name: 'Impressum', href: '/impressum' }
  ]
}



export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/logo/logo.jpg"
                    alt="KD-CAR Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-display font-bold text-2xl">KD-CAR</span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Professionelle Autoaufbereitung und mehr. Qualität, die begeistert. 
                Service, der überzeugt.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span>0177 3225218</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span>info@kd-car.de</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span>Deutschland</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span>Mo-Fr: 8:00 - 18:00</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6">Leistungen</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-6">Unternehmen</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>



        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-6 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 KD-CAR. Alle Rechte vorbehalten.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-primary-400 transition-colors duration-200">
                Datenschutzerklärung
              </Link>
              <Link href="/impressum" className="hover:text-primary-400 transition-colors duration-200">
                Impressum
              </Link>
              <Link href="#" className="hover:text-primary-400 transition-colors duration-200">
                AGB
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-40"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
