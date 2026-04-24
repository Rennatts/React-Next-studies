import { NextResponse } from "next/server";

/**
 * Study Route Handler: same path supports GET + POST.
 * URL: /studies/next-server/route-handlers/demo
 */
export async function GET() {
  return NextResponse.json({
    message: "GET from route.ts",
    hint: "Use the button on the study page to try POST, or send JSON with curl.",
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  return NextResponse.json(
    {
      message: "POST from route.ts",
      received: body,
    },
    { status: 201 },
  );
}
