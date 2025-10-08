import { NextRequest, NextResponse } from "next/server";

const IMAGE_MIME_TYPES: Record<string, string> = {
  avif: "image/avif",
  bmp: "image/bmp",
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jfif: "image/jpeg",
  jpg: "image/jpeg",
  pjpeg: "image/jpeg",
  pjp: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  tif: "image/tiff",
  tiff: "image/tiff",
  webp: "image/webp",
  apng: "image/apng",
};

function isImageContentType(value: string | null): boolean {
  return !!value && value.toLowerCase().startsWith("image/");
}

function inferContentType(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\.([a-z0-9]+)$/i);
    if (!match) {
      return undefined;
    }

    const extension = match[1];
    if (!extension) {
      return undefined;
    }

    const normalizedExtension = extension.toLowerCase();
    return IMAGE_MIME_TYPES[normalizedExtension];
  } catch {
    const match = url.match(/\.([a-z0-9]+)$/i);
    if (!match) {
      return undefined;
    }

    const extension = match[1];
    if (!extension) {
      return undefined;
    }

    const normalizedExtension = extension.toLowerCase();
    return IMAGE_MIME_TYPES[normalizedExtension];
  }
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const imagePath = params.get("path");

  if (!imagePath) {
    return NextResponse.json({ error: "Missing image path" }, { status: 400 });
  }

  const carmsBaseUrl = process.env.CARMS_BASE_URL?.trim();
  const apiKey = process.env.CARMS_API_KEY?.trim();

  if (!carmsBaseUrl) {
    return NextResponse.json(
      { error: "CARMS API not configured" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(carmsBaseUrl);
    const baseOrigin = url.origin;
    const imageUrl = `${baseOrigin}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;

    const headers: HeadersInit = {};
    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    const response = await fetch(imageUrl, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch image from CARMS: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status }
      );
    }

    const headerContentType = response.headers.get("content-type");
    const resolvedContentType = isImageContentType(headerContentType)
      ? headerContentType!
      : inferContentType(imageUrl);

    if (!resolvedContentType || !isImageContentType(resolvedContentType)) {
      console.error(
        `Unsupported image MIME type from CARMS: ${headerContentType || "unknown"}`
      );
      return NextResponse.json(
        { error: "Unsupported image content type" },
        { status: 415 }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": resolvedContentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error proxying CARMS image:", error);
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    );
  }
}
