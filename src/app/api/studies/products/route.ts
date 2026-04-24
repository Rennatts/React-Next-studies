import { NextResponse } from "next/server";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type Product = { id: string; name: string; priceCents: number };

function allProducts(): Product[] {
  const base: Product[] = [
    { id: "p_1", name: "Keyboard", priceCents: 9900 },
    { id: "p_2", name: "Mouse", priceCents: 4900 },
    { id: "p_3", name: "Monitor", priceCents: 19900 },
  ];
  // Repeat with predictable ids so pagination has multiple pages.
  const out: Product[] = [];
  for (let i = 0; i < 10; i += 1) {
    base.forEach((p) => {
      out.push({ ...p, id: `${p.id}_${i}`, name: `${p.name} (${i + 1})` });
    });
  }
  return out;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const delay = Math.max(0, Math.min(5000, Number(url.searchParams.get("delay") ?? "500") || 500));
  await wait(delay);

  const fail = url.searchParams.get("fail") === "1";
  if (fail && Math.random() < 0.5) {
    return NextResponse.json(
      { message: "Simulated API failure. Try reloading." },
      { status: 500 },
    );
  }

  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1") || 1);
  const limit = Math.max(1, Math.min(20, Number(url.searchParams.get("limit") ?? "5") || 5));

  const products = allProducts();
  const total = products.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  return NextResponse.json({
    products: products.slice(start, end),
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  });
}

