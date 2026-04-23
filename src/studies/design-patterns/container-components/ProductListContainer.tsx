"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "./mockApi";
import { ProductListView } from "./ProductListView";
import type { Product } from "./types";

/**
 * Container component: owns async workflow and hands state + actions to the view.
 */
export function ProductListContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      setProducts([]);
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <ProductListView
      products={products}
      loading={loading}
      error={error}
      onRetry={() => void load()}
    />
  );
}
