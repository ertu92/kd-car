'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (sectionId: string) => {
    // Wenn wir nicht auf der Hauptseite sind, zuerst dorthin navigieren
    if (window.location.pathname !== '/') {
      router.push(`/#${sectionId}`)
    } else {
      // Wenn wir bereits auf der Hauptseite sind, einfach scrollen
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-custom shadow-lg' 
        : 'bg-black/80 backdrop-blur-custom'
    }`} style={{ position: 'fixed', zIndex: 9999 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/logo/logo.jpg" 
                alt="KD-CAR Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`font-display font-bold text-2xl ${
              isScrolled ? 'text-dark-900' : 'text-white'
            }`}>
              KD-CAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-dark-700 hover:text-primary-600' : 'text-white hover:text-accent-300'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('services')}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-dark-700 hover:text-primary-600' : 'text-white hover:text-accent-300'
              }`}
            >
              Leistungen
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-dark-700 hover:text-primary-600' : 'text-white hover:text-accent-300'
              }`}
            >
              Über uns
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-dark-700 hover:text-primary-600' : 'text-white hover:text-accent-300'
              }`}
            >
              Kontakt
            </button>
            <Link 
              href="/impressum" 
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-dark-700 hover:text-primary-600' : 'text-white hover:text-accent-300'
              }`}
            >
              Impressum
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-primary-600" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isScrolled ? 'text-dark-700' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-xl mt-4 p-6 z-[9999]">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-dark-700 hover:text-primary-600 font-medium py-2 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('services')}
                className="text-dark-700 hover:text-primary-600 font-medium py-2 text-left"
              >
                Leistungen
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-dark-700 hover:text-primary-600 font-medium py-2 text-left"
              >
                Über uns
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-dark-700 hover:text-primary-600 font-medium py-2 text-left"
              >
                Kontakt
              </button>
              <Link 
                href="/impressum" 
                className="text-dark-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Impressum
              </Link>
            </nav>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-dark-700 mb-2">
                <Phone className="w-4 h-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
