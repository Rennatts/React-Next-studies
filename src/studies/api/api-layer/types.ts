export type Product = {
  id: string;
  name: string;
  priceCents: number;
};

export type GetProductsResponse = {
  products: Product[];
};

export type GetProductsPageResponse = {
  products: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

