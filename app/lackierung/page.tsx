import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react'
import LackierungLeadForm from '@/components/LackierungLeadForm'
import LackierungMobileBar from '@/components/LackierungMobileBar'

// Landingpage für die Google-Ads-Kampagne "Lackiererei" (Suchnetzwerk + Maps).
// Fokus: ein klares Angebot, Telefon + Formular als Conversion, lokaler Bezug.

const PHONE_DISPLAY = '0177 3225218'
const PHONE_TEL = '+491773225218'
// WhatsApp-Nummer (+49 176 62333406), Anrufe gehen auf die 0177.
const WHATSAPP_NUMBER = '4917662333406'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hallo KD-CAR, ich hätte gern ein Angebot für eine Lackierung. Fahrzeug und Schaden: '
)}`

export const metadata: Metadata = {
  title: 'Autolackiererei Oberhausen – Lackieren zum fairen Preis | KD-CAR',
  description:
    'Fahrzeuglackiererei in Oberhausen: Kratzer, Stoßstange, Teil- und Komplettlackierung, Smart Repair und Unfallinstandsetzung. Kostenloses Angebot, hochwertige Lackmaterialien, 4,9 Sterne bei Google.',
  keywords:
    'Autolackiererei Oberhausen, Auto lackieren Oberhausen, Lackiererei Mülheim, Lackiererei Essen, Smart Repair Oberhausen, Stoßstange lackieren, Kratzer entfernen, Unfallinstandsetzung Oberhausen',
  alternates: { canonical: '/lackierung' },
  openGraph: {
    title: 'Autolackiererei Oberhausen – Lackieren zum fairen Preis | KD-CAR',
    description:
      'Kratzer, Stoßstange, Teil- oder Komplettlackierung: KD-CAR lackiert in Oberhausen zu fairen Preisen. Jetzt kostenloses Angebot anfordern.',
    url: 'https://www.kd-car.de/lackierung',
    type: 'website',
    siteName: 'KD-CAR',
    locale: 'de_DE',
  },
}

const services = [
  {
    icon: Sparkles,
    title: 'Kratzer & Lackschäden',
    text: 'Kleine Schäden werden per Smart Repair punktuell ausgebessert – schnell und günstiger als eine Teillackierung.',
  },
  {
    icon: Wrench,
    title: 'Stoßstange & Einzelteile',
    text: 'Stoßstange, Tür, Kotflügel, Motorhaube oder Spiegel – farbgenau lackiert, ohne sichtbaren Übergang.',
  },
  {
    icon: ShieldCheck,
    title: 'Unfallinstandsetzung',
    text: 'Karosserie richten, Teile tauschen und lackieren aus einer Hand. Auf Wunsch mit Gutachten und Abwicklung mit der Versicherung.',
  },
  {
    icon: Star,
    title: 'Komplettlackierung',
    text: 'Neuer Lack für das ganze Fahrzeug – in Originalfarbe oder Wunschfarbe, inklusive Vorbereitung und Finish.',
  },
]

const steps = [
  { title: 'Anfrage', text: 'Anrufen oder Formular ausfüllen – gern mit Foto vom Schaden.' },
  { title: 'Angebot', text: 'Sie erhalten einen klaren Preis, bei Bedarf nach kurzer Besichtigung vor Ort.' },
  { title: 'Lackierung', text: 'Vorbereitung, Lackierung und Finish mit hochwertigen Materialien.' },
  { title: 'Abholung', text: 'Qualitätskontrolle, dann holen Sie Ihr Fahrzeug sauber und fertig ab.' },
]

const regions = [
  'Oberhausen',
  'Mülheim an der Ruhr',
  'Essen',
  'Duisburg',
  'Bottrop',
  'Gelsenkirchen',
  'Dinslaken',
  'Gladbeck',
]

const faqs = [
  {
    q: 'Was kostet es, ein Auto lackieren zu lassen?',
    a: 'Das hängt von Fläche, Lackart und Vorarbeit ab. Smart Repair für kleine Kratzer beginnt bei ca. 150 €, Einzelteile wie eine Stoßstange liegen meist im mittleren dreistelligen Bereich. Nach einem Foto oder einer kurzen Besichtigung nennen wir Ihnen einen festen Preis.',
  },
  {
    q: 'Wie lange dauert die Lackierung?',
    a: 'Kleinere Arbeiten sind oft in 1 bis 2 Tagen fertig, Einzelteile in 2 bis 3 Tagen. Bei Unfallinstandsetzungen oder Komplettlackierungen sprechen wir den Termin individuell ab.',
  },
  {
    q: 'Wird die Farbe exakt getroffen?',
    a: 'Ja. Wir mischen den Lack nach dem Farbcode Ihres Fahrzeugs und gleichen ihn am Fahrzeug ab, damit kein Farbunterschied sichtbar ist.',
  },
  {
    q: 'Übernehmen Sie auch die Abwicklung mit der Versicherung?',
    a: 'Bei Unfallschäden unterstützen wir Sie mit Kostenvoranschlag und Gutachten und stimmen die Reparatur mit der Versicherung ab.',
  },
]

export default function LackierungPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.kd-car.de/lackierung#service',
    name: 'Autolackiererei Oberhausen',
    serviceType: 'Fahrzeuglackierung',
    description: metadata.description,
    url: 'https://www.kd-car.de/lackierung',
    provider: { '@id': 'https://www.kd-car.de/#business' },
    areaServed: regions.map((name) => ({ '@type': 'City', name })),
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dark-900 pt-24 text-white sm:pt-28">
        <Image
          src="/images/carwrap.jpg"
          alt="Fahrzeuglackierung bei KD-CAR in Oberhausen"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900/90 to-primary-900/70" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pb-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-accent-500" />
              <span>Fahrzeuglackiererei · Mülheimer Str. 33, Oberhausen</span>
            </div>
            <h1 className="mb-4 text-3xl font-display font-bold leading-tight hyphens-none sm:text-4xl lg:text-5xl">
              Auto lackieren in Oberhausen –{' '}
              <span className="text-accent-500">fair, sauber, farbgenau</span>
            </h1>
            <p className="mb-6 max-w-xl text-lg text-white/85">
              Kratzer, Stoßstange, Einzelteil oder das ganze Fahrzeug: Wir lackieren mit
              hochwertigen Materialien und nennen Ihnen vorab einen klaren Preis.
            </p>

            <ul className="mb-8 space-y-2 text-white/90">
              {[
                'Kostenloses Angebot – gern per Foto',
                'Smart Repair, Teil- und Komplettlackierung',
                'Unfallinstandsetzung inkl. Gutachten',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${PHONE_TEL}`}
                className="btn-secondary flex items-center justify-center gap-2 text-lg"
              >
                <Phone className="h-5 w-5" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </div>
            <a
              href="#angebot"
              className="mt-3 inline-block text-sm text-white/80 underline underline-offset-4 hover:text-white"
            >
              Oder Angebot per Formular anfordern
            </a>

            <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
              <div className="flex text-accent-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span>4,9 von 5 Sternen bei Google</span>
            </div>
          </div>

          <div id="angebot" className="scroll-mt-28">
            <LackierungLeadForm />
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-display font-bold text-dark-900 sm:text-3xl">
              Was wir lackieren
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Vom kleinen Kratzer bis zur Komplettlackierung – alles in unserer Lackiererei in
              Oberhausen.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl bg-white p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <service.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-dark-900">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-display font-bold text-dark-900 sm:text-3xl">
            So läuft es ab
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-dark-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vorteile + Region */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-display font-bold text-dark-900">
              Warum KD-CAR?
            </h2>
            <ul className="space-y-4">
              {[
                ['Fester Preis vorab', 'Kein Überraschungs-Aufschlag: Sie wissen vor Beginn, was es kostet.'],
                ['Hochwertige Lackmaterialien', 'Farbgenau nach Farbcode gemischt, UV-beständig und langlebig.'],
                ['Alles aus einer Hand', 'Karosserie, Lack, Smart Repair und Aufbereitung an einem Ort.'],
                ['Saubere Arbeit, garantiert', 'Qualitätskontrolle vor jeder Übergabe.'],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <p className="font-semibold text-dark-900">{title}</p>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-900 p-8 text-white shadow-md">
            <h2 className="mb-3 text-2xl font-display font-bold">Lackiererei für das Ruhrgebiet</h2>
            <p className="mb-6 text-white/85">
              Unsere Werkstatt liegt an der Mülheimer Straße in Oberhausen, direkt an der
              Grenze zu Mülheim. Kunden kommen aus:
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {regions.map((region) => (
                <span key={region} className="rounded-full bg-white/15 px-3 py-1 text-sm">
                  {region}
                </span>
              ))}
            </div>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-500" />
                Mülheimer Str. 33, 46045 Oberhausen
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent-500" />
                Mo–Fr 8:00–18:00 Uhr, Sa 9:00–15:00 Uhr
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent-500" />
                <a href={`tel:${PHONE_TEL}`} className="font-semibold underline-offset-2 hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-accent-500" />
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline-offset-2 hover:underline"
                >
                  Per WhatsApp schreiben
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-display font-bold text-dark-900 sm:text-3xl">
            Häufige Fragen
          </h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-dark-900">
                  {faq.q}
                  <span className="ml-4 text-primary-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Abschluss-CTA */}
      <section className="bg-dark-900 py-14 text-white sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-display font-bold sm:text-3xl">
            Jetzt Angebot für Ihre Lackierung holen
          </h2>
          <p className="mb-8 text-white/80">
            Rufen Sie an oder schicken Sie uns kurz Fahrzeug und Schaden – wir melden uns
            schnellstmöglich mit einem Preis.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href={`tel:${PHONE_TEL}`} className="btn-secondary flex items-center justify-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
            <a href="#angebot" className="btn-primary flex items-center justify-center text-lg">
              Zum Formular
            </a>
          </div>
          <p className="mt-8 text-sm text-white/60">
            Mehr zu unseren Leistungen:{' '}
            <Link href="/leistungen/unfallinstandsetzung" className="underline hover:text-white">
              Unfallinstandsetzung
            </Link>
            {' · '}
            <Link href="/leistungen/beulendoktor" className="underline hover:text-white">
              Beulendoktor
            </Link>
          </p>
        </div>
      </section>

      <LackierungMobileBar phoneTel={PHONE_TEL} whatsappLink={WHATSAPP_LINK} />
    </div>
  )
}
