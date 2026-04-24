export type Product = {
  id: string;
  name: string;
  priceCents: number;
};

export type GetProductsResponse = {
  products: Product[];
};

