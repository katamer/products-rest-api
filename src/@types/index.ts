export interface Product {
  npkId: string;
  productId: number;
  url: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  rating?: number[];
  currency?: string;
}

export type RequestQuery = { toCurrency?: string };

export interface enhancingData {
  baseURL: string;
  path: string;
  type: "currency" | "rating";
}
