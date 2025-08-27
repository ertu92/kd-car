import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Building, User, Shield, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impressum - KD-CAR | Rechtliche Informationen',
  description: 'Rechtliche Informationen und Impressum von KD-CAR - Autoaufbereitung und mehr. Alle wichtigen rechtlichen Angaben auf einen Blick.',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-white hover:text-accent-200 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">Impressum</h1>
          <p className="text-xl text-white/90">
            Rechtliche Informationen und Angaben gemäß § 5 TMG
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Company Information */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Building className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Angaben gemäß § 5 TMG</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold text-lg">Ismet Muhlis Demirel</p>
                <p>Einzelunternehmen – Autoaufbereitung</p>
                <p>Mülheimerstraße 33</p>
                <p>46045 Oberhausen</p>
                <p>Deutschland</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Phone className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Kontakt</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Telefon:</p>
                    <p>0177 3225218</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">E-Mail:</p>
                    <p>inf@kd-car.de</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Adresse:</p>
                    <p>Mülheimerstraße 33</p>
                    <p>46045 Oberhausen</p>
                    <p>Deutschland</p>
                  </div>
                </div>
              </div>
            </div>
          </section>



          {/* Professional Information */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-medium">Berufsbezeichnung:</span> Kfz-Meister
              </p>
              <p>
                <span className="font-medium">Zuständige Kammer:</span> Handwerkskammer Musterstadt
              </p>
              <p>
                <span className="font-medium">Verliehen durch:</span> Deutschland
              </p>
              <p>
                <span className="font-medium">Folgende berufsrechtliche Regelungen können eingesehen werden:</span>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Handwerksordnung (HwO)</li>
                <li>Kfz-Meisterprüfungsverordnung</li>
                <li>Berufsbildungsgesetz (BBiG)</li>
              </ul>
            </div>
          </section>

          {/* EU Dispute Resolution */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">EU-Streitschlichtung</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>
          </section>

          {/* Consumer Dispute Resolution */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Haftung für Inhalte</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
                der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>
          </section>

          {/* Copyright */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Urheberrecht</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
                des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den 
                privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie 
                trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden 
                Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </section>

          {/* Back to Home Button */}
          <div className="pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
