import { ApiError } from "./errors";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

/**
 * Base URL strategy:
 * - Same-origin browser calls: keep it relative (base = "").
 * - External API: set `NEXT_PUBLIC_API_BASE_URL` (client) and/or `API_BASE_URL` (server).
 */
export const API_BASE_URL =
  (typeof window === "undefined"
    ? process.env.API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL) ?? "";

export function buildUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (API_BASE_URL.length === 0) return path;
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function getErrorMessage(data: unknown): string | undefined {
  if (data && typeof data === "object" && "message" in data) {
    const msg = (data as { message?: unknown }).message;
    return typeof msg === "string" ? msg : undefined;
  }
  return undefined;
}

async function readJsonSafe(res: Response): Promise<unknown | undefined> {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined;
  try {
    return await res.json();
  } catch {
    return undefined;
  }
}

export async function requestJson<T>(url: string, opts: RequestOptions = {}): Promise<T> {
  const res = await fetch(buildUrl(url), {
    method: opts.method ?? "GET",
    headers: {
      "content-type": "application/json",
      ...(opts.headers ?? {}),
    },
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    signal: opts.signal,
  });

  const data = await readJsonSafe(res);

  if (!res.ok) {
    const message =
      getErrorMessage(data) ??
      `Request failed with status ${res.status} (${res.statusText})`;
    throw new ApiError(String(message), { status: res.status, details: data });
  }

  return data as T;
}

