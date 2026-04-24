import { requestJson } from "@/studies/api/api-layer/apiClient";
import type {
  GetProductsPageResponse,
  GetProductsResponse,
} from "@/studies/api/api-layer/types";

export function getProducts(opts?: { fail?: boolean; signal?: AbortSignal }) {
  const base = "/api/studies/products";
  const url = opts?.fail ? `${base}?fail=1` : base;
  return requestJson<GetProductsResponse>(url, { signal: opts?.signal });
}

export function getProductsPage(args: {
  page: number;
  limit: number;
  delayMs?: number;
  signal?: AbortSignal;
}) {
  const delay = args.delayMs ? `&delay=${args.delayMs}` : "";
  const url = `/api/studies/products?page=${args.page}&limit=${args.limit}${delay}`;
  return requestJson<GetProductsPageResponse>(url, { signal: args.signal });
}

