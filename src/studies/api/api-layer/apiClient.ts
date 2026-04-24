import { ApiError } from "./errors";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

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
  const res = await fetch(url, {
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

