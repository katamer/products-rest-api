import { enhancingData } from "@types";

export const ratingData = (id: number): enhancingData => ({
  type: "rating",
  baseURL: "https://ot03ty7nhg.execute-api.us-east-2.amazonaws.com",
  path: `/Production/product-rating?productId=${id}`,
});

export const currencyData = (
  price: number,
  toCurrency: string
): enhancingData => ({
  type: "currency",
  baseURL: "https://owlnnjqrs0.execute-api.us-east-2.amazonaws.com",
  path: `/Production/product-challenge-price?price=${price}&toCurrency=${toCurrency}`,
});
