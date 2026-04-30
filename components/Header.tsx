'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node)) {
        setIsPhoneOpen(false)
      }
    }
    if (isPhoneOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isPhoneOpen])

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
        <div className="flex justify-between items-center py-3 sm:py-4 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <img
                src="/logo/logo.jpg"
                alt="KD-CAR Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`font-display font-bold text-xl sm:text-2xl truncate ${
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
            <Link 
              href="/inventory" 
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-dark-700 hover:text-primary-600' : 'text-white hover:text-accent-300'
              }`}
            >
              Fahrzeugbestand
            </Link>
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
          <div ref={phoneRef} className="hidden lg:flex items-center space-x-4 relative">
            <button
              onClick={() => setIsPhoneOpen(!isPhoneOpen)}
              className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            >
              <Phone className="w-5 h-5 text-primary-600" />
            </button>
            {isPhoneOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-[10000]">
                <a
                  href="tel:+491773225218"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                >
                  <Phone className="w-4 h-4 text-primary-600" />
                  <span className="font-medium">0177 3225218</span>
                </a>
                <a
                  href="tel:+4917662333406"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                >
                  <Phone className="w-4 h-4 text-primary-600" />
                  <span className="font-medium">0176 62333406</span>
                </a>
              </div>
            )}
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
              <Link 
                href="/inventory" 
                className="text-dark-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Fahrzeugbestand
              </Link>
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
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <a href="tel:+491773225218" className="flex items-center space-x-2 text-sm text-dark-700 hover:text-primary-600 py-1">
                <Phone className="w-4 h-4 text-primary-600" />
                <span>0177 3225218</span>
              </a>
              <a href="tel:+4917662333406" className="flex items-center space-x-2 text-sm text-dark-700 hover:text-primary-600 py-1">
                <Phone className="w-4 h-4 text-primary-600" />
                <span>0176 62333406</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
