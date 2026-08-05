import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Leistungen - KD-CAR | Autoaufbereitung, Beulendoktor & mehr in Oberhausen',
  description:
    'Alle Leistungen von KD-CAR in Oberhausen im Überblick: Auto An- und Verkauf, Unfallinstandsetzung, Fahrzeugaufbereitung, Beulendoktor, Felgenreparatur und Autoglas.',
  alternates: { canonical: '/leistungen' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kd-car.de/' },
    { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://kd-car.de/leistungen' },
  ],
}

export default function LeistungenPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-primary-600 text-white pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Unsere Leistungen</h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl">
            Ihr Zentrum für Lack und Karosserie in Oberhausen – von der Aufbereitung
            bis zur Unfallinstandsetzung, alles aus einer Hand.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/leistungen/${service.slug}`}
              className="card group overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-custom rounded-full p-2">
                    <service.icon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {service.price}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm text-primary-600 font-medium mb-3">
                  {service.subtitle}
                </span>
                <h2 className="text-xl font-display font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <span className="flex items-center space-x-2 text-primary-600 font-medium">
                  <span>Mehr erfahren</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
