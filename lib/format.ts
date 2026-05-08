// Shared display helpers for inventory pages.

export function formatPrice(price: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('de-DE').format(mileage) + ' km'
}

export function formatNumber(value: number, suffix = ''): string {
  return new Intl.NumberFormat('de-DE').format(value) + (suffix ? ` ${suffix}` : '')
}

export function formatDecimal(value: number, suffix = '', digits = 1): string {
  return (
    new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    }).format(value) + (suffix ? ` ${suffix}` : '')
  )
}

export function formatDateMonthYear(iso: string | undefined): string | undefined {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return undefined
  return new Intl.DateTimeFormat('de-DE', { month: '2-digit', year: 'numeric' }).format(d)
}

export function formatPower(power: number | undefined, fallback?: string): string | undefined {
  if (typeof power === 'number' && Number.isFinite(power)) {
    const ps = Math.round(power * 1.35962)
    return `${power} kW (${ps} PS)`
  }
  return fallback
}

// mobile.de uses uppercase enum keys (PETROL, MANUAL_GEAR, EURO6, …).
// Map them to readable German labels; pass through anything we don't know.
const HUMAN_LABELS: Record<string, string> = {
  // Fuel
  PETROL: 'Benzin',
  DIESEL: 'Diesel',
  ELECTRIC: 'Elektro',
  HYBRID: 'Hybrid',
  HYBRID_DIESEL: 'Hybrid (Diesel)',
  HYBRID_PETROL: 'Hybrid (Benzin)',
  CNG: 'Erdgas (CNG)',
  LPG: 'Autogas (LPG)',
  HYDROGEN: 'Wasserstoff',
  ETHANOL: 'Ethanol',
  // Gearbox
  MANUAL_GEAR: 'Schaltgetriebe',
  AUTOMATIC_GEAR: 'Automatik',
  SEMIAUTOMATIC_GEAR: 'Halbautomatik',
  // Vehicle class / category
  Car: 'PKW',
  SmallCar: 'Kleinwagen',
  Limousine: 'Limousine',
  EstateCar: 'Kombi',
  Cabrio: 'Cabrio',
  SportsCar: 'Sportwagen',
  OffRoad: 'SUV / Geländewagen',
  Van: 'Van / Kleinbus',
  TransporterUpTo7500: 'Transporter',
  // Condition / usage
  NEW: 'Neu',
  USED: 'Gebraucht',
  EMPLOYEES_CAR: "Mitarbeiterfahrzeug",
  DEMONSTRATION: 'Vorführfahrzeug',
  PRE_REGISTRATION: 'Tageszulassung',
  ANCIENT: 'Oldtimer',
  // Doors
  TWO_OR_THREE: '2 / 3',
  FOUR_OR_FIVE: '4 / 5',
  // Climatisation
  AUTOMATIC_CLIMATISATION: 'Klimaautomatik',
  AUTOMATIC_CLIMATISATION_2_ZONES: 'Klimaautomatik (2 Zonen)',
  AUTOMATIC_CLIMATISATION_3_ZONES: 'Klimaautomatik (3 Zonen)',
  AUTOMATIC_CLIMATISATION_4_ZONES: 'Klimaautomatik (4 Zonen)',
  MANUAL_CLIMATISATION: 'Klimaanlage',
  NO_CLIMATISATION: 'Keine Klimaanlage',
  // Airbags
  FRONT_AIRBAGS: 'Front-Airbags',
  FRONT_AND_SIDE_AIRBAGS: 'Front- und Seitenairbags',
  FRONT_AND_SIDE_AND_MORE_AIRBAGS: 'Front-, Seiten- und weitere Airbags',
  NO_AIRBAGS: 'Keine Airbags',
  // Park assist
  REAR_SENSORS: 'Parksensoren hinten',
  FRONT_SENSORS: 'Parksensoren vorne',
  CAMERA: 'Rückfahrkamera',
  SELF_STEERING_SYSTEM: 'Einparkassistent',
  '360_CAMERA': 'Rundumsicht-Kamera',
  // Emission
  EMISSIONSSTICKER_GREEN: 'Grüne Plakette',
  EMISSIONSSTICKER_YELLOW: 'Gelbe Plakette',
  EMISSIONSSTICKER_RED: 'Rote Plakette',
  EURO1: 'Euro 1',
  EURO2: 'Euro 2',
  EURO3: 'Euro 3',
  EURO4: 'Euro 4',
  EURO5: 'Euro 5',
  EURO6: 'Euro 6',
  EURO6D: 'Euro 6d',
  EURO6D_TEMP: 'Euro 6d-TEMP',
  // Colors
  WHITE: 'Weiß',
  BLACK: 'Schwarz',
  SILVER: 'Silber',
  GREY: 'Grau',
  BLUE: 'Blau',
  RED: 'Rot',
  GREEN: 'Grün',
  YELLOW: 'Gelb',
  ORANGE: 'Orange',
  BROWN: 'Braun',
  GOLD: 'Gold',
  BEIGE: 'Beige',
  PURPLE: 'Lila',
  // Interior type
  FABRIC: 'Stoff',
  PART_LEATHER: 'Teilleder',
  FULL_LEATHER: 'Leder',
  VELOUR: 'Velours',
  ALCANTARA: 'Alcantara',
  OTHER_INTERIOR_TYPE: 'Sonstiges',
  // Price type
  FIXED: 'Festpreis',
  NEGOTIABLE: 'VHB',
}

export function humanLabel(value: string | undefined): string | undefined {
  if (!value) return undefined
  if (HUMAN_LABELS[value]) return HUMAN_LABELS[value]
  // Multi-value (comma-separated) — translate each piece if known.
  if (value.includes(',')) {
    return value
      .split(',')
      .map((piece) => piece.trim())
      .map((piece) => HUMAN_LABELS[piece] ?? toTitleCase(piece))
      .join(', ')
  }
  return toTitleCase(value)
}

function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * mobile.de descriptions arrive as one long string with `\\` and `\n` as
 * line-break placeholders, plus markdown-style **bold** markers. Split into
 * paragraphs and lines for clean rendering. We intentionally render the bold
 * markers as plain text (no dangerouslySetInnerHTML).
 */
export function parseDescriptionParagraphs(description: string): Array<{
  heading?: string
  lines: string[]
}> {
  if (!description) return []

  const normalized = description
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\n')
    .replace(/\\/g, '\n')

  const blocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  return blocks.map((block) => {
    // Detect "**Heading:**" at the start of a block.
    const headingMatch = block.match(/^\*\*([^*]+?)\*\*\s*\n?([\s\S]*)$/)
    if (headingMatch) {
      const heading = headingMatch[1].replace(/[:\s]+$/, '').trim()
      const rest = headingMatch[2].trim()
      return {
        heading,
        lines: rest.length > 0 ? splitListLines(rest) : [],
      }
    }
    return { lines: splitListLines(block) }
  })
}

function splitListLines(text: string): string[] {
  // If the block looks like a comma-separated equipment list (many short
  // items), split on commas. Otherwise keep paragraphs by newline.
  const lines = text
    .split('\n')
    .map((l) => l.replace(/\*+/g, '').trim())
    .filter(Boolean)

  if (lines.length === 1 && lines[0].split(',').length > 6) {
    return lines[0].split(',').map((s) => s.trim()).filter(Boolean)
  }
  return lines
}
