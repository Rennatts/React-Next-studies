import { NextResponse } from "next/server";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type UpstreamProduct = { id: string; name: string; priceCents: number };
type UpstreamProductsResponse = {
  products: UpstreamProduct[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type BffProductCard = { id: string; title: string; price: string };
type BffResponse = {
  cards: BffProductCard[];
  meta: { page: number; totalPages: number };
  source: "bff";
};

function formatUsdFromCents(priceCents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}

/**
 * BFF demo endpoint:
 * - Calls an "upstream" API (in this repo: /api/studies/products)
 * - Shapes the response for a specific UI
 * - Hides upstream paging fields and converts price format
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1") || 1);
  const limit = Math.max(1, Math.min(10, Number(url.searchParams.get("limit") ?? "5") || 5));
  const delay = Math.max(0, Math.min(2000, Number(url.searchParams.get("delay") ?? "250") || 250));
  await wait(delay);

  const upstreamUrl = new URL("/api/studies/products", url.origin);
  upstreamUrl.searchParams.set("page", String(page));
  upstreamUrl.searchParams.set("limit", String(limit));

  const upstreamRes = await fetch(upstreamUrl, { cache: "no-store" });
  if (!upstreamRes.ok) {
    const text = await upstreamRes.text().catch(() => "");
    return NextResponse.json(
      {
        message: "Upstream API failed. BFF cannot build the UI model.",
        upstream: { status: upstreamRes.status, body: text.slice(0, 300) },
      },
      { status: 502 },
    );
  }

  const upstream = (await upstreamRes.json()) as UpstreamProductsResponse;

  const body: BffResponse = {
    source: "bff",
    meta: { page: upstream.page, totalPages: upstream.totalPages },
    cards: upstream.products.map((p) => ({
      id: p.id,
      title: p.name,
      price: formatUsdFromCents(p.priceCents),
    })),
  };

  return NextResponse.json(body);
}

