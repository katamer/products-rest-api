export interface IProduct {
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

export type ReqQuery = { toCurrency?: string };
