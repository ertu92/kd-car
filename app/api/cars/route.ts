import { NextRequest, NextResponse } from "next/server";
import {
  getInventoryCars,
  type InventoryFilters,
} from "@/lib/carms";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filters: InventoryFilters = {};

  const search = searchParams.get("search");
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const minPrice = toNumber(searchParams.get("minPrice"));
  const maxPrice = toNumber(searchParams.get("maxPrice"));
  const fuelType = searchParams.get("fuelType");
  const vehicleType = searchParams.get("vehicleType");
  const transmission = searchParams.get("transmission");
  const page = toNumber(searchParams.get("page"));
  const limit = toNumber(searchParams.get("limit"));

  if (search) filters.search = search;
  if (make) filters.make = make;
  if (model) filters.model = model;
  if (typeof minPrice === "number") filters.minPrice = minPrice;
  if (typeof maxPrice === "number") filters.maxPrice = maxPrice;
  if (fuelType) filters.fuelType = fuelType;
  if (vehicleType) filters.vehicleType = vehicleType;
  if (transmission) filters.transmission = transmission;
  if (typeof page === "number") filters.page = page;
  if (typeof limit === "number") filters.limit = limit;

  const result = await getInventoryCars(filters);

  return NextResponse.json(result, {
    status: 200,
  });
}

function toNumber(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
