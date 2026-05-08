import Link from 'next/link'
import { Search } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CarNotFound() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 py-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="mt-6 text-2xl font-display font-bold text-dark-900 sm:text-3xl">
            Fahrzeug nicht gefunden
          </h1>
          <p className="mt-2 text-dark-600">
            Dieses Fahrzeug ist nicht mehr verfügbar oder die Adresse stimmt nicht.
          </p>
          <Link
            href="/inventory"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Zum Fahrzeugbestand
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
