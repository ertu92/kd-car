import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Calendar,
  Gauge,
  Zap,
  Settings2,
  Fuel,
  Cog,
  Hash,
  Users,
  DoorOpen,
  Palette,
  Car,
  ShieldCheck,
  ShieldAlert,
  Leaf,
  Snowflake,
  Sparkles,
  ChevronRight,
  ExternalLink,
  ScrollText,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CarGallery from '@/components/CarGallery'
import CarSpecsGrid from '@/components/CarSpecsGrid'
import CarPriceCard from '@/components/CarPriceCard'
import { getInventoryCar } from '@/lib/carms'
import {
  formatDateMonthYear,
  formatDecimal,
  formatMileage,
  formatNumber,
  formatPower,
  humanLabel,
  parseDescriptionParagraphs,
} from '@/lib/format'

interface CarDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const { car } = await getInventoryCar(slug)

  if (!car) {
    return {
      title: 'Fahrzeug nicht gefunden | KD-CAR',
    }
  }

  const title = `${car.make} ${car.model}${car.modelDescription ? ` – ${car.modelDescription}` : ''} | KD-CAR`
  const description =
    car.description && car.description.length > 30
      ? car.description.slice(0, 160).replace(/\\+/g, ' ').replace(/\s+/g, ' ')
      : `${car.make} ${car.model}, ${car.year}, ${formatMileage(car.mileage)}. Jetzt bei KD-CAR ansehen.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: car.image ? [{ url: car.image }] : undefined,
      type: 'website',
    },
  }
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params
  const { car } = await getInventoryCar(slug)

  if (!car) {
    notFound()
  }

  const ezDate = formatDateMonthYear(car.firstRegistration) ?? String(car.year)
  const huDate = formatDateMonthYear(car.hu)

  const headlineSpecs: Array<{ icon: typeof Calendar; label: string; value: string }> = [
    { icon: Calendar, label: 'Erstzulassung', value: ezDate },
    { icon: Gauge, label: 'Kilometerstand', value: formatMileage(car.mileage) },
    {
      icon: Zap,
      label: 'Leistung',
      value: formatPower(typeof car.horsepower === 'string' ? Number(car.horsepower.replace(/\D/g, '')) : undefined, car.horsepower) ?? car.horsepower,
    },
    { icon: Fuel, label: 'Kraftstoff', value: humanLabel(car.fuelType) ?? '–' },
    { icon: Settings2, label: 'Getriebe', value: humanLabel(car.transmission) ?? car.transmission },
    { icon: Car, label: 'Fahrzeugart', value: humanLabel(car.condition) ?? humanLabel(car.usageType) ?? 'Gebraucht' },
  ]

  const technicalSpecs = filterEmpty([
    car.firstRegistration && { icon: Calendar, label: 'Erstzulassung', value: ezDate },
    car.mileage && { icon: Gauge, label: 'Kilometerstand', value: formatMileage(car.mileage) },
    car.horsepower && {
      icon: Zap,
      label: 'Leistung',
      value: formatPower(numberFromPowerString(car.horsepower), car.horsepower) ?? car.horsepower,
    },
    car.cubicCapacity && { icon: Cog, label: 'Hubraum', value: formatNumber(car.cubicCapacity, 'cm³') },
    car.cylinders && { icon: Cog, label: 'Zylinder', value: formatNumber(car.cylinders) },
    car.transmission && { icon: Settings2, label: 'Getriebe', value: humanLabel(car.transmission) ?? car.transmission },
    car.fuelType && { icon: Fuel, label: 'Kraftstoff', value: humanLabel(car.fuelType) ?? car.fuelType },
    car.vehicleType && { icon: Car, label: 'Fahrzeugklasse', value: humanLabel(car.vehicleType) ?? car.vehicleType },
    car.category && { icon: Car, label: 'Kategorie', value: humanLabel(car.category) ?? car.category },
    car.condition && { icon: ShieldCheck, label: 'Fahrzeugzustand', value: humanLabel(car.condition) ?? car.condition },
    car.prevOwners != null && { icon: Users, label: 'Vorbesitzer', value: String(car.prevOwners) },
    car.doors && { icon: DoorOpen, label: 'Türen', value: humanLabel(car.doors) ?? car.doors },
    car.seats && { icon: Users, label: 'Sitze', value: String(car.seats) },
    car.exteriorColor && {
      icon: Palette,
      label: 'Außenfarbe',
      value: `${humanLabel(car.exteriorColor) ?? car.exteriorColor}${car.metallic ? ' (metallic)' : ''}`,
    },
    car.interiorColor && {
      icon: Palette,
      label: 'Innenfarbe',
      value: `${humanLabel(car.interiorColor) ?? car.interiorColor}${car.interiorType ? `, ${humanLabel(car.interiorType) ?? car.interiorType}` : ''}`,
    },
    huDate && { icon: ShieldCheck, label: 'HU/AU bis', value: huDate },
    car.vin && { icon: Hash, label: 'FIN', value: car.vin },
  ])

  const conditionItems = filterEmpty([
    car.accidentFree != null && {
      icon: car.accidentFree ? ShieldCheck : ShieldAlert,
      label: 'Unfallfrei',
      value: car.accidentFree ? 'Ja' : 'Unfallfahrzeug',
    },
    car.damageUnrepaired != null && {
      icon: ShieldAlert,
      label: 'Unrepariert',
      value: car.damageUnrepaired ? 'Ja' : 'Nein',
    },
    car.roadworthy != null && {
      icon: ShieldCheck,
      label: 'Fahrbereit',
      value: car.roadworthy ? 'Ja' : 'Nein',
    },
    car.warranty != null && {
      icon: ShieldCheck,
      label: 'Gewährleistung',
      value: car.warrantyMonths ? `${car.warrantyMonths} Monate` : car.warranty ? 'Ja' : 'Nein',
    },
  ])

  const energySpecs = filterEmpty([
    car.consumptionCombined != null && {
      icon: Fuel,
      label: 'Verbrauch (komb.)',
      value: formatDecimal(car.consumptionCombined, car.consumptionUnit ?? 'l/100 km'),
    },
    car.consumptionUrban != null && {
      icon: Fuel,
      label: 'Verbrauch (innerorts)',
      value: formatDecimal(car.consumptionUrban, car.consumptionUnit ?? 'l/100 km'),
    },
    car.consumptionExtraUrban != null && {
      icon: Fuel,
      label: 'Verbrauch (außerorts)',
      value: formatDecimal(car.consumptionExtraUrban, car.consumptionUnit ?? 'l/100 km'),
    },
    car.co2Emission != null && {
      icon: Leaf,
      label: 'CO₂-Emission',
      value: `${formatDecimal(car.co2Emission, 'g/km', 0)}`,
    },
    car.emissionClass && {
      icon: Leaf,
      label: 'Schadstoffklasse',
      value: humanLabel(car.emissionClass) ?? car.emissionClass,
    },
    car.emissionSticker && {
      icon: Leaf,
      label: 'Umweltplakette',
      value: humanLabel(car.emissionSticker) ?? car.emissionSticker,
    },
    car.energyEfficiencyClass && {
      icon: Leaf,
      label: 'Effizienzklasse',
      value: car.energyEfficiencyClass,
    },
    car.electricRange != null && {
      icon: Zap,
      label: 'Elektrische Reichweite',
      value: formatNumber(car.electricRange, 'km'),
    },
    car.batteryCapacity != null && {
      icon: Zap,
      label: 'Batteriekapazität',
      value: formatDecimal(car.batteryCapacity, 'kWh'),
    },
  ])

  const equipmentSpecs = filterEmpty([
    car.climatisation && {
      icon: Snowflake,
      label: 'Klimatisierung',
      value: humanLabel(car.climatisation) ?? car.climatisation,
    },
    car.parkAssists && {
      icon: Sparkles,
      label: 'Parkassistenten',
      value: humanLabel(car.parkAssists) ?? car.parkAssists,
    },
    car.airbags && {
      icon: ShieldCheck,
      label: 'Airbags',
      value: humanLabel(car.airbags) ?? car.airbags,
    },
    car.trailerCoupling && {
      icon: Sparkles,
      label: 'Anhängerkupplung',
      value: humanLabel(car.trailerCoupling) ?? car.trailerCoupling,
    },
  ])

  const description = car.description?.trim()
  const descriptionBlocks = description ? parseDescriptionParagraphs(description) : []

  const equipmentFromDescription: string[] =
    car.features.length === 0
      ? descriptionBlocks
          .filter((block) => block.heading && /Ausstattung|Sonderausstattung/i.test(block.heading))
          .flatMap((block) => block.lines)
      : car.features

  const proseBlocks = descriptionBlocks.filter(
    (block) => !block.heading || !/Ausstattung|Sonderausstattung/i.test(block.heading)
  )

  return (
    <>
      <Header />
      <main className="bg-gray-50 pb-16 pt-24 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1 text-sm text-dark-500">
            <Link href="/" className="hover:text-primary-600">
              Start
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/inventory" className="hover:text-primary-600">
              Fahrzeugbestand
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate text-dark-900">
              {car.make} {car.model}
            </span>
          </nav>

          {/* Headline */}
          <header className="mb-6">
            <h1 className="text-2xl font-display font-bold text-dark-900 sm:text-3xl lg:text-4xl">
              {car.make} {car.model}
            </h1>
            {car.modelDescription ? (
              <p className="mt-1 text-base text-dark-600 sm:text-lg">
                {car.modelDescription}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {car.condition ? <Badge>{humanLabel(car.condition) ?? car.condition}</Badge> : null}
              {car.firstRegistration ? <Badge tone="muted">EZ {ezDate}</Badge> : null}
              {car.accidentFree === true ? <Badge tone="success">Unfallfrei</Badge> : null}
              {car.warranty === true ? (
                <Badge tone="success">
                  Gewährleistung{car.warrantyMonths ? ` ${car.warrantyMonths} Monate` : ''}
                </Badge>
              ) : null}
              {car.emissionClass ? (
                <Badge tone="muted">{humanLabel(car.emissionClass) ?? car.emissionClass}</Badge>
              ) : null}
              {car.fuelType ? <Badge tone="muted">{humanLabel(car.fuelType)}</Badge> : null}
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <CarGallery images={car.images} alt={`${car.make} ${car.model}`} />

              {/* Headline-spec strip */}
              <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {headlineSpecs.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3"
                    >
                      <Icon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                      <div className="min-w-0">
                        <p className="text-xs text-dark-500">{label}</p>
                        <p className="truncate text-sm font-semibold text-dark-900">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <CarSpecsGrid title="Fahrzeugdaten" items={technicalSpecs} />

              {conditionItems.length > 0 && (
                <CarSpecsGrid title="Zustand & Garantie" items={conditionItems} />
              )}

              {energySpecs.length > 0 && (
                <CarSpecsGrid title="Verbrauch & Emissionen" items={energySpecs} />
              )}

              {equipmentSpecs.length > 0 && (
                <CarSpecsGrid title="Komfort & Assistenz" items={equipmentSpecs} />
              )}

              {/* Equipment list */}
              {equipmentFromDescription.length > 0 && (
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="mb-4 text-lg font-display font-semibold text-dark-900 sm:text-xl">
                    Ausstattung
                  </h2>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    {equipmentFromDescription.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-dark-700"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Description */}
              {proseBlocks.length > 0 && (
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-display font-semibold text-dark-900 sm:text-xl">
                    <ScrollText className="h-5 w-5 text-primary-600" />
                    Fahrzeugbeschreibung
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed text-dark-700 sm:text-base">
                    {proseBlocks.map((block, i) => (
                      <div key={`${block.heading ?? 'block'}-${i}`}>
                        {block.heading ? (
                          <h3 className="mb-2 font-semibold text-dark-900">{block.heading}</h3>
                        ) : null}
                        {block.lines.length > 1 ? (
                          <ul className="list-disc space-y-1 pl-5 marker:text-primary-500">
                            {block.lines.map((line, j) => (
                              <li key={j}>{line}</li>
                            ))}
                          </ul>
                        ) : block.lines[0] ? (
                          <p>{block.lines[0]}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Source link */}
              {car.externalUrl ? (
                <p className="text-xs text-dark-500">
                  Originalinserat:{' '}
                  <a
                    href={car.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary-600 hover:underline"
                  >
                    {car.externalSource ?? 'extern'}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              ) : null}
            </div>

            <CarPriceCard
              price={car.price}
              netPrice={car.netPrice}
              vat={car.vat}
              priceType={humanLabel(car.priceType)}
              warranty={car.warranty}
              warrantyMonths={car.warrantyMonths}
              title={`${car.make} ${car.model}${car.modelDescription ? ` ${car.modelDescription}` : ''}`}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function filterEmpty<T>(items: Array<T | false | 0 | '' | null | undefined>): T[] {
  return items.filter((x): x is T => Boolean(x))
}

function numberFromPowerString(power: string): number | undefined {
  const match = power.match(/(\d+)/)
  return match ? Number(match[1]) : undefined
}

function Badge({
  children,
  tone = 'primary',
}: {
  children: React.ReactNode
  tone?: 'primary' | 'muted' | 'success'
}) {
  const tones: Record<string, string> = {
    primary: 'bg-primary-100 text-primary-700',
    muted: 'bg-gray-100 text-dark-700',
    success: 'bg-green-100 text-green-700',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
