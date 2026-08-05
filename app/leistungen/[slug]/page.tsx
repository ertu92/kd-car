import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Award, CheckCircle, ChevronRight, Clock, Shield, Users } from 'lucide-react'
import { getServiceBySlug, services } from '@/lib/services'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: 'Leistung nicht gefunden | KD-CAR' }
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/leistungen/${service.slug}` },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `https://www.kd-car.de/leistungen/${service.slug}`,
      type: 'website',
      siteName: 'KD-CAR',
      locale: 'de_DE',
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://www.kd-car.de/leistungen/${service.slug}#service`,
    name: service.seoTitle,
    serviceType: service.title,
    description: service.seoDescription,
    url: `https://www.kd-car.de/leistungen/${service.slug}`,
    provider: { '@id': 'https://www.kd-car.de/#business' },
    areaServed: [
      { '@type': 'City', name: 'Oberhausen' },
      { '@type': 'Place', name: 'Ruhrgebiet' },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://www.kd-car.de/' },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://www.kd-car.de/leistungen' },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://www.kd-car.de/leistungen/${service.slug}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-primary-600 text-white pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-1 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Startseite
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/leistungen" className="hover:text-white transition-colors duration-200">
              Leistungen
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.title}</span>
          </nav>

          <span className="text-sm font-medium text-white/90">{service.subtitle}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">{service.title}</h1>
          <p className="text-base sm:text-xl text-white/90">{service.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-56 sm:h-72">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>

          <div className="p-5 sm:p-8 space-y-8">
            <p className="text-base sm:text-lg text-gray-600">{service.detailedDescription}</p>

            {/* Process */}
            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <span>Unser Prozess</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="w-6 h-6 text-blue-600" />
                <span>Ihre Vorteile</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Arbeitszeit</h3>
                <p className="text-gray-600">{service.duration}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Garantie</h3>
                <p className="text-gray-600">{service.warranty}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Preis</h3>
                <p className="text-gray-600">{service.price}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-6 border-t border-gray-200">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kontaktieren Sie uns für ein persönliches Beratungsgespräch und lassen Sie
                uns gemeinsam Ihr Fahrzeug zum Strahlen bringen!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact" className="btn-primary text-lg px-8 py-4">
                  Jetzt Termin vereinbaren
                </Link>
                <Link href="/leistungen" className="btn-outline text-lg px-8 py-4">
                  <span className="flex items-center justify-center space-x-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Alle Leistungen</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
