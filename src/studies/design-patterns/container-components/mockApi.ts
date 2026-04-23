import type { Product } from "./types";

const catalog: Product[] = [
  { id: "1", name: "Notebook", priceLabel: "$12" },
  { id: "2", name: "Mechanical pencil", priceLabel: "$8" },
  { id: "3", name: "Desk lamp", priceLabel: "$45" },
];

/**
 * Simulates a flaky network: fails once, then succeeds so you can exercise error + retry in the container.
 */
let attempt = 0;

export async function fetchProducts(): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 650));
  attempt += 1;
  if (attempt === 1) {
    throw new Error("First load failed (mock). Click retry.");
  }
  return catalog;
}
