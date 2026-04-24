import { NextResponse } from "next/server";

type RouteContext = {
  params: { id: string };
};

/**
 * Dynamic segment: /studies/next-server/route-handlers/demo/item/[id]
 */
export async function GET(_request: Request, { params }: RouteContext) {
  return NextResponse.json({
    message: "GET with dynamic param",
    id: params.id,
  });
}
