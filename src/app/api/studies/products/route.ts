import { NextResponse } from "next/server";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET(request: Request) {
  await wait(500);

  const url = new URL(request.url);
  const fail = url.searchParams.get("fail") === "1";
  if (fail && Math.random() < 0.5) {
    return NextResponse.json(
      { message: "Simulated API failure. Try reloading." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    products: [
      { id: "p_1", name: "Keyboard", priceCents: 9900 },
      { id: "p_2", name: "Mouse", priceCents: 4900 },
      { id: "p_3", name: "Monitor", priceCents: 19900 },
    ],
  });
}

