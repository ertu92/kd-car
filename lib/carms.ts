import fallbackCars from "@/data/cars.json";

export type DataSource = "carms" | "local";

export interface InventoryCar {
  id: string;
  slug: string;
  make: string;
  model: string;
  title: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  engine: string;
  horsepower: string;
  exteriorColor: string;
  interiorColor: string;
  description: string;
  features: string[];
  image: string;
  images: string[];
  vat: boolean;
  fuelType?: string;
  vehicleType?: string;
  url?: string;
}

export type InventoryFilters = Partial<{
  search: string;
  make: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  fuelType: string;
  vehicleType: string;
  transmission: string;
  minPower: number;
  maxPower: number;
  page: number;
  limit: number;
}>;

export interface InventoryResult {
  cars: InventoryCar[];
  source: DataSource;
  pagination?: CarmsPagination;
  error?: string;
}

export interface InventoryCarResult {
  car: InventoryCar | null;
  source: DataSource;
  error?: string;
}

type RawCar = {
  id?: string | number;
  slug?: string;
  brand?: string;
  model?: string;
  title?: string;
  firstRegistration?: string;
  kilometers?: string | number;
  transmission?: string;
  power?: string | number;
  price?: string | number;
  vat?: boolean | number | string | null;
  images?: string[] | string;
  image?: string;
  description?: string;
  features?: string[] | string;
  fuelType?: string;
  vehicleType?: string;
  url?: string | null;
  engine?: string;
  horsepower?: string;
  exteriorColor?: string;
  interiorColor?: string;
};

type CarmsListResponse = {
  success: boolean;
  data: RawCar[];
  pagination?: CarmsPagination;
  error?: string;
  code?: string;
};

type CarmsSingleResponse = {
  success: boolean;
  data: RawCar;
  error?: string;
  code?: string;
};

export type CarmsPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type CarmsConfig = {
  baseUrl: string;
  apiKey?: string;
};

type CarmsError = Error & {
  status?: number;
  statusText?: string;
  body?: string;
  code?: string;
};

const FALLBACK_SOURCE: DataSource = "local";
const CARMS_SOURCE: DataSource = "carms";

const FALLBACK_CARS: InventoryCar[] = (fallbackCars as RawCar[]).map((car) =>
  normalizeCar(car)
);

let missingConfigWarned = false;

export async function getInventoryCars(
  filters: InventoryFilters = {}
): Promise<InventoryResult> {
  const config = getCarmsConfig();

  if (!config) {
    warnMissingConfig();
    return {
      cars: applyLocalFilters(FALLBACK_CARS, filters),
      source: FALLBACK_SOURCE,
      error: "CARMS API is not configured. Using local fallback data.",
    };
  }

  try {
    const query = new URLSearchParams();
    const effectiveFilters: InventoryFilters = {
      limit: 12,
      ...filters,
    };

    Object.entries(effectiveFilters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }

      if (typeof value === "number") {
        query.append(key, value.toString());
        return;
      }

      query.append(key, value);
    });

    const endpoint = `/cars${query.toString() ? `?${query.toString()}` : ""}`;
    const payload = await carmsRequest<CarmsListResponse>(config, endpoint);

    if (!payload.success) {
      const apiError = payload.error || payload.code || "Unknown CARMS API error";
      throw new Error(apiError);
    }

    const cars = payload.data
      .map((car) => normalizeCar(car, config.baseUrl))
      .filter((car): car is InventoryCar => !!car);

    return {
      cars,
      pagination: payload.pagination,
      source: CARMS_SOURCE,
    };
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error("Failed to fetch cars from CARMS:", message);

    return {
      cars: applyLocalFilters(FALLBACK_CARS, filters),
      source: FALLBACK_SOURCE,
      error: message,
    };
  }
}

export async function getInventoryCar(
  slug: string
): Promise<InventoryCarResult> {
  const config = getCarmsConfig();

  if (!config) {
    warnMissingConfig();
    return {
      car: findFallbackCar(slug),
      source: FALLBACK_SOURCE,
      error: "CARMS API is not configured. Using local fallback data.",
    };
  }

  try {
    const endpoint = `/cars/${encodeURIComponent(slug)}`;
    const payload = await carmsRequest<CarmsSingleResponse>(config, endpoint);

    if (!payload.success) {
      const apiError = payload.error || payload.code || "Unknown CARMS API error";
      throw new Error(apiError);
    }

    const normalized = normalizeCar(payload.data, config.baseUrl);

    return {
      car: normalized,
      source: CARMS_SOURCE,
    };
  } catch (error) {
    const message = extractErrorMessage(error);
    const responseError = error as CarmsError;

    if (responseError.status === 404) {
      const fallbackCar = findFallbackCar(slug);

      if (fallbackCar) {
        return {
          car: fallbackCar,
          source: FALLBACK_SOURCE,
          error: "Requested car not found in CARMS. Falling back to local data.",
        };
      }

      return {
        car: null,
        source: FALLBACK_SOURCE,
        error: "Requested car not found.",
      };
    }

    console.error("Failed to fetch car from CARMS:", message);

    return {
      car: findFallbackCar(slug),
      source: FALLBACK_SOURCE,
      error: message,
    };
  }
}

function getCarmsConfig(): CarmsConfig | undefined {
  const baseUrl = process.env.CARMS_BASE_URL?.trim();

  if (!baseUrl) {
    return undefined;
  }

  const apiKey = process.env.CARMS_API_KEY?.trim();

  return {
    baseUrl: stripTrailingSlash(baseUrl),
    apiKey: apiKey || undefined,
  };
}

async function carmsRequest<T>(
  config: CarmsConfig,
  endpoint: string
): Promise<T> {
  const url = buildUrl(config.baseUrl, endpoint);
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (config.apiKey) {
    headers["x-api-key"] = config.apiKey;
  }

  const response = await fetch(url, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const error: CarmsError = new Error(
      `CARMS request failed: ${response.status} ${response.statusText}`
    );

    error.status = response.status;
    error.statusText = response.statusText;
    error.body = await safeReadBody(response);

    throw error;
  }

  return response.json() as Promise<T>;
}

function normalizeCar(raw: RawCar, baseUrl?: string): InventoryCar {
  const slug = toSlug(raw);
  const make = (raw.brand || raw.model || "Unbekannt").trim();
  const model = raw.model?.trim() || raw.brand?.trim() || "Unbekannt";
  const title = raw.title?.trim() || `${make} ${model}`.trim();
  const year = parseRegistrationYear(raw.firstRegistration) ?? deriveYearFromSlug(slug);
  const mileage = normalizeKilometers(raw.kilometers);
  const price = normalizePrice(raw.price);
  const vat = normalizeVat(raw.vat);
  const transmission = normalizeString(raw.transmission, "Automatic");
  const engine = normalizeString(raw.engine, "Keine Angabe");
  const horsepower = normalizePower(raw.power, raw.horsepower);
  const description = normalizeString(
    raw.description,
    "Weitere Informationen folgen in Kuerze."
  );
  const features = normalizeFeatures(raw.features);
  const images = normalizeImages(raw.images, raw.image, baseUrl);

  return {
    id: slug,
    slug,
    make,
    model,
    title,
    year,
    price,
    mileage,
    transmission,
    engine,
    horsepower,
    exteriorColor: normalizeString(raw.exteriorColor, "Keine Angabe"),
    interiorColor: normalizeString(raw.interiorColor, "Keine Angabe"),
    description,
    features,
    image: images[0],
    images,
    vat,
    fuelType: raw.fuelType || undefined,
    vehicleType: raw.vehicleType || undefined,
    url: raw.url || undefined,
  };
}

function toSlug(raw: RawCar): string {
  if (raw.slug && raw.slug.trim().length > 0) {
    return raw.slug.trim();
  }

  if (typeof raw.id === "string" && raw.id.trim().length > 0) {
    return raw.id.trim();
  }

  if (typeof raw.id === "number") {
    return raw.id.toString();
  }

  const brand = raw.brand?.toLowerCase().replace(/\s+/g, "-") || "car";
  const model = raw.model?.toLowerCase().replace(/\s+/g, "-") || "model";

  return `${brand}-${model}`;
}

function parseRegistrationYear(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parts = value.match(/(\d{4})/);
  if (parts) {
    return Number.parseInt(parts[1], 10);
  }

  return undefined;
}

function deriveYearFromSlug(slug: string): number {
  const parts = slug.match(/(19|20)\d{2}/);
  if (parts) {
    return Number.parseInt(parts[0], 10);
  }

  return new Date().getFullYear();
}

function normalizeKilometers(value: string | number | undefined): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d]/g, "");
    const numeric = Number.parseInt(cleaned, 10);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
  }

  return 0;
}

function normalizePrice(value: string | number | undefined): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d]/g, "");
    const numeric = Number.parseInt(cleaned, 10);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
  }

  return 0;
}

function normalizePower(value?: string | number, fallback?: string): string {
  if (typeof value === "number") {
    return `${value} PS`;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (fallback && fallback.trim().length > 0) {
    return fallback.trim();
  }

  return "Keine Angabe";
}

function normalizeString(value: string | undefined | null, fallback: string) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return fallback;
}

function normalizeFeatures(value: string[] | string | undefined): string[] {
  if (Array.isArray(value) && value.length > 0) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      const parts = value
        .split(/[,;]\s*/)
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts.length > 0) {
        return parts;
      }
    }
  }

  return [];
}

function normalizeImages(
  images: string[] | string | undefined,
  fallback?: string,
  baseUrl?: string
): string[] {
  const normalized: string[] = [];

  const imageList = Array.isArray(images)
    ? images
    : typeof images === "string"
    ? parseImagesString(images)
    : [];

  imageList.forEach((image) => {
    const normalizedUrl = normalizeImageUrl(image, baseUrl);
    if (normalizedUrl) {
      normalized.push(normalizedUrl);
    }
  });

  const fallbackUrl = normalizeImageUrl(fallback, baseUrl);
  if (normalized.length === 0 && fallbackUrl) {
    normalized.push(fallbackUrl);
  }

  return normalized.length > 0 ? normalized : ["/images/body.jpg"];
}

function parseImagesString(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    // Ignore JSON parse errors; fallback to comma splitting
  }

  return value
    .split(/[,;]\s*/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeImageUrl(url: string | undefined, baseUrl?: string): string | undefined {
  if (!url) {
    return undefined;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (!baseUrl) {
    return url;
  }

  return `/api/carms-image?path=${encodeURIComponent(url)}`;
}

function normalizeVat(
  value: boolean | number | string | null | undefined
): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value > 0;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return (
      normalized === "true" ||
      normalized === "yes" ||
      normalized === "1" ||
      normalized === "ja"
    );
  }

  return false;
}

function applyLocalFilters(
  cars: InventoryCar[],
  filters: InventoryFilters
): InventoryCar[] {
  return cars.filter((car) => {
    if (filters.search) {
      const haystack = `${car.make} ${car.model} ${car.title}`.toLowerCase();
      if (!haystack.includes(filters.search.toLowerCase())) {
        return false;
      }
    }

    if (filters.make && filters.make !== "all") {
      if (car.make.toLowerCase() !== filters.make.toLowerCase()) {
        return false;
      }
    }

    if (filters.model && filters.model !== "all") {
      if (car.model.toLowerCase() !== filters.model.toLowerCase()) {
        return false;
      }
    }

    if (
      typeof filters.minPrice === "number" &&
      car.price < filters.minPrice
    ) {
      return false;
    }

    if (
      typeof filters.maxPrice === "number" &&
      car.price > filters.maxPrice
    ) {
      return false;
    }

    if (
      typeof filters.minPower === "number" &&
      extractNumeric(car.horsepower) < filters.minPower
    ) {
      return false;
    }

    if (
      typeof filters.maxPower === "number" &&
      extractNumeric(car.horsepower) > filters.maxPower
    ) {
      return false;
    }

    if (filters.transmission && filters.transmission !== "all") {
      if (
        car.transmission.toLowerCase() !== filters.transmission.toLowerCase()
      ) {
        return false;
      }
    }

    if (filters.fuelType && filters.fuelType !== "all") {
      if (
        (car.fuelType || "").toLowerCase() !== filters.fuelType.toLowerCase()
      ) {
        return false;
      }
    }

    if (filters.vehicleType && filters.vehicleType !== "all") {
      if (
        (car.vehicleType || "").toLowerCase() !==
        filters.vehicleType.toLowerCase()
      ) {
        return false;
      }
    }

    return true;
  });
}

function extractNumeric(value: string): number {
  const match = value.match(/(\d+)/);
  if (match) {
    return Number.parseInt(match[1], 10);
  }

  return 0;
}

function findFallbackCar(slug: string): InventoryCar | null {
  return FALLBACK_CARS.find((car) => car.slug === slug) || null;
}

function buildUrl(baseUrl: string, endpoint: string): string {
  if (endpoint.startsWith("http")) {
    return endpoint;
  }

  return `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
}

async function safeReadBody(response: Response): Promise<string | undefined> {
  try {
    return await response.text();
  } catch (error) {
    console.warn("Failed to read error body from CARMS response:", error);
    return undefined;
  }
}

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const carmsError = error as CarmsError;
    if (carmsError.body) {
      return `${error.message} - ${carmsError.body}`;
    }

    return error.message;
  }

  return "Unexpected CARMS error";
}

function warnMissingConfig() {
  if (!missingConfigWarned) {
    console.warn(
      "CARMS_BASE_URL is not set. Falling back to local cars data."
    );
    missingConfigWarned = true;
  }
}
