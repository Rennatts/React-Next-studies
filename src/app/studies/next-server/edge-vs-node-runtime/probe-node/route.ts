import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

/** Node runtime (default): can use `fs`. Would fail if this file used `export const runtime = 'edge'`. */
export async function GET() {
  const name = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { name?: string };
  return NextResponse.json({
    segment: "probe-node",
    runtime: "nodejs",
    packageName: name.name ?? null,
    nodeVersion: process.version,
  });
}
