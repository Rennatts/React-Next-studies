import { NextResponse } from "next/server";

export const runtime = "edge";

/** Edge runtime: Web APIs only — no importing `fs` here. */
export async function GET() {
  return NextResponse.json({
    segment: "probe-edge",
    runtime: "edge",
    at: Date.now(),
  });
}
